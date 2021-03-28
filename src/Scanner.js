/**
 * 扫描器类
 * 
 */
export default class Scanner {
  constructor(templateStr) {
    console.log('我是scanner=', templateStr);
    // 将模板字符串写到实例中
    this.templateStr = templateStr
    // 指针
    this.pos = 0
    // 尾巴 一开始就是模板字符串的原文
    this.tail = templateStr
  }
  // 功能弱，就是走过指定内容 ，没有返回值
  scan(tag) {
    if (this.tail.indexOf(tag) == 0) {
      // tag有多长，比如{{长度为2，就让指针后移多少位
      this.pos += tag.length;
      // 尾巴也要变， 改变尾巴，从当前指针这个字符开始，到最后全部字符
      this.tail = this.templateStr.substring(this.pos)
    }
  }
  // 让指针进行扫描，直到遇见内容结束，并且能够返回结束之前路过的文字
  scanUntil(stopTag) {
    // 记录一下执行方法的时候pos值
    const pos_backup = this.pos;
    // 当尾巴不是stopTag的时候，就说明还没有扫描到stopTag
    // 这里的&& 防止找不到那么寻找到最后也要停止下来，死循环
    while (!this.eos() && this.tail.indexOf(stopTag) !== 0) {
      this.pos++;
      // 改变尾巴，从当前指针这个字符开始，到最后全部字符
      this.tail = this.templateStr.substring(this.pos)
    }
    return this.templateStr.substring(pos_backup, this.pos)
  }

  // eos 指针是否已经到头，返回布尔值 end of string
  eos(){
    return this.pos >= this.templateStr.length
  }
}