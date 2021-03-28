/**
 * 
 * 功能是可以在dataObj对象中，寻找用连续点符号的keyname属性
 * 比如 obj.a.b.c
 * {
 *  a: {
 *    b: {
 *      c:100
 *     }
 *   }
 * }
 * 
 * 那么lookup (dataObj, 'a.b.c') 结果是100
 * 
 */

export default function lookup(dataObj, keyname) {
  // console.log(dataObj, keyname);
  // 看看keyname 有没有点符号 但是不能是 . 本身
  if (keyname.indexOf('.') !== -1 && keyname !== '.') {
    var keys = keyname.split('.')
    // 用这个temp变量作为中间值 临时变量 用于周转 , 一层一层去找
    var temp = dataObj;
    // 每找一层设置为新的临时变量
    for (let i = 0; i < keys.length; i++) {
      temp = temp[keys[i]];
    }
    return temp
  }
  // 如果这里没有点符号
  return dataObj[keyname];
}