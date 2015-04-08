// Compiled by ClojureScript 0.0-3119 {:optimize-constants true, :static-fns true}
goog.provide('wkf.site');
goog.require('cljs.core');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('dommy.core');
goog.require('goog.events');
goog.require('goog.style');
if(typeof wkf.site.site !== 'undefined'){
} else {
wkf.site.site = (function (){var G__30645 = cljs.core.PersistentHashMap.fromArrays([cljs.core.constant$keyword$line_DASH_height,cljs.core.constant$keyword$page_DASH_scroll,cljs.core.constant$keyword$running_QMARK_,cljs.core.constant$keyword$page_DASH_thresholds,cljs.core.constant$keyword$scroll_DASH_width,cljs.core.constant$keyword$content_DASH_width,cljs.core.constant$keyword$menu_DASH_animating_QMARK_,cljs.core.constant$keyword$menu_DASH_scroll,cljs.core.constant$keyword$menu_DASH_showing_QMARK_,cljs.core.constant$keyword$menu_DASH_thresholds],[(0),(0),false,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$fix_DASH_page_DASH_nav,(0),cljs.core.constant$keyword$fix_DASH_page_DASH_hr,(0)], null),(0),(0),false,(0),false,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$fix_DASH_menu_DASH_nav,(0),cljs.core.constant$keyword$fix_DASH_menu_DASH_hr,(0)], null)]);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__30645) : cljs.core.atom.call(null,G__30645));
})();
}
wkf.site.html = (dommy.utils.__GT_Array(document.getElementsByTagName("html"))[(0)]);
wkf.site.body = document.body;
wkf.site.page = (dommy.utils.__GT_Array(document.getElementsByClassName("page"))[(0)]);
wkf.site.page_content = (dommy.utils.__GT_Array(document.getElementsByClassName("content"))[(0)]);
wkf.site.page_nav = (dommy.utils.__GT_Array(wkf.site.page.getElementsByTagName("nav"))[(0)]);
wkf.site.page_ellipsis = (dommy.utils.__GT_Array(wkf.site.page.getElementsByClassName("ellipsis"))[(0)]);
wkf.site.page_header = (dommy.utils.__GT_Array(wkf.site.page.getElementsByTagName("header"))[(0)]);
wkf.site.page_hr = (dommy.utils.__GT_Array(wkf.site.page_header.getElementsByTagName("hr"))[(0)]);
wkf.site.menu = (dommy.utils.__GT_Array(document.getElementsByClassName("menu"))[(0)]);
wkf.site.menu_content = (dommy.utils.__GT_Array(wkf.site.menu.getElementsByClassName("content"))[(0)]);
wkf.site.menu_nav = (dommy.utils.__GT_Array(wkf.site.menu.getElementsByTagName("nav"))[(0)]);
wkf.site.menu_ellipsis = (dommy.utils.__GT_Array(wkf.site.menu.getElementsByClassName("ellipsis"))[(0)]);
wkf.site.menu_header = (dommy.utils.__GT_Array(wkf.site.menu.getElementsByTagName("header"))[(0)]);
wkf.site.menu_hr = (dommy.utils.__GT_Array(wkf.site.menu_header.getElementsByTagName("hr"))[(0)]);
wkf.site.get_scroll = (function wkf$site$get_scroll(){
var scroll = (function (){return goog.dom.getDocumentScroll();
})();
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [scroll.x,scroll.y], null);
});
wkf.site.get_size = (function wkf$site$get_size(el){
var size = (function (){var G__30647 = el;
return goog.style.getSize(G__30647);
})();
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [size.width,size.height], null);
});
wkf.site.px = (function wkf$site$px(n){
return [cljs.core.str(n),cljs.core.str("px")].join('');
});
wkf.site.scroll_to_BANG_ = (function wkf$site$scroll_to_BANG_(x,y){
return window.scrollTo(x,y);
});
/**
 * A hacky way to get the line height.
 * Relies on the nav being 2 line-heights tall.
 * Silly
 */
