/**
 * 实用工具类函数集合
 */

/**
*  功能：检测当前的操作系统APP
*/
function checkClientApp() {
    var currentApp;//  用于标识当前的系统环境
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        currentApp = "isAndroid";
    }
    if (isiOS) {
        currentApp = "isiOS";
    }
    return currentApp;
}
/**
 * 功能： 检测移动端当前网络环境是否为wifi
 * 标注： 微信 6.0+  nagigator.connection    UA NetType , 6.0- 使用微信的私有端口WeixinJSBridge
 */
function isWifi(){
    var wifi = ture;
    var ua=window.navigator.userAgent;
    var con=window.navigator.connection;
    // 如果是微信环境
    if(/MicroMessenger/.test(ua)){ //  通过userAgent 是否包含 MicroMessenger 来判断是否为微信内置浏览器打开
        // 微信6.0+  使用UA 来判断
        if(/NetType/.test(ua)){   
            if(ua.match(/NetType\/(\S*)$/)[1]!="WIFI"){  //  举个栗子：格式：NetType/WIFI 或是 NetType/2G 或是NetType/3G+
                wifi=false;
            }
        }else{// 微信6.0- 调用微信私有接口 WeixinJSBridge ，是微信内部的一个对象(封装了很多的方法)   说明：指微信页面中右上角三个小点，所以只对微信内的网页有效，我们只要对小点列表下的按钮进行自定义，就可以随心所欲设置自己的内容
            document.addEventListener("WeixinJSBridgeReady",function onBridgeReady(){
                WeixinJSBridge.invoke("getNetworkType",{},function(e){
                    if(e.err_msg!="network_type:wifi"){
                        wifi=false;
                    }
                });
            });
        }
    }else if(con){//  支持navigator.connection的环境
        var network=con.type;
        if(network!="wifi" && network != "2" && network != "unknown"){ //  unknown 主要是为了兼容chrome canary(chrome 推出的一个版本的浏览器，“金丝雀版本”)
            wifi=false;
        }
    }
    return wifi;
}
/**
 * 功能：非input(如div) 元素  ，可编辑后，获取焦点后，让光标处于文本后
 * 说明：TextRange对象是动态HTML(DHTML)的高级特性，可以实现很多文本操作
 * @param {*} el dom元素
 */
function set_focus(el){ 
    el.focus(); //让元素获取焦点
    if($.support.msie){ //  是否为ie浏览器
        var range =document.selection.createRange();// 创建一个range 对象
        this.last=range;
        range.moveToElementText(el);// 移动range对象，使其起始点之间包含指定对象内的文本
        range.select();// 将当前选择区置为当前对象， 所谓的“光标” ，可以理解为边界重合的范围
        document.selection.empty();// 取消选中
    }else{
        var range=document.createRange();// 创建一个range对象
        range.selectNodeContents(el);// 获取节点的子节点
        range.collapse(false);// 把 范围的开始点设置为与结束点相同的值
        var sel =window.getSelection();// 返回一个Selection 对象，表示用户选择 的文本范围或光标的当前位置
        sel.removeAllRanges();// 会从当前的selection对象中移除所有的range对象，取消所有的选择，只留下anchorNode和 focusNode 属性，并将其设置为null  
        sel.addRange(range);// 向选区（Selection）中添加一个区域（Range）
    }
}