/**
 * 数组相关的函数处理集合
 * Add By liwei 2018/10/11
 */

/**
 * 对象数组去重，多个属性同时相同时
 */
//将对象元素转换成字符串以作比较  
function obj2key(obj, keys){  
    var n = keys.length,  
        key = [];  
    while(n--){  
        key.push(obj[keys[n]]);  
    }  
    return key.join('|');  
}  
//去重操作  
function uniqeByKeys(array,keys){  
    var arr = [];  
    var hash = {};  
    for (var i = 0, j = array.length; i < j; i++) {  
        var k = obj2key(array[i], keys);  
        if (!(k in hash)) {  
            hash[k] = true;  
            arr .push(array[i]);  
        }  
    }  
    return arr ;  
}  