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
if(cljs.core.truth_(cljs.core.constant$keyword$menu_DASH_animating_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__30758 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30758) : cljs.core.deref.call(null,G__30758));
})()))){
return null;
} else {
var vec__30759 = wkf.site.get_scroll();
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30759,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30759,(1),null);
var map__30760 = (function (){var G__30761 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30761) : cljs.core.deref.call(null,G__30761));
})();
var map__30760__$1 = ((cljs.core.seq_QMARK_(map__30760))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__30760):map__30760);
var menu_scroll = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30760__$1,cljs.core.constant$keyword$menu_DASH_scroll);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$page_DASH_scroll,y,cljs.core.array_seq([cljs.core.constant$keyword$menu_DASH_animating_QMARK_,true], 0));

dommy.core.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,cljs.core.constant$keyword$showing_DASH_menu);

wkf.site.position_BANG_(wkf.site.page,(- y));

dommy.core.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,cljs.core.constant$keyword$show_DASH_menu);

wkf.site.unposition_BANG_(wkf.site.menu);

return wkf.site.scroll_to_BANG_(x,menu_scroll);
}
});
wkf.site.on_click_menu_ellipsis = (function wkf$site$on_click_menu_ellipsis(e){
if(cljs.core.truth_(cljs.core.constant$keyword$menu_DASH_animating_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__30767 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30767) : cljs.core.deref.call(null,G__30767));
})()))){
return null;
} else {
var vec__30768 = wkf.site.get_scroll();
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30768,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30768,(1),null);
var map__30769 = (function (){var G__30771 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30771) : cljs.core.deref.call(null,G__30771));
})();
var map__30769__$1 = ((cljs.core.seq_QMARK_(map__30769))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__30769):map__30769);
var menu_thresholds = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30769__$1,cljs.core.constant$keyword$menu_DASH_thresholds);
var page_scroll = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30769__$1,cljs.core.constant$keyword$page_DASH_scroll);
var at_large_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30769__$1,cljs.core.constant$keyword$at_DASH_large_QMARK_);
var map__30770 = menu_thresholds;
var map__30770__$1 = ((cljs.core.seq_QMARK_(map__30770))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__30770):map__30770);
var fix_menu_hr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30770__$1,cljs.core.constant$keyword$fix_DASH_menu_DASH_hr);
var fix_menu_nav = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30770__$1,cljs.core.constant$keyword$fix_DASH_menu_DASH_nav);
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

wkf.site.position_BANG_(wkf.site.menu,(- y));

dommy.core.remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,cljs.core.constant$keyword$show_DASH_menu);

wkf.site.unposition_BANG_(wkf.site.page);

return wkf.site.scroll_to_BANG_(x,page_scroll);
}
});
wkf.site.on_transition_end = (function wkf$site$on_transition_end(e){
if(cljs.core.truth_(cljs.core.constant$keyword$menu_DASH_animating_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__30774 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30774) : cljs.core.deref.call(null,G__30774));
})()))){
if(cljs.core.truth_(cljs.core.constant$keyword$menu_DASH_showing_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__30775 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30775) : cljs.core.deref.call(null,G__30775));
})()))){
dommy.core.remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,cljs.core.constant$keyword$hiding_DASH_menu);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$menu_DASH_showing_QMARK_,false);
} else {
wkf.site.unabsolutize_BANG_(wkf.site.menu_nav);

wkf.site.unabsolutize_BANG_(wkf.site.menu_hr);

dommy.core.remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,cljs.core.constant$keyword$showing_DASH_menu);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$menu_DASH_showing_QMARK_,true);
}

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$menu_DASH_animating_QMARK_,false);
} else {
return null;
}
});
wkf.site.handlers = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [window,"resize",wkf.site.on_resize], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [window,"scroll",wkf.site.on_scroll], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [wkf.site.menu,wkf.site.transition_end,wkf.site.wrap_exact_target(wkf.site.on_transition_end)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [wkf.site.page_ellipsis,"click",wkf.site.wrap_prevent_default(wkf.site.on_click_page_ellipsis)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [wkf.site.menu_ellipsis,"click",wkf.site.wrap_prevent_default(wkf.site.on_click_menu_ellipsis)], null)], null);
/**
 * Start the site. Attempt to be idempotent.
 */
wkf.site.start = (function wkf$site$start(){
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__30789 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30789) : cljs.core.deref.call(null,G__30789));
})()))){
return null;
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$running_QMARK_,true);

