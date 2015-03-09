// Compiled by ClojureScript 0.0-2850 {}
goog.provide('wkf.site');
goog.require('cljs.core');
if(typeof wkf.site.site !== 'undefined'){
} else {
wkf.site.site = (function (){var G__29032 = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.constant$keyword$20,false], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__29032) : cljs.core.atom.call(null,G__29032));
})();
}
/**
* Start the site. Attempt to be idempotent.
*/
wkf.site.start = (function start(){
if(cljs.core.truth_(cljs.core.constant$keyword$20.cljs$core$IFn$_invoke$arity$1((function (){var G__29034 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__29034) : cljs.core.deref.call(null,G__29034));
})()))){
return null;
} else {
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$20,true);
}
});
/**
* Stop the site. Attempt to be idempotent. Useful for interactive local development.
*/
wkf.site.stop = (function stop(){
if(cljs.core.truth_(cljs.core.constant$keyword$20.cljs$core$IFn$_invoke$arity$1((function (){var G__29036 = wkf.site.site;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__29036) : cljs.core.deref.call(null,G__29036));
})()))){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(wkf.site.site,cljs.core.assoc,cljs.core.constant$keyword$20,false);
} else {
return null;
}
});
wkf.site.start();