wkf.site.measure_line_height = (function wkf$site$measure_line_height(){
return ((function (){var G__30649 = wkf.site.page_nav;
return goog.style.getSize(G__30649);
})().height / (2));
});
wkf.site.measure_scroll_width = (function wkf$site$measure_scroll_width(){
return goog.style.getScrollbarWidth();
});
wkf.site.measure_window_width = (function wkf$site$measure_window_width(){
return window.innerWidth;
});
wkf.site.measure_content_width = (function wkf$site$measure_content_width(window_width,scroll_width){
return (window_width - scroll_width);
});
wkf.site.measure_page_thresholds = (function wkf$site$measure_page_thresholds(line_height){
var vec__30651 = wkf.site.get_size(wkf.site.page_header);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30651,(0),null);
var page_header_height = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30651,(1),null);
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$fix_DASH_page_DASH_nav,line_height,cljs.core.constant$keyword$fix_DASH_page_DASH_hr,(page_header_height - (line_height * (3)))], null);
});
wkf.site.measure_menu_thresholds = (function wkf$site$measure_menu_thresholds(line_height){
var vec__30653 = wkf.site.get_size(wkf.site.menu_header);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30653,(0),null);
var menu_header_height = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30653,(1),null);
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$fix_DASH_menu_DASH_nav,line_height,cljs.core.constant$keyword$fix_DASH_menu_DASH_hr,(menu_header_height - (line_height * (3)))], null);
});
wkf.site.cache_measurements_BANG_ = (function wkf$site$cache_measurements_BANG_(){
var line_height = wkf.site.measure_line_height();
var scroll_width = wkf.site.measure_scroll_width();
var window_width = wkf.site.measure_window_width();
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$at_DASH_large_QMARK_,(window_width >= (860)),cljs.core.array_seq([cljs.core.constant$keyword$at_DASH_medium_QMARK_,(window_width >= (680)),cljs.core.constant$keyword$at_DASH_small_QMARK_,(window_width >= (460)),cljs.core.constant$keyword$line_DASH_height,line_height,cljs.core.constant$keyword$scroll_DASH_width,scroll_width,cljs.core.constant$keyword$window_DASH_width,window_width,cljs.core.constant$keyword$content_DASH_width,wkf.site.measure_content_width(window_width,scroll_width),cljs.core.constant$keyword$page_DASH_thresholds,wkf.site.measure_page_thresholds(line_height),cljs.core.constant$keyword$menu_DASH_thresholds,wkf.site.measure_menu_thresholds(line_height)], 0));
});
wkf.site.on_scroll = (function wkf$site$on_scroll(e){
var map__30672 = (function (){var G__30675 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30675) : cljs.core.deref.call(null,G__30675));
})();
var map__30672__$1 = ((cljs.core.seq_QMARK_(map__30672))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__30672):map__30672);
var menu_animating_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30672__$1,cljs.core.constant$keyword$menu_DASH_animating_QMARK_);
var menu_showing_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30672__$1,cljs.core.constant$keyword$menu_DASH_showing_QMARK_);
var menu_scroll = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30672__$1,cljs.core.constant$keyword$menu_DASH_scroll);
var page_scroll = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30672__$1,cljs.core.constant$keyword$page_DASH_scroll);
var vec__30673 = wkf.site.get_scroll();
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30673,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30673,(1),null);
var vec__30674 = (cljs.core.truth_(menu_animating_QMARK_)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [page_scroll,menu_scroll], null):(cljs.core.truth_(menu_showing_QMARK_)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [page_scroll,y], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [y,menu_scroll], null)
));
var page_scroll_SINGLEQUOTE_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30674,(0),null);
var menu_scroll_SINGLEQUOTE_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30674,(1),null);
var seq__30676_30690 = cljs.core.seq(cljs.core.constant$keyword$page_DASH_thresholds.cljs$core$IFn$_invoke$arity$1((function (){var G__30680 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30680) : cljs.core.deref.call(null,G__30680));
})()));
var chunk__30677_30691 = null;
var count__30678_30692 = (0);
var i__30679_30693 = (0);
while(true){
if((i__30679_30693 < count__30678_30692)){
var vec__30681_30694 = chunk__30677_30691.cljs$core$IIndexed$_nth$arity$2(null,i__30679_30693);
var c_30695 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30681_30694,(0),null);
var threshold_30696 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30681_30694,(1),null);
if((page_scroll_SINGLEQUOTE_ >= threshold_30696)){
dommy.core.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,c_30695);
} else {
dommy.core.remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,c_30695);
}

