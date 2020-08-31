import Vue from "vue";

import moment from "moment";

import { fillZero } from "./tool";

//长时间 YYYY-MM-DD HH:mm:ss
Vue.filter("time", function(value, formatString, isNull = false) {
  if (isNull) if (value == "" || value == null) return "--";
  formatString = formatString || "YYYY-MM-DD HH:mm:ss";
  return moment(value).format(formatString);
});

//短时间 YYYY-MM-DD
Vue.filter("shorttime", function(value, formatString, isNull = false) {
  if (isNull) if (value == "" || value == null) return "--";
  formatString = formatString || "YYYY-MM-DD";
  return moment(value).format(formatString);
});

// 字符串为空时
Vue.filter("emptyString", function(value) {
  return !!value ? value : "--";
});

Vue.filter("emptyName", function(value) {
  return !!value ? value : "暂无";
});

//数字为空时
Vue.filter("emptyNumber", function(value) {
  return !!value ? value : "0";
});

// 过滤时分秒
Vue.filter("leaveTime", function(value) {
  return moment(value).format("YYYY-MM-DD HH:mm");
});

// 过滤年月日
Vue.filter("levelTime", function(value) {
  return moment(value).format("HH:mm:ss");
});
 

// 数字转换为bool值
Vue.filter("numToBoolStatus", function(value) {
  let data = false;
  switch (value) {
    case 0:
      data = false;
      break;
    case 1:
      data = true;
      break;
  }
  return data;
});

// 补零  000666
Vue.filter("fillZero", function(value, length) {
  if (!value) return "--";
  return (value = fillZero(value, length));
});

// 所属组别
Vue.filter("contractStatus", function(value) {
  let data  = ""
  switch (value) {
    case 0:
      data = "员工组";
      break;
    case 1:
      data = "管理组";
      break;
  }
  return data;
});

// 性别
Vue.filter("sexStatus", function(value) {
  let data = "";
  let val = "" + value;
  switch (val) {
    case "0":
      data = "女";
      break;
    case "1":
      data = "男";
      break;
  }
  return data;
});

// 状态
Vue.filter("accountStatus", value => {
  if (!value) return "--";
  let data = "";
  switch (value) {
    case 1:
      data = "启用";
      break;
    case 0:
      data = "冻结";
      break;
  }
  return data;
});

// 状态
Vue.filter("accountStatus", value => {
  if (!value) return "--";
  let data = "";
  switch (value) {
    case 0:
      data = "全部";
      break;
    case 1:
      data = "部分";
      break;
  }
  return data;
});