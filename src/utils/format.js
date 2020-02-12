import moment from "moment";

export const formatSize = function formatSize(size) {
  if (!size || size <= 0) {
    return "0 Bytes";
  }
  if (/^\d+$/.test(size)) {
    let unit = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let index = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, index)).toFixed(2) + " " + unit[index];
  } else {
    return size;
  }
};

export const formatDate = function formatDate(time) {
  if (/^-?\d+$/.test(time)) {
    const momentTime = moment(time);
    return momentTime.format(
      momentTime.hour() === 0 && momentTime.minute() === 0
        ? "YYYY-MM-DD"
        : "YYYY-MM-DD HH:mm"
    );
  } else {
    return time;
  }
};
