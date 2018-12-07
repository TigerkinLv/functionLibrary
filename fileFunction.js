/**
 * 文件上传相关的函数(在做图片裁剪上传的时候用到的函数，放一起，开个小会，^.^)
 * Added By Liwei  2018/10/10
 */

 /**
  * 将blob  转化为blob 对象
  * @param {*} blob  要转化为base64的blob 对象
  * @param {*} callback  //  回调函数，其中的参数就是返回的base64 格式的字串
  */
    function blobToDataUrl(blob,callback){
        let a = new FileReader();
        a.onload =function(e){
            callback(e.target.result);
        }
        a.readAsDataURL(blob);
    }

/**
 *  将图片的dataurl 转化为file 对象， 主要用于后台传输 formdata
 * @param {*} dataurl    要转化的base64 
 * @param {*} filename   文件名(包含文件后缀)
 */
    function dataUrlToFile( dataurl,filename){
        var startIndex=dataurl.indexOf('/');
        var endIndex=dataurl.indexOf(";");
        var imgStyle=dataurl.substring(startIndex,endIndex); 
        var arr = dataurl.split(",")[1];
        var bstr =window.atob(arr);
        var ia =new Uint8Array(bstr.length);
        for(var i=0;i<bstr.length;i++){
            ia[i]=bstr.charCodeAt(i);
        }
        switch(imgStyle){
            case "/png":   var file=new File([ia], filename,{type:"image/png"});;break; 
            case "/jpeg":  var file=new File([ia],filename,{type:"image/jpeg"});;break; 
            case "/jpg":  var file=new File([ia],filename,{type:"image/jpg"});;break; 
            case "/gif":   var file=new File([ia], filename,{type:"image/gif"});;break; 
            case "/svg":   var file=new File([ia], filename,{type:"image/svg"});;
        }
        return file;
    }