var G__30697 = seq__30676_30690;
var G__30698 = chunk__30677_30691;
var G__30699 = count__30678_30692;
var G__30700 = (i__30679_30693 + (1));
seq__30676_30690 = G__30697;
chunk__30677_30691 = G__30698;
count__30678_30692 = G__30699;
i__30679_30693 = G__30700;
continue;
} else {
var temp__4126__auto___30701 = cljs.core.seq(seq__30676_30690);
if(temp__4126__auto___30701){
var seq__30676_30702__$1 = temp__4126__auto___30701;
if(cljs.core.chunked_seq_QMARK_(seq__30676_30702__$1)){
var c__24962__auto___30703 = cljs.core.chunk_first(seq__30676_30702__$1);
var G__30704 = cljs.core.chunk_rest(seq__30676_30702__$1);
var G__30705 = c__24962__auto___30703;
var G__30706 = cljs.core.count(c__24962__auto___30703);
var G__30707 = (0);
seq__30676_30690 = G__30704;
chunk__30677_30691 = G__30705;
count__30678_30692 = G__30706;
i__30679_30693 = G__30707;
continue;
} else {
var vec__30682_30708 = cljs.core.first(seq__30676_30702__$1);
var c_30709 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30682_30708,(0),null);
var threshold_30710 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30682_30708,(1),null);
if((page_scroll_SINGLEQUOTE_ >= threshold_30710)){
dommy.core.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,c_30709);
} else {
dommy.core.remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,c_30709);
}

var G__30711 = cljs.core.next(seq__30676_30702__$1);
var G__30712 = null;
var G__30713 = (0);
var G__30714 = (0);
seq__30676_30690 = G__30711;
chunk__30677_30691 = G__30712;
count__30678_30692 = G__30713;
i__30679_30693 = G__30714;
continue;
}
} else {
}
}
break;
}

var seq__30683 = cljs.core.seq(cljs.core.constant$keyword$menu_DASH_thresholds.cljs$core$IFn$_invoke$arity$1((function (){var G__30687 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30687) : cljs.core.deref.call(null,G__30687));
})()));
var chunk__30684 = null;
var count__30685 = (0);
var i__30686 = (0);
while(true){
if((i__30686 < count__30685)){
var vec__30688 = chunk__30684.cljs$core$IIndexed$_nth$arity$2(null,i__30686);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30688,(0),null);
var threshold = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30688,(1),null);
if((menu_scroll_SINGLEQUOTE_ >= threshold)){
dommy.core.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,c);
} else {
dommy.core.remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,c);
}

var G__30715 = seq__30683;
var G__30716 = chunk__30684;
var G__30717 = count__30685;
var G__30718 = (i__30686 + (1));
seq__30683 = G__30715;
chunk__30684 = G__30716;
count__30685 = G__30717;
i__30686 = G__30718;
continue;
} else {
var temp__4126__auto__ = cljs.core.seq(seq__30683);
if(temp__4126__auto__){
var seq__30683__$1 = temp__4126__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__30683__$1)){
var c__24962__auto__ = cljs.core.chunk_first(seq__30683__$1);
var G__30719 = cljs.core.chunk_rest(seq__30683__$1);
var G__30720 = c__24962__auto__;
var G__30721 = cljs.core.count(c__24962__auto__);
var G__30722 = (0);
seq__30683 = G__30719;
chunk__30684 = G__30720;
count__30685 = G__30721;
i__30686 = G__30722;
continue;
} else {
var vec__30689 = cljs.core.first(seq__30683__$1);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30689,(0),null);
var threshold = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30689,(1),null);
if((menu_scroll_SINGLEQUOTE_ >= threshold)){
dommy.core.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,c);
} else {
dommy.core.remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,c);
}

