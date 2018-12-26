import Mock from 'mockjs';
let Tree = [{
        "id": 1,
        "label": "第一章 Java开发环境的搭建",
        "children": [{ "id": 1, "label": "1.1 jdk的环境搭建", "children": null,"videoId":null },
            { "id": 2, "label": "1.2 JVM是什么", "children": null,"videoId":null }
        ]
    },
    {
        "id": 2,
        "label": "第二章 Java语言基础",
        "children": [{ "id": 3, "label": "2.1 Java常用数据类型", "children": null,"videoId":null }]
    }
];
export { Tree };