/**
 * 
 * @param {*} canvas 要转化的canvas
 * @param {*} imgStyle 图片的类型 base64串中的
 * @param {*} newImgStorageSize 转化后的图片的存储大小
 */
    function convertCanvasToImage(canvas,imgStyle,newImgStorageSize) {  
        //新Image对象，可以理解为DOM  
        var image = new Image();  
        image.width=canvas.width;//  新图片的宽度
        image.height=canvas.height; //  新图片的高度
        image.size=newImgStorageSize;//  新图片的存储大小
        // canvas.toDataURL 返回的是一串Base64编码的URL ，指定图片的格式
        switch(imgStyle){
            case "/png":image.src = canvas.toDataURL("image/png");break; 
            case "/jpg":image.src = canvas.toDataURL("image/jpg");break; 
            case "/jpeg":image.src = canvas.toDataURL("image/jpeg");break; 
            case "/gif":image.src = canvas.toDataURL("image/gif");break; 
            case "/svg":image.src = canvas.toDataURL("image/svg");
        }
        return image;  
    }

    /**
     * 
     * @param {*} originalImage 要裁剪的原始图片
     * @param {*} originalImageSize 要裁剪的原始图片的存储大小
     * @param {*} width 裁剪后的图片的宽度
     * @param {*} height 裁剪后图片的高度
     * @param {*} filename 裁剪的图片的文件名
     * @param {*} cutStyle 裁剪的方式， 取值 1为留白裁剪，  取值2为缩放裁剪
     */
    function imageCut(originalImage,originalImageSize, width, height,filename,cutStyle) {//  originalImage 为要进行剪切的图片，  剪切的宽度和高度，每次从图片的中心点扩散式剪切 originalImageSize为图片的存储大小 filename 为照片的名称
        var sSrc = originalImage.src;     //  原图片的路径 Base64编码的URL
        var sfileName=filename; //原图片的名称
        var startIndex=sSrc.indexOf('/');
        var endIndex=sSrc.indexOf(";");
        var imgStyle=sSrc.substring(startIndex,endIndex); //  使剪切后的图片和原图片的格式一致
        var canvas = $(`<canvas width=${width} height=${height} style="display:none"></canvas>`)[0],
            ctx = canvas.getContext('2d'); //  新建一个和剪切尺寸一样的canvas ，用于绘制图片
        if(cutStyle==2){
            // var newImage=originalImage;
            var swidth = originalImage.width; //  获取 原图片的宽度
            var sheight = originalImage.height; //  获取 原图片的高度
            var newImgStorageSize=parseInt((width*height*originalImageSize)/(swidth*sheight));//  计算图片剪切后的图片存储大小
            if (swidth < width || sheight < height) { //  如果宽高不合适，单独处理
                // if (sheight < height) { //  如果是图片的高度小于裁剪的尺寸的高，优先以高为基准对图片按图片原有尺寸比例进行放大，此刻可忽略宽
                var hratio=height/sheight;
                var wratio=width/swidth;
                var ratio=hratio>wratio?hratio:wratio;//  读取最大的比率
                ctx.drawImage(originalImage, 0, 0, width, height, 0, 0, width*ratio, height*ratio);//  剪切后的图片和剪切前的图片同属于一个中心点
                $(".contain.main").append(canvas); //  指定一个外部容器contain
            } else { //  大图正常裁剪
                ctx.drawImage(originalImage, (swidth - width) / 2, (sheight - height) / 2, width, height, 0, 0, width, height);//  剪切后的图片和剪切前的图片同属于一个中心点
                $(".contain.main").append(canvas);
            }
        }
        else{
            var swidth = originalImage.width; //  获取 原图片的宽度
            var sheight = originalImage.height; //  获取原图片的高度
            var newImgStorageSize=parseInt((width*height*originalImageSize)/(swidth*sheight));//  计算图片剪切后的图片存储大小
            ctx.fillStyle = "#fff"; 
            ctx.fillRect(0, 0, canvas.width, canvas.height); //在canvas绘制前填充白色背景  （白色留白）
            ctx.drawImage(originalImage, (swidth - width) / 2, (sheight - height) / 2, width, height, 0, 0, width, height);//  剪切后的图片和剪切前的图片同属于一个中心点
            $(".contain.main").append(canvas);
        }
        var newImg = convertCanvasToImage(canvas,imgStyle,newImgStorageSize); //  将canvas 转化为图片
        $(".contain.main").append(newImg);
        dataUrlToFile(newImg.src,sfileName,imgStyle);// 将剪切的图片转化为file对象
        return newImg;
    }

/**
* 本地图片（file对象）转为img 标签，用于页面的预览
* @param {file} file 本地要上传的file对象
*/
function file2ImgHtml(file) {
    var fileReader = new FileReader();
    fileReader.readAsDataURL(file); // 读取文件
    fileReader.onload = function () { //  获取读取的图片的结果， dataurl
        var img = new Image();//  创建给一个image 对象
        img.onload = function () {
            console.log(img);//  生成的img 标签 可追加至dom树中
        }
        img.src = fileReader.result;
    }
}
/**
 * 把一个dom标签转为str
 * @param {domNode} node 
 */
function nodeToString ( node ) {  
    //createElement()返回一个Element对象
   var tmpNode = document.createElement( "div" ); 
   //appendChild()  参数Node对象   返回Node对象  Element方法
   //cloneNode()  参数布尔类型  返回Node对象   Element方法
   tmpNode.appendChild( node.cloneNode( true ) );  
   var str = tmpNode.innerHTML;  
   tmpNode = node = null; // 防止IE中内存泄漏 
   return str;  
  } 
/**
 * 将读取的本地的图片file =>> 用于展示的image 对象
 * @param {*} file 读取本地的图片
 */
function imgPreview(file){
    var fr =new  FileReader();
    fr.onload=function(e){// 读取完毕
        var img=new Image();
        var imgSrc=e.target.result;
        img.onload=function(){
            return img;
        }
        img.src=imgSrc;
    }
    fr.readAsDataURL(file);
}