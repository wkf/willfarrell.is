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
wkf.site.site = (function (){var G__30653 = cljs.core.PersistentHashMap.fromArrays([cljs.core.constant$keyword$line_DASH_height,cljs.core.constant$keyword$page_DASH_scroll,cljs.core.constant$keyword$running_QMARK_,cljs.core.constant$keyword$page_DASH_thresholds,cljs.core.constant$keyword$scroll_DASH_width,cljs.core.constant$keyword$content_DASH_width,cljs.core.constant$keyword$menu_DASH_animating_QMARK_,cljs.core.constant$keyword$menu_DASH_scroll,cljs.core.constant$keyword$menu_DASH_showing_QMARK_,cljs.core.constant$keyword$menu_DASH_thresholds],[(0),(0),false,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$fix_DASH_page_DASH_nav,(0),cljs.core.constant$keyword$fix_DASH_page_DASH_hr,(0)], null),(0),(0),false,(0),false,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$fix_DASH_menu_DASH_nav,(0),cljs.core.constant$keyword$fix_DASH_menu_DASH_hr,(0)], null)]);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__30653) : cljs.core.atom.call(null,G__30653));
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
var size = (function (){var G__30655 = el;
return goog.style.getSize(G__30655);
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
return ((function (){var G__30657 = wkf.site.page_nav;
return goog.style.getSize(G__30657);
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
var vec__30659 = wkf.site.get_size(wkf.site.page_header);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30659,(0),null);
var page_header_height = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30659,(1),null);
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$fix_DASH_page_DASH_nav,line_height,cljs.core.constant$keyword$fix_DASH_page_DASH_hr,(page_header_height - (line_height * (3)))], null);
});
wkf.site.measure_menu_thresholds = (function wkf$site$measure_menu_thresholds(line_height){
var vec__30661 = wkf.site.get_size(wkf.site.menu_header);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30661,(0),null);
var menu_header_height = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30661,(1),null);
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$fix_DASH_menu_DASH_nav,line_height,cljs.core.constant$keyword$fix_DASH_menu_DASH_hr,(menu_header_height - (line_height * (3)))], null);
});
wkf.site.cache_measurements_BANG_ = (function wkf$site$cache_measurements_BANG_(){
var line_height = wkf.site.measure_line_height();
var scroll_width = wkf.site.measure_scroll_width();
var window_width = wkf.site.measure_window_width();
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$at_DASH_large_QMARK_,(window_width >= (860)),cljs.core.array_seq([cljs.core.constant$keyword$at_DASH_medium_QMARK_,(window_width >= (680)),cljs.core.constant$keyword$at_DASH_small_QMARK_,(window_width >= (460)),cljs.core.constant$keyword$line_DASH_height,line_height,cljs.core.constant$keyword$scroll_DASH_width,scroll_width,cljs.core.constant$keyword$window_DASH_width,window_width,cljs.core.constant$keyword$content_DASH_width,wkf.site.measure_content_width(window_width,scroll_width),cljs.core.constant$keyword$page_DASH_thresholds,wkf.site.measure_page_thresholds(line_height),cljs.core.constant$keyword$menu_DASH_thresholds,wkf.site.measure_menu_thresholds(line_height)], 0));
});
wkf.site.on_scroll = (function wkf$site$on_scroll(e){
var map__30680 = (function (){var G__30683 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30683) : cljs.core.deref.call(null,G__30683));
})();
var map__30680__$1 = ((cljs.core.seq_QMARK_(map__30680))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__30680):map__30680);
var menu_animating_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30680__$1,cljs.core.constant$keyword$menu_DASH_animating_QMARK_);
var menu_showing_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30680__$1,cljs.core.constant$keyword$menu_DASH_showing_QMARK_);
var menu_scroll = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30680__$1,cljs.core.constant$keyword$menu_DASH_scroll);
var page_scroll = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30680__$1,cljs.core.constant$keyword$page_DASH_scroll);
var vec__30681 = wkf.site.get_scroll();
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30681,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30681,(1),null);
var vec__30682 = (cljs.core.truth_(menu_animating_QMARK_)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [page_scroll,menu_scroll], null):(cljs.core.truth_(menu_showing_QMARK_)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [page_scroll,y], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [y,menu_scroll], null)
));
var page_scroll_SINGLEQUOTE_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30682,(0),null);
var menu_scroll_SINGLEQUOTE_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30682,(1),null);
var seq__30684_30698 = cljs.core.seq(cljs.core.constant$keyword$page_DASH_thresholds.cljs$core$IFn$_invoke$arity$1((function (){var G__30688 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30688) : cljs.core.deref.call(null,G__30688));
})()));
var chunk__30685_30699 = null;
var count__30686_30700 = (0);
var i__30687_30701 = (0);
while(true){
if((i__30687_30701 < count__30686_30700)){
var vec__30689_30702 = chunk__30685_30699.cljs$core$IIndexed$_nth$arity$2(null,i__30687_30701);
var c_30703 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30689_30702,(0),null);
var threshold_30704 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30689_30702,(1),null);
if((page_scroll_SINGLEQUOTE_ >= threshold_30704)){
dommy.core.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,c_30703);
} else {
dommy.core.remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,c_30703);
}

