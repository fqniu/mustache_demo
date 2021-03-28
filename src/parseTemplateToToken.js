import Scanner from './Scanner'
import nestTokens from './nestTokens'
/**
 * 将模板字符串变为tokens数组
 */

export default function parseTemplateToToken(templateStr) {
  var tokens = []
  // 创建扫描器
  var scanner = new Scanner(templateStr)
  var words
  // 扫描器工作
  while (!scanner.eos()) {
    // 收集开始标记出现之前的文字
    words = scanner.scanUntil('{{')
    // 判断是否为空的情况
    if (words !== '') {
      // 尝试写一下去掉空格，智能判断是普通文字的空格，还是标签中的空格
      // 标签中的空格不能去掉，比如<div class="xxx"></div>中的空格不能去掉
      // 是否是尖角号
      let isInjjh = false;
      // 空白字符串
      let _words = '';
      for (let i = 0; i < words.length; i++) {
        // 判断是否在标签内
        if (words[i] == '<') {
          isInjjh = true;
        } else if (words[i] == '>') {
          isInjjh = false;
        }
        // 如果不是空格，拼接上
        if (!/\s/.test(words[i])) {
          _words += words[i];
        } else {
          // 如果是空格，只有当他的标签内的时候，才拼接上
          if (isInjjh) {
            _words += ' ';
          }
        }
      }
      // 存起来 去掉空格
      tokens.push(['text', _words])
    }
    // 过双大括号
    scanner.scan('{{')
    // 收集开始标记出现之前的文字
    words = scanner.scanUntil('}}')
    // 判断是否为空的情况
    if (words !== '') {
      // 这个words就是{{}}中间的东西，判断一下首字符
      if (words[0] == '#') {
        // 存起来，从下标为1的开始存，因为下标为0的是 #
        tokens.push(['#', words.substring(1)])
      } else if (words[0] == '/') {
        // 存起来，从下标为1的开始存，因为下标为0的是 /
        tokens.push(['/', words.substring(1)])
      } else {
        // 存起来
        tokens.push(['name', words])
      }
    }
    // 过双大括号
    scanner.scan('}}')
  }
  // 返回折叠后的tokens
  return nestTokens(tokens)
}