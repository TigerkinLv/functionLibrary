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