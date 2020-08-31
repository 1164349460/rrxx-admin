export default [
    {
        path: "/",
        name: "登录",
        alias: "/admin/login",
        component: resolve => require(["@/views/login/login"], resolve),
    },
    {
        path: '/admin/home',
        name: '首页',
        redirect: '/admin/employee/list',
        component: resolve => require(["@/views/home/home"], resolve),
        children: [
            {
                path: '/admin/employee/list',//员工列表
                name: 'employeeList',
                component: resolve => require(["@/views/employeeManage/employeeList"], resolve),
                meta: {
                    pathName: '员工列表'
                }
            },
            {
                path: '/admin/customerManage/undistribution',//未分配客户
                name: 'failGroup',
                component: resolve => require(["@/views/customerManage/undistribution"], resolve),
                meta: {
                    pathName: '未分配客户'
                }
            },
            {
                path: '/admin/customerManage/distribution',//已分配客户
                name: 'gameList',
                component: resolve => require(["@/views/customerManage/distribution"], resolve),
                meta: {
                    pathName: '已分配客户'
                }
            },
            {
                path: '/admin/callManage/callhistory',//呼出记录管理
                name: 'reflect',
                component: resolve => require(["@/views/callManage/callhistory"], resolve),
                meta: {
                    pathName: '呼出记录管理'
                }
            },
        ]
    },
    {
        path: "*",
        redirect: "/",
    },
]