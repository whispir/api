/*! jQuery UI - v1.10.3 - 2013-09-16
* http://jqueryui.com
* Includes: jquery.ui.widget.js
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
!function(e,t){var n=0,i=Array.prototype.slice,r=e.cleanData;e.cleanData=function(t){for(var n,i=0;null!=(n=t[i]);i++)try{e(n).triggerHandler("remove")}catch(o){}r(t)},e.widget=function(n,i,r){var o,s,a,l,u={},c=n.split(".")[0];n=n.split(".")[1],o=c+"-"+n,r||(r=i,i=e.Widget),e.expr[":"][o.toLowerCase()]=function(t){return!!e.data(t,o)},e[c]=e[c]||{},s=e[c][n],a=e[c][n]=function(e,n){return this._createWidget?(arguments.length&&this._createWidget(e,n),t):new a(e,n)},e.extend(a,s,{version:r.version,_proto:e.extend({},r),_childConstructors:[]}),l=new i,l.options=e.widget.extend({},l.options),e.each(r,function(n,r){return e.isFunction(r)?(u[n]=function(){var e=function(){return i.prototype[n].apply(this,arguments)},t=function(e){return i.prototype[n].apply(this,e)};return function(){var n,i=this._super,o=this._superApply;return this._super=e,this._superApply=t,n=r.apply(this,arguments),this._super=i,this._superApply=o,n}}(),t):(u[n]=r,t)}),a.prototype=e.widget.extend(l,{widgetEventPrefix:s?l.widgetEventPrefix:n},u,{constructor:a,namespace:c,widgetName:n,widgetFullName:o}),s?(e.each(s._childConstructors,function(t,n){var i=n.prototype;e.widget(i.namespace+"."+i.widgetName,a,n._proto)}),delete s._childConstructors):i._childConstructors.push(a),e.widget.bridge(n,a)},e.widget.extend=function(n){for(var r,o,s=i.call(arguments,1),a=0,l=s.length;l>a;a++)for(r in s[a])o=s[a][r],s[a].hasOwnProperty(r)&&o!==t&&(n[r]=e.isPlainObject(o)?e.isPlainObject(n[r])?e.widget.extend({},n[r],o):e.widget.extend({},o):o);return n},e.widget.bridge=function(n,r){var o=r.prototype.widgetFullName||n;e.fn[n]=function(s){var a="string"==typeof s,l=i.call(arguments,1),u=this;return s=!a&&l.length?e.widget.extend.apply(null,[s].concat(l)):s,a?this.each(function(){var i,r=e.data(this,o);return r?e.isFunction(r[s])&&"_"!==s.charAt(0)?(i=r[s].apply(r,l),i!==r&&i!==t?(u=i&&i.jquery?u.pushStack(i.get()):i,!1):t):e.error("no such method '"+s+"' for "+n+" widget instance"):e.error("cannot call methods on "+n+" prior to initialization; attempted to call method '"+s+"'")}):this.each(function(){var t=e.data(this,o);t?t.option(s||{})._init():e.data(this,o,new r(s,this))}),u}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,i){i=e(i||this.defaultElement||this)[0],this.element=e(i),this.uuid=n++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),i!==this&&(e.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===i&&this.destroy()}}),this.document=e(i.style?i.ownerDocument:i.document||i),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(n,i){var r,o,s,a=n;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof n)if(a={},r=n.split("."),n=r.shift(),r.length){for(o=a[n]=e.widget.extend({},this.options[n]),s=0;r.length-1>s;s++)o[r[s]]=o[r[s]]||{},o=o[r[s]];if(n=r.pop(),i===t)return o[n]===t?null:o[n];o[n]=i}else{if(i===t)return this.options[n]===t?null:this.options[n];a[n]=i}return this._setOptions(a),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(n,i,r){var o,s=this;"boolean"!=typeof n&&(r=i,i=n,n=!1),r?(i=o=e(i),this.bindings=this.bindings.add(i)):(r=i,i=this.element,o=this.widget()),e.each(r,function(r,a){function l(){return n||s.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof a?s[a]:a).apply(s,arguments):t}"string"!=typeof a&&(l.guid=a.guid=a.guid||l.guid||e.guid++);var u=r.match(/^(\w+)\s*(.*)$/),c=u[1]+s.eventNamespace,d=u[2];d?o.delegate(d,c,l):i.bind(c,l)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function n(){return("string"==typeof e?i[e]:e).apply(i,arguments)}var i=this;return setTimeout(n,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,n,i){var r,o,s=this.options[t];if(i=i||{},n=e.Event(n),n.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),n.target=this.element[0],o=n.originalEvent)for(r in o)r in n||(n[r]=o[r]);return this.element.trigger(n,i),!(e.isFunction(s)&&s.apply(this.element[0],[n].concat(i))===!1||n.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,n){e.Widget.prototype["_"+t]=function(i,r,o){"string"==typeof r&&(r={effect:r});var s,a=r?r===!0||"number"==typeof r?n:r.effect||n:t;r=r||{},"number"==typeof r&&(r={duration:r}),s=!e.isEmptyObject(r),r.complete=o,r.delay&&i.delay(r.delay),s&&e.effects&&e.effects.effect[a]?i[t](r):a!==t&&i[a]?i[a](r.duration,r.easing,o):i.queue(function(n){e(this)[t](),o&&o.call(i[0]),n()})}})}(jQuery);