// alert('123')
// import * as test from './test.js'
// test.test()
import Scanner from './Scanner';
import parseTemplateToToken from './parseTemplateToToken';
import renderTemplate from './renderTemplate';
// import lookup from './lookup'

window.mt_templateEngine = {
  render(templateStr, data){
    // 调用 parseTemplateToToken 让模板字符串变为tokens数组
    var tokens = parseTemplateToToken(templateStr)
    // 调用renderTemplate 函数，让token数组变为dom字符串
    var domStr = renderTemplate(tokens, data)
    return domStr
  }
}