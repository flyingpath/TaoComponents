const data = [
    {
        "name": "戴文彬",
        "empno": "001961",
        "dept": "資訊部",
        "title": "主任",
        "level": 1,
        "path": "/003989/001961",
        "phone": "3453",
        "schedule": {
            "on": "201804260830",
            "off": "201804261730"
        },
        "rest": {
            "isRest": false,
            "start": null,
            "end": null
        },
        "isWorkTime": true,
        "online": {
            "isOnline": true,
            "cardTime": "201804261043"
        }
    },
    {
        "name": "林俊偉",
        "empno": "002057",
        "dept": "資訊部",
        "title": "主任",
        "level": 1,
        "path": "/003989/002057",
        "phone": "3450",
        "schedule": {
            "on": "201804260800",
            "off": "201804261700"
        },
        "rest": {
            "isRest": false,
            "start": null,
            "end": null
        },
        "isWorkTime": true,
        "online": {
            "isOnline": true,
            "cardTime": "201804260741"
        }
    },
    {
        "name": "張苑蕙",
        "empno": "001497",
        "dept": "資訊部軟體組",
        "title": "主任",
        "level": 1,
        "path": "/003989/001497",
        "phone": "3460",
        "schedule": {
            "on": "201804260830",
            "off": "201804261730"
        },
        "rest": {
            "isRest": false,
            "start": null,
            "end": null
        },
        "isWorkTime": true,
        "online": {
            "isOnline": true,
            "cardTime": "201804260842"
        }
    },
    {
        "name": "黃林輝",
        "empno": "003549",
        "dept": "資訊部軟體組",
        "title": "主任",
        "level": 1,
        "path": "/003989/003549",
        "phone": "3480",
        "schedule": {
            "on": "201804260800",
            "off": "201804261700"
        },
        "rest": {
            "isRest": true,
            "start": "201804260800",
            "end": "201804261700"
        },
        "isWorkTime": true,
        "online": {
            "isOnline": false,
            "cardTime": null
        }
    },
    {
        "name": "蕭如芬",
        "empno": "001841",
        "dept": "資訊部軟體組",
        "title": "主任",
        "level": 2,
        "path": "/003989/001497/001841",
        "phone": "3464",
        "schedule": {
            "on": "201804260800",
            "off": "201804261700"
        },
        "rest": {
            "isRest": false,
            "start": null,
            "end": null
        },
        "isWorkTime": true,
        "online": {
            "isOnline": true,
            "cardTime": "201804260746"
        }
    },
    {
        "name": "劉琮瑋",
        "empno": "002044",
        "dept": "資訊部軟體組",
        "title": "主任",
        "level": 2,
        "path": "/003989/001497/002044",
        "phone": "3465",
        "schedule": {
            "on": "201804260830",
            "off": "201804261730"
        },
        "rest": {
            "isRest": false,
            "start": null,
            "end": null
        },
        "isWorkTime": true,
        "online": {
            "isOnline": true,
            "cardTime": "201804260814"
        }
    },
    {
        "name": "吳偉任",
        "empno": "002577",
        "dept": "資訊部軟體組",
        "title": "主任",
        "level": 1,
        "path": "/003989/002577",
        "phone": "3470",
        "schedule": {
            "on": "201804260830",
            "off": "201804261730"
        },
        "rest": {
            "isRest": false,
            "start": null,
            "end": null
        },
        "isWorkTime": true,
        "online": {
            "isOnline": true,
            "cardTime": "201804260827"
        }
    },
    {
        "name": "何勝安",
        "empno": "002669",
        "dept": "資訊部軟體組",
        "title": "主任",
        "level": 2,
        "path": "/003989/001497/002669",
        "phone": "3461",
        "schedule": {
            "on": "201804260830",
            "off": "201804261730"
        },
        "rest": {
            "isRest": false,
            "start": null,
            "end": null
        },
        "isWorkTime": true,
        "online": {
            "isOnline": true,
            "cardTime": "201804260815"
        }
    },
    {
        "name": "李亞璇",
        "empno": "003767",
        "dept": "資訊部軟體組",
        "title": "主任",
        "level": 2,
        "path": "/003989/002577/003767",
        "phone": "3473",
        "schedule": {
            "on": "201804260800",
            "off": "201804261700"
        },
        "rest": {
            "isRest": false,
            "start": null,
            "end": null
        },
        "isWorkTime": true,
        "online": {
            "isOnline": true,
            "cardTime": "201804260755"
        }
    },
    {
        "name": "陳文君",
        "empno": "003049",
        "dept": "資訊部軟體組",
        "title": "主任",
        "level": 2,
        "path": "/003989/002577/003049",
        "phone": "3472",
        "schedule": {
            "on": "201804260930",
            "off": "201804261830"
        },
        "rest": {
            "isRest": false,
            "start": null,
            "end": null
        },
        "isWorkTime": true,
        "online": {
            "isOnline": true,
            "cardTime": "201804260923"
        }
    },
    {
        "name": "王怜雅",
        "empno": "003056",
        "dept": "資訊部軟體組",
        "title": "主任",
        "level": 2,
        "path": "/003989/003549/003056",
        "phone": "3481",
        "schedule": {
            "on": "201804260800",
            "off": "201804261700"
        },
        "rest": {
            "isRest": false,
            "start": null,
            "end": null
        },
        "isWorkTime": true,
        "online": {
            "isOnline": true,
            "cardTime": "201804260830"
        }
    },
    {
        "name": "李曉茜",
        "empno": "003704",
        "dept": "資訊部軟體組",
        "title": "主任",
        "level": 2,
        "path": "/003989/002577/003704",
        "phone": "3471",
        "schedule": {
            "on": "201804260800",
            "off": "201804261700"
        },
        "rest": {
            "isRest": false,
            "start": null,
            "end": null
        },
        "isWorkTime": true,
        "online": {
            "isOnline": true,
            "cardTime": "201804260753"
        }
    },
    {
        "name": "楊書昇",
        "empno": "003890",
        "dept": "資訊部軟體組",
        "title": "主任",
        "level": 2,
        "path": "/003989/001497/003890",
        "phone": "3462",
        "schedule": {
            "on": "201804260800",
            "off": "201804261700"
        },
        "rest": {
            "isRest": false,
            "start": null,
            "end": null
        },
        "isWorkTime": true,
        "online": {
            "isOnline": true,
            "cardTime": "201804260756"
        }
    },
    {
        "name": "賴韋伶",
        "empno": "004032",
        "dept": "資訊部軟體組",
        "title": "主任",
        "level": 2,
        "path": "/003989/001497/004032",
        "phone": "3463",
        "schedule": {
            "on": "201804260830",
            "off": "201804261730"
        },
        "rest": {
            "isRest": false,
            "start": null,
            "end": null
        },
        "isWorkTime": true,
        "online": {
            "isOnline": true,
            "cardTime": "201804260829"
        }
    },
    {
        "name": "盧伯融",
        "empno": "004053",
        "dept": "資訊部軟體組",
        "title": "主任",
        "level": 2,
        "path": "/003989/002577/004053",
        "phone": "3474",
        "schedule": {
            "on": "201804260830",
            "off": "201804261730"
        },
        "rest": {
            "isRest": false,
            "start": null,
            "end": null
        },
        "isWorkTime": true,
        "online": {
            "isOnline": true,
            "cardTime": "201804260818"
        }
    },
    {
        "name": "李泓哲",
        "empno": "004054",
        "dept": "資訊部軟體組",
        "title": "主任",
        "level": 2,
        "path": "/003989/001497/004054",
        "phone": "3468",
        "schedule": {
            "on": "201804260730",
            "off": "201804261630"
        },
        "rest": {
            "isRest": false,
            "start": null,
            "end": null
        },
        "isWorkTime": true,
        "online": {
            "isOnline": true,
            "cardTime": "201804260739"
        }
    },
    {
        "name": "林奕圻",
        "empno": "004100",
        "dept": "資訊部軟體組",
        "title": "主任",
        "level": 2,
        "path": "/003989/003549/004100",
        "phone": "3484",
        "schedule": {
            "on": "201804260730",
            "off": "201804261630"
        },
        "rest": {
            "isRest": false,
            "start": null,
            "end": null
        },
        "isWorkTime": true,
        "online": {
            "isOnline": true,
            "cardTime": "201804260718"
        }
    },
    {
        "name": "蔡可軒",
        "empno": "004108",
        "dept": "資訊部軟體組",
        "title": "主任",
        "level": 1,
        "path": "/003989/004108",
        "phone": "3467",
        "schedule": {
            "on": "201804260830",
            "off": "201804261730"
        },
        "rest": {
            "isRest": true,
            "start": "201804261300",
            "end": "201804261730"
        },
        "isWorkTime": true,
        "online": {
            "isOnline": true,
            "cardTime": "201804261201"
        }
    },
    {
        "name": "薛文楷",
        "empno": "004134",
        "dept": "資訊部軟體組",
        "title": "主任",
        "level": 2,
        "path": "/003989/003549/004134",
        "phone": "3482",
        "schedule": {
            "on": "201804260800",
            "off": "201804261700"
        },
        "rest": {
            "isRest": false,
            "start": null,
            "end": null
        },
        "isWorkTime": true,
        "online": {
            "isOnline": true,
            "cardTime": "201804260730"
        }
    },
    {
        "name": "黃泰順",
        "empno": "004143",
        "dept": "資訊部軟體組",
        "title": "主任",
        "level": 1,
        "path": "/003989/004143",
        "phone": "3483",
        "schedule": {
            "on": "201804260830",
            "off": "201804261730"
        },
        "rest": {
            "isRest": false,
            "start": null,
            "end": null
        },
        "isWorkTime": true,
        "online": {
            "isOnline": false,
            "cardTime": null
        }
    },
    {
        "name": "王傳道",
        "empno": "004156",
        "dept": "資訊部軟體組",
        "title": "主任",
        "level": 2,
        "path": "/003989/001497/004156",
        "phone": "3466",
        "schedule": {
            "on": "201804260930",
            "off": "201804261830"
        },
        "rest": {
            "isRest": false,
            "start": null,
            "end": null
        },
        "isWorkTime": true,
        "online": {
            "isOnline": true,
            "cardTime": "201804260928"
        }
    },
    {
        "name": "鄧暐翰",
        "empno": "004198",
        "dept": "資訊部軟體組",
        "title": "主任",
        "level": 2,
        "path": "/003989/003549/004198",
        "phone": "3485",
        "schedule": {
            "on": "201804260830",
            "off": "201804261700"
        },
        "rest": {
            "isRest": false,
            "start": null,
            "end": null
        },
        "isWorkTime": true,
        "online": {
            "isOnline": true,
            "cardTime": "201804260828"
        }
    },
    {
        "name": "林宗彥",
        "empno": "003422",
        "dept": "資訊部硬體組",
        "title": "主任",
        "level": 1,
        "path": "/003989/003422",
        "phone": "3490",
        "schedule": {
            "on": "201804260800",
            "off": "201804261630"
        },
        "rest": {
            "isRest": false,
            "start": null,
            "end": null
        },
        "isWorkTime": true,
        "online": {
            "isOnline": true,
            "cardTime": "201804260742"
        }
    },
    {
        "name": "張毓斌",
        "empno": "002000",
        "dept": "資訊部硬體組",
        "title": "主任",
        "level": 2,
        "path": "/003989/003422/002000",
        "phone": "3491",
        "schedule": {
            "on": "201804260830",
            "off": "201804261700"
        },
        "rest": {
            "isRest": true,
            "start": "201804260830",
            "end": "201804261700"
        },
        "isWorkTime": true,
        "online": {
            "isOnline": false,
            "cardTime": null
        }
    },
    {
        "name": "游騰驥",
        "empno": "002609",
        "dept": "資訊部硬體組",
        "title": "主任",
        "level": 2,
        "path": "/003989/003422/002609",
        "phone": "3492",
        "schedule": {
            "on": "201804260830",
            "off": "201804261700"
        },
        "rest": {
            "isRest": false,
            "start": null,
            "end": null
        },
        "isWorkTime": true,
        "online": {
            "isOnline": true,
            "cardTime": "201804260823"
        }
    },
    {
        "name": "郭柏良",
        "empno": "003592",
        "dept": "資訊部硬體組",
        "title": "主任",
        "level": 2,
        "path": "/003989/003422/003592",
        "phone": "3493",
        "schedule": {
            "on": "201804260800",
            "off": "201804261630"
        },
        "rest": {
            "isRest": false,
            "start": null,
            "end": null
        },
        "isWorkTime": true,
        "online": {
            "isOnline": true,
            "cardTime": "201804260748"
        }
    },
    {
        "name": "陳訓",
        "empno": "003109",
        "dept": "資訊部硬體組",
        "title": "主任",
        "level": 2,
        "path": "/003989/003422/003109",
        "phone": "3494",
        "schedule": {
            "on": "201804260830",
            "off": "201804261700"
        },
        "rest": {
            "isRest": true,
            "start": "201804260830",
            "end": "201804261700"
        },
        "isWorkTime": true,
        "online": {
            "isOnline": false,
            "cardTime": null
        }
    },
    {
        "name": "張育農",
        "empno": "003851",
        "dept": "資訊部硬體組",
        "title": "主任",
        "level": 2,
        "path": "/003989/003422/003851",
        "phone": "3495",
        "schedule": {
            "on": "201804260900",
            "off": "201804261730"
        },
        "rest": {
            "isRest": false,
            "start": null,
            "end": null
        },
        "isWorkTime": true,
        "online": {
            "isOnline": true,
            "cardTime": "201804260851"
        }
    }
]

export default testData