var G__30723 = cljs.core.next(seq__30683__$1);
var G__30724 = null;
var G__30725 = (0);
var G__30726 = (0);
seq__30683 = G__30723;
chunk__30684 = G__30724;
count__30685 = G__30725;
i__30686 = G__30726;
continue;
}
} else {
return null;
}
}
break;
}
});
wkf.site.on_resize = (function wkf$site$on_resize(e){
wkf.site.cache_measurements_BANG_();

var G__30731 = wkf.site.menu_content;
var G__30732 = "width";
var G__30733 = wkf.site.px(cljs.core.constant$keyword$content_DASH_width.cljs$core$IFn$_invoke$arity$1((function (){var G__30734 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30734) : cljs.core.deref.call(null,G__30734));
})()));
return goog.style.setStyle(G__30731,G__30732,G__30733);
});
wkf.site.wrap_prevent_default = (function wkf$site$wrap_prevent_default(f){
return (function (e){
e.preventDefault();

var G__30736_30737 = e;
(f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__30736_30737) : f.call(null,G__30736_30737));

return false;
});
});
wkf.site.wrap_exact_target = (function wkf$site$wrap_exact_target(f){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(e.target,e.currentTarget)){
var G__30739 = e;
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__30739) : f.call(null,G__30739));
} else {
return null;
}
});
});
wkf.site.transition_end = ["transitionend","webkitTransitionEnd","msTransitionEnd","oTransitionEnd"];
/**
 * @param {...*} var_args
 */
wkf.site.set_styles_BANG_ = (function() { 
var wkf$site$set_styles_BANG___delegate = function (el,properties){
var G__30742 = el;
var G__30743 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.js_obj,properties);
return goog.style.setStyle(G__30742,G__30743);
};
var wkf$site$set_styles_BANG_ = function (el,var_args){
var properties = null;
if (arguments.length > 1) {
var G__30744__i = 0, G__30744__a = new Array(arguments.length -  1);
while (G__30744__i < G__30744__a.length) {G__30744__a[G__30744__i] = arguments[G__30744__i + 1]; ++G__30744__i;}
  properties = new cljs.core.IndexedSeq(G__30744__a,0);
} 
return wkf$site$set_styles_BANG___delegate.call(this,el,properties);};
wkf$site$set_styles_BANG_.cljs$lang$maxFixedArity = 1;
wkf$site$set_styles_BANG_.cljs$lang$applyTo = (function (arglist__30745){
var el = cljs.core.first(arglist__30745);
var properties = cljs.core.rest(arglist__30745);
return wkf$site$set_styles_BANG___delegate(el,properties);
});
wkf$site$set_styles_BANG_.cljs$core$IFn$_invoke$arity$variadic = wkf$site$set_styles_BANG___delegate;
return wkf$site$set_styles_BANG_;
})()
;
/**
 * @param {...*} var_args
 */
