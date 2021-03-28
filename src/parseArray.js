/**
 * 
 * 处理数组，结合renderTemplate实现递归
 * 注意 函数接收的是 token 而不是tokens 
 * token 就是简单的  ['#', 'xxx',[]]
 * 这个函数要递归调用renderTemplate 函数 调用多少次 取决于 data 决定
 * {
      arr:[
        {name:'fqniu',age:'25',sex:'boy',hobbise:['游泳','健身']},
        {name:'fqniu',age:'25',sex:'boy',hobbise:['游泳','健身']},
      ]
    }
    那么parseArray 函数就要调用renderTemplate 函数 2次 因为data数组长度为 2
 * 
*/
import lookup from './lookup'
import renderTemplate from './renderTemplate';

export default function parseArray(token, data) {
  // console.log(token, data);
  // 得到整体数据中这个数组要使用的部分
  var v = lookup(data, token[1])
  // console.log('v=',v);
  var resultStr = ''
  // 遍历v数组，v 一定是数组
  // 注意这个循环 是最难想到的 是遍历数据，不是遍历tokens， 数组中的数据有几个，就是遍历几条
  for (let i = 0; i < v.length; i++) {
    // 这里要补充一个 . 的 属性 先添加一个. 属性 然后再展开
    resultStr += renderTemplate(token[2], {
      ...v[i],
      '.':v[i],
    })
  }
  return resultStr
}