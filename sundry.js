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


/**
 * 旋转一个图片并返回新的图片对象
 * @param {*} pid 要图片的id
 * @param {*} direction 旋转的方向
 */
 function rotateImg(pid,direction){
    // 最大和最小旋转方向，图片旋转4次回到原方向
    var min_step=0;
    var max_step=3;
    var img=document.getElementById(pid);
    if(img==null){
        return;
    }
    var height=img.height;
    var width=img.width;
    var step=img.getAttribute("step");
    if(step==null){
        step=min_step;
    }
    if(direction=="right"){
        step++;
        step>max_step && (step=min_step);
    }else{
        step--;
        step<min_step && (step=max_step);
    }
    img.setAttribute("step",step);
    var canvas=document.getElementById("pic_"+pid);
    if(canvas==null){
        canvas=document.createElement("canvas");
        canvas.setAttribute("id","pic_"+pid);
    }
    // 旋转的角度以弧度值为参数
    var degree= step*90*Math.PI/180;
    var ctx= canvas.getContext("2d");
    switch(step){
        case 0:
            canvas.width=width;
            canvas.height=height;
            ctx.drawImage(img,0,0);
            break;
        case 1:
            canvas.width=height;
            canvas.height=width;
            ctx.rotate(degree);
            ctx.drawImage(img,0,-height);
            break;
        case 2:
            canvas.width=width;
            canvas.height=height;
            ctx.rotate(degree);
            ctx.drawImage(img,-width,-height);
            break;
        case 3:
            canvas.width=height;
            canvas.height=width;
            ctx.rotate(degree);
            ctx.drawImage(img,width,0);
            break;
    }   
    return canvas2Img(canvas);
 }
/**
 * canvas 转图片
 * @param {*} canvas 要转的canvas
 */
 function canvas2Img(canvas){
     var image=new  Image();
     image.src=canvas.toDataURL("image/png");
     return image;
 }