wkf.site.unset_styles_BANG_ = (function() { 
var wkf$site$unset_styles_BANG___delegate = function (el,properties){
var G__30748 = el;
var G__30749 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.js_obj,cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(properties,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1("")));
return goog.style.setStyle(G__30748,G__30749);
};
var wkf$site$unset_styles_BANG_ = function (el,var_args){
var properties = null;
if (arguments.length > 1) {
var G__30750__i = 0, G__30750__a = new Array(arguments.length -  1);
while (G__30750__i < G__30750__a.length) {G__30750__a[G__30750__i] = arguments[G__30750__i + 1]; ++G__30750__i;}
  properties = new cljs.core.IndexedSeq(G__30750__a,0);
} 
return wkf$site$unset_styles_BANG___delegate.call(this,el,properties);};
wkf$site$unset_styles_BANG_.cljs$lang$maxFixedArity = 1;
wkf$site$unset_styles_BANG_.cljs$lang$applyTo = (function (arglist__30751){
var el = cljs.core.first(arglist__30751);
var properties = cljs.core.rest(arglist__30751);
return wkf$site$unset_styles_BANG___delegate(el,properties);
});
wkf$site$unset_styles_BANG_.cljs$core$IFn$_invoke$arity$variadic = wkf$site$unset_styles_BANG___delegate;
return wkf$site$unset_styles_BANG_;
})()
;
wkf.site.absolutize_menu_nav_BANG_ = (function wkf$site$absolutize_menu_nav_BANG_(y){
return wkf.site.set_styles_BANG_.cljs$core$IFn$_invoke$arity$variadic(wkf.site.menu_nav,cljs.core.array_seq(["position","absolute","top",wkf.site.px(y)], 0));
});
wkf.site.absolutize_menu_hr_BANG_ = (function wkf$site$absolutize_menu_hr_BANG_(y){
var line_height = cljs.core.constant$keyword$line_DASH_height.cljs$core$IFn$_invoke$arity$1((function (){var G__30753 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30753) : cljs.core.deref.call(null,G__30753));
})());
var top = (y + (line_height * (2)));
return wkf.site.set_styles_BANG_.cljs$core$IFn$_invoke$arity$variadic(wkf.site.menu_hr,cljs.core.array_seq(["position","absolute","top",wkf.site.px(top)], 0));
});
wkf.site.position_BANG_ = (function wkf$site$position_BANG_(el,y){
return wkf.site.set_styles_BANG_.cljs$core$IFn$_invoke$arity$variadic(el,cljs.core.array_seq(["top",wkf.site.px(y)], 0));
});
wkf.site.unposition_BANG_ = (function wkf$site$unposition_BANG_(el){
return wkf.site.unset_styles_BANG_.cljs$core$IFn$_invoke$arity$variadic(el,cljs.core.array_seq(["top"], 0));
});
wkf.site.unabsolutize_BANG_ = (function wkf$site$unabsolutize_BANG_(el){
return wkf.site.unset_styles_BANG_.cljs$core$IFn$_invoke$arity$variadic(el,cljs.core.array_seq(["position","top"], 0));
});
wkf.site.on_click_page_ellipsis = (function wkf$site$on_click_page_ellipsis(e){
if(cljs.core.truth_(cljs.core.constant$keyword$menu_DASH_animating_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__30761 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30761) : cljs.core.deref.call(null,G__30761));
})()))){
return null;
} else {
var vec__30762 = wkf.site.get_scroll();
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30762,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30762,(1),null);
var map__30763 = (function (){var G__30764 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30764) : cljs.core.deref.call(null,G__30764));
})();
var map__30763__$1 = ((cljs.core.seq_QMARK_(map__30763))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__30763):map__30763);
var menu_scroll = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30763__$1,cljs.core.constant$keyword$menu_DASH_scroll);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$page_DASH_scroll,y,cljs.core.array_seq([cljs.core.constant$keyword$menu_DASH_animating_QMARK_,true], 0));

dommy.core.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,cljs.core.constant$keyword$showing_DASH_menu);

var G__30765_30768 = wkf.site.menu;
var G__30766_30769 = wkf.site.transition_end;
var G__30767_30770 = wkf.site.wrap_exact_target(((function (G__30765_30768,G__30766_30769,vec__30762,x,y,map__30763,map__30763__$1,menu_scroll){
return (function (e__$1){
console.log("on-click-page");

wkf.site.unabsolutize_BANG_(wkf.site.menu_nav);

wkf.site.unabsolutize_BANG_(wkf.site.menu_hr);

dommy.core.remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,cljs.core.constant$keyword$showing_DASH_menu);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$menu_DASH_showing_QMARK_,true,cljs.core.array_seq([cljs.core.constant$keyword$menu_DASH_animating_QMARK_,false], 0));
});})(G__30765_30768,G__30766_30769,vec__30762,x,y,map__30763,map__30763__$1,menu_scroll))
);
goog.events.listenOnce(G__30765_30768,G__30766_30769,G__30767_30770);

wkf.site.position_BANG_(wkf.site.page,(- y));

dommy.core.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,cljs.core.constant$keyword$show_DASH_menu);

wkf.site.unposition_BANG_(wkf.site.menu);

