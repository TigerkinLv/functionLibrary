XBack = {};
(function(XBack) {
	XBack.STATE = 'x - back';
	XBack.element;

	XBack.onPopState = function(event) {
		var fire = XBack.fire();//要先执行下再判断
		event.state === XBack.STATE && fire;
		XBack.record(XBack.STATE); //初始化事件时，push一下
	};

	XBack.record = function(state) {
		history.pushState(state, null, location.href);
	};

	XBack.fire = function() {
		var event = document.createEvent('Events');
		event.initEvent(XBack.STATE, false, false);
		XBack.element.dispatchEvent(event);
	};

	XBack.listen = function(listener) {
		XBack.element.addEventListener(XBack.STATE, listener, false);
	};

	XBack.init = function() {
		XBack.element = document.createElement('span');
		window.addEventListener('popstate', XBack.onPopState);
		XBack.record(XBack.STATE);
	};

})(XBack);


/**
 * js 监听手机的返回的物理按钮
 *  使用方式 如下，使用页面引入即可
 */
XBack.init();
XBack.listen(function() {
    // 事件处理函数
});