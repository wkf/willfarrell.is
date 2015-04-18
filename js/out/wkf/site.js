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
wkf.site.site = (function (){var G__30651 = cljs.core.PersistentHashMap.fromArrays([cljs.core.constant$keyword$line_DASH_height,cljs.core.constant$keyword$page_DASH_scroll,cljs.core.constant$keyword$running_QMARK_,cljs.core.constant$keyword$page_DASH_thresholds,cljs.core.constant$keyword$scroll_DASH_width,cljs.core.constant$keyword$menu_DASH_animating_QMARK_,cljs.core.constant$keyword$menu_DASH_scroll,cljs.core.constant$keyword$wrapper_DASH_width,cljs.core.constant$keyword$menu_DASH_showing_QMARK_,cljs.core.constant$keyword$menu_DASH_thresholds],[(0),(0),false,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$fix_DASH_page_DASH_nav,(0),cljs.core.constant$keyword$fix_DASH_page_DASH_hr,(0)], null),(0),false,(0),(0),false,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$fix_DASH_menu_DASH_nav,(0),cljs.core.constant$keyword$fix_DASH_menu_DASH_hr,(0)], null)]);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__30651) : cljs.core.atom.call(null,G__30651));
})();
}
wkf.site.html = (dommy.utils.__GT_Array(document.getElementsByTagName("html"))[(0)]);
wkf.site.body = document.body;
wkf.site.page = (dommy.utils.__GT_Array(document.getElementsByClassName("page"))[(0)]);
wkf.site.page_wrapper = (dommy.utils.__GT_Array(document.getElementsByClassName("wrapper"))[(0)]);
wkf.site.page_nav = (dommy.utils.__GT_Array(wkf.site.page.getElementsByTagName("nav"))[(0)]);
wkf.site.page_ellipsis = (dommy.utils.__GT_Array(wkf.site.page.getElementsByClassName("ellipsis"))[(0)]);
wkf.site.page_header = (dommy.utils.__GT_Array(wkf.site.page.getElementsByTagName("header"))[(0)]);
wkf.site.page_hr = (dommy.utils.__GT_Array(wkf.site.page_header.getElementsByTagName("hr"))[(0)]);
wkf.site.menu = (dommy.utils.__GT_Array(document.getElementsByClassName("menu"))[(0)]);
wkf.site.menu_wrapper = (dommy.utils.__GT_Array(wkf.site.menu.getElementsByClassName("wrapper"))[(0)]);
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
var size = (function (){var G__30653 = el;
return goog.style.getSize(G__30653);
})();
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [size.width,size.height], null);
});
wkf.site.px = (function wkf$site$px(n){
return [cljs.core.str(n),cljs.core.str("px")].join('');
});
wkf.site.scroll_BANG_ = (function wkf$site$scroll_BANG_(x,y){
return window.scroll(x,y);
});
/**
 * A hacky way to get the line height.
 * Relies on the nav being 2 line-heights tall.
 * Silly
 */
