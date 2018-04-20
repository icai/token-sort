# Token(ize) Sort

[![Greenkeeper badge](https://badges.greenkeeper.io/icai/token-sort.svg)](https://greenkeeper.io/)

[![npm](https://img.shields.io/npm/v/token-sort.svg)](https://www.npmjs.org/package/token-sort)
[![npm](https://img.shields.io/npm/dm/token-sort.svg)](https://www.npmjs.org/package/token-sort)
[![Build Status](https://travis-ci.org/icai/token-sort.svg?branch=master)](https://travis-ci.org/icai/token-sort)
[![GitHub issues](https://img.shields.io/github/issues-closed/icai/token-sort.svg)](https://github.com/icai/token-sort/issues)
[![GitHub contributors](https://img.shields.io/github/contributors/icai/token-sort.svg)](https://github.com/icai/token-sort/graphs/contributors)
[![David](https://img.shields.io/david/icai/token-sort.svg)](https://david-dm.org/icai/token-sort)
[![David Dev](https://img.shields.io/david/dev/icai/token-sort.svg)](https://david-dm.org/icai/token-sort?type=dev)
[![DUB](https://img.shields.io/dub/l/vibe-d.svg)](https://github.com/icai/token-sort/blob/master/LICENSE)

<!-- [![Coveralls](https://img.shields.io/coveralls/icai/token-sort.svg)](https://coveralls.io/github/icai/token-sort?branch=master) -->

> make sort more humane.

Token(ize) Sort for Array, for human, current project  https://github.com/icai/token-sort.

## OverView

title sort, title sort, 1,10,23456789, 😑

![](https://raw.githubusercontent.com/icai/token-sort/master/error.png?goodluck)

🤔, may be better.

## Usage


### Install

```bash
npm install token-sort --save
```

### Options

1. Overview

```javascript
tokenSort(arr[,setting])

@setting
{
  field: String:'sort field for arr item'
  order: String: ['asc', 'desc']
  tokens: Object[Array][RegExp:String]: 'custom tokens'
}

@tokens {
    @exmaple
    number: [
      "[\\d.]+",
      "['零一二三四五六七八九十百千万亿']+",
    ]
}
```

2. Use Short

```javascript
tokenSort(arr[,field][,order])

@exmaple
tokenSort(arr, 'title') // field
tokenSort(arr, 'asc') // order
tokenSort(arr, 'title', 'asc') // field and order

```

3. Sort by weight

```javascript
@exmaple
 let arr =[{
    title: '第四章',
  }, {
    title: '第一章',
  }, {
    title: '第二章',
  },{
    title: '第七章last',
    _score: 0.3
  },{
    title: '第七章top',
    _score: 0.4
  }];

  tokenSort(arr, 'title')
  // Output [
  // {"title":"第一章"},
  // {"title":"第二章"},
  // {"title":"第四章"},
  // {"title":"第七章top","_score":0.4},
  // {"title":"第七章last","_score":0.3}
  // ]
```

### Demo

```javascript
const tokenSort = require('token-sort');

// Object::Array
let arr = [{
  title: '第四章'
},{
  title: '第一章',
}, {
  title: '第二章'
}];
tokenSort(arr, {
  field: 'title'
})
// equal to:
tokenSort(arr, 'title');

// String::Array
let longshort = [
  "第1章 课程3总结",
  "第1章 课程2概要分类",
  "第1章 课程1概要",
]
tokenSort(longshort);

```

If you need to see more demos, please checkout the unit tests.

-EOF

Happy 2018.

## License

Copyright (c) 2018 Terry Cai. Licensed under the MIT license.
