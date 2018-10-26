/**
 *  新增的杂项方法开会
 * Add By liwei  2018/10/26
 */
/**
 * ES6 把Map 转为对象
 * @param {Map} strMap 
 */
 function strMapToObj(strMap){
    let obj = Object.create(null); // 函数式继承 ，没有任何的原型方法
    for(let [k,v] of strMap){
        obj[k]=v;
    }
    return obj;
 }
/**
 * ES6 对象 转Map
 * @param {*} obj 
 */
 function objToStrMap(obj){
     let strMap = new Map();
     for(let k of Object.keys(obj)){
         strMap.set(k,obj[k]);
     }
     return strMap;
 }
/**
 * Map 转json  (Map键名都是字符串，转为对像json)
 * @param {Map} strMap 
 */
 function strMapToJson(strMap){
    return JSON.stringify(strMapToObj(strMap));
 }
/**
 * Map 转json (Map 的键名 含有非字符串，转为数组json)
 * @param {Map} map 
 */
 function mapToArrayJson(map){
     return JSON.stringify([...map])
 }
/**
 * JSON 转Map 键名都是字符串
 * @param {Json} jsonstr 
 */
 function jsonToStrMap(jsonstr){
     return objToStrMap(JSON.parse(jsonstr))
 }
 /**
  * JSON 转map 特殊情况，整个json 是一个数组， 数组嵌套
  * @param {Json} jsonstr 
  */
 function jsonToMap(jsonstr){
     return new Map(JSON.parse(jsonstr));
 }


