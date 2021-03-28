/**
 * nestTokens 函数是用于折叠tokens 
 * 将 # 和 / 之间的tokens整合起来，作为下标为3的项
 * 
 */ 
export default function nestTokens(tokens) {
  // 结果数组
  var nestedTokens = [];
  // 栈结构 存放小tokens ，栈顶(靠近端口的，最新进入的) 的tokens数组中当前操作的这个tokens小数组
  var sections = []
  // console.log(tokens);
  // 收集器 天生指向 nestedTokens结果数组，引用类型值，指向同一个数组
  // 注意 收集器指向会变化 当遇见 # 收集器会指向这个token下标为2的新数组
  var collector = nestedTokens

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    switch (token[0]) {
      case '#':
        // // 给这个tokens下标为2的项创建一个数组，以收集子元素
        // token[2] = []
        // // 压栈 (入栈)
        // sections.push(token)
        // // console.log(token[1],'进栈');
        // nestedTokens.push(token)
        // 收集器中放入token
        collector.push(token)
        // (入栈)
        sections.push(token)
        // 收集器换人, 给这个token添加下标为2的项，并且让收集器指向他
        collector = token[2] = []
        break;
      case '/':
        // // 弹栈 出栈 pop() 会返回弹出的项
        // let section_pop = sections.pop()
        // // console.log(section[1],'出栈');
        // // 刚刚弹出的项还没有加入到结果数组中
        // nestedTokens.push(section_pop)
        // 出栈 pop() 会返回刚刚弹出的项
        sections.pop()
        // 改变收集器为栈结构队尾(队尾是栈顶) 那项下标为2的数组
        collector = sections.length > 0 ? sections[sections.length - 1][2] : nestedTokens
        break;
      default:
        // // 判断。栈队列当前情况
        // if(sections.length == 0){
        //   nestedTokens.push(token)
        // }else{
        //   sections[sections.length -1][2].push(token)
        // }
        collector.push(token)
    }
  }
  return nestedTokens;
}