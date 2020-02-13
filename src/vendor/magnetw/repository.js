// src/main/repository.js

import format from "./format-parser";

import URI from "urijs";
import xpath from "xpath";
import { DOMParser } from "xmldom";
import htmlparser2 from "htmlparser2-without-node-native";

const domParser = new DOMParser({
  errorHandler: {
    warning: w => {
      // console.warn(w)
    },
    error: e => {
      // console.error(e)
    },
    fatalError: e => {
      // console.error(e)
    }
  }
});

/**
 * 补齐搜索参数
 * @param rule
 * @param keyword
 * @param page
 * @param sort
 * @returns {{id: *, page: *, sort: *, keyword: *, url: *}}
 */

export function makeupSearchOption({
  rule,
  keyword,
  page = 1,
  sort = "preset"
}) {
  const newPage = Math.max(1, page || null);
  // 如果没有指定的排序 就取第一个排序
  const pathKeys = Object.keys(rule.paths);
  const newSort = pathKeys.indexOf(sort) !== -1 ? sort : pathKeys[0];
  // 拼接完整url
  const url =
    rule.url +
    rule.paths[newSort]
      .replace(/{k}/g, encodeURIComponent(keyword))
      .replace(/{p}/g, newPage);
  return { rule, keyword, url, page: newPage, sort: newSort };
}

async function requestDocument(url, clientHeaders = {}) {
  // header
  const uri = new URI(url);
  const host = uri.host();
  const origin = uri.origin();
  const headers = {
    host: host,
    origin: origin,
    referer: origin
  };
  const acceptLanguage = clientHeaders["accept-language"];
  headers["accept-language"] =
    acceptLanguage || "zh-CN,zh-TW;q=0.9,zh;q=0.8,en;q=0.7,und;q=0.6,ja;q=0.5";
  const xForwardedFor = clientHeaders["x-forwarded-for"];
  if (xForwardedFor) {
    headers["x-forwarded-for"] = xForwardedFor;
  }
  const userAgent = clientHeaders["user-agent"];
  headers["user-agent"] =
    userAgent ||
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.130 Safari/537.36";

  // console.log({ url, headers });
  const response = await fetch(url, { headers });
  const html = await response.text();
  // console.log('text: ',html);

  // 用htmlparser2转换一次再解析
  const outerHTML = htmlparser2.DomUtils.getOuterHTML(
    htmlparser2.parseDOM(html)
  );
  return domParser.parseFromString(outerHTML);
}

export async function obtainSearchResult({ rule, url }, headers) {
  // 如果没有缓存
  let items = null; // cacheManager.get(url)
  if (!items || items.length <= 0) {
    // 去源站请求
    let document = await requestDocument(url, headers);
    items = parseItemsDocument(document, rule.xpath);

    if (items && items.length > 0) {
      // 缓存请求到的列表
      // cacheManager.set(url, items, config.cacheExpired)
    }
  }

  // 过滤
  const originalCount = items.length;
  /*
  if (config.filterBare || config.filterEmpty) {
    items = items.filter(item => {
      if (config.filterBare) {
        return !isFilter(item.name.replace(/ /g, ""));
      } else if (config.filterEmpty) {
        return typeof item.size === "number" && item.size > 0;
      }
    });
  }
  */

  return { originalCount, items };
}

/**
 * 缓存下一页
 * @param id
 * @param keyword
 * @param page
 * @param sort
 * @param headers
 * @param userAgent
 */
function asyncCacheSearchResult({ id, keyword, page, sort }, headers) {
  if (!config.preload) {
    return;
  }

  // 缓存下一页
  const next = makeupSearchOption({ id, keyword, page: page + 1, sort });
  obtainSearchResult({ id, url: next.url }, headers);

  /*
  if (page === 1) {
    // 是第一页才缓存下一个源站
    let ruleKeys = Object.keys(ruleMap)
    const rule = ruleMap[ruleKeys[ruleKeys.indexOf(id) + 1]]
    if (rule) {
      const next = makeupSearchOption({id: rule.id, keyword, page, sort})
      obtainSearchResult({id: next.id, url: next.url}, headers)
    }
  }
  */
}

/**
 * 解析列表Document
 * @param document
 * @param expression xpath表达式对象
 */
function parseItemsDocument(document, expression) {
  const items = [];
  const groupNodes = xpath.select(expression.group, document);
  groupNodes.forEach((child, index) => {
    // 名称
    const nameNode = xpath.select(expression.name, child);
    const name = format.extractTextByNode(nameNode);
    // 分辨率
    const resolution = format.extractResolution(name);
    // 磁力链
    const magnet = format.extractMagnet(
      format.extractTextByNode(xpath.select(expression.magnet, child))
    );
    // 时间
    const date = format.extractDate(
      format.extractTextByNode(xpath.select(expression.date, child))
    );
    // 文件大小
    const size = format.extractFileSize(
      format.extractTextByNode(xpath.select(expression.size, child))
    );
    // 人气
    const hot = expression.hot
      ? format.extractNumber(
          format.extractTextByNode(xpath.select(expression.hot, child))
        )
      : null;
    // 详情url
    const detailExps = expression.name + "/@href";
    const detailUrlText = format.extractTextByNode(
      xpath.select(detailExps, child)
    );
    const detailUrl = detailUrlText
      ? new URI(detailUrlText).hostname("").toString()
      : null;
    if (name) {
      items.push({
        name,
        magnet,
        resolution,
        date,
        size,
        hot,
        detailUrl
      });
    }
  });
  // console.silly(`\n${JSON.stringify(items, '\t', 2)}`)
  return items;
}