wkf.site.measure_line_height = (function wkf$site$measure_line_height(){
return ((function (){var G__30655 = wkf.site.page_nav;
return goog.style.getSize(G__30655);
})().height / (2));
});
wkf.site.measure_scroll_width = (function wkf$site$measure_scroll_width(){
return goog.style.getScrollbarWidth();
});
wkf.site.measure_window_width = (function wkf$site$measure_window_width(){
return window.innerWidth;
});
wkf.site.measure_wrapper_width = (function wkf$site$measure_wrapper_width(window_width,scroll_width){
return (window_width - scroll_width);
});
wkf.site.measure_page_thresholds = (function wkf$site$measure_page_thresholds(line_height){
var vec__30657 = wkf.site.get_size(wkf.site.page_header);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30657,(0),null);
var page_header_height = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30657,(1),null);
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$fix_DASH_page_DASH_nav,line_height,cljs.core.constant$keyword$fix_DASH_page_DASH_hr,(page_header_height - (line_height * (3)))], null);
});
wkf.site.measure_menu_thresholds = (function wkf$site$measure_menu_thresholds(line_height){
var vec__30659 = wkf.site.get_size(wkf.site.menu_header);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30659,(0),null);
var menu_header_height = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30659,(1),null);
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$fix_DASH_menu_DASH_nav,line_height,cljs.core.constant$keyword$fix_DASH_menu_DASH_hr,(menu_header_height - (line_height * (3)))], null);
});
wkf.site.cache_measurements_BANG_ = (function wkf$site$cache_measurements_BANG_(){
var line_height = wkf.site.measure_line_height();
var scroll_width = wkf.site.measure_scroll_width();
var window_width = wkf.site.measure_window_width();
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$at_DASH_large_QMARK_,(window_width >= (860)),cljs.core.array_seq([cljs.core.constant$keyword$at_DASH_medium_QMARK_,(window_width >= (680)),cljs.core.constant$keyword$at_DASH_small_QMARK_,(window_width >= (460)),cljs.core.constant$keyword$line_DASH_height,line_height,cljs.core.constant$keyword$scroll_DASH_width,scroll_width,cljs.core.constant$keyword$window_DASH_width,window_width,cljs.core.constant$keyword$wrapper_DASH_width,wkf.site.measure_wrapper_width(window_width,scroll_width),cljs.core.constant$keyword$page_DASH_thresholds,wkf.site.measure_page_thresholds(line_height),cljs.core.constant$keyword$menu_DASH_thresholds,wkf.site.measure_menu_thresholds(line_height)], 0));
});
wkf.site.on_scroll = (function wkf$site$on_scroll(e){
var map__30678 = (function (){var G__30681 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30681) : cljs.core.deref.call(null,G__30681));
})();
var map__30678__$1 = ((cljs.core.seq_QMARK_(map__30678))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__30678):map__30678);
var menu_animating_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30678__$1,cljs.core.constant$keyword$menu_DASH_animating_QMARK_);
var menu_showing_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30678__$1,cljs.core.constant$keyword$menu_DASH_showing_QMARK_);
var menu_scroll = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30678__$1,cljs.core.constant$keyword$menu_DASH_scroll);
var page_scroll = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30678__$1,cljs.core.constant$keyword$page_DASH_scroll);
var vec__30679 = wkf.site.get_scroll();
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30679,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30679,(1),null);
var vec__30680 = (cljs.core.truth_(menu_animating_QMARK_)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [page_scroll,menu_scroll], null):(cljs.core.truth_(menu_showing_QMARK_)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [page_scroll,y], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [y,menu_scroll], null)
));
var page_scroll_SINGLEQUOTE_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30680,(0),null);
var menu_scroll_SINGLEQUOTE_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30680,(1),null);
var seq__30682_30696 = cljs.core.seq(cljs.core.constant$keyword$page_DASH_thresholds.cljs$core$IFn$_invoke$arity$1((function (){var G__30686 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30686) : cljs.core.deref.call(null,G__30686));
})()));
var chunk__30683_30697 = null;
var count__30684_30698 = (0);
var i__30685_30699 = (0);
while(true){
if((i__30685_30699 < count__30684_30698)){
var vec__30687_30700 = chunk__30683_30697.cljs$core$IIndexed$_nth$arity$2(null,i__30685_30699);
var c_30701 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30687_30700,(0),null);
var threshold_30702 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30687_30700,(1),null);
if((page_scroll_SINGLEQUOTE_ >= threshold_30702)){
dommy.core.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,c_30701);
} else {
dommy.core.remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,c_30701);
}

var G__30703 = seq__30682_30696;
var G__30704 = chunk__30683_30697;
var G__30705 = count__30684_30698;
var G__30706 = (i__30685_30699 + (1));
seq__30682_30696 = G__30703;
chunk__30683_30697 = G__30704;
count__30684_30698 = G__30705;
i__30685_30699 = G__30706;
continue;
} else {
var temp__4126__auto___30707 = cljs.core.seq(seq__30682_30696);
if(temp__4126__auto___30707){
var seq__30682_30708__$1 = temp__4126__auto___30707;
if(cljs.core.chunked_seq_QMARK_(seq__30682_30708__$1)){
var c__24968__auto___30709 = cljs.core.chunk_first(seq__30682_30708__$1);
var G__30710 = cljs.core.chunk_rest(seq__30682_30708__$1);
var G__30711 = c__24968__auto___30709;
var G__30712 = cljs.core.count(c__24968__auto___30709);
var G__30713 = (0);
seq__30682_30696 = G__30710;
chunk__30683_30697 = G__30711;
count__30684_30698 = G__30712;
i__30685_30699 = G__30713;
continue;
} else {
var vec__30688_30714 = cljs.core.first(seq__30682_30708__$1);
var c_30715 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30688_30714,(0),null);
var threshold_30716 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30688_30714,(1),null);
if((page_scroll_SINGLEQUOTE_ >= threshold_30716)){
dommy.core.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,c_30715);
} else {
dommy.core.remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,c_30715);
}

