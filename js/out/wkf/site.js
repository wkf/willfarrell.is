// Compiled by ClojureScript 0.0-2850 {}
goog.provide('wkf.site');
goog.require('cljs.core');
if(typeof wkf.site.site !== 'undefined'){
} else {
wkf.site.site = (function (){var G__169746 = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.constant$keyword$252,false], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__169746) : cljs.core.atom.call(null,G__169746));
})();
}
/**
* Start the site. Attempt to be idempotent.
*/
wkf.site.start = (function start(){
if(cljs.core.truth_(cljs.core.constant$keyword$252.cljs$core$IFn$_invoke$arity$1((function (){var G__169748 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__169748) : cljs.core.deref.call(null,G__169748));
})()))){
return null;
} else {
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$252,true);
}
});
/**
* Stop the site. Attempt to be idempotent. Useful for interactive local development.
*/
wkf.site.stop = (function stop(){
if(cljs.core.truth_(cljs.core.constant$keyword$252.cljs$core$IFn$_invoke$arity$1((function (){var G__169750 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__169750) : cljs.core.deref.call(null,G__169750));
})()))){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$252,false);
} else {
return null;
}
});
wkf.site.start();