var seq__30790_30802 = cljs.core.seq(wkf.site.handlers);
var chunk__30791_30803 = null;
var count__30792_30804 = (0);
var i__30793_30805 = (0);
while(true){
if((i__30793_30805 < count__30792_30804)){
var vec__30794_30806 = chunk__30791_30803.cljs$core$IIndexed$_nth$arity$2(null,i__30793_30805);
var el_30807 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30794_30806,(0),null);
var type_30808 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30794_30806,(1),null);
var f_30809 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30794_30806,(2),null);
var G__30795_30810 = el_30807;
var G__30796_30811 = type_30808;
var G__30797_30812 = f_30809;
goog.events.listen(G__30795_30810,G__30796_30811,G__30797_30812);

var G__30813 = seq__30790_30802;
var G__30814 = chunk__30791_30803;
var G__30815 = count__30792_30804;
var G__30816 = (i__30793_30805 + (1));
seq__30790_30802 = G__30813;
chunk__30791_30803 = G__30814;
count__30792_30804 = G__30815;
i__30793_30805 = G__30816;
continue;
} else {
var temp__4126__auto___30817 = cljs.core.seq(seq__30790_30802);
if(temp__4126__auto___30817){
var seq__30790_30818__$1 = temp__4126__auto___30817;
if(cljs.core.chunked_seq_QMARK_(seq__30790_30818__$1)){
var c__24962__auto___30819 = cljs.core.chunk_first(seq__30790_30818__$1);
var G__30820 = cljs.core.chunk_rest(seq__30790_30818__$1);
var G__30821 = c__24962__auto___30819;
var G__30822 = cljs.core.count(c__24962__auto___30819);
var G__30823 = (0);
seq__30790_30802 = G__30820;
chunk__30791_30803 = G__30821;
count__30792_30804 = G__30822;
i__30793_30805 = G__30823;
continue;
} else {
var vec__30798_30824 = cljs.core.first(seq__30790_30818__$1);
var el_30825 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30798_30824,(0),null);
var type_30826 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30798_30824,(1),null);
var f_30827 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30798_30824,(2),null);
var G__30799_30828 = el_30825;
var G__30800_30829 = type_30826;
var G__30801_30830 = f_30827;
goog.events.listen(G__30799_30828,G__30800_30829,G__30801_30830);

var G__30831 = cljs.core.next(seq__30790_30818__$1);
var G__30832 = null;
var G__30833 = (0);
var G__30834 = (0);
seq__30790_30802 = G__30831;
chunk__30791_30803 = G__30832;
count__30792_30804 = G__30833;
i__30793_30805 = G__30834;
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
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__30848 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30848) : cljs.core.deref.call(null,G__30848));
})()))){
var G__30849_30861 = wkf.site.site;
var G__30850_30862 = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.constant$keyword$running_QMARK_,false], null);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__30849_30861,G__30850_30862) : cljs.core.reset_BANG_.call(null,G__30849_30861,G__30850_30862));

var seq__30851 = cljs.core.seq(wkf.site.handlers);
var chunk__30852 = null;
var count__30853 = (0);
var i__30854 = (0);
while(true){
if((i__30854 < count__30853)){
var vec__30855 = chunk__30852.cljs$core$IIndexed$_nth$arity$2(null,i__30854);
var el = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30855,(0),null);
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30855,(1),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30855,(2),null);
var G__30856_30863 = el;
var G__30857_30864 = type;
goog.events.removeAll(G__30856_30863,G__30857_30864);

var G__30865 = seq__30851;
var G__30866 = chunk__30852;
var G__30867 = count__30853;
var G__30868 = (i__30854 + (1));
seq__30851 = G__30865;
chunk__30852 = G__30866;
count__30853 = G__30867;
i__30854 = G__30868;
continue;
} else {
var temp__4126__auto__ = cljs.core.seq(seq__30851);
if(temp__4126__auto__){
var seq__30851__$1 = temp__4126__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__30851__$1)){
var c__24962__auto__ = cljs.core.chunk_first(seq__30851__$1);
var G__30869 = cljs.core.chunk_rest(seq__30851__$1);
var G__30870 = c__24962__auto__;
var G__30871 = cljs.core.count(c__24962__auto__);
var G__30872 = (0);
seq__30851 = G__30869;
chunk__30852 = G__30870;
count__30853 = G__30871;
i__30854 = G__30872;
continue;
} else {
var vec__30858 = cljs.core.first(seq__30851__$1);
var el = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30858,(0),null);
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30858,(1),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30858,(2),null);
var G__30859_30873 = el;
var G__30860_30874 = type;
goog.events.removeAll(G__30859_30873,G__30860_30874);

var G__30875 = cljs.core.next(seq__30851__$1);
var G__30876 = null;
var G__30877 = (0);
var G__30878 = (0);
seq__30851 = G__30875;
chunk__30852 = G__30876;
count__30853 = G__30877;
i__30854 = G__30878;
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