var G__30705 = seq__30684_30698;
var G__30706 = chunk__30685_30699;
var G__30707 = count__30686_30700;
var G__30708 = (i__30687_30701 + (1));
seq__30684_30698 = G__30705;
chunk__30685_30699 = G__30706;
count__30686_30700 = G__30707;
i__30687_30701 = G__30708;
continue;
} else {
var temp__4126__auto___30709 = cljs.core.seq(seq__30684_30698);
if(temp__4126__auto___30709){
var seq__30684_30710__$1 = temp__4126__auto___30709;
if(cljs.core.chunked_seq_QMARK_(seq__30684_30710__$1)){
var c__24970__auto___30711 = cljs.core.chunk_first(seq__30684_30710__$1);
var G__30712 = cljs.core.chunk_rest(seq__30684_30710__$1);
var G__30713 = c__24970__auto___30711;
var G__30714 = cljs.core.count(c__24970__auto___30711);
var G__30715 = (0);
seq__30684_30698 = G__30712;
chunk__30685_30699 = G__30713;
count__30686_30700 = G__30714;
i__30687_30701 = G__30715;
continue;
} else {
var vec__30690_30716 = cljs.core.first(seq__30684_30710__$1);
var c_30717 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30690_30716,(0),null);
var threshold_30718 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30690_30716,(1),null);
if((page_scroll_SINGLEQUOTE_ >= threshold_30718)){
dommy.core.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,c_30717);
} else {
dommy.core.remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,c_30717);
}

var G__30719 = cljs.core.next(seq__30684_30710__$1);
var G__30720 = null;
var G__30721 = (0);
var G__30722 = (0);
seq__30684_30698 = G__30719;
chunk__30685_30699 = G__30720;
count__30686_30700 = G__30721;
i__30687_30701 = G__30722;
continue;
}
} else {
}
}
break;
}

var seq__30691 = cljs.core.seq(cljs.core.constant$keyword$menu_DASH_thresholds.cljs$core$IFn$_invoke$arity$1((function (){var G__30695 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30695) : cljs.core.deref.call(null,G__30695));
})()));
var chunk__30692 = null;
var count__30693 = (0);
var i__30694 = (0);
while(true){
if((i__30694 < count__30693)){
var vec__30696 = chunk__30692.cljs$core$IIndexed$_nth$arity$2(null,i__30694);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30696,(0),null);
var threshold = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30696,(1),null);
if((menu_scroll_SINGLEQUOTE_ >= threshold)){
dommy.core.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,c);
} else {
dommy.core.remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,c);
}

