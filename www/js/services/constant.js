'use strict';
app.constant('APP', {
    VERSION: '1.0.8'
})
    .constant('AUTH_EVENTS', {
    authenticated: 'authenticated',
    logout: 'logout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
})

.constant('NETWORK_EVENTS', {
    nointernet: 'nointernet',
    timeout: 'timeout'
})

.constant('STORAGE_KEYS', {
    list_dealers: 'AncoListDealersKey',
    token_key: 'AncoTokenKey',
    user_key: 'AncoUserKey',
    appversion_key: 'AppVersionKey',
    last_provinceid_selected: 'LastIdProvinceSelected',
    username_key: 'AncoUserNameKey',
    remember_me_key: 'AncoRememberMeKey',
    language_key: 'AncoLanguageKey'
})

.constant('USER_ROLES', {
    DEALER: 1,
    SALE: 2,
    SC: 3,
    ADMIN: 4
})

.constant('USER_LEVELS', {
    // DEALER
    DEALER: 1,
    // SALE
    SALE_REP: 1,
    SALE_SUP: 2,
    ASM: 3,
    RSM: 4,
    NSM: 5,
    // SC
    SC: 1,
    SC_SUP: 2,
    // ADMIN
    ADMIN: 1
})

.constant('ROLE_LEVEL_2_NAME',
    {
        1: {
            1: 'Dealer'
        },
        2: {
            1: 'Sale Rep',
            2: 'Sale Sup',
            3: 'ASM',
            4: 'RSM',
            5: 'NSM'
        },
        3: {
            1: 'SC',
            2: 'SC Sup'
        },
        4: {
            1: 'Admin',
            2: 'Admin'
        }
    }
)

.constant('ROLE_FUNCTIONS', {
    DEALER: {
        LIST_ORDER: 1,
        ORDER: 2,
        ORDER_DETAIL: 3,
        CANCEL_ORDER: 4
    },
    SALE: {
        LIST_ORDER: 5,
        ORDER: 6,
        ORDER_DETAIL: 7,
        CANCEL_ORDER: 8
    },
    SALE_SUP: {
        LIST_ORDER: 9,
        ORDER: 10,
        ORDER_DETAIL: 11,
        CANCEL_ORDER: 12
    },
    SC: {
        LIST_ORDER: 13,
        ORDER_DETAIL: 14,
        VIEW_REPORT: 15,
        CONFIRM_ORDER: 16,
        DOWNLOAD_REPORT: 17
    },
    SC_SUP: {
        LIST_ORDER: 18,
        ORDER_DETAIL: 19,
        VIEW_REPORT: 20,
        DOWNLOAD_REPORT: 21,
        CONFIRM_ORDER: 22

    }
})

.constant('ROLE_LEVEL_FUNCTIONS', {
    1: {
        1: [
            {
                FunctionName: 'Xem danh sách đơn hàng',
                FunctionId: 1
            },
            {
                FunctionName: 'Đặt hàng',
                FunctionId: 2
            },
            {
                FunctionName: 'Xem chi tiết đơn hàng',
                FunctionId: 3
            },
            {
                FunctionName: 'Hủy đơn hàng',
                FunctionId: 4
            }
        ]

    },
    2: {
        1: [
            {
                FunctionName: 'Xem danh sách đơn hàng',
                FunctionId: 5
            },
            {
                FunctionName: 'Đặt hàng',
                FunctionId: 6
            },
            {
                FunctionName: 'Xem chi tiết đơn hàng',
                FunctionId: 7
            },
            {
                FunctionName: 'Hủy đơn hàng',
                FunctionId: 8
            }
        ],
        2: [
            {
                FunctionName: 'Xem danh sách đơn hàng',
                FunctionId: 9
            },
            {
                FunctionName: 'Đặt hàng',
                FunctionId: 10
            },
            {
                FunctionName: 'Xem chi tiết đơn hàng',
                FunctionId: 11
            },
            {
                FunctionName: 'Hủy đơn hàng',
                FunctionId: 12
            }
        ]

    },
    3: {
        1: [
            {
                FunctionName: 'Xem danh sách đơn hàng',
                FunctionId: 13
            },
            {
                FunctionName: 'Xem chi tiết đơn hàng',
                FunctionId: 14
            },           
            {
                FunctionName: 'Duyệt đơn hàng',
                FunctionId: 16
            },
            {
                FunctionName: 'Xem báo cáo',
                FunctionId: 15
            },
            {
                FunctionName: 'Tải báo cáo',
                FunctionId: 17
            }
        ],
        2: [
                {
                    FunctionName: 'Xem danh sách đơn hàng',
                    FunctionId: 18
                },
                {
                    FunctionName: 'Xem chi tiết đơn hàng',
                    FunctionId: 19
                },              
                {
                    FunctionName: 'Duyệt đơn hàng',
                    FunctionId: 21
                },
                {
                    FunctionName: 'Xem báo cáo',
                    FunctionId: 20
                },
                {
                    FunctionName: 'Tải báo cáo',
                    FunctionId: 22
                }
        ]
    },
    4: {
        1: [
            {
                FunctionName: 'Quản lý giá',
                FunctionId: 23
            },
            {
                FunctionName: 'Quản lý tài khoản',
                FunctionId: 24
            },
            {
                FunctionName: 'Quản lý đại lí',
                FunctionId: 25
            },
            {
                FunctionName: 'Quản lý sale',
                FunctionId: 26
            },
            {
                FunctionName: 'Quản lý SC',
                FunctionId: 27
            }
        ]

    }
    })

.constant('ORDER_STATUS', {
    ALL: 0,
    PENDING: 1,
    SUCCESS: 2,
    REJECT: 3,
    DELIVERED: 5,
    EXPIRED: 6,
    CANCEL: 4

})

.constant('PRODUCT_LINE_ID', {
    HEO: 1,
    GA: 3,
    VIT: 4,
    BO: 2
})

.constant('NETWORK', {
    //BASE_URL: 'http://server-masanbak.rhcloud.com',
    BASE_URL: 'http://server-masan.rhcloud.com'
})

.constant('TIMER', {
    AUTO_UPDATE: (60000 * 2),
    TIME_OUT: 60000
})
.constant('ROLE_2_NAME',
    {
        1: {
            1: 'Dealer'
        },
        2: {
            1: 'Sale',
            2: 'Sale',
            3: 'Sale',
            4: 'Sale',
            5: 'Sale'
        },
        3: {
            1: 'SC',
            2: 'SC'
        },
        4: {
            1: 'Admin',
            2: 'Admin'
        }
    }
)
.constant('ALLOWED_ROLE',
    [
        {
            RoleName: 'Dealer',
            RoleId: 1,
            Level: 0
        },
        {
            RoleName: 'Sale',
            RoleId: 2,
            Level: 0
        },
        {
            RoleName: 'SC',
            RoleId: 3,
            Level: 0
        },
        //{
        //    RoleName: 'SC Sup (Management)',
        //    RoleId: 3,
        //    Level: 2
        //},
        {
            RoleName: 'Admin',
            RoleId: 4,
            Level: 0
        }
    ]
);