var G__30717 = cljs.core.next(seq__30682_30708__$1);
var G__30718 = null;
var G__30719 = (0);
var G__30720 = (0);
seq__30682_30696 = G__30717;
chunk__30683_30697 = G__30718;
count__30684_30698 = G__30719;
i__30685_30699 = G__30720;
continue;
}
} else {
}
}
break;
}

var seq__30689 = cljs.core.seq(cljs.core.constant$keyword$menu_DASH_thresholds.cljs$core$IFn$_invoke$arity$1((function (){var G__30693 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30693) : cljs.core.deref.call(null,G__30693));
})()));
var chunk__30690 = null;
var count__30691 = (0);
var i__30692 = (0);
while(true){
if((i__30692 < count__30691)){
var vec__30694 = chunk__30690.cljs$core$IIndexed$_nth$arity$2(null,i__30692);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30694,(0),null);
var threshold = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30694,(1),null);
if((menu_scroll_SINGLEQUOTE_ >= threshold)){
dommy.core.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,c);
} else {
dommy.core.remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,c);
}

var G__30721 = seq__30689;
var G__30722 = chunk__30690;
var G__30723 = count__30691;
var G__30724 = (i__30692 + (1));
seq__30689 = G__30721;
chunk__30690 = G__30722;
count__30691 = G__30723;
i__30692 = G__30724;
continue;
} else {
var temp__4126__auto__ = cljs.core.seq(seq__30689);
if(temp__4126__auto__){
var seq__30689__$1 = temp__4126__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__30689__$1)){
var c__24968__auto__ = cljs.core.chunk_first(seq__30689__$1);
var G__30725 = cljs.core.chunk_rest(seq__30689__$1);
var G__30726 = c__24968__auto__;
var G__30727 = cljs.core.count(c__24968__auto__);
var G__30728 = (0);
seq__30689 = G__30725;
chunk__30690 = G__30726;
count__30691 = G__30727;
i__30692 = G__30728;
continue;
} else {
var vec__30695 = cljs.core.first(seq__30689__$1);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30695,(0),null);
var threshold = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30695,(1),null);
if((menu_scroll_SINGLEQUOTE_ >= threshold)){
dommy.core.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,c);
} else {
dommy.core.remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,c);
}

var G__30729 = cljs.core.next(seq__30689__$1);
var G__30730 = null;
var G__30731 = (0);
var G__30732 = (0);
seq__30689 = G__30729;
chunk__30690 = G__30730;
count__30691 = G__30731;
i__30692 = G__30732;
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

var seq__30745_30757 = cljs.core.seq(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [wkf.site.page_wrapper,wkf.site.menu_wrapper], null));
var chunk__30746_30758 = null;
var count__30747_30759 = (0);
var i__30748_30760 = (0);
while(true){
if((i__30748_30760 < count__30747_30759)){
var el_30761 = chunk__30746_30758.cljs$core$IIndexed$_nth$arity$2(null,i__30748_30760);
var G__30749_30762 = el_30761;
var G__30750_30763 = "width";
var G__30751_30764 = wkf.site.px(cljs.core.constant$keyword$wrapper_DASH_width.cljs$core$IFn$_invoke$arity$1((function (){var G__30752 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30752) : cljs.core.deref.call(null,G__30752));
})()));
goog.style.setStyle(G__30749_30762,G__30750_30763,G__30751_30764);

