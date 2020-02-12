import React from "react";
import { Alert, Text, StyleSheet, Clipboard, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import { formatSize, formatDate } from "../utils/format";

const styles = StyleSheet.create({
  container: {
    margin: 5,
    backgroundColor: "#ffffff"
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  info: {
    fontSize: 10
  }
});

/* 
Object {
    "date": 1577116800000,
    "detailUrl": "/detail/c5e4eb5bcd591173d761f5a917ff71033b94a551.html",
    "hot": 10699,
    "magnet": "magnet:?xt=urn:btih:c5e4eb5bcd591173d761f5a917ff71033b94a551",
    "name": "叶问4：完结篇.Ip Man 4.2019.TC1080P.X264.AC3.Mandarin.国语",
    "resolution": "1080P",
    "size": 1621350154,
  }
  */
const MagnetBrief = ({ info }) => {
  const handleCopyLink = async () => {
    Clipboard.setString(info.magnet);
    const link = await Clipboard.getString();
    Alert.alert("复制成功", link);
  };

  return (
    <View style={styles.container}>
      <Text>{info.name}</Text>
      <View style={styles.row}>
        <View>
          <Text style={styles.info}>大小: {formatSize(info.size)}</Text>
          <Text style={styles.info}>分辨率: {info.resolution}</Text>
          <Text style={styles.info}>人气: {info.hot}</Text>
          <Text style={styles.info}>日期: {formatDate(info.date)}</Text>
        </View>
        <Button
          onPress={handleCopyLink}
          icon={<Icon name="copy" size={16} color="white" />}
          title="复制磁力链接"
        />
      </View>
    </View>
  );
};

export default MagnetBrief;
