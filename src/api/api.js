//引入我们二次封装的axios.js文件
import https from "@/utils/axios";

/** ---------------------- apis --------------------------- */

//登录
export const userLogin = function (params) {
  let url = "/net/user/userLogin";
  return https(url, params, "post");
};

// 退出登录
export const logout = function (params) {
  let url = "/net/user/logout";
  return https(url, params, "post",'from');
};

//用户列表
export const queryUserListOfPage = function (params) {
  let url = "/net/user/queryUserListOfPage";
  return https(url, params, "post");
};

// 新增编辑用户
export const operateUser = function (params) {
  let url = "/net/user/operateUser";
  return https(url, params, "post");
};

//删除用户
export const deleteUser = function (params) {
  let url = "/net/user/deleteUser";
  return https(url, params, "post");
};

//--------------------------------------------客户管理---------------------

// 客户列表
export const queryCustomerListOfPage = function (params) {
  let url = "/net/customer/queryCustomerListOfPage";
  return https(url, params, "post");
};

// 新增编辑客户
export const operateCustomer = function (params) {
  let url = "/net/customer/operateCustomer";
  return https(url, params, "post");
};

// 导入客户
export const importCustomer = process.env.BASE_URL+"/net/customer/importCustomer"
// export const importCustomer = function (params) {
//   let url = "/net/customer/importCustomer";
//   return https(url, params, "post");
// };

// 删除客户
export const deleteCustomer = function (params) {
  let url = "/net/customer/deleteCustomer";
  return https(url, params, "post");
};

//回收客户
export const recycleCustomer = function (params) {
  let url = "/net/customer/recycleCustomer";
  return https(url, params, "post");
};


//---------------------------------------通话记录----------------------

// 新增通话数据
export const addCallrecord = function (params) {
  let url = "/net/callRecord/addCallrecord";
  return https(url, params, "post");
};

// 查询通话列表
export const queryCallrecordOfPage = function (params) {
  let url = "/net/callRecord/queryCallrecordOfPage";
  return https(url, params, "post");
};
