import {
  checkEmail,
  bankCard,
  checkTwoNumber,
  checkMoney,
  checkUrl,
  checkMobile,
  checkNumber,
  checkLegal
} from "@/utils/regular";

// 银行卡号
const valideBank = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入银行卡号"));
  } else if (!bankCard(value)) {
    callback(new Error("银行卡号不正确"));
  } else {
    callback();
  }
};

// 邮箱
const valideEmail = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入邮箱"));
  } else if (!checkEmail(value)) {
    callback(new Error("邮箱号不正确"));
  } else {
    callback();
  }
};

// 金额
const valideMoney = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入金额"));
  } else if (value < 0) {
    callback(new Error("金额必须大于或等于0"));
  } else if (!checkTwoNumber(value)) {
    callback(new Error("仅保留两位小数"));
  } else {
    callback();
  }
};

// 链接地址
const valideUrl = (rule, value, callback) => {
  if (!value) {
    callback();
  } else if (!checkUrl(value)) {
    callback(new Error("链接地址不正确"));
  } else {
    callback();
  }
};

// 手机号
const valideMobile = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入手机号"));
  } else if (!checkMobile(value)) {
    callback(new Error("手机号不正确"));
  } else {
    callback();
  }
};

// 非空时校验
// 金额
const valideMoney1 = (rule, value, callback) => {
  if (value !== "" && !checkTwoNumber(value)) {
    callback(new Error("金额必须大于等于0仅保留两位小数"));
  } else {
    callback();
  }
};

const valideNum1 = (rule, value, callback) => {
  if (value !== "" && !checkNumber(value)) {
    callback(new Error("请输入纯数字"));
  } else {
    callback();
  }
};

// 手机号
const valideMobile1 = (rule, value, callback) => {
  if (value !== "" && !checkMobile(value)) {
    callback(new Error("手机号不正确"));
  } else {
    callback();
  }
};

// 身份证号
const valideIdcardNo1 = (rule, value, callback) => {
  if (!value) {
    callback();
  } else if (!checkLegal(value)) {
    callback(new Error("身份证号不正确"));
  } else {
    callback();
  }
};

// 银行卡号
const valideBank1 = (rule, value, callback) => {
  if (value !== "" && !bankCard(value)) {
    callback(new Error("银行卡号不正确"));
  } else {
    callback();
  }
};


// 登录校验
export const loginRule = {
  phone: [{ required: true, message: "请输入用户名", trigger: "change" }],
  password: [{ required: true, message: "请输入密码", trigger: "change" }]
};

export const departRules = {
  name: [{ required: true, message: "请输入部门名称", trigger: "change" }],
  // region: [{ required: true, message: "请选择所属区域", trigger: "change" }],
  // departmentType: [{ required: true, message: "请选择所属", trigger: "change" }]
};

// 员工信息表单校验
export const employeeRules = {
  name: [{ required: true, message: "请输入员工姓名", trigger: "blur" }],
  phone: [
    { required: true, message: "请输入员工手机号", trigger: "blur" },
    { validator: valideMobile1, trigger: "blur" }
  ],
  idCard: [{ validator: valideIdcardNo1, trigger: "blur" }],
  department: [
    { required: true, message: "请输入员工所在部门", trigger: "change" }
  ],
  position: [
    { required: true, message: "请输入员工所在岗位", trigger: "change" }
  ],
  groups: [
    { required: true, message: "请输入员工所属组别", trigger: "change" }
  ],
  sex: [{ required: true, message: "请选择员工性别", trigger: "change" }],
  password: [{ required: true, message: "请输入密码", trigger: "change" }]
};

// 客户信息表单校验
export const customerRules = {
  name: [{ required: true, message: "请输入客户姓名", trigger: "blur" }],
  phone: [
    { required: true, message: "请输入员工手机号", trigger: "blur" },
    { validator: valideMobile1, trigger: "blur" }
  ],
  status: [{ required: true, message: "请选择客户状态", trigger: "blur" }],
}

//新增通话数据
export const callRules = {
  customerName: [{ required: true, message: "请输入客户姓名", trigger: "blur" }],
  customerPhone: [{ required: true, message: "请输入客户手机号", trigger: "blur" },
  { validator: valideMobile1, trigger: "blur" }],
  beginCall: [{ required: true, message: "请选择开始呼出时间", trigger: "blur" }],
  endCall: [{ required: true, message: "请选择结束呼出时间", trigger: "blur" }],
  userName: [{ required: true, message: "请选择呼叫员工姓名", trigger: "blur" }]
}



//用户管理校验
export const roleRule = {
  username: [{ required: true, message: "请输入账号", trigger: "blur" },
  { min: 5, max: 18, message: "账号长度为5-18位", trigger: "blur" }],
  password: [
    { required: true, message: "请设置密码", trigger: "blur" },
    { min: 6, max: 18, message: "请输入6-18位密码", trigger: "blur" }
  ],
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { validator: valideMobile1, trigger: "blur" }
  ]
};
