/*
 *	jQuery touch plugin
 *	Copyright (C) Ryuhei Shudo
 *	Lisensed under the MIT Lisence
 */
(function($){
	$.fn.extend({
		// touch event
		touch : function( params, fn){
			//params for jQuery.event.add
			var selector, data;
			
			//private variable
			var stopPropagation = false;
			var touchclickFlg = false;
			var cnt = 0;
			var maxCnt = 1;
			var _e = null;
			var _event = null;
			var ev = {
				  start : 'touchstart'
				, move : 'touchmove'
				, end : 'touchend'
			};

			//.touch(fn);
			if( typeof params !== "object" ){
				fn = params ;
				params = null;
			//.touch(params,fn);
			}else{
				if( typeof params.selector !== 'undefined' ) selector = params.selector;
				if( typeof params.data !== 'undefined' ) data = params.data;
				if( typeof params.namespace !== 'undefined' ) {
					ev.start +=  '.' + params.namespace ;
					ev.move += '.' + params.namespace ;
					ev.end += '.' + params.namespace ;
				}
				if( typeof params.stopPropagation !== 'undefined' ) stopPropagation = params.stopPropagation ;
			}
			// touchstart function
			var startFn = function( e ){
				cnt = 0;
				e.preventDefault();
				if( stopPropagation ) e.stopPropagation();
				touchclickFlg = true;
				_e = e;
				_event = event;
			};
        		// touchmove function
			var moveFn = function( e ){
				if(touchclickFlg){
						if( stopPropagation ) e.stopPropagation();
						e.preventDefault();
						if(cnt > maxCnt){
							touchclickFlg = false;
						}else{
							cnt++;
							_e = e;
							_event = event;
						}
					}
			};
        		// touchstart function
			var endFn = function( e ){
				if( stopPropagation ) e.stopPropagation();
				if(touchclickFlg){
					event = _event;
					fn.call(this,_e);
				}
				_e = null;
				_event = null;
			};
			
        
			//attach event
			return this.each( function(){
				jQuery.event.add( this, ev.start, startFn, data, selector );
				jQuery.event.add( this, ev.move, moveFn, data, selector );
				jQuery.event.add( this, ev.end, endFn, data, selector );
			});
		}
	});

})(jQuery);