var G__30723 = seq__30691;
var G__30724 = chunk__30692;
var G__30725 = count__30693;
var G__30726 = (i__30694 + (1));
seq__30691 = G__30723;
chunk__30692 = G__30724;
count__30693 = G__30725;
i__30694 = G__30726;
continue;
} else {
var temp__4126__auto__ = cljs.core.seq(seq__30691);
if(temp__4126__auto__){
var seq__30691__$1 = temp__4126__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__30691__$1)){
var c__24970__auto__ = cljs.core.chunk_first(seq__30691__$1);
var G__30727 = cljs.core.chunk_rest(seq__30691__$1);
var G__30728 = c__24970__auto__;
var G__30729 = cljs.core.count(c__24970__auto__);
var G__30730 = (0);
seq__30691 = G__30727;
chunk__30692 = G__30728;
count__30693 = G__30729;
i__30694 = G__30730;
continue;
} else {
var vec__30697 = cljs.core.first(seq__30691__$1);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30697,(0),null);
var threshold = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30697,(1),null);
if((menu_scroll_SINGLEQUOTE_ >= threshold)){
dommy.core.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,c);
} else {
dommy.core.remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(wkf.site.html,c);
}

var G__30731 = cljs.core.next(seq__30691__$1);
var G__30732 = null;
var G__30733 = (0);
var G__30734 = (0);
seq__30691 = G__30731;
chunk__30692 = G__30732;
count__30693 = G__30733;
i__30694 = G__30734;
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

var G__30739 = wkf.site.menu_content;
var G__30740 = "width";
var G__30741 = wkf.site.px(cljs.core.constant$keyword$content_DASH_width.cljs$core$IFn$_invoke$arity$1((function (){var G__30742 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30742) : cljs.core.deref.call(null,G__30742));
})()));
return goog.style.setStyle(G__30739,G__30740,G__30741);
});
wkf.site.wrap_prevent_default = (function wkf$site$wrap_prevent_default(f){
return (function (e){
e.preventDefault();

var G__30744_30745 = e;
(f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__30744_30745) : f.call(null,G__30744_30745));

return false;
});
});
wkf.site.wrap_exact_target = (function wkf$site$wrap_exact_target(f){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(e.target,e.currentTarget)){
var G__30747 = e;
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__30747) : f.call(null,G__30747));
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
var G__30750 = el;
var G__30751 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.js_obj,properties);
return goog.style.setStyle(G__30750,G__30751);
};
var wkf$site$set_styles_BANG_ = function (el,var_args){
var properties = null;
if (arguments.length > 1) {
var G__30752__i = 0, G__30752__a = new Array(arguments.length -  1);
while (G__30752__i < G__30752__a.length) {G__30752__a[G__30752__i] = arguments[G__30752__i + 1]; ++G__30752__i;}
  properties = new cljs.core.IndexedSeq(G__30752__a,0);
} 
return wkf$site$set_styles_BANG___delegate.call(this,el,properties);};
wkf$site$set_styles_BANG_.cljs$lang$maxFixedArity = 1;
wkf$site$set_styles_BANG_.cljs$lang$applyTo = (function (arglist__30753){
var el = cljs.core.first(arglist__30753);
var properties = cljs.core.rest(arglist__30753);
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
var G__30756 = el;
var G__30757 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.js_obj,cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(properties,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1("")));
return goog.style.setStyle(G__30756,G__30757);
};
var wkf$site$unset_styles_BANG_ = function (el,var_args){
var properties = null;
if (arguments.length > 1) {
var G__30758__i = 0, G__30758__a = new Array(arguments.length -  1);
while (G__30758__i < G__30758__a.length) {G__30758__a[G__30758__i] = arguments[G__30758__i + 1]; ++G__30758__i;}
  properties = new cljs.core.IndexedSeq(G__30758__a,0);
} 
return wkf$site$unset_styles_BANG___delegate.call(this,el,properties);};
wkf$site$unset_styles_BANG_.cljs$lang$maxFixedArity = 1;
wkf$site$unset_styles_BANG_.cljs$lang$applyTo = (function (arglist__30759){
var el = cljs.core.first(arglist__30759);
var properties = cljs.core.rest(arglist__30759);
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
var line_height = cljs.core.constant$keyword$line_DASH_height.cljs$core$IFn$_invoke$arity$1((function (){var G__30761 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30761) : cljs.core.deref.call(null,G__30761));
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
if(cljs.core.truth_(cljs.core.constant$keyword$menu_DASH_animating_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__30766 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30766) : cljs.core.deref.call(null,G__30766));
})()))){
return null;
} else {
var vec__30767 = wkf.site.get_scroll();
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30767,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30767,(1),null);
var map__30768 = (function (){var G__30769 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30769) : cljs.core.deref.call(null,G__30769));
})();
var map__30768__$1 = ((cljs.core.seq_QMARK_(map__30768))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__30768):map__30768);
var menu_scroll = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30768__$1,cljs.core.constant$keyword$menu_DASH_scroll);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$page_DASH_scroll,y,cljs.core.array_seq([cljs.core.constant$keyword$menu_DASH_animating_QMARK_,true], 0));

