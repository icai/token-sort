'use strict';
const chineseInt = require('chinese-parseint');
const { isObject,
  isZhNumber,
  isNumber,
  isVersion,
  isNull,
  copyTo,
  versionCompare } = require('./util');
const defaultTokens = {
  number: [
    "[\\d.]+",
    "['零一二三四五六七八九十百千万']+",
  ],
  splits: [
    '\\(', '\\)',
    '\\{', '\\}',
    '"', '\'',
    '\\n', '\\s+',
    ',', '、' // '\\.',
  ]
}

function tokenize(code, ts) {
  ts = ts || defaultTokens;
  let strs = Object.values(ts).map(item => item.join('|')).join('|'),
    regex = new RegExp(strs, 'mg'),
    tokens = [],
    pos = 0;
  for (let matches; matches = regex.exec(code); pos = regex.lastIndex) {
    let match = matches[0],
      matchStart = regex.lastIndex - match.length;
    if (pos < matchStart)
      tokens.push(code.substring(pos, matchStart));
    tokens.push(match);
  }
  if (pos < code.length)
    tokens.push(code.substring(pos));
  return tokens;
}

function tokenSort(arr, field, order) {
  let tokens;
  if (isObject(field)) {
    order = field.order;
    tokens = field.tokens;
    field = field.field;
  }
  if (!field) {
    field = false;
    order = 'asc';
  }
  if (order == undefined && (field == 'asc' || field == 'desc')) {
    order = field;
    field = false;
  }
  let down = 1;
  let up = -1;
  let reverse = order == 'desc';
  if (reverse) {
    up = 1;
    down = -1;
  }
  let reverseScore = function (v) {
    return v == 0 ? 0 : v == 1 ? -1 : 1
  }
  let indexs = [];
  for (let i = 0; i < arr.length; i++) {
    let value = field ? arr[i][field] : arr[i];
    indexs[i] = {
      index: i,
      value: value,
      item: arr[i],
      score: arr[i]._score || 0,
      tokens: tokenize(value, tokens)
    }
  }
  indexs = indexs.sort(function (a, b) {
    // use score first, if exist
    if (a.score && b.score) {
      // score bigger is up
      if (a.score < b.score) return down;
      if (a.score > b.score) return up;
    }
    if (a.tokens) {
      for (let i = 0; i < a.tokens.length; i++) {
        let toa = a.tokens[i];
        let tob = b.tokens[i];
        let nullA = isNull(toa) || toa === "";
        let nullB = isNull(tob) || tob === "";
        if (nullA) return 0;
        if (nullB) return down;

        if (toa == tob && i != a.tokens.length - 1) {
          continue;
        }
        if (isVersion(toa) && isVersion(tob)) {
          let vc = versionCompare(toa, tob);
          if (vc == 0 && i != a.tokens.length - 1) {
            continue;
          } else {
            if (reverse) {
              return reverseScore(vc);
            } else {
              return vc;
            }
          }
        }
        if (isZhNumber(toa) && isZhNumber(tob)) {
          toa = chineseInt(toa);
          tob = chineseInt(tob);
        }
        if (isNumber(toa)) toa = parseFloat(toa);
        if (isNumber(tob)) tob = parseFloat(tob);
        if (toa > tob) return down;
        if (toa < tob) return up;
        return 0;
      }
    } else {
      return up;
    }
  })
  let ss = indexs.map(path => path.item);
  // if (reverse) return ss.reverse();
  return ss;
}
tokenSort.setupTokens = function (obj) {
  copyTo(defaultTokens, obj || {});
}

module.exports = {
  tokenSort,
  tokenize
}
