'use strict';
const assert = require('assert');
const { tokenSort, tokenize } = require('../lib/index');
const { describe, it } = require('mocha');

const examples = {
  title: [{
    title: '第四章'
  },{
    title: '第一章',
  }, {
    title: '第二章'
  }],
  courses:  [
  "爬虫源码2.zip",
  "爬虫源码1.zip",
  "第9章 scrapy-redis分布式爬虫",
  "第8章 scrapy进阶开发",
  "第7章 Scrapy突破反爬虫的限制",
  "第6章 通过CrawlSpider对招聘网站进行整站爬取",
  "第5章 scrapy爬去知名问答网站",
  "第4章 scrapy爬取知名技术文章网站",
  "第3章 爬虫基础知识回顾",
  "第2章 windows下搭建开发环境",
  "第1章 课程介绍",
  "第13章 课程总结",
  "第12章 scrapyd部署scrapy爬虫",
  "第11章 django搭建搜索网站",
  "第10章 elasticsearch搜索引擎的使用"
 ],
  lua: [
  "1 – Introduction",
  "2 – Basic Concepts",
  "3 – The Language",
  "2.1 – Values and Types",
  "2.2 – Environments and the Global Environment",
  "2.3 – Error Handling",
  "2.4 – Metatables and Metamethods",
  "2.5 – Garbage Collection",
  "2.5.1 – Garbage-Collection Metamethods",
  "2.5.2 – Weak Tables",
  "2.6 – Coroutines",
  // "3.1 – Lexical Conventions",
  "3.2 – Variables",
  "3.3 – Statements",
  "3.3.1 – Blocks",
  "3.3.2 – Chunks",
  "3.3.3 – Assignment",
  "3.3.4 – Control Structures",
  "3.3.5 – For Statement",
  "3.3.6 – Function Calls as Statements",
  "3.3.7 – Local Declarations",
  "3.4 – Expressions",
  "3.4.1 – Arithmetic Operators",
  "3.4.2 – Bitwise Operators",
  "3.4.3 – Coercions and Conversions",
  "3.4.4 – Relational Operators",
  "3.4.5 – Logical Operators",
  "3.4.6 – Concatenation",
  "3.4.7 – The Length Operator",
  "3.4.8 – Precedence",
  "3.1 – Lexical Conventions"
  ],
  longshort: [
  "第1章 课程3总结",
  "第1章 课程2概要分类",
  "第1章 课程1概要",
  ],
  score: [{
    title: '第四章',
    _score: 0.6
  }, {
    title: '第一章',
    _score: 0.2
  }, {
    title: '第二章',
    _score: 0.3
  }],
  scoreAvailable: [{
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
  }],
  scoreAvailable2: [{
    title: '第四章',
  }, {
    title: '第一章',
    _score: 0.4
  }, {
    title: '第一章',
    _score: 0.3
  }, {
    title: '第二章',
  }, {
    title: '第七章last',
    _score: 0.3
  }, {
    title: '第七章top',
    _score: 0.4
  }],
  titleCustomToken: [{
    title: '第四章'
  }, {
    title: '第一章',
  }, {
    title: '第二章'
  }, {
    title: '第一亿一章'
  }],

};


describe('tokenize string', function () {
  it('tokenize length compare', function () {
    let t = '第一章';
    assert.equal(3, tokenize(t).length);
  });

  it('tokenize compare chinese Numbers', function () {
    let t = '第十一章';
    assert.equal(3, tokenize(t).length);
  });

  it('tokenize compare large chinese Numbers', function () {
    let t = '第一千零一章';
    assert.equal(3, tokenize(t).length);
  });


  it('tokenize compare large chinese Numbers is not included 亿', function () {
    let t = '第一亿一章';
    assert.notEqual(3, tokenize(t).length);
  });

  it('tokenize with digital number', function () {
    let t = '第 10 章';
    assert.equal(5, tokenize(t).length);
  });

  it('tokenize with digital number', function () {
    let t = '第 10 章';
    assert.equal(5, tokenize(t).length);
  });

});


describe('tokenSort arr', function () {
  it('tokenSort match compare', function () {
    let nArr = tokenSort(examples.title, 'title');
    assert.equal('第四章', nArr[2].title);
  });

  it('tokenSort title match compare', function () {
    let nArr = tokenSort(examples.courses);
    assert.ok(!!~nArr[nArr.length - 1].indexOf('课程总结'));
  });

  it('tokenSort title match compare reverse', function () {
    let nArr = tokenSort(examples.courses, 'desc');
    assert.ok(!!~nArr[0].indexOf('课程总结'));
  });

  it('tokenSort title match dot dot compare', function () {
    let nArr = tokenSort(examples.lua);
    assert.ok(!!~nArr[nArr.length - 1].indexOf('Precedence'));
  });

  it('tokenSort title long short compare', function () {
    let nArr = tokenSort(examples.longshort);
    assert.ok(nArr[0] == '第1章 课程1概要');
  });

  it('tokenSort title long short compare', function () {
    let nArr = tokenSort(examples.longshort);
    assert.ok(nArr[0] == '第1章 课程1概要');
  });

});

describe('tokenSort arr with score', function () {
  it('tokenSort match compare with _score field', function () {
    let nArr = tokenSort(examples.score, 'title');
    assert.equal('第一章', nArr[2].title);
  });

  it('tokenSort match compare with _score field is available', function () {
    let nArr = tokenSort(examples.scoreAvailable, 'title');
    assert.equal('第七章last', nArr[nArr.length -1].title);
  });

  it('tokenSort match compare with _score field is available2', function () {
    let nArr = tokenSort(examples.scoreAvailable2, 'title');
    assert.equal('第一章', nArr[0].title);
    assert.notEqual(0.3, nArr[0]._score); // 0.4
  });
});

describe('custom tokenize string', function () {

  it('tokenize compare large chinese Numbers is included 亿, use tokens params', function () {
    let t = '第一亿一章';
    assert.equal(3, tokenize(t, {
      number: [
        "[\\d.]+",
        "[零一二三四五六七八九十百千万亿]+",
      ]
    }).length);
  });

  it('tokenize compare large chinese Numbers is included 亿, use tokens params', function () {
    let t = '第一亿一章';
    let nArr = tokenSort(examples.titleCustomToken, {
      tokens: {
        number: [
          "[\\d.]+",
          "[零一二三四五六七八九十百千万亿]+",
        ]
      }
    });
    assert.equal(t, nArr[nArr.length - 1].title);
  });


  it('tokenize compare large chinese Numbers is included 亿, use setupTokens', function () {
    let t = '第一亿一章';
    tokenSort.setupTokens({
      number: [
        "[\\d.]+",
        "[零一二三四五六七八九十百千万亿]+",
      ]
    })
    let nArr = tokenSort(examples.titleCustomToken, {
      field: 'title'
    });
    assert.equal(t, nArr[nArr.length - 1].title);
  });
});