var G__30765 = seq__30745_30757;
var G__30766 = chunk__30746_30758;
var G__30767 = count__30747_30759;
var G__30768 = (i__30748_30760 + (1));
seq__30745_30757 = G__30765;
chunk__30746_30758 = G__30766;
count__30747_30759 = G__30767;
i__30748_30760 = G__30768;
continue;
} else {
var temp__4126__auto___30769 = cljs.core.seq(seq__30745_30757);
if(temp__4126__auto___30769){
var seq__30745_30770__$1 = temp__4126__auto___30769;
if(cljs.core.chunked_seq_QMARK_(seq__30745_30770__$1)){
var c__24968__auto___30771 = cljs.core.chunk_first(seq__30745_30770__$1);
var G__30772 = cljs.core.chunk_rest(seq__30745_30770__$1);
var G__30773 = c__24968__auto___30771;
var G__30774 = cljs.core.count(c__24968__auto___30771);
var G__30775 = (0);
seq__30745_30757 = G__30772;
chunk__30746_30758 = G__30773;
count__30747_30759 = G__30774;
i__30748_30760 = G__30775;
continue;
} else {
var el_30776 = cljs.core.first(seq__30745_30770__$1);
var G__30753_30777 = el_30776;
var G__30754_30778 = "width";
var G__30755_30779 = wkf.site.px(cljs.core.constant$keyword$wrapper_DASH_width.cljs$core$IFn$_invoke$arity$1((function (){var G__30756 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30756) : cljs.core.deref.call(null,G__30756));
})()));
goog.style.setStyle(G__30753_30777,G__30754_30778,G__30755_30779);

var G__30780 = cljs.core.next(seq__30745_30770__$1);
var G__30781 = null;
var G__30782 = (0);
var G__30783 = (0);
seq__30745_30757 = G__30780;
chunk__30746_30758 = G__30781;
count__30747_30759 = G__30782;
i__30748_30760 = G__30783;
continue;
}
} else {
}
}
break;
}

return wkf.site.on_scroll(null);
});
wkf.site.wrap_prevent_default = (function wkf$site$wrap_prevent_default(f){
return (function (e){
e.preventDefault();

var G__30785_30786 = e;
(f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__30785_30786) : f.call(null,G__30785_30786));

return false;
});
});
wkf.site.wrap_exact_target = (function wkf$site$wrap_exact_target(f){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(e.target,e.currentTarget)){
var G__30788 = e;
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__30788) : f.call(null,G__30788));
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
var G__30791 = el;
var G__30792 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.js_obj,properties);
return goog.style.setStyle(G__30791,G__30792);
};
var wkf$site$set_styles_BANG_ = function (el,var_args){
var properties = null;
if (arguments.length > 1) {
var G__30793__i = 0, G__30793__a = new Array(arguments.length -  1);
while (G__30793__i < G__30793__a.length) {G__30793__a[G__30793__i] = arguments[G__30793__i + 1]; ++G__30793__i;}
  properties = new cljs.core.IndexedSeq(G__30793__a,0);
} 
return wkf$site$set_styles_BANG___delegate.call(this,el,properties);};
wkf$site$set_styles_BANG_.cljs$lang$maxFixedArity = 1;
wkf$site$set_styles_BANG_.cljs$lang$applyTo = (function (arglist__30794){
var el = cljs.core.first(arglist__30794);
var properties = cljs.core.rest(arglist__30794);
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
var G__30797 = el;
var G__30798 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.js_obj,cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(properties,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1("")));
return goog.style.setStyle(G__30797,G__30798);
};
var wkf$site$unset_styles_BANG_ = function (el,var_args){
var properties = null;
if (arguments.length > 1) {
var G__30799__i = 0, G__30799__a = new Array(arguments.length -  1);
while (G__30799__i < G__30799__a.length) {G__30799__a[G__30799__i] = arguments[G__30799__i + 1]; ++G__30799__i;}
  properties = new cljs.core.IndexedSeq(G__30799__a,0);
} 
return wkf$site$unset_styles_BANG___delegate.call(this,el,properties);};
wkf$site$unset_styles_BANG_.cljs$lang$maxFixedArity = 1;
wkf$site$unset_styles_BANG_.cljs$lang$applyTo = (function (arglist__30800){
var el = cljs.core.first(arglist__30800);
var properties = cljs.core.rest(arglist__30800);
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
var line_height = cljs.core.constant$keyword$line_DASH_height.cljs$core$IFn$_invoke$arity$1((function (){var G__30802 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30802) : cljs.core.deref.call(null,G__30802));
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
if(cljs.core.truth_(cljs.core.constant$keyword$menu_DASH_animating_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__30807 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30807) : cljs.core.deref.call(null,G__30807));
})()))){
return null;
} else {
var vec__30808 = wkf.site.get_scroll();
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30808,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30808,(1),null);
var map__30809 = (function (){var G__30810 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30810) : cljs.core.deref.call(null,G__30810));
})();
var map__30809__$1 = ((cljs.core.seq_QMARK_(map__30809))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__30809):map__30809);
var menu_scroll = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30809__$1,cljs.core.constant$keyword$menu_DASH_scroll);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$page_DASH_scroll,y,cljs.core.array_seq([cljs.core.constant$keyword$menu_DASH_animating_QMARK_,true], 0));

wkf.site.position_BANG_(wkf.site.page,(- y));

dommy.core.add_class_BANG_.cljs$core$IFn$_invoke$arity$variadic(wkf.site.html,cljs.core.constant$keyword$show_DASH_menu,cljs.core.array_seq([cljs.core.constant$keyword$showing_DASH_menu], 0));

wkf.site.unposition_BANG_(wkf.site.menu);

return wkf.site.scroll_BANG_(x,menu_scroll);
}
});
wkf.site.on_click_menu_ellipsis = (function wkf$site$on_click_menu_ellipsis(e){
if(cljs.core.truth_(cljs.core.constant$keyword$menu_DASH_animating_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__30816 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30816) : cljs.core.deref.call(null,G__30816));
})()))){
return null;
} else {
var vec__30817 = wkf.site.get_scroll();
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30817,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30817,(1),null);
var map__30818 = (function (){var G__30820 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30820) : cljs.core.deref.call(null,G__30820));
})();
var map__30818__$1 = ((cljs.core.seq_QMARK_(map__30818))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__30818):map__30818);
var menu_thresholds = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30818__$1,cljs.core.constant$keyword$menu_DASH_thresholds);
var page_scroll = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30818__$1,cljs.core.constant$keyword$page_DASH_scroll);
var at_large_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30818__$1,cljs.core.constant$keyword$at_DASH_large_QMARK_);
var map__30819 = menu_thresholds;
var map__30819__$1 = ((cljs.core.seq_QMARK_(map__30819))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__30819):map__30819);
var fix_menu_hr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30819__$1,cljs.core.constant$keyword$fix_DASH_menu_DASH_hr);
var fix_menu_nav = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30819__$1,cljs.core.constant$keyword$fix_DASH_menu_DASH_nav);
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

return wkf.site.scroll_BANG_(x,page_scroll);
}
});
wkf.site.on_transition_end = (function wkf$site$on_transition_end(e){
if(cljs.core.truth_(cljs.core.constant$keyword$menu_DASH_animating_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__30823 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30823) : cljs.core.deref.call(null,G__30823));
})()))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$menu_DASH_animating_QMARK_,false);

if(cljs.core.truth_(cljs.core.constant$keyword$menu_DASH_showing_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__30824 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30824) : cljs.core.deref.call(null,G__30824));
})()))){
dommy.core.remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,cljs.core.constant$keyword$hiding_DASH_menu);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$menu_DASH_showing_QMARK_,false);
} else {
wkf.site.unabsolutize_BANG_(wkf.site.menu_nav);

wkf.site.unabsolutize_BANG_(wkf.site.menu_hr);

dommy.core.remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,cljs.core.constant$keyword$showing_DASH_menu);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$menu_DASH_showing_QMARK_,true);
}
} else {
return null;
}
});
wkf.site.handlers = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [window,"resize",wkf.site.on_resize], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [window,"scroll",wkf.site.on_scroll], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [wkf.site.menu,wkf.site.transition_end,wkf.site.wrap_exact_target(wkf.site.on_transition_end)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [wkf.site.page_ellipsis,"click",wkf.site.wrap_prevent_default(wkf.site.on_click_page_ellipsis)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [wkf.site.menu_ellipsis,"click",wkf.site.wrap_prevent_default(wkf.site.on_click_menu_ellipsis)], null)], null);
/**
 * Start the site. Attempt to be idempotent.
 */
wkf.site.start = (function wkf$site$start(){
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__30838 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30838) : cljs.core.deref.call(null,G__30838));
})()))){
return null;
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$running_QMARK_,true);

FastClick.attach(document.body);

var seq__30839_30851 = cljs.core.seq(wkf.site.handlers);
var chunk__30840_30852 = null;
var count__30841_30853 = (0);
var i__30842_30854 = (0);
while(true){
if((i__30842_30854 < count__30841_30853)){
var vec__30843_30855 = chunk__30840_30852.cljs$core$IIndexed$_nth$arity$2(null,i__30842_30854);
var el_30856 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30843_30855,(0),null);
var type_30857 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30843_30855,(1),null);
var f_30858 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30843_30855,(2),null);
var G__30844_30859 = el_30856;
var G__30845_30860 = type_30857;
var G__30846_30861 = f_30858;
goog.events.listen(G__30844_30859,G__30845_30860,G__30846_30861);

var G__30862 = seq__30839_30851;
var G__30863 = chunk__30840_30852;
var G__30864 = count__30841_30853;
var G__30865 = (i__30842_30854 + (1));
seq__30839_30851 = G__30862;
chunk__30840_30852 = G__30863;
count__30841_30853 = G__30864;
i__30842_30854 = G__30865;
continue;
} else {
var temp__4126__auto___30866 = cljs.core.seq(seq__30839_30851);
if(temp__4126__auto___30866){
var seq__30839_30867__$1 = temp__4126__auto___30866;
if(cljs.core.chunked_seq_QMARK_(seq__30839_30867__$1)){
var c__24968__auto___30868 = cljs.core.chunk_first(seq__30839_30867__$1);
var G__30869 = cljs.core.chunk_rest(seq__30839_30867__$1);
var G__30870 = c__24968__auto___30868;
var G__30871 = cljs.core.count(c__24968__auto___30868);
var G__30872 = (0);
seq__30839_30851 = G__30869;
chunk__30840_30852 = G__30870;
count__30841_30853 = G__30871;
i__30842_30854 = G__30872;
continue;
} else {
var vec__30847_30873 = cljs.core.first(seq__30839_30867__$1);
var el_30874 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30847_30873,(0),null);
var type_30875 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30847_30873,(1),null);
var f_30876 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30847_30873,(2),null);
var G__30848_30877 = el_30874;
var G__30849_30878 = type_30875;
var G__30850_30879 = f_30876;
goog.events.listen(G__30848_30877,G__30849_30878,G__30850_30879);

var G__30880 = cljs.core.next(seq__30839_30867__$1);
var G__30881 = null;
var G__30882 = (0);
var G__30883 = (0);
seq__30839_30851 = G__30880;
chunk__30840_30852 = G__30881;
count__30841_30853 = G__30882;
i__30842_30854 = G__30883;
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
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__30897 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30897) : cljs.core.deref.call(null,G__30897));
})()))){
var G__30898_30910 = wkf.site.site;
var G__30899_30911 = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.constant$keyword$running_QMARK_,false], null);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__30898_30910,G__30899_30911) : cljs.core.reset_BANG_.call(null,G__30898_30910,G__30899_30911));

var seq__30900 = cljs.core.seq(wkf.site.handlers);
var chunk__30901 = null;
var count__30902 = (0);
var i__30903 = (0);
while(true){
if((i__30903 < count__30902)){
var vec__30904 = chunk__30901.cljs$core$IIndexed$_nth$arity$2(null,i__30903);
var el = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30904,(0),null);
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30904,(1),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30904,(2),null);
var G__30905_30912 = el;
var G__30906_30913 = type;
goog.events.removeAll(G__30905_30912,G__30906_30913);

var G__30914 = seq__30900;
var G__30915 = chunk__30901;
var G__30916 = count__30902;
var G__30917 = (i__30903 + (1));
seq__30900 = G__30914;
chunk__30901 = G__30915;
count__30902 = G__30916;
i__30903 = G__30917;
continue;
} else {
var temp__4126__auto__ = cljs.core.seq(seq__30900);
if(temp__4126__auto__){
var seq__30900__$1 = temp__4126__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__30900__$1)){
var c__24968__auto__ = cljs.core.chunk_first(seq__30900__$1);
var G__30918 = cljs.core.chunk_rest(seq__30900__$1);
var G__30919 = c__24968__auto__;
var G__30920 = cljs.core.count(c__24968__auto__);
var G__30921 = (0);
seq__30900 = G__30918;
chunk__30901 = G__30919;
count__30902 = G__30920;
i__30903 = G__30921;
continue;
} else {
var vec__30907 = cljs.core.first(seq__30900__$1);
var el = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30907,(0),null);
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30907,(1),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30907,(2),null);
var G__30908_30922 = el;
var G__30909_30923 = type;
goog.events.removeAll(G__30908_30922,G__30909_30923);

var G__30924 = cljs.core.next(seq__30900__$1);
var G__30925 = null;
var G__30926 = (0);
var G__30927 = (0);
seq__30900 = G__30924;
chunk__30901 = G__30925;
count__30902 = G__30926;
i__30903 = G__30927;
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