return wkf.site.scroll_to_BANG_(x,menu_scroll);
}
});
wkf.site.on_click_menu_ellipsis = (function wkf$site$on_click_menu_ellipsis(e){
if(cljs.core.truth_(cljs.core.constant$keyword$menu_DASH_animating_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__30779 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30779) : cljs.core.deref.call(null,G__30779));
})()))){
return null;
} else {
var vec__30780 = wkf.site.get_scroll();
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30780,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30780,(1),null);
var map__30781 = (function (){var G__30783 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30783) : cljs.core.deref.call(null,G__30783));
})();
var map__30781__$1 = ((cljs.core.seq_QMARK_(map__30781))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__30781):map__30781);
var menu_thresholds = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30781__$1,cljs.core.constant$keyword$menu_DASH_thresholds);
var page_scroll = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30781__$1,cljs.core.constant$keyword$page_DASH_scroll);
var at_large_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30781__$1,cljs.core.constant$keyword$at_DASH_large_QMARK_);
var map__30782 = menu_thresholds;
var map__30782__$1 = ((cljs.core.seq_QMARK_(map__30782))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__30782):map__30782);
var fix_menu_hr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30782__$1,cljs.core.constant$keyword$fix_DASH_menu_DASH_hr);
var fix_menu_nav = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30782__$1,cljs.core.constant$keyword$fix_DASH_menu_DASH_nav);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$menu_DASH_scroll,y,cljs.core.array_seq([cljs.core.constant$keyword$menu_DASH_animating_QMARK_,true], 0));

if((y >= fix_menu_nav)){
wkf.site.absolutize_menu_nav_BANG_(y);
} else {
}

if(((y >= fix_menu_hr)) && (cljs.core.not(at_large_QMARK_))){
wkf.site.absolutize_menu_hr_BANG_(y);
} else {
}

dommy.core.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,cljs.core.constant$keyword$hiding_DASH_menu);

var G__30784_30787 = wkf.site.menu;
var G__30785_30788 = wkf.site.transition_end;
var G__30786_30789 = wkf.site.wrap_exact_target(((function (G__30784_30787,G__30785_30788,vec__30780,x,y,map__30781,map__30781__$1,menu_thresholds,page_scroll,at_large_QMARK_,map__30782,map__30782__$1,fix_menu_hr,fix_menu_nav){
return (function (e__$1){
console.log("on-click-menu");

dommy.core.remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,cljs.core.constant$keyword$hiding_DASH_menu);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$menu_DASH_showing_QMARK_,false,cljs.core.array_seq([cljs.core.constant$keyword$menu_DASH_animating_QMARK_,false], 0));
});})(G__30784_30787,G__30785_30788,vec__30780,x,y,map__30781,map__30781__$1,menu_thresholds,page_scroll,at_large_QMARK_,map__30782,map__30782__$1,fix_menu_hr,fix_menu_nav))
);
goog.events.listenOnce(G__30784_30787,G__30785_30788,G__30786_30789);

wkf.site.position_BANG_(wkf.site.menu,(- y));

dommy.core.remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,cljs.core.constant$keyword$show_DASH_menu);

wkf.site.unposition_BANG_(wkf.site.page);

return wkf.site.scroll_to_BANG_(x,page_scroll);
}
});
wkf.site.handlers = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [window,"resize",wkf.site.on_resize], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [window,"scroll",wkf.site.on_scroll], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [wkf.site.page_ellipsis,"click",wkf.site.wrap_prevent_default(wkf.site.on_click_page_ellipsis)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [wkf.site.menu_ellipsis,"click",wkf.site.wrap_prevent_default(wkf.site.on_click_menu_ellipsis)], null)], null);
/**
 * Start the site. Attempt to be idempotent.
 */
wkf.site.start = (function wkf$site$start(){
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__30803 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30803) : cljs.core.deref.call(null,G__30803));
})()))){
return null;
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$running_QMARK_,true);

var seq__30804_30816 = cljs.core.seq(wkf.site.handlers);
var chunk__30805_30817 = null;
var count__30806_30818 = (0);
var i__30807_30819 = (0);
while(true){
if((i__30807_30819 < count__30806_30818)){
var vec__30808_30820 = chunk__30805_30817.cljs$core$IIndexed$_nth$arity$2(null,i__30807_30819);
var el_30821 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30808_30820,(0),null);
var type_30822 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30808_30820,(1),null);
var f_30823 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30808_30820,(2),null);
var G__30809_30824 = el_30821;
var G__30810_30825 = type_30822;
var G__30811_30826 = f_30823;
goog.events.listen(G__30809_30824,G__30810_30825,G__30811_30826);

