// Compiled by ClojureScript 0.0-3119 {:optimize-constants true, :static-fns true}
goog.provide('wkf.site');
goog.require('cljs.core');
goog.require('dommy.core');
goog.require('goog.events');
goog.require('goog.style');
if(typeof wkf.site.site !== 'undefined'){
} else {
wkf.site.site = (function (){var G__30645 = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.constant$keyword$running_QMARK_,false], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__30645) : cljs.core.atom.call(null,G__30645));
})();
}
wkf.site.on_scroll = (function wkf$site$on_scroll(e){
var hr = (dommy.utils.__GT_Array((dommy.utils.__GT_Array(document.getElementsByTagName("header"))[(0)]).getElementsByTagName("hr"))[(0)]);
var main = (dommy.utils.__GT_Array(document.getElementsByTagName("main"))[(0)]);
var main_top = (function (){var G__30648 = main;
return goog.style.getClientPosition(G__30648);
})().y;
var nav = (dommy.utils.__GT_Array(document.getElementsByTagName("nav"))[(0)]);
var nav_height = (function (){var G__30649 = nav;
return goog.style.getSize(G__30649);
})().height;
if((main_top <= (2.5 * nav_height))){
return dommy.core.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(hr,cljs.core.constant$keyword$fixed);
} else {
return dommy.core.remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(hr,cljs.core.constant$keyword$fixed);
}
});
/**
 * Start the site. Attempt to be idempotent.
 */
wkf.site.start = (function wkf$site$start(){
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__30654 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30654) : cljs.core.deref.call(null,G__30654));
})()))){
return null;
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$running_QMARK_,true);

var G__30655 = window;
var G__30656 = "scroll";
var G__30657 = wkf.site.on_scroll;
return goog.events.listen(G__30655,G__30656,G__30657);
}
});
/**
 * Stop the site. Attempt to be idempotent. Useful for interactive local development.
 */
wkf.site.stop = (function wkf$site$stop(){
if(cljs.core.truth_(cljs.core.constant$keyword$running_QMARK_.cljs$core$IFn$_invoke$arity$1((function (){var G__30664 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__30664) : cljs.core.deref.call(null,G__30664));
})()))){
var G__30665_30670 = wkf.site.site;
var G__30666_30671 = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.constant$keyword$running_QMARK_,false], null);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__30665_30670,G__30666_30671) : cljs.core.reset_BANG_.call(null,G__30665_30670,G__30666_30671));

var G__30667 = window;
var G__30668 = "scroll";
var G__30669 = wkf.site.on_scroll;
return goog.events.unlisten(G__30667,G__30668,G__30669);
} else {
return null;
}
});
wkf.site.start();
