/*! jQuery UI - v1.10.3 - 2013-09-16
* http://jqueryui.com
* Includes: jquery.ui.widget.js
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
!function(e,t){var n=0,i=Array.prototype.slice,r=e.cleanData;e.cleanData=function(t){for(var n,i=0;null!=(n=t[i]);i++)try{e(n).triggerHandler("remove")}catch(o){}r(t)},e.widget=function(n,i,r){var o,s,a,l,u={},c=n.split(".")[0];n=n.split(".")[1],o=c+"-"+n,r||(r=i,i=e.Widget),e.expr[":"][o.toLowerCase()]=function(t){return!!e.data(t,o)},e[c]=e[c]||{},s=e[c][n],a=e[c][n]=function(e,n){return this._createWidget?(arguments.length&&this._createWidget(e,n),t):new a(e,n)},e.extend(a,s,{version:r.version,_proto:e.extend({},r),_childConstructors:[]}),l=new i,l.options=e.widget.extend({},l.options),e.each(r,function(n,r){return e.isFunction(r)?(u[n]=function(){var e=function(){return i.prototype[n].apply(this,arguments)},t=function(e){return i.prototype[n].apply(this,e)};return function(){var n,i=this._super,o=this._superApply;return this._super=e,this._superApply=t,n=r.apply(this,arguments),this._super=i,this._superApply=o,n}}(),t):(u[n]=r,t)}),a.prototype=e.widget.extend(l,{widgetEventPrefix:s?l.widgetEventPrefix:n},u,{constructor:a,namespace:c,widgetName:n,widgetFullName:o}),s?(e.each(s._childConstructors,function(t,n){var i=n.prototype;e.widget(i.namespace+"."+i.widgetName,a,n._proto)}),delete s._childConstructors):i._childConstructors.push(a),e.widget.bridge(n,a)},e.widget.extend=function(n){for(var r,o,s=i.call(arguments,1),a=0,l=s.length;l>a;a++)for(r in s[a])o=s[a][r],s[a].hasOwnProperty(r)&&o!==t&&(n[r]=e.isPlainObject(o)?e.isPlainObject(n[r])?e.widget.extend({},n[r],o):e.widget.extend({},o):o);return n},e.widget.bridge=function(n,r){var o=r.prototype.widgetFullName||n;e.fn[n]=function(s){var a="string"==typeof s,l=i.call(arguments,1),u=this;return s=!a&&l.length?e.widget.extend.apply(null,[s].concat(l)):s,a?this.each(function(){var i,r=e.data(this,o);return r?e.isFunction(r[s])&&"_"!==s.charAt(0)?(i=r[s].apply(r,l),i!==r&&i!==t?(u=i&&i.jquery?u.pushStack(i.get()):i,!1):t):e.error("no such method '"+s+"' for "+n+" widget instance"):e.error("cannot call methods on "+n+" prior to initialization; attempted to call method '"+s+"'")}):this.each(function(){var t=e.data(this,o);t?t.option(s||{})._init():e.data(this,o,new r(s,this))}),u}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,i){i=e(i||this.defaultElement||this)[0],this.element=e(i),this.uuid=n++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),i!==this&&(e.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===i&&this.destroy()}}),this.document=e(i.style?i.ownerDocument:i.document||i),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(n,i){var r,o,s,a=n;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof n)if(a={},r=n.split("."),n=r.shift(),r.length){for(o=a[n]=e.widget.extend({},this.options[n]),s=0;r.length-1>s;s++)o[r[s]]=o[r[s]]||{},o=o[r[s]];if(n=r.pop(),i===t)return o[n]===t?null:o[n];o[n]=i}else{if(i===t)return this.options[n]===t?null:this.options[n];a[n]=i}return this._setOptions(a),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(n,i,r){var o,s=this;"boolean"!=typeof n&&(r=i,i=n,n=!1),r?(i=o=e(i),this.bindings=this.bindings.add(i)):(r=i,i=this.element,o=this.widget()),e.each(r,function(r,a){function l(){return n||s.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof a?s[a]:a).apply(s,arguments):t}"string"!=typeof a&&(l.guid=a.guid=a.guid||l.guid||e.guid++);var u=r.match(/^(\w+)\s*(.*)$/),c=u[1]+s.eventNamespace,d=u[2];d?o.delegate(d,c,l):i.bind(c,l)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function n(){return("string"==typeof e?i[e]:e).apply(i,arguments)}var i=this;return setTimeout(n,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,n,i){var r,o,s=this.options[t];if(i=i||{},n=e.Event(n),n.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),n.target=this.element[0],o=n.originalEvent)for(r in o)r in n||(n[r]=o[r]);return this.element.trigger(n,i),!(e.isFunction(s)&&s.apply(this.element[0],[n].concat(i))===!1||n.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,n){e.Widget.prototype["_"+t]=function(i,r,o){"string"==typeof r&&(r={effect:r});var s,a=r?r===!0||"number"==typeof r?n:r.effect||n:t;r=r||{},"number"==typeof r&&(r={duration:r}),s=!e.isEmptyObject(r),r.complete=o,r.delay&&i.delay(r.delay),s&&e.effects&&e.effects.effect[a]?i[t](r):a!==t&&i[a]?i[a](r.duration,r.easing,o):i.queue(function(n){e(this)[t](),o&&o.call(i[0]),n()})}})}(jQuery),/* jquery Tocify - v1.8.0 - 2013-09-16
* http://www.gregfranko.com/jquery.tocify.js/
* Copyright (c) 2013 Greg Franko; Licensed MIT
* Modified lightly by Robert Lord to fix a bug I found,
* and also so it adds ids to headers
* also because I want height caching, since the
* height lookup for h1s and h2s was causing serious
* lag spikes below 30 fps */
function(e){"use strict";e(window.jQuery,window,document)}(function(e,t,n,i){"use strict";var r="tocify",o="tocify-focus",s="tocify-hover",a="tocify-hide",l="tocify-header",u="."+l,c="tocify-subheader",d="."+c,f="tocify-item",h="."+f,p="tocify-extend-page",g="."+p;e.widget("toc.tocify",{version:"1.8.0",options:{context:"body",ignoreSelector:null,selectors:"h1, h2, h3",showAndHide:!0,showEffect:"slideDown",showEffectSpeed:"medium",hideEffect:"slideUp",hideEffectSpeed:"medium",smoothScroll:!0,smoothScrollSpeed:"medium",scrollTo:0,showAndHideOnScroll:!0,highlightOnScroll:!0,highlightOffset:40,theme:"bootstrap",extendPage:!0,extendPageOffset:100,history:!0,scrollHistory:!1,hashGenerator:"compact",highlightDefault:!0},_create:function(){var n=this;n.tocifyWrapper=e(".tocify-wrapper"),n.extendPageScroll=!0,n.items=[],n._generateToc(),n.cachedHeights=[],n.cachedAnchors=[],n._addCSSClasses(),n.webkit=function(){for(var e in t)if(e&&-1!==e.toLowerCase().indexOf("webkit"))return!0;return!1}(),n._setEventHandlers(),e(t).load(function(){n._setActiveElement(!0),e("html, body").promise().done(function(){setTimeout(function(){n.extendPageScroll=!1},0)})})},_generateToc:function(){var t,n,i=this,o=i.options.ignoreSelector;return t=-1!==this.options.selectors.indexOf(",")?e(this.options.context).find(this.options.selectors.replace(/ /g,"").substr(0,this.options.selectors.indexOf(","))):e(this.options.context).find(this.options.selectors.replace(/ /g,"")),t.length?(i.element.addClass(r),void t.each(function(t){e(this).is(o)||(n=e("<ul/>",{id:l+t,"class":l}).append(i._nestElements(e(this),t)),i.element.append(n),e(this).nextUntil(this.nodeName.toLowerCase()).each(function(){0===e(this).find(i.options.selectors).length?e(this).filter(i.options.selectors).each(function(){e(this).is(o)||i._appendSubheaders.call(this,i,n)}):e(this).find(i.options.selectors).each(function(){e(this).is(o)||i._appendSubheaders.call(this,i,n)})}))})):void i.element.addClass(a)},_setActiveElement:function(e){var n=this,i=t.location.hash.substring(1),r=n.element.find("li[data-unique='"+i+"']");return i.length?(n.element.find("."+n.focusClass).removeClass(n.focusClass),r.addClass(n.focusClass),n.options.showAndHide&&r.click()):(n.element.find("."+n.focusClass).removeClass(n.focusClass),!i.length&&e&&n.options.highlightDefault&&n.element.find(h).first().addClass(n.focusClass)),n},_nestElements:function(t,n){var i,r,o;return i=e.grep(this.items,function(e){return e===t.text()}),i.length?this.items.push(t.text()+n):this.items.push(t.text()),o=this._generateHashValue(i,t,n),r=e("<li/>",{"class":f,"data-unique":o}).append(e("<a/>",{text:t.text()})),t.before(e("<div/>",{name:o,"data-unique":o})),r},_generateHashValue:function(e,t,n){var i="",r=this.options.hashGenerator;if("pretty"===r){for(i=t.text().toLowerCase().replace(/\s/g,"-"),i=i.replace(/[^\x00-\x7F]/g,"");i.indexOf("--")>-1;)i=i.replace(/--/g,"-");for(;i.indexOf(":-")>-1;)i=i.replace(/:-/g,"-")}else i="function"==typeof r?r(t.text(),t):t.text().replace(/\s/g,"");return e.length&&(i+=""+n),i},_appendSubheaders:function(t,n){var i=e(this).index(t.options.selectors),r=e(t.options.selectors).eq(i-1),o=+e(this).prop("tagName").charAt(1),s=+r.prop("tagName").charAt(1);s>o?t.element.find(d+"[data-tag="+o+"]").last().append(t._nestElements(e(this),i)):o===s?n.find(h).last().after(t._nestElements(e(this),i)):n.find(h).last().after(e("<ul/>",{"class":c,"data-tag":o})).next(d).append(t._nestElements(e(this),i))},_setEventHandlers:function(){var r=this;this.element.on("click.tocify","li",function(n){if(r.options.history&&(t.location.hash=e(this).attr("data-unique")),r.element.find("."+r.focusClass).removeClass(r.focusClass),e(this).addClass(r.focusClass),r.options.showAndHide){var i=e('li[data-unique="'+e(this).attr("data-unique")+'"]');r._triggerShow(i)}r._scrollTo(e(this))}),this.element.find("li").on({"mouseenter.tocify":function(){e(this).addClass(r.hoverClass),e(this).css("cursor","pointer")},"mouseleave.tocify":function(){"bootstrap"!==r.options.theme&&e(this).removeClass(r.hoverClass)}}),e(t).on("resize",function(){r.calculateHeights()}),e(t).on("scroll.tocify",function(){e("html, body").promise().done(function(){var o,s,a,l,u=e(t).scrollTop(),c=e(t).height(),d=e(n).height(),f=e("body")[0].scrollHeight;if(r.options.extendPage&&(r.webkit&&u>=f-c-r.options.extendPageOffset||!r.webkit&&c+u>d-r.options.extendPageOffset)&&!e(g).length){if(s=e('div[data-unique="'+e(h).last().attr("data-unique")+'"]'),!s.length)return;a=s.offset().top,e(r.options.context).append(e("<div />",{"class":p,height:Math.abs(a-u)+"px","data-unique":p})),r.extendPageScroll&&(l=r.element.find("li.active"),r._scrollTo(e("div[data-unique="+l.attr("data-unique")+"]")))}setTimeout(function(){var s,a=null;0==r.cachedHeights.length&&r.calculateHeights();var l=e(t).scrollTop();if(r.cachedAnchors.each(function(e){return r.cachedHeights[e]-l<0?void(a=e):!1}),s=e(r.cachedAnchors[a]).attr("data-unique"),o=e('li[data-unique="'+s+'"]'),r.options.highlightOnScroll&&o.length&&!o.hasClass(r.focusClass)){r.element.find("."+r.focusClass).removeClass(r.focusClass),o.addClass(r.focusClass);var u=r.tocifyWrapper,c=e(o).closest(".tocify-header"),d=c.offset().top,f=u.offset().top,h=d-f;if(h>=e(t).height()){var p=h+u.scrollTop();u.scrollTop(p)}else 0>h&&u.scrollTop(0)}r.options.scrollHistory&&t.location.hash!=="#"+s&&s!==i&&(history.replaceState?history.replaceState({},"","#"+s):(scrollV=n.body.scrollTop,scrollH=n.body.scrollLeft,location.hash="#"+s,n.body.scrollTop=scrollV,n.body.scrollLeft=scrollH)),r.options.showAndHideOnScroll&&r.options.showAndHide&&r._triggerShow(o,!0)},0)})})},calculateHeights:function(){var t=this;t.cachedHeights=[],t.cachedAnchors=[];var n=e(t.options.context).find("div[data-unique]");n.each(function(n){var i=(e(this).next().length?e(this).next():e(this)).offset().top-t.options.highlightOffset;t.cachedHeights[n]=i}),t.cachedAnchors=n},show:function(t,n){var i=this;if(!t.is(":visible"))switch(t.find(d).length||t.parent().is(u)||t.parent().is(":visible")?t.children(d).length||t.parent().is(u)||(t=t.closest(d)):t=t.parents(d).add(t),i.options.showEffect){case"none":t.show();break;case"show":t.show(i.options.showEffectSpeed);break;case"slideDown":t.slideDown(i.options.showEffectSpeed);break;case"fadeIn":t.fadeIn(i.options.showEffectSpeed);break;default:t.show()}return t.parent().is(u)?i.hide(e(d).not(t)):i.hide(e(d).not(t.closest(u).find(d).not(t.siblings()))),i},hide:function(e){var t=this;switch(t.options.hideEffect){case"none":e.hide();break;case"hide":e.hide(t.options.hideEffectSpeed);break;case"slideUp":e.slideUp(t.options.hideEffectSpeed);break;case"fadeOut":e.fadeOut(t.options.hideEffectSpeed);break;default:e.hide()}return t},_triggerShow:function(e,t){var n=this;return e.parent().is(u)||e.next().is(d)?n.show(e.next(d),t):e.parent().is(d)&&n.show(e.parent(),t),n},_addCSSClasses:function(){return"jqueryui"===this.options.theme?(this.focusClass="ui-state-default",this.hoverClass="ui-state-hover",this.element.addClass("ui-widget").find(".toc-title").addClass("ui-widget-header").end().find("li").addClass("ui-widget-content")):"bootstrap"===this.options.theme?(this.element.find(u+","+d).addClass("nav nav-list"),this.focusClass="active"):(this.focusClass=o,this.hoverClass=s),this},setOption:function(){e.Widget.prototype._setOption.apply(this,arguments)},setOptions:function(){e.Widget.prototype._setOptions.apply(this,arguments)},_scrollTo:function(t){var n=this,i=n.options.smoothScroll||0,r=n.options.scrollTo;return e("html, body").promise().done(function(){e("html, body").animate({scrollTop:e('div[data-unique="'+t.attr("data-unique")+'"]').next().offset().top-(e.isFunction(r)?r.call():r)+"px"},{duration:i})}),n}})});