dommy.core.add_class_BANG_.cljs$core$IFn$_invoke$arity$variadic(wkf.site.html,cljs.core.constant$keyword$show_DASH_menu,cljs.core.array_seq([cljs.core.constant$keyword$showing_DASH_menu], 0));

wkf.site.position_BANG_(wkf.site.page,(- y));

wkf.site.unposition_BANG_(wkf.site.menu);

return wkf.site.scroll_BANG_(x,menu_scroll);
}
});
wkf.site.on_click_menu_ellipsis = (function wkf$site$on_click_menu_ellipsis(e){
if(cljs.core.truth_(cljs.core.constant$keyword$menu_DASH_animating_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__30775 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30775) : cljs.core.deref.call(null,G__30775));
})()))){
return null;
} else {
var vec__30776 = wkf.site.get_scroll();
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30776,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30776,(1),null);
var map__30777 = (function (){var G__30779 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30779) : cljs.core.deref.call(null,G__30779));
})();
var map__30777__$1 = ((cljs.core.seq_QMARK_(map__30777))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__30777):map__30777);
var menu_thresholds = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30777__$1,cljs.core.constant$keyword$menu_DASH_thresholds);
var page_scroll = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30777__$1,cljs.core.constant$keyword$page_DASH_scroll);
var at_large_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30777__$1,cljs.core.constant$keyword$at_DASH_large_QMARK_);
var map__30778 = menu_thresholds;
var map__30778__$1 = ((cljs.core.seq_QMARK_(map__30778))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__30778):map__30778);
var fix_menu_hr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30778__$1,cljs.core.constant$keyword$fix_DASH_menu_DASH_hr);
var fix_menu_nav = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__30778__$1,cljs.core.constant$keyword$fix_DASH_menu_DASH_nav);
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
if(cljs.core.truth_(cljs.core.constant$keyword$menu_DASH_animating_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__30782 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30782) : cljs.core.deref.call(null,G__30782));
})()))){
if(cljs.core.truth_(cljs.core.constant$keyword$menu_DASH_showing_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__30783 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30783) : cljs.core.deref.call(null,G__30783));
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
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__30797 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30797) : cljs.core.deref.call(null,G__30797));
})()))){
return null;
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$running_QMARK_,true);

FastClick.attach(document.body);

var seq__30798_30810 = cljs.core.seq(wkf.site.handlers);
var chunk__30799_30811 = null;
var count__30800_30812 = (0);
var i__30801_30813 = (0);
while(true){
if((i__30801_30813 < count__30800_30812)){
var vec__30802_30814 = chunk__30799_30811.cljs$core$IIndexed$_nth$arity$2(null,i__30801_30813);
var el_30815 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30802_30814,(0),null);
var type_30816 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30802_30814,(1),null);
var f_30817 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30802_30814,(2),null);
var G__30803_30818 = el_30815;
var G__30804_30819 = type_30816;
var G__30805_30820 = f_30817;
goog.events.listen(G__30803_30818,G__30804_30819,G__30805_30820);