var G__30827 = seq__30804_30816;
var G__30828 = chunk__30805_30817;
var G__30829 = count__30806_30818;
var G__30830 = (i__30807_30819 + (1));
seq__30804_30816 = G__30827;
chunk__30805_30817 = G__30828;
count__30806_30818 = G__30829;
i__30807_30819 = G__30830;
continue;
} else {
var temp__4126__auto___30831 = cljs.core.seq(seq__30804_30816);
if(temp__4126__auto___30831){
var seq__30804_30832__$1 = temp__4126__auto___30831;
if(cljs.core.chunked_seq_QMARK_(seq__30804_30832__$1)){
var c__24962__auto___30833 = cljs.core.chunk_first(seq__30804_30832__$1);
var G__30834 = cljs.core.chunk_rest(seq__30804_30832__$1);
var G__30835 = c__24962__auto___30833;
var G__30836 = cljs.core.count(c__24962__auto___30833);
var G__30837 = (0);
seq__30804_30816 = G__30834;
chunk__30805_30817 = G__30835;
count__30806_30818 = G__30836;
i__30807_30819 = G__30837;
continue;
} else {
var vec__30812_30838 = cljs.core.first(seq__30804_30832__$1);
var el_30839 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30812_30838,(0),null);
var type_30840 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30812_30838,(1),null);
var f_30841 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30812_30838,(2),null);
var G__30813_30842 = el_30839;
var G__30814_30843 = type_30840;
var G__30815_30844 = f_30841;
goog.events.listen(G__30813_30842,G__30814_30843,G__30815_30844);

var G__30845 = cljs.core.next(seq__30804_30832__$1);
var G__30846 = null;
var G__30847 = (0);
var G__30848 = (0);
seq__30804_30816 = G__30845;
chunk__30805_30817 = G__30846;
count__30806_30818 = G__30847;
i__30807_30819 = G__30848;
continue;
}
} else {
}
}
break;
}

wkf.site.on_resize(null);

return wkf.site.on_scroll(null);
}
});
/**
 * Stop the site. Attempt to be idempotent. Useful for interactive local development.
 */
wkf.site.stop = (function wkf$site$stop(){
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__30862 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30862) : cljs.core.deref.call(null,G__30862));
})()))){
var G__30863_30875 = wkf.site.site;
var G__30864_30876 = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.constant$keyword$running_QMARK_,false], null);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__30863_30875,G__30864_30876) : cljs.core.reset_BANG_.call(null,G__30863_30875,G__30864_30876));

var seq__30865 = cljs.core.seq(wkf.site.handlers);
var chunk__30866 = null;
var count__30867 = (0);
var i__30868 = (0);
while(true){
if((i__30868 < count__30867)){
var vec__30869 = chunk__30866.cljs$core$IIndexed$_nth$arity$2(null,i__30868);
var el = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30869,(0),null);
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30869,(1),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30869,(2),null);
var G__30870_30877 = el;
var G__30871_30878 = type;
goog.events.removeAll(G__30870_30877,G__30871_30878);

var G__30879 = seq__30865;
var G__30880 = chunk__30866;
var G__30881 = count__30867;
var G__30882 = (i__30868 + (1));
seq__30865 = G__30879;
chunk__30866 = G__30880;
count__30867 = G__30881;
i__30868 = G__30882;
continue;
} else {
var temp__4126__auto__ = cljs.core.seq(seq__30865);
if(temp__4126__auto__){
var seq__30865__$1 = temp__4126__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__30865__$1)){
var c__24962__auto__ = cljs.core.chunk_first(seq__30865__$1);
var G__30883 = cljs.core.chunk_rest(seq__30865__$1);
var G__30884 = c__24962__auto__;
var G__30885 = cljs.core.count(c__24962__auto__);
var G__30886 = (0);
seq__30865 = G__30883;
chunk__30866 = G__30884;
count__30867 = G__30885;
i__30868 = G__30886;
continue;
} else {
var vec__30872 = cljs.core.first(seq__30865__$1);
var el = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30872,(0),null);
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30872,(1),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30872,(2),null);
var G__30873_30887 = el;
var G__30874_30888 = type;
goog.events.removeAll(G__30873_30887,G__30874_30888);

var G__30889 = cljs.core.next(seq__30865__$1);
var G__30890 = null;
var G__30891 = (0);
var G__30892 = (0);
seq__30865 = G__30889;
chunk__30866 = G__30890;
count__30867 = G__30891;
i__30868 = G__30892;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
});
wkf.site.start();
