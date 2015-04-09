// Compiled by ClojureScript 0.0-3119 {:optimize-constants true, :static-fns true}
goog.provide('dommy.utils');
goog.require('cljs.core');
/**
 * Dissociate this keyseq from m, removing any empty maps created as a result
 * (including at the top-level).
 */
dommy.utils.dissoc_in = (function dommy$utils$dissoc_in(m,p__37814){
var vec__37822 = p__37814;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37822,(0),null);
var ks = cljs.core.nthnext(vec__37822,(1));
if(cljs.core.truth_(m)){
var temp__4124__auto__ = (function (){var and__24173__auto__ = ks;
if(and__24173__auto__){
return dommy$utils$dissoc_in((function (){var G__37824 = k;
return (m.cljs$core$IFn$_invoke$arity$1 ? m.cljs$core$IFn$_invoke$arity$1(G__37824) : m.call(null,G__37824));
})(),ks);
} else {
return and__24173__auto__;
}
})();
if(cljs.core.truth_(temp__4124__auto__)){
var res = temp__4124__auto__;
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,k,res);
} else {
var res = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(m,k);
if(cljs.core.empty_QMARK_(res)){
return null;
} else {
return res;
}
}
} else {
return null;
}
});
dommy.utils.__GT_Array = (function dommy$utils$__GT_Array(array_like){
return Array.prototype.slice.call(array_like);
});
/**
 * Coerces strings and keywords to strings, while preserving namespace of
 * namespaced keywords
 */
dommy.utils.as_str = (function dommy$utils$as_str(s){
if((s instanceof cljs.core.Keyword)){
return [cljs.core.str((function (){var G__37826 = cljs.core.namespace(s);
var G__37826__$1 = (((G__37826 == null))?null:[cljs.core.str(G__37826),cljs.core.str("/")].join(''));
return G__37826__$1;
})()),cljs.core.str(cljs.core.name(s))].join('');
} else {
return s;
}
});
/**
 * Does `class-name` string have class starting at index idx.
 * only will be used when Element::classList doesn't exist
 */
dommy.utils.class_match_QMARK_ = (function dommy$utils$class_match_QMARK_(class_name,class$,idx){
var and__24173__auto__ = ((idx === (0))) || ((" " === class_name.charAt((idx - (1)))));
if(and__24173__auto__){
var total_len = class_name.length;
var stop = (idx + class$.length);
if((stop <= total_len)){
return ((stop === total_len)) || ((" " === class_name.charAt(stop)));
} else {
return null;
}
} else {
return and__24173__auto__;
}
});
/**
 * Finds the index of class in a space-delimited class-name
 * only will be used when Element::classList doesn't exist
 */
dommy.utils.class_index = (function dommy$utils$class_index(class_name,class$){
var start_from = (0);
while(true){
var i = class_name.indexOf(class$,start_from);
if((i >= (0))){
if(dommy.utils.class_match_QMARK_(class_name,class$,i)){
return i;
} else {
var G__37827 = (i + class$.length);
start_from = G__37827;
continue;
}
} else {
return null;
}
break;
}
});
dommy.utils.remove_class_str = (function dommy$utils$remove_class_str(init_class_name,class$){
var class_name = init_class_name;
while(true){
var class_len = class_name.length;
var temp__4124__auto__ = dommy.utils.class_index(class_name,class$);
if(cljs.core.truth_(temp__4124__auto__)){
var i = temp__4124__auto__;
var G__37828 = (function (){var end = (i + class$.length);
return [cljs.core.str((((end < class_len))?[cljs.core.str(class_name.substring((0),i)),cljs.core.str(class_name.substr((end + (1))))].join(''):class_name.substring((0),(i - (1)))))].join('');
})();
class_name = G__37828;
continue;
} else {
return class_name;
}
break;
}
});