var G__30821 = seq__30798_30810;
var G__30822 = chunk__30799_30811;
var G__30823 = count__30800_30812;
var G__30824 = (i__30801_30813 + (1));
seq__30798_30810 = G__30821;
chunk__30799_30811 = G__30822;
count__30800_30812 = G__30823;
i__30801_30813 = G__30824;
continue;
} else {
var temp__4126__auto___30825 = cljs.core.seq(seq__30798_30810);
if(temp__4126__auto___30825){
var seq__30798_30826__$1 = temp__4126__auto___30825;
if(cljs.core.chunked_seq_QMARK_(seq__30798_30826__$1)){
var c__24970__auto___30827 = cljs.core.chunk_first(seq__30798_30826__$1);
var G__30828 = cljs.core.chunk_rest(seq__30798_30826__$1);
var G__30829 = c__24970__auto___30827;
var G__30830 = cljs.core.count(c__24970__auto___30827);
var G__30831 = (0);
seq__30798_30810 = G__30828;
chunk__30799_30811 = G__30829;
count__30800_30812 = G__30830;
i__30801_30813 = G__30831;
continue;
} else {
var vec__30806_30832 = cljs.core.first(seq__30798_30826__$1);
var el_30833 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30806_30832,(0),null);
var type_30834 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30806_30832,(1),null);
var f_30835 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30806_30832,(2),null);
var G__30807_30836 = el_30833;
var G__30808_30837 = type_30834;
var G__30809_30838 = f_30835;
goog.events.listen(G__30807_30836,G__30808_30837,G__30809_30838);

var G__30839 = cljs.core.next(seq__30798_30826__$1);
var G__30840 = null;
var G__30841 = (0);
var G__30842 = (0);
seq__30798_30810 = G__30839;
chunk__30799_30811 = G__30840;
count__30800_30812 = G__30841;
i__30801_30813 = G__30842;
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
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__30856 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30856) : cljs.core.deref.call(null,G__30856));
})()))){
var G__30857_30869 = wkf.site.site;
var G__30858_30870 = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.constant$keyword$running_QMARK_,false], null);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__30857_30869,G__30858_30870) : cljs.core.reset_BANG_.call(null,G__30857_30869,G__30858_30870));

var seq__30859 = cljs.core.seq(wkf.site.handlers);
var chunk__30860 = null;
var count__30861 = (0);
var i__30862 = (0);
while(true){
if((i__30862 < count__30861)){
var vec__30863 = chunk__30860.cljs$core$IIndexed$_nth$arity$2(null,i__30862);
var el = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30863,(0),null);
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30863,(1),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30863,(2),null);
var G__30864_30871 = el;
var G__30865_30872 = type;
goog.events.removeAll(G__30864_30871,G__30865_30872);

var G__30873 = seq__30859;
var G__30874 = chunk__30860;
var G__30875 = count__30861;
var G__30876 = (i__30862 + (1));
seq__30859 = G__30873;
chunk__30860 = G__30874;
count__30861 = G__30875;
i__30862 = G__30876;
continue;
} else {
var temp__4126__auto__ = cljs.core.seq(seq__30859);
if(temp__4126__auto__){
var seq__30859__$1 = temp__4126__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__30859__$1)){
var c__24970__auto__ = cljs.core.chunk_first(seq__30859__$1);
var G__30877 = cljs.core.chunk_rest(seq__30859__$1);
var G__30878 = c__24970__auto__;
var G__30879 = cljs.core.count(c__24970__auto__);
var G__30880 = (0);
seq__30859 = G__30877;
chunk__30860 = G__30878;
count__30861 = G__30879;
i__30862 = G__30880;
continue;
} else {
var vec__30866 = cljs.core.first(seq__30859__$1);
var el = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30866,(0),null);
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30866,(1),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30866,(2),null);
var G__30867_30881 = el;
var G__30868_30882 = type;
goog.events.removeAll(G__30867_30881,G__30868_30882);

var G__30883 = cljs.core.next(seq__30859__$1);
var G__30884 = null;
var G__30885 = (0);
var G__30886 = (0);
seq__30859 = G__30883;
chunk__30860 = G__30884;
count__30861 = G__30885;
i__30862 = G__30886;
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
