'use strict';
const isObject = (val) => {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}

const isZhNumber = (str) =>{
  return /['零一二三四五六七八九十百千万']+/.test(str)
}

const isNumber = (value) => {
  return !isNaN(value);
}

const isVersion = (value) => {
  return /[\d.]+/.test(value)
}

const isNull = (value) => {
  return value === null || value === undefined;
}

const copyTo = (to, from) => {
  if (to && from) {
    for (var p in from) {
      to[p] = from[p];
    }
  }
  return to;
}

const versionCompare = (a, b) => {
  let pa = a.split('.');
  let pb = b.split('.');
  let max = Math.max(pa.length, pb.length);
  if (pa.length < max) {
    for (let i = 0; i < max - pa.length; i++) {
      pa.push('0')
    }
  }
  if (pb.length < max) {
    for (let i = 0; i < max - pb.length; i++) {
      pb.push('0')
    }
  }
  for (let i = 0; i < max; i++) {
    let na = Number(pa[i]);
    let nb = Number(pb[i]);
    if (na > nb) return 1;
    if (nb > na) return -1;
    if (!isNaN(na) && isNaN(nb)) return 1;
    if (isNaN(na) && !isNaN(nb)) return -1;
  }
  return 0;
}

const ObjectValue = obj => Object.keys(obj).map(i => obj[i])

module.exports = {
  isObject,
  isZhNumber,
  isNumber,
  isVersion,
  isNull,
  copyTo,
  versionCompare,
  ObjectValue
}
