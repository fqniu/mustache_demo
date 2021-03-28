/**
 *  函数的功能是让tokens 数组变为dom字符串
 * 
 */
import lookup from './lookup'
import parseArray from './parseArray'

export default function renderTemplate(tokens, data) {
  // console.log(tokens, data);
  // 结果字符串
  var resultStr = ''
  // 循环tokens
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i]
    // 看类型
    if (token[0] == 'text') {
      // 拼起来
      resultStr += token[1]
    } else if (token[0] == 'name') {
      // 如果是name 类型 直接使用它的值 当然要用lookup函数 防止a.b.c形式取值为 undefined
      resultStr += lookup(data, token[1])  
    }else if (token[0] == '#') {
      // # 标记的tokens 需要递归处理 它的下标为2的数组
      resultStr += parseArray(token, data)
    }
  }
  return resultStr;
}