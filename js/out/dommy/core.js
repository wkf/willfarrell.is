// Compiled by ClojureScript 0.0-3119 {:optimize-constants true, :static-fns true}
goog.provide('dommy.core');
goog.require('cljs.core');
goog.require('dommy.utils');
goog.require('clojure.string');
/**
 * Returns a selector in string format.
 * Accepts string, keyword, or collection.
 */
dommy.core.selector = (function dommy$core$selector(data){
if(cljs.core.coll_QMARK_(data)){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",cljs.core.map.cljs$core$IFn$_invoke$arity$2(dommy$core$selector,data));
} else {
if((typeof data === 'string') || ((data instanceof cljs.core.Keyword))){
return cljs.core.name(data);
} else {
return null;
}
}
});
dommy.core.text = (function dommy$core$text(elem){
var or__24177__auto__ = elem.textContent;
if(cljs.core.truth_(or__24177__auto__)){
return or__24177__auto__;
} else {
return elem.innerText;
}
});
dommy.core.html = (function dommy$core$html(elem){
return elem.innerHTML;
});
dommy.core.value = (function dommy$core$value(elem){
return elem.value;
});
dommy.core.class$ = (function dommy$core$class(elem){
return elem.className;
});
dommy.core.attr = (function dommy$core$attr(elem,k){
if(cljs.core.truth_(k)){
return elem.getAttribute(dommy.utils.as_str(k));
} else {
return null;
}
});
/**
 * The computed style of `elem`, optionally specifying the key of
 * a particular style to return
 */
dommy.core.style = (function() {
var dommy$core$style = null;
var dommy$core$style__1 = (function (elem){
return cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(window.getComputedStyle(elem));
});
var dommy$core$style__2 = (function (elem,k){
return (window.getComputedStyle(elem)[dommy.utils.as_str(k)]);
});
dommy$core$style = function(elem,k){
switch(arguments.length){
case 1:
return dommy$core$style__1.call(this,elem);
case 2:
return dommy$core$style__2.call(this,elem,k);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
dommy$core$style.cljs$core$IFn$_invoke$arity$1 = dommy$core$style__1;
dommy$core$style.cljs$core$IFn$_invoke$arity$2 = dommy$core$style__2;
return dommy$core$style;
})()
;
dommy.core.px = (function dommy$core$px(elem,k){

var pixels = dommy.core.style.cljs$core$IFn$_invoke$arity$2(elem,k);
if(cljs.core.seq(pixels)){
var G__37024 = pixels;
return parseInt(G__37024);
} else {
return null;
}
});
/**
 * Does `elem` contain `c` in its class list
 */
dommy.core.has_class_QMARK_ = (function dommy$core$has_class_QMARK_(elem,c){
var c__$1 = dommy.utils.as_str(c);
var temp__4124__auto__ = elem.classList;
if(cljs.core.truth_(temp__4124__auto__)){
var class_list = temp__4124__auto__;
return class_list.contains(c__$1);
} else {
var temp__4126__auto__ = dommy.core.class$(elem);
if(cljs.core.truth_(temp__4126__auto__)){
var class_name = temp__4126__auto__;
var temp__4126__auto____$1 = dommy.utils.class_index(class_name,c__$1);
if(cljs.core.truth_(temp__4126__auto____$1)){
var i = temp__4126__auto____$1;
return (i >= (0));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Is `elem` hidden (as associated with hide!/show!/toggle!, using display: none)
 */
dommy.core.hidden_QMARK_ = (function dommy$core$hidden_QMARK_(elem){
return (dommy.core.style.cljs$core$IFn$_invoke$arity$2(elem,cljs.core.constant$keyword$display) === "none");
});
/**
 * Returns a map of the bounding client rect of `elem`
 * as a map with [:top :left :right :bottom :width :height]
 */
dommy.core.bounding_client_rect = (function dommy$core$bounding_client_rect(elem){
var r = elem.getBoundingClientRect();
return new cljs.core.PersistentArrayMap(null, 6, [cljs.core.constant$keyword$top,r.top,cljs.core.constant$keyword$bottom,r.bottom,cljs.core.constant$keyword$left,r.left,cljs.core.constant$keyword$right,r.right,cljs.core.constant$keyword$width,r.width,cljs.core.constant$keyword$height,r.height], null);
});
dommy.core.parent = (function dommy$core$parent(elem){
return elem.parentNode;
});
dommy.core.children = (function dommy$core$children(elem){
return elem.children;
});
/**
 * Lazy seq of the ancestors of `elem`
 */
dommy.core.ancestors = (function dommy$core$ancestors(elem){
return cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(cljs.core.identity,cljs.core.iterate(dommy.core.parent,elem));
});
dommy.core.ancestor_nodes = dommy.core.ancestors;
/**
 * Returns a predicate on nodes that match `selector` at the
 * time of this `matches-pred` call (may return outdated results
 * if you fuck with the DOM)
 */
dommy.core.matches_pred = (function() {
var dommy$core$matches_pred = null;
var dommy$core$matches_pred__1 = (function (selector){
return dommy$core$matches_pred.cljs$core$IFn$_invoke$arity$2(document,selector);
});
var dommy$core$matches_pred__2 = (function (base,selector){
var matches = dommy.utils.__GT_Array(base.querySelectorAll(dommy.core.selector(selector)));
return ((function (matches){
return (function (elem){
return (matches.indexOf(elem) >= (0));
});
;})(matches))
});
dommy$core$matches_pred = function(base,selector){
switch(arguments.length){
case 1:
return dommy$core$matches_pred__1.call(this,base);
case 2:
return dommy$core$matches_pred__2.call(this,base,selector);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
dommy$core$matches_pred.cljs$core$IFn$_invoke$arity$1 = dommy$core$matches_pred__1;
dommy$core$matches_pred.cljs$core$IFn$_invoke$arity$2 = dommy$core$matches_pred__2;
return dommy$core$matches_pred;
})()
;
/**
 * Closest ancestor of `elem` (up to `base`, if provided)
 * that matches `selector`
 */
dommy.core.closest = (function() {
var dommy$core$closest = null;
var dommy$core$closest__2 = (function (elem,selector){
return dommy$core$closest.cljs$core$IFn$_invoke$arity$3(document.body,elem,selector);
});
var dommy$core$closest__3 = (function (base,elem,selector){
return cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(dommy.core.matches_pred.cljs$core$IFn$_invoke$arity$2(base,selector),cljs.core.take_while.cljs$core$IFn$_invoke$arity$2((function (p1__37027_SHARP_){
return !((p1__37027_SHARP_ === base));
}),dommy.core.ancestors(elem))));
});
dommy$core$closest = function(base,elem,selector){
switch(arguments.length){
case 2:
return dommy$core$closest__2.call(this,base,elem);
case 3:
return dommy$core$closest__3.call(this,base,elem,selector);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
dommy$core$closest.cljs$core$IFn$_invoke$arity$2 = dommy$core$closest__2;
dommy$core$closest.cljs$core$IFn$_invoke$arity$3 = dommy$core$closest__3;
return dommy$core$closest;
})()
;
/**
 * Is `descendant` a descendant of `ancestor`?
 * (http://goo.gl/T8pgCX)
 */
dommy.core.descendant_QMARK_ = (function dommy$core$descendant_QMARK_(descendant,ancestor){
if(cljs.core.truth_(ancestor.contains)){
return ancestor.contains(descendant);
} else {
if(cljs.core.truth_(ancestor.compareDocumentPosition)){
return ((ancestor.compareDocumentPosition(descendant) & (1 << (4))) != 0);
} else {
return null;
}
}
});
/**
 * Set the textContent of `elem` to `text`, fall back to innerText
 */
dommy.core.set_text_BANG_ = (function dommy$core$set_text_BANG_(elem,text){
if(!((void 0 === elem.textContent))){
elem.textContent = text;
} else {
elem.innerText = text;
}

return elem;
});
/**
 * Set the innerHTML of `elem` to `html`
 */
dommy.core.set_html_BANG_ = (function dommy$core$set_html_BANG_(elem,html){
elem.innerHTML = html;

return elem;
});
/**
 * Set the value of `elem` to `value`
 */
dommy.core.set_value_BANG_ = (function dommy$core$set_value_BANG_(elem,value){
elem.value = value;

return elem;
});
/**
 * Set the css class of `elem` to `elem`
 */
dommy.core.set_class_BANG_ = (function dommy$core$set_class_BANG_(elem,c){
return elem.className = c;
});
/**
 * Set the style of `elem` using key-value pairs:
 * 
 * (set-style! elem :display "block" :color "red")
 * @param {...*} var_args
 */
dommy.core.set_style_BANG_ = (function() { 
var dommy$core$set_style_BANG___delegate = function (elem,kvs){
if(cljs.core.even_QMARK_(cljs.core.count(kvs))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1827825394,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-514511684,null),new cljs.core.Symbol(null,"kvs","kvs",-1695980277,null)))], 0)))].join('')));
}

var style = elem.style;
var seq__37037_37043 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),kvs));
var chunk__37038_37044 = null;
var count__37039_37045 = (0);
var i__37040_37046 = (0);
while(true){
if((i__37040_37046 < count__37039_37045)){
var vec__37041_37047 = chunk__37038_37044.cljs$core$IIndexed$_nth$arity$2(null,i__37040_37046);
var k_37048 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37041_37047,(0),null);
var v_37049 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37041_37047,(1),null);
style.setProperty(dommy.utils.as_str(k_37048),v_37049);

var G__37050 = seq__37037_37043;
var G__37051 = chunk__37038_37044;
var G__37052 = count__37039_37045;
var G__37053 = (i__37040_37046 + (1));
seq__37037_37043 = G__37050;
chunk__37038_37044 = G__37051;
count__37039_37045 = G__37052;
i__37040_37046 = G__37053;
continue;
} else {
var temp__4126__auto___37054 = cljs.core.seq(seq__37037_37043);
if(temp__4126__auto___37054){
var seq__37037_37055__$1 = temp__4126__auto___37054;
if(cljs.core.chunked_seq_QMARK_(seq__37037_37055__$1)){
var c__24962__auto___37056 = cljs.core.chunk_first(seq__37037_37055__$1);
var G__37057 = cljs.core.chunk_rest(seq__37037_37055__$1);
var G__37058 = c__24962__auto___37056;
var G__37059 = cljs.core.count(c__24962__auto___37056);
var G__37060 = (0);
seq__37037_37043 = G__37057;
chunk__37038_37044 = G__37058;
count__37039_37045 = G__37059;
i__37040_37046 = G__37060;
continue;
} else {
var vec__37042_37061 = cljs.core.first(seq__37037_37055__$1);
var k_37062 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37042_37061,(0),null);
var v_37063 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37042_37061,(1),null);
style.setProperty(dommy.utils.as_str(k_37062),v_37063);

var G__37064 = cljs.core.next(seq__37037_37055__$1);
var G__37065 = null;
var G__37066 = (0);
var G__37067 = (0);
seq__37037_37043 = G__37064;
chunk__37038_37044 = G__37065;
count__37039_37045 = G__37066;
i__37040_37046 = G__37067;
continue;
}
} else {
}
}
break;
}

return elem;
};
var dommy$core$set_style_BANG_ = function (elem,var_args){
var kvs = null;
if (arguments.length > 1) {
var G__37068__i = 0, G__37068__a = new Array(arguments.length -  1);
while (G__37068__i < G__37068__a.length) {G__37068__a[G__37068__i] = arguments[G__37068__i + 1]; ++G__37068__i;}
  kvs = new cljs.core.IndexedSeq(G__37068__a,0);
} 
return dommy$core$set_style_BANG___delegate.call(this,elem,kvs);};
dommy$core$set_style_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$set_style_BANG_.cljs$lang$applyTo = (function (arglist__37069){
var elem = cljs.core.first(arglist__37069);
var kvs = cljs.core.rest(arglist__37069);
return dommy$core$set_style_BANG___delegate(elem,kvs);
});
dommy$core$set_style_BANG_.cljs$core$IFn$_invoke$arity$variadic = dommy$core$set_style_BANG___delegate;
return dommy$core$set_style_BANG_;
})()
;
/**
 * @param {...*} var_args
 */
dommy.core.set_px_BANG_ = (function() { 
var dommy$core$set_px_BANG___delegate = function (elem,kvs){

if(cljs.core.even_QMARK_(cljs.core.count(kvs))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1827825394,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-514511684,null),new cljs.core.Symbol(null,"kvs","kvs",-1695980277,null)))], 0)))].join('')));
}

var seq__37076_37082 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),kvs));
var chunk__37077_37083 = null;
var count__37078_37084 = (0);
var i__37079_37085 = (0);
while(true){
if((i__37079_37085 < count__37078_37084)){
var vec__37080_37086 = chunk__37077_37083.cljs$core$IIndexed$_nth$arity$2(null,i__37079_37085);
var k_37087 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37080_37086,(0),null);
var v_37088 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37080_37086,(1),null);
dommy.core.set_style_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem,cljs.core.array_seq([k_37087,[cljs.core.str(v_37088),cljs.core.str("px")].join('')], 0));

var G__37089 = seq__37076_37082;
var G__37090 = chunk__37077_37083;
var G__37091 = count__37078_37084;
var G__37092 = (i__37079_37085 + (1));
seq__37076_37082 = G__37089;
chunk__37077_37083 = G__37090;
count__37078_37084 = G__37091;
i__37079_37085 = G__37092;
continue;
} else {
var temp__4126__auto___37093 = cljs.core.seq(seq__37076_37082);
if(temp__4126__auto___37093){
var seq__37076_37094__$1 = temp__4126__auto___37093;
if(cljs.core.chunked_seq_QMARK_(seq__37076_37094__$1)){
var c__24962__auto___37095 = cljs.core.chunk_first(seq__37076_37094__$1);
var G__37096 = cljs.core.chunk_rest(seq__37076_37094__$1);
var G__37097 = c__24962__auto___37095;
var G__37098 = cljs.core.count(c__24962__auto___37095);
var G__37099 = (0);
seq__37076_37082 = G__37096;
chunk__37077_37083 = G__37097;
count__37078_37084 = G__37098;
i__37079_37085 = G__37099;
continue;
} else {
var vec__37081_37100 = cljs.core.first(seq__37076_37094__$1);
var k_37101 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37081_37100,(0),null);
var v_37102 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37081_37100,(1),null);
dommy.core.set_style_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem,cljs.core.array_seq([k_37101,[cljs.core.str(v_37102),cljs.core.str("px")].join('')], 0));

var G__37103 = cljs.core.next(seq__37076_37094__$1);
var G__37104 = null;
var G__37105 = (0);
var G__37106 = (0);
seq__37076_37082 = G__37103;
chunk__37077_37083 = G__37104;
count__37078_37084 = G__37105;
i__37079_37085 = G__37106;
continue;
}
} else {
}
}
break;
}

return elem;
};
var dommy$core$set_px_BANG_ = function (elem,var_args){
var kvs = null;
if (arguments.length > 1) {
var G__37107__i = 0, G__37107__a = new Array(arguments.length -  1);
while (G__37107__i < G__37107__a.length) {G__37107__a[G__37107__i] = arguments[G__37107__i + 1]; ++G__37107__i;}
  kvs = new cljs.core.IndexedSeq(G__37107__a,0);
} 
return dommy$core$set_px_BANG___delegate.call(this,elem,kvs);};
dommy$core$set_px_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$set_px_BANG_.cljs$lang$applyTo = (function (arglist__37108){
var elem = cljs.core.first(arglist__37108);
var kvs = cljs.core.rest(arglist__37108);
return dommy$core$set_px_BANG___delegate(elem,kvs);
});
dommy$core$set_px_BANG_.cljs$core$IFn$_invoke$arity$variadic = dommy$core$set_px_BANG___delegate;
return dommy$core$set_px_BANG_;
})()
;
/**
 * Sets dom attributes on and returns `elem`.
 * Attributes without values will be set to "true":
 * 
 * (set-attr! elem :disabled)
 * 
 * With values, the function takes variadic kv pairs:
 * 
 * (set-attr! elem :id "some-id"
 * :name "some-name")
 * @param {...*} var_args
 */
dommy.core.set_attr_BANG_ = (function() {
var dommy$core$set_attr_BANG_ = null;
var dommy$core$set_attr_BANG___2 = (function (elem,k){
return dommy$core$set_attr_BANG_.cljs$core$IFn$_invoke$arity$3(elem,k,"true");
});
var dommy$core$set_attr_BANG___3 = (function (elem,k,v){
var k__$1 = dommy.utils.as_str(k);
if(cljs.core.truth_(v)){
if(cljs.core.fn_QMARK_(v)){
var G__37126 = elem;
(G__37126[k__$1] = v);

return G__37126;
} else {
var G__37127 = elem;
G__37127.setAttribute(k__$1,v);

return G__37127;
}
} else {
return null;
}
});
var dommy$core$set_attr_BANG___4 = (function() { 
var G__37134__delegate = function (elem,k,v,kvs){
if(cljs.core.even_QMARK_(cljs.core.count(kvs))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1827825394,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-514511684,null),new cljs.core.Symbol(null,"kvs","kvs",-1695980277,null)))], 0)))].join('')));
}

var seq__37128_37135 = cljs.core.seq(cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null),cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),kvs)));
var chunk__37129_37136 = null;
var count__37130_37137 = (0);
var i__37131_37138 = (0);
while(true){
if((i__37131_37138 < count__37130_37137)){
var vec__37132_37139 = chunk__37129_37136.cljs$core$IIndexed$_nth$arity$2(null,i__37131_37138);
var k_37140__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37132_37139,(0),null);
var v_37141__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37132_37139,(1),null);
dommy$core$set_attr_BANG_.cljs$core$IFn$_invoke$arity$3(elem,k_37140__$1,v_37141__$1);

var G__37142 = seq__37128_37135;
var G__37143 = chunk__37129_37136;
var G__37144 = count__37130_37137;
var G__37145 = (i__37131_37138 + (1));
seq__37128_37135 = G__37142;
chunk__37129_37136 = G__37143;
count__37130_37137 = G__37144;
i__37131_37138 = G__37145;
continue;
} else {
var temp__4126__auto___37146 = cljs.core.seq(seq__37128_37135);
if(temp__4126__auto___37146){
var seq__37128_37147__$1 = temp__4126__auto___37146;
if(cljs.core.chunked_seq_QMARK_(seq__37128_37147__$1)){
var c__24962__auto___37148 = cljs.core.chunk_first(seq__37128_37147__$1);
var G__37149 = cljs.core.chunk_rest(seq__37128_37147__$1);
var G__37150 = c__24962__auto___37148;
var G__37151 = cljs.core.count(c__24962__auto___37148);
var G__37152 = (0);
seq__37128_37135 = G__37149;
chunk__37129_37136 = G__37150;
count__37130_37137 = G__37151;
i__37131_37138 = G__37152;
continue;
} else {
var vec__37133_37153 = cljs.core.first(seq__37128_37147__$1);
var k_37154__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37133_37153,(0),null);
var v_37155__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37133_37153,(1),null);
dommy$core$set_attr_BANG_.cljs$core$IFn$_invoke$arity$3(elem,k_37154__$1,v_37155__$1);

var G__37156 = cljs.core.next(seq__37128_37147__$1);
var G__37157 = null;
var G__37158 = (0);
var G__37159 = (0);
seq__37128_37135 = G__37156;
chunk__37129_37136 = G__37157;
count__37130_37137 = G__37158;
i__37131_37138 = G__37159;
continue;
}
} else {
}
}
break;
}

return elem;
};
var G__37134 = function (elem,k,v,var_args){
var kvs = null;
if (arguments.length > 3) {
var G__37160__i = 0, G__37160__a = new Array(arguments.length -  3);
while (G__37160__i < G__37160__a.length) {G__37160__a[G__37160__i] = arguments[G__37160__i + 3]; ++G__37160__i;}
  kvs = new cljs.core.IndexedSeq(G__37160__a,0);
} 
return G__37134__delegate.call(this,elem,k,v,kvs);};
G__37134.cljs$lang$maxFixedArity = 3;
G__37134.cljs$lang$applyTo = (function (arglist__37161){
var elem = cljs.core.first(arglist__37161);
arglist__37161 = cljs.core.next(arglist__37161);
var k = cljs.core.first(arglist__37161);
arglist__37161 = cljs.core.next(arglist__37161);
var v = cljs.core.first(arglist__37161);
var kvs = cljs.core.rest(arglist__37161);
return G__37134__delegate(elem,k,v,kvs);
});
G__37134.cljs$core$IFn$_invoke$arity$variadic = G__37134__delegate;
return G__37134;
})()
;
dommy$core$set_attr_BANG_ = function(elem,k,v,var_args){
var kvs = var_args;
switch(arguments.length){
case 2:
return dommy$core$set_attr_BANG___2.call(this,elem,k);
case 3:
return dommy$core$set_attr_BANG___3.call(this,elem,k,v);
default:
var G__37162 = null;
if (arguments.length > 3) {
var G__37163__i = 0, G__37163__a = new Array(arguments.length -  3);
while (G__37163__i < G__37163__a.length) {G__37163__a[G__37163__i] = arguments[G__37163__i + 3]; ++G__37163__i;}
G__37162 = new cljs.core.IndexedSeq(G__37163__a,0);
}
return dommy$core$set_attr_BANG___4.cljs$core$IFn$_invoke$arity$variadic(elem,k,v, G__37162);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
dommy$core$set_attr_BANG_.cljs$lang$maxFixedArity = 3;
dommy$core$set_attr_BANG_.cljs$lang$applyTo = dommy$core$set_attr_BANG___4.cljs$lang$applyTo;
dommy$core$set_attr_BANG_.cljs$core$IFn$_invoke$arity$2 = dommy$core$set_attr_BANG___2;
dommy$core$set_attr_BANG_.cljs$core$IFn$_invoke$arity$3 = dommy$core$set_attr_BANG___3;
dommy$core$set_attr_BANG_.cljs$core$IFn$_invoke$arity$variadic = dommy$core$set_attr_BANG___4.cljs$core$IFn$_invoke$arity$variadic;
return dommy$core$set_attr_BANG_;
})()
;
/**
 * Removes dom attributes on and returns `elem`.
 * `class` and `classes` are special cases which clear
 * out the class name on removal.
 * @param {...*} var_args
 */
dommy.core.remove_attr_BANG_ = (function() {
var dommy$core$remove_attr_BANG_ = null;
var dommy$core$remove_attr_BANG___2 = (function (elem,k){
var k_37176__$1 = dommy.utils.as_str(k);
if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["class",null,"classes",null], null), null).call(null,k_37176__$1))){
dommy.core.set_class_BANG_(elem,"");
} else {
elem.removeAttribute(k_37176__$1);
}

return elem;
});
var dommy$core$remove_attr_BANG___3 = (function() { 
var G__37177__delegate = function (elem,k,ks){
var seq__37172_37178 = cljs.core.seq(cljs.core.cons(k,ks));
var chunk__37173_37179 = null;
var count__37174_37180 = (0);
var i__37175_37181 = (0);
while(true){
if((i__37175_37181 < count__37174_37180)){
var k_37182__$1 = chunk__37173_37179.cljs$core$IIndexed$_nth$arity$2(null,i__37175_37181);
dommy$core$remove_attr_BANG_.cljs$core$IFn$_invoke$arity$2(elem,k_37182__$1);

var G__37183 = seq__37172_37178;
var G__37184 = chunk__37173_37179;
var G__37185 = count__37174_37180;
var G__37186 = (i__37175_37181 + (1));
seq__37172_37178 = G__37183;
chunk__37173_37179 = G__37184;
count__37174_37180 = G__37185;
i__37175_37181 = G__37186;
continue;
} else {
var temp__4126__auto___37187 = cljs.core.seq(seq__37172_37178);
if(temp__4126__auto___37187){
var seq__37172_37188__$1 = temp__4126__auto___37187;
if(cljs.core.chunked_seq_QMARK_(seq__37172_37188__$1)){
var c__24962__auto___37189 = cljs.core.chunk_first(seq__37172_37188__$1);
var G__37190 = cljs.core.chunk_rest(seq__37172_37188__$1);
var G__37191 = c__24962__auto___37189;
var G__37192 = cljs.core.count(c__24962__auto___37189);
var G__37193 = (0);
seq__37172_37178 = G__37190;
chunk__37173_37179 = G__37191;
count__37174_37180 = G__37192;
i__37175_37181 = G__37193;
continue;
} else {
var k_37194__$1 = cljs.core.first(seq__37172_37188__$1);
dommy$core$remove_attr_BANG_.cljs$core$IFn$_invoke$arity$2(elem,k_37194__$1);

var G__37195 = cljs.core.next(seq__37172_37188__$1);
var G__37196 = null;
var G__37197 = (0);
var G__37198 = (0);
seq__37172_37178 = G__37195;
chunk__37173_37179 = G__37196;
count__37174_37180 = G__37197;
i__37175_37181 = G__37198;
continue;
}
} else {
}
}
break;
}

return elem;
};
var G__37177 = function (elem,k,var_args){
var ks = null;
if (arguments.length > 2) {
var G__37199__i = 0, G__37199__a = new Array(arguments.length -  2);
while (G__37199__i < G__37199__a.length) {G__37199__a[G__37199__i] = arguments[G__37199__i + 2]; ++G__37199__i;}
  ks = new cljs.core.IndexedSeq(G__37199__a,0);
} 
return G__37177__delegate.call(this,elem,k,ks);};
G__37177.cljs$lang$maxFixedArity = 2;
G__37177.cljs$lang$applyTo = (function (arglist__37200){
var elem = cljs.core.first(arglist__37200);
arglist__37200 = cljs.core.next(arglist__37200);
var k = cljs.core.first(arglist__37200);
var ks = cljs.core.rest(arglist__37200);
return G__37177__delegate(elem,k,ks);
});
G__37177.cljs$core$IFn$_invoke$arity$variadic = G__37177__delegate;
return G__37177;
})()
;
dommy$core$remove_attr_BANG_ = function(elem,k,var_args){
var ks = var_args;
switch(arguments.length){
case 2:
return dommy$core$remove_attr_BANG___2.call(this,elem,k);
default:
var G__37201 = null;
if (arguments.length > 2) {
var G__37202__i = 0, G__37202__a = new Array(arguments.length -  2);
while (G__37202__i < G__37202__a.length) {G__37202__a[G__37202__i] = arguments[G__37202__i + 2]; ++G__37202__i;}
G__37201 = new cljs.core.IndexedSeq(G__37202__a,0);
}
return dommy$core$remove_attr_BANG___3.cljs$core$IFn$_invoke$arity$variadic(elem,k, G__37201);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
dommy$core$remove_attr_BANG_.cljs$lang$maxFixedArity = 2;
dommy$core$remove_attr_BANG_.cljs$lang$applyTo = dommy$core$remove_attr_BANG___3.cljs$lang$applyTo;
dommy$core$remove_attr_BANG_.cljs$core$IFn$_invoke$arity$2 = dommy$core$remove_attr_BANG___2;
dommy$core$remove_attr_BANG_.cljs$core$IFn$_invoke$arity$variadic = dommy$core$remove_attr_BANG___3.cljs$core$IFn$_invoke$arity$variadic;
return dommy$core$remove_attr_BANG_;
})()
;
/**
 * Toggles a dom attribute `k` on `elem`, optionally specifying
 * the boolean value with `add?`
 */
dommy.core.toggle_attr_BANG_ = (function() {
var dommy$core$toggle_attr_BANG_ = null;
var dommy$core$toggle_attr_BANG___2 = (function (elem,k){
return dommy$core$toggle_attr_BANG_.cljs$core$IFn$_invoke$arity$3(elem,k,cljs.core.boolean$(dommy.core.attr(elem,k)));
});
var dommy$core$toggle_attr_BANG___3 = (function (elem,k,add_QMARK_){
if(add_QMARK_){
return dommy.core.set_attr_BANG_.cljs$core$IFn$_invoke$arity$2(elem,k);
} else {
return dommy.core.remove_attr_BANG_.cljs$core$IFn$_invoke$arity$2(elem,k);
}
});
dommy$core$toggle_attr_BANG_ = function(elem,k,add_QMARK_){
switch(arguments.length){
case 2:
return dommy$core$toggle_attr_BANG___2.call(this,elem,k);
case 3:
return dommy$core$toggle_attr_BANG___3.call(this,elem,k,add_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
dommy$core$toggle_attr_BANG_.cljs$core$IFn$_invoke$arity$2 = dommy$core$toggle_attr_BANG___2;
dommy$core$toggle_attr_BANG_.cljs$core$IFn$_invoke$arity$3 = dommy$core$toggle_attr_BANG___3;
return dommy$core$toggle_attr_BANG_;
})()
;
/**
 * Add `classes` to `elem`, trying to use Element::classList, and
 * falling back to fast string parsing/manipulation
 * @param {...*} var_args
 */
dommy.core.add_class_BANG_ = (function() {
var dommy$core$add_class_BANG_ = null;
var dommy$core$add_class_BANG___2 = (function (elem,classes){
var classes__$1 = clojure.string.trim(dommy.utils.as_str(classes)).split(/\s+/);
if(cljs.core.seq(classes__$1)){
var temp__4124__auto___37234 = elem.classList;
if(cljs.core.truth_(temp__4124__auto___37234)){
var class_list_37235 = temp__4124__auto___37234;
var seq__37222_37236 = cljs.core.seq(classes__$1);
var chunk__37223_37237 = null;
var count__37224_37238 = (0);
var i__37225_37239 = (0);
while(true){
if((i__37225_37239 < count__37224_37238)){
var c_37240 = chunk__37223_37237.cljs$core$IIndexed$_nth$arity$2(null,i__37225_37239);
class_list_37235.add(c_37240);

var G__37241 = seq__37222_37236;
var G__37242 = chunk__37223_37237;
var G__37243 = count__37224_37238;
var G__37244 = (i__37225_37239 + (1));
seq__37222_37236 = G__37241;
chunk__37223_37237 = G__37242;
count__37224_37238 = G__37243;
i__37225_37239 = G__37244;
continue;
} else {
var temp__4126__auto___37245 = cljs.core.seq(seq__37222_37236);
if(temp__4126__auto___37245){
var seq__37222_37246__$1 = temp__4126__auto___37245;
if(cljs.core.chunked_seq_QMARK_(seq__37222_37246__$1)){
var c__24962__auto___37247 = cljs.core.chunk_first(seq__37222_37246__$1);
var G__37248 = cljs.core.chunk_rest(seq__37222_37246__$1);
var G__37249 = c__24962__auto___37247;
var G__37250 = cljs.core.count(c__24962__auto___37247);
var G__37251 = (0);
seq__37222_37236 = G__37248;
chunk__37223_37237 = G__37249;
count__37224_37238 = G__37250;
i__37225_37239 = G__37251;
continue;
} else {
var c_37252 = cljs.core.first(seq__37222_37246__$1);
class_list_37235.add(c_37252);

var G__37253 = cljs.core.next(seq__37222_37246__$1);
var G__37254 = null;
var G__37255 = (0);
var G__37256 = (0);
seq__37222_37236 = G__37253;
chunk__37223_37237 = G__37254;
count__37224_37238 = G__37255;
i__37225_37239 = G__37256;
continue;
}
} else {
}
}
break;
}
} else {
var seq__37226_37257 = cljs.core.seq(classes__$1);
var chunk__37227_37258 = null;
var count__37228_37259 = (0);
var i__37229_37260 = (0);
while(true){
if((i__37229_37260 < count__37228_37259)){
var c_37261 = chunk__37227_37258.cljs$core$IIndexed$_nth$arity$2(null,i__37229_37260);
var class_name_37262 = dommy.core.class$(elem);
if(cljs.core.truth_(dommy.utils.class_index(class_name_37262,c_37261))){
} else {
dommy.core.set_class_BANG_(elem,(((class_name_37262 === ""))?c_37261:[cljs.core.str(class_name_37262),cljs.core.str(" "),cljs.core.str(c_37261)].join('')));
}

var G__37263 = seq__37226_37257;
var G__37264 = chunk__37227_37258;
var G__37265 = count__37228_37259;
var G__37266 = (i__37229_37260 + (1));
seq__37226_37257 = G__37263;
chunk__37227_37258 = G__37264;
count__37228_37259 = G__37265;
i__37229_37260 = G__37266;
continue;
} else {
var temp__4126__auto___37267 = cljs.core.seq(seq__37226_37257);
if(temp__4126__auto___37267){
var seq__37226_37268__$1 = temp__4126__auto___37267;
if(cljs.core.chunked_seq_QMARK_(seq__37226_37268__$1)){
var c__24962__auto___37269 = cljs.core.chunk_first(seq__37226_37268__$1);
var G__37270 = cljs.core.chunk_rest(seq__37226_37268__$1);
var G__37271 = c__24962__auto___37269;
var G__37272 = cljs.core.count(c__24962__auto___37269);
var G__37273 = (0);
seq__37226_37257 = G__37270;
chunk__37227_37258 = G__37271;
count__37228_37259 = G__37272;
i__37229_37260 = G__37273;
continue;
} else {
var c_37274 = cljs.core.first(seq__37226_37268__$1);
var class_name_37275 = dommy.core.class$(elem);
if(cljs.core.truth_(dommy.utils.class_index(class_name_37275,c_37274))){
} else {
dommy.core.set_class_BANG_(elem,(((class_name_37275 === ""))?c_37274:[cljs.core.str(class_name_37275),cljs.core.str(" "),cljs.core.str(c_37274)].join('')));
}

var G__37276 = cljs.core.next(seq__37226_37268__$1);
var G__37277 = null;
var G__37278 = (0);
var G__37279 = (0);
seq__37226_37257 = G__37276;
chunk__37227_37258 = G__37277;
count__37228_37259 = G__37278;
i__37229_37260 = G__37279;
continue;
}
} else {
}
}
break;
}
}
} else {
}

return elem;
});
var dommy$core$add_class_BANG___3 = (function() { 
var G__37280__delegate = function (elem,classes,more_classes){
var seq__37230_37281 = cljs.core.seq(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(more_classes,classes));
var chunk__37231_37282 = null;
var count__37232_37283 = (0);
var i__37233_37284 = (0);
while(true){
if((i__37233_37284 < count__37232_37283)){
var c_37285 = chunk__37231_37282.cljs$core$IIndexed$_nth$arity$2(null,i__37233_37284);
dommy$core$add_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem,c_37285);

var G__37286 = seq__37230_37281;
var G__37287 = chunk__37231_37282;
var G__37288 = count__37232_37283;
var G__37289 = (i__37233_37284 + (1));
seq__37230_37281 = G__37286;
chunk__37231_37282 = G__37287;
count__37232_37283 = G__37288;
i__37233_37284 = G__37289;
continue;
} else {
var temp__4126__auto___37290 = cljs.core.seq(seq__37230_37281);
if(temp__4126__auto___37290){
var seq__37230_37291__$1 = temp__4126__auto___37290;
if(cljs.core.chunked_seq_QMARK_(seq__37230_37291__$1)){
var c__24962__auto___37292 = cljs.core.chunk_first(seq__37230_37291__$1);
var G__37293 = cljs.core.chunk_rest(seq__37230_37291__$1);
var G__37294 = c__24962__auto___37292;
var G__37295 = cljs.core.count(c__24962__auto___37292);
var G__37296 = (0);
seq__37230_37281 = G__37293;
chunk__37231_37282 = G__37294;
count__37232_37283 = G__37295;
i__37233_37284 = G__37296;
continue;
} else {
var c_37297 = cljs.core.first(seq__37230_37291__$1);
dommy$core$add_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem,c_37297);

var G__37298 = cljs.core.next(seq__37230_37291__$1);
var G__37299 = null;
var G__37300 = (0);
var G__37301 = (0);
seq__37230_37281 = G__37298;
chunk__37231_37282 = G__37299;
count__37232_37283 = G__37300;
i__37233_37284 = G__37301;
continue;
}
} else {
}
}
break;
}

return elem;
};
var G__37280 = function (elem,classes,var_args){
var more_classes = null;
if (arguments.length > 2) {
var G__37302__i = 0, G__37302__a = new Array(arguments.length -  2);
while (G__37302__i < G__37302__a.length) {G__37302__a[G__37302__i] = arguments[G__37302__i + 2]; ++G__37302__i;}
  more_classes = new cljs.core.IndexedSeq(G__37302__a,0);
} 
return G__37280__delegate.call(this,elem,classes,more_classes);};
G__37280.cljs$lang$maxFixedArity = 2;
G__37280.cljs$lang$applyTo = (function (arglist__37303){
var elem = cljs.core.first(arglist__37303);
arglist__37303 = cljs.core.next(arglist__37303);
var classes = cljs.core.first(arglist__37303);
var more_classes = cljs.core.rest(arglist__37303);
return G__37280__delegate(elem,classes,more_classes);
});
G__37280.cljs$core$IFn$_invoke$arity$variadic = G__37280__delegate;
return G__37280;
})()
;
dommy$core$add_class_BANG_ = function(elem,classes,var_args){
var more_classes = var_args;
switch(arguments.length){
case 2:
return dommy$core$add_class_BANG___2.call(this,elem,classes);
default:
var G__37304 = null;
if (arguments.length > 2) {
var G__37305__i = 0, G__37305__a = new Array(arguments.length -  2);
while (G__37305__i < G__37305__a.length) {G__37305__a[G__37305__i] = arguments[G__37305__i + 2]; ++G__37305__i;}
G__37304 = new cljs.core.IndexedSeq(G__37305__a,0);
}
return dommy$core$add_class_BANG___3.cljs$core$IFn$_invoke$arity$variadic(elem,classes, G__37304);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
dommy$core$add_class_BANG_.cljs$lang$maxFixedArity = 2;
dommy$core$add_class_BANG_.cljs$lang$applyTo = dommy$core$add_class_BANG___3.cljs$lang$applyTo;
dommy$core$add_class_BANG_.cljs$core$IFn$_invoke$arity$2 = dommy$core$add_class_BANG___2;
dommy$core$add_class_BANG_.cljs$core$IFn$_invoke$arity$variadic = dommy$core$add_class_BANG___3.cljs$core$IFn$_invoke$arity$variadic;
return dommy$core$add_class_BANG_;
})()
;
/**
 * Remove `c` from `elem` class list
 * @param {...*} var_args
 */
dommy.core.remove_class_BANG_ = (function() {
var dommy$core$remove_class_BANG_ = null;
var dommy$core$remove_class_BANG___2 = (function (elem,c){
var c__$1 = dommy.utils.as_str(c);
var temp__4124__auto___37318 = elem.classList;
if(cljs.core.truth_(temp__4124__auto___37318)){
var class_list_37319 = temp__4124__auto___37318;
class_list_37319.remove(c__$1);
} else {
var class_name_37320 = dommy.core.class$(elem);
var new_class_name_37321 = dommy.utils.remove_class_str(class_name_37320,c__$1);
if((class_name_37320 === new_class_name_37321)){
} else {
dommy.core.set_class_BANG_(elem,new_class_name_37321);
}
}

return elem;
});
var dommy$core$remove_class_BANG___3 = (function() { 
var G__37322__delegate = function (elem,class$,classes){
var seq__37314 = cljs.core.seq(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(classes,class$));
var chunk__37315 = null;
var count__37316 = (0);
var i__37317 = (0);
while(true){
if((i__37317 < count__37316)){
var c = chunk__37315.cljs$core$IIndexed$_nth$arity$2(null,i__37317);
dommy$core$remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem,c);

var G__37323 = seq__37314;
var G__37324 = chunk__37315;
var G__37325 = count__37316;
var G__37326 = (i__37317 + (1));
seq__37314 = G__37323;
chunk__37315 = G__37324;
count__37316 = G__37325;
i__37317 = G__37326;
continue;
} else {
var temp__4126__auto__ = cljs.core.seq(seq__37314);
if(temp__4126__auto__){
var seq__37314__$1 = temp__4126__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__37314__$1)){
var c__24962__auto__ = cljs.core.chunk_first(seq__37314__$1);
var G__37327 = cljs.core.chunk_rest(seq__37314__$1);
var G__37328 = c__24962__auto__;
var G__37329 = cljs.core.count(c__24962__auto__);
var G__37330 = (0);
seq__37314 = G__37327;
chunk__37315 = G__37328;
count__37316 = G__37329;
i__37317 = G__37330;
continue;
} else {
var c = cljs.core.first(seq__37314__$1);
dommy$core$remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem,c);

var G__37331 = cljs.core.next(seq__37314__$1);
var G__37332 = null;
var G__37333 = (0);
var G__37334 = (0);
seq__37314 = G__37331;
chunk__37315 = G__37332;
count__37316 = G__37333;
i__37317 = G__37334;
continue;
}
} else {
return null;
}
}
break;
}
};
var G__37322 = function (elem,class$,var_args){
var classes = null;
if (arguments.length > 2) {
var G__37335__i = 0, G__37335__a = new Array(arguments.length -  2);
while (G__37335__i < G__37335__a.length) {G__37335__a[G__37335__i] = arguments[G__37335__i + 2]; ++G__37335__i;}
  classes = new cljs.core.IndexedSeq(G__37335__a,0);
} 
return G__37322__delegate.call(this,elem,class$,classes);};
G__37322.cljs$lang$maxFixedArity = 2;
G__37322.cljs$lang$applyTo = (function (arglist__37336){
var elem = cljs.core.first(arglist__37336);
arglist__37336 = cljs.core.next(arglist__37336);
var class$ = cljs.core.first(arglist__37336);
var classes = cljs.core.rest(arglist__37336);
return G__37322__delegate(elem,class$,classes);
});
G__37322.cljs$core$IFn$_invoke$arity$variadic = G__37322__delegate;
return G__37322;
})()
;
dommy$core$remove_class_BANG_ = function(elem,class$,var_args){
var classes = var_args;
switch(arguments.length){
case 2:
return dommy$core$remove_class_BANG___2.call(this,elem,class$);
default:
var G__37337 = null;
if (arguments.length > 2) {
var G__37338__i = 0, G__37338__a = new Array(arguments.length -  2);
while (G__37338__i < G__37338__a.length) {G__37338__a[G__37338__i] = arguments[G__37338__i + 2]; ++G__37338__i;}
G__37337 = new cljs.core.IndexedSeq(G__37338__a,0);
}
return dommy$core$remove_class_BANG___3.cljs$core$IFn$_invoke$arity$variadic(elem,class$, G__37337);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
dommy$core$remove_class_BANG_.cljs$lang$maxFixedArity = 2;
dommy$core$remove_class_BANG_.cljs$lang$applyTo = dommy$core$remove_class_BANG___3.cljs$lang$applyTo;
dommy$core$remove_class_BANG_.cljs$core$IFn$_invoke$arity$2 = dommy$core$remove_class_BANG___2;
dommy$core$remove_class_BANG_.cljs$core$IFn$_invoke$arity$variadic = dommy$core$remove_class_BANG___3.cljs$core$IFn$_invoke$arity$variadic;
return dommy$core$remove_class_BANG_;
})()
;
/**
 * (toggle-class! elem class) will add-class! if elem does not have class
 * and remove-class! otherwise.
 * (toggle-class! elem class add?) will add-class! if add? is truthy,
 * otherwise it will remove-class!
 */
dommy.core.toggle_class_BANG_ = (function() {
var dommy$core$toggle_class_BANG_ = null;
var dommy$core$toggle_class_BANG___2 = (function (elem,c){
var c__$1 = dommy.utils.as_str(c);
var temp__4124__auto___37342 = elem.classList;
if(cljs.core.truth_(temp__4124__auto___37342)){
var class_list_37343 = temp__4124__auto___37342;
class_list_37343.toggle(c__$1);
} else {
dommy$core$toggle_class_BANG_.cljs$core$IFn$_invoke$arity$3(elem,c__$1,!(dommy.core.has_class_QMARK_(elem,c__$1)));
}

return elem;
});
var dommy$core$toggle_class_BANG___3 = (function (elem,class$,add_QMARK_){
if(add_QMARK_){
dommy.core.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem,class$);
} else {
dommy.core.remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem,class$);
}

return elem;
});
dommy$core$toggle_class_BANG_ = function(elem,class$,add_QMARK_){
switch(arguments.length){
case 2:
return dommy$core$toggle_class_BANG___2.call(this,elem,class$);
case 3:
return dommy$core$toggle_class_BANG___3.call(this,elem,class$,add_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
dommy$core$toggle_class_BANG_.cljs$core$IFn$_invoke$arity$2 = dommy$core$toggle_class_BANG___2;
dommy$core$toggle_class_BANG_.cljs$core$IFn$_invoke$arity$3 = dommy$core$toggle_class_BANG___3;
return dommy$core$toggle_class_BANG_;
})()
;
/**
 * Display or hide the given `elem` (using display: none).
 * Takes an optional boolean `show?`
 */
dommy.core.toggle_BANG_ = (function() {
var dommy$core$toggle_BANG_ = null;
var dommy$core$toggle_BANG___1 = (function (elem){
return dommy$core$toggle_BANG_.cljs$core$IFn$_invoke$arity$2(elem,dommy.core.hidden_QMARK_(elem));
});
var dommy$core$toggle_BANG___2 = (function (elem,show_QMARK_){
return dommy.core.set_style_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem,cljs.core.array_seq([cljs.core.constant$keyword$display,((show_QMARK_)?"":"none")], 0));
});
dommy$core$toggle_BANG_ = function(elem,show_QMARK_){
switch(arguments.length){
case 1:
return dommy$core$toggle_BANG___1.call(this,elem);
case 2:
return dommy$core$toggle_BANG___2.call(this,elem,show_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
dommy$core$toggle_BANG_.cljs$core$IFn$_invoke$arity$1 = dommy$core$toggle_BANG___1;
dommy$core$toggle_BANG_.cljs$core$IFn$_invoke$arity$2 = dommy$core$toggle_BANG___2;
return dommy$core$toggle_BANG_;
})()
;
dommy.core.hide_BANG_ = (function dommy$core$hide_BANG_(elem){
return dommy.core.toggle_BANG_.cljs$core$IFn$_invoke$arity$2(elem,false);
});
dommy.core.show_BANG_ = (function dommy$core$show_BANG_(elem){
return dommy.core.toggle_BANG_.cljs$core$IFn$_invoke$arity$2(elem,true);
});
dommy.core.scroll_into_view = (function dommy$core$scroll_into_view(elem,align_with_top_QMARK_){
var top = cljs.core.constant$keyword$top.cljs$core$IFn$_invoke$arity$1(dommy.core.bounding_client_rect(elem));
if((window.innerHeight < (top + elem.offsetHeight))){
return elem.scrollIntoView(align_with_top_QMARK_);
} else {
return null;
}
});
dommy.core.create_element = (function() {
var dommy$core$create_element = null;
var dommy$core$create_element__1 = (function (tag){
return document.createElement(dommy.utils.as_str(tag));
});
var dommy$core$create_element__2 = (function (tag_ns,tag){
return document.createElementNS(dommy.utils.as_str(tag_ns),dommy.utils.as_str(tag));
});
dommy$core$create_element = function(tag_ns,tag){
switch(arguments.length){
case 1:
return dommy$core$create_element__1.call(this,tag_ns);
case 2:
return dommy$core$create_element__2.call(this,tag_ns,tag);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
dommy$core$create_element.cljs$core$IFn$_invoke$arity$1 = dommy$core$create_element__1;
dommy$core$create_element.cljs$core$IFn$_invoke$arity$2 = dommy$core$create_element__2;
return dommy$core$create_element;
})()
;
dommy.core.create_text_node = (function dommy$core$create_text_node(text){
return document.createTextNode(text);
});
/**
 * Clears all children from `elem`
 */
dommy.core.clear_BANG_ = (function dommy$core$clear_BANG_(elem){
return dommy.core.set_html_BANG_(elem,"");
});
/**
 * Append `child` to `parent`
 * @param {...*} var_args
 */
dommy.core.append_BANG_ = (function() {
var dommy$core$append_BANG_ = null;
var dommy$core$append_BANG___2 = (function (parent,child){
var G__37355 = parent;
G__37355.appendChild(child);

return G__37355;
});
var dommy$core$append_BANG___3 = (function() { 
var G__37360__delegate = function (parent,child,more_children){
var seq__37356_37361 = cljs.core.seq(cljs.core.cons(child,more_children));
var chunk__37357_37362 = null;
var count__37358_37363 = (0);
var i__37359_37364 = (0);
while(true){
if((i__37359_37364 < count__37358_37363)){
var c_37365 = chunk__37357_37362.cljs$core$IIndexed$_nth$arity$2(null,i__37359_37364);
dommy$core$append_BANG_.cljs$core$IFn$_invoke$arity$2(parent,c_37365);

var G__37366 = seq__37356_37361;
var G__37367 = chunk__37357_37362;
var G__37368 = count__37358_37363;
var G__37369 = (i__37359_37364 + (1));
seq__37356_37361 = G__37366;
chunk__37357_37362 = G__37367;
count__37358_37363 = G__37368;
i__37359_37364 = G__37369;
continue;
} else {
var temp__4126__auto___37370 = cljs.core.seq(seq__37356_37361);
if(temp__4126__auto___37370){
var seq__37356_37371__$1 = temp__4126__auto___37370;
if(cljs.core.chunked_seq_QMARK_(seq__37356_37371__$1)){
var c__24962__auto___37372 = cljs.core.chunk_first(seq__37356_37371__$1);
var G__37373 = cljs.core.chunk_rest(seq__37356_37371__$1);
var G__37374 = c__24962__auto___37372;
var G__37375 = cljs.core.count(c__24962__auto___37372);
var G__37376 = (0);
seq__37356_37361 = G__37373;
chunk__37357_37362 = G__37374;
count__37358_37363 = G__37375;
i__37359_37364 = G__37376;
continue;
} else {
var c_37377 = cljs.core.first(seq__37356_37371__$1);
dommy$core$append_BANG_.cljs$core$IFn$_invoke$arity$2(parent,c_37377);

var G__37378 = cljs.core.next(seq__37356_37371__$1);
var G__37379 = null;
var G__37380 = (0);
var G__37381 = (0);
seq__37356_37361 = G__37378;
chunk__37357_37362 = G__37379;
count__37358_37363 = G__37380;
i__37359_37364 = G__37381;
continue;
}
} else {
}
}
break;
}

return parent;
};
var G__37360 = function (parent,child,var_args){
var more_children = null;
if (arguments.length > 2) {
var G__37382__i = 0, G__37382__a = new Array(arguments.length -  2);
while (G__37382__i < G__37382__a.length) {G__37382__a[G__37382__i] = arguments[G__37382__i + 2]; ++G__37382__i;}
  more_children = new cljs.core.IndexedSeq(G__37382__a,0);
} 
return G__37360__delegate.call(this,parent,child,more_children);};
G__37360.cljs$lang$maxFixedArity = 2;
G__37360.cljs$lang$applyTo = (function (arglist__37383){
var parent = cljs.core.first(arglist__37383);
arglist__37383 = cljs.core.next(arglist__37383);
var child = cljs.core.first(arglist__37383);
var more_children = cljs.core.rest(arglist__37383);
return G__37360__delegate(parent,child,more_children);
});
G__37360.cljs$core$IFn$_invoke$arity$variadic = G__37360__delegate;
return G__37360;
})()
;
dommy$core$append_BANG_ = function(parent,child,var_args){
var more_children = var_args;
switch(arguments.length){
case 2:
return dommy$core$append_BANG___2.call(this,parent,child);
default:
var G__37384 = null;
if (arguments.length > 2) {
var G__37385__i = 0, G__37385__a = new Array(arguments.length -  2);
while (G__37385__i < G__37385__a.length) {G__37385__a[G__37385__i] = arguments[G__37385__i + 2]; ++G__37385__i;}
G__37384 = new cljs.core.IndexedSeq(G__37385__a,0);
}
return dommy$core$append_BANG___3.cljs$core$IFn$_invoke$arity$variadic(parent,child, G__37384);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
dommy$core$append_BANG_.cljs$lang$maxFixedArity = 2;
dommy$core$append_BANG_.cljs$lang$applyTo = dommy$core$append_BANG___3.cljs$lang$applyTo;
dommy$core$append_BANG_.cljs$core$IFn$_invoke$arity$2 = dommy$core$append_BANG___2;
dommy$core$append_BANG_.cljs$core$IFn$_invoke$arity$variadic = dommy$core$append_BANG___3.cljs$core$IFn$_invoke$arity$variadic;
return dommy$core$append_BANG_;
})()
;
/**
 * Prepend `child` to `parent`
 * @param {...*} var_args
 */
dommy.core.prepend_BANG_ = (function() {
var dommy$core$prepend_BANG_ = null;
var dommy$core$prepend_BANG___2 = (function (parent,child){
var G__37395 = parent;
G__37395.insertBefore(child,parent.firstChild);

return G__37395;
});
var dommy$core$prepend_BANG___3 = (function() { 
var G__37400__delegate = function (parent,child,more_children){
var seq__37396_37401 = cljs.core.seq(cljs.core.cons(child,more_children));
var chunk__37397_37402 = null;
var count__37398_37403 = (0);
var i__37399_37404 = (0);
while(true){
if((i__37399_37404 < count__37398_37403)){
var c_37405 = chunk__37397_37402.cljs$core$IIndexed$_nth$arity$2(null,i__37399_37404);
dommy$core$prepend_BANG_.cljs$core$IFn$_invoke$arity$2(parent,c_37405);

var G__37406 = seq__37396_37401;
var G__37407 = chunk__37397_37402;
var G__37408 = count__37398_37403;
var G__37409 = (i__37399_37404 + (1));
seq__37396_37401 = G__37406;
chunk__37397_37402 = G__37407;
count__37398_37403 = G__37408;
i__37399_37404 = G__37409;
continue;
} else {
var temp__4126__auto___37410 = cljs.core.seq(seq__37396_37401);
if(temp__4126__auto___37410){
var seq__37396_37411__$1 = temp__4126__auto___37410;
if(cljs.core.chunked_seq_QMARK_(seq__37396_37411__$1)){
var c__24962__auto___37412 = cljs.core.chunk_first(seq__37396_37411__$1);
var G__37413 = cljs.core.chunk_rest(seq__37396_37411__$1);
var G__37414 = c__24962__auto___37412;
var G__37415 = cljs.core.count(c__24962__auto___37412);
var G__37416 = (0);
seq__37396_37401 = G__37413;
chunk__37397_37402 = G__37414;
count__37398_37403 = G__37415;
i__37399_37404 = G__37416;
continue;
} else {
var c_37417 = cljs.core.first(seq__37396_37411__$1);
dommy$core$prepend_BANG_.cljs$core$IFn$_invoke$arity$2(parent,c_37417);

var G__37418 = cljs.core.next(seq__37396_37411__$1);
var G__37419 = null;
var G__37420 = (0);
var G__37421 = (0);
seq__37396_37401 = G__37418;
chunk__37397_37402 = G__37419;
count__37398_37403 = G__37420;
i__37399_37404 = G__37421;
continue;
}
} else {
}
}
break;
}

return parent;
};
var G__37400 = function (parent,child,var_args){
var more_children = null;
if (arguments.length > 2) {
var G__37422__i = 0, G__37422__a = new Array(arguments.length -  2);
while (G__37422__i < G__37422__a.length) {G__37422__a[G__37422__i] = arguments[G__37422__i + 2]; ++G__37422__i;}
  more_children = new cljs.core.IndexedSeq(G__37422__a,0);
} 
return G__37400__delegate.call(this,parent,child,more_children);};
G__37400.cljs$lang$maxFixedArity = 2;
G__37400.cljs$lang$applyTo = (function (arglist__37423){
var parent = cljs.core.first(arglist__37423);
arglist__37423 = cljs.core.next(arglist__37423);
var child = cljs.core.first(arglist__37423);
var more_children = cljs.core.rest(arglist__37423);
return G__37400__delegate(parent,child,more_children);
});
G__37400.cljs$core$IFn$_invoke$arity$variadic = G__37400__delegate;
return G__37400;
})()
;
dommy$core$prepend_BANG_ = function(parent,child,var_args){
var more_children = var_args;
switch(arguments.length){
case 2:
return dommy$core$prepend_BANG___2.call(this,parent,child);
default:
var G__37424 = null;
if (arguments.length > 2) {
var G__37425__i = 0, G__37425__a = new Array(arguments.length -  2);
while (G__37425__i < G__37425__a.length) {G__37425__a[G__37425__i] = arguments[G__37425__i + 2]; ++G__37425__i;}
G__37424 = new cljs.core.IndexedSeq(G__37425__a,0);
}
return dommy$core$prepend_BANG___3.cljs$core$IFn$_invoke$arity$variadic(parent,child, G__37424);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
dommy$core$prepend_BANG_.cljs$lang$maxFixedArity = 2;
dommy$core$prepend_BANG_.cljs$lang$applyTo = dommy$core$prepend_BANG___3.cljs$lang$applyTo;
dommy$core$prepend_BANG_.cljs$core$IFn$_invoke$arity$2 = dommy$core$prepend_BANG___2;
dommy$core$prepend_BANG_.cljs$core$IFn$_invoke$arity$variadic = dommy$core$prepend_BANG___3.cljs$core$IFn$_invoke$arity$variadic;
return dommy$core$prepend_BANG_;
})()
;
/**
 * Insert `elem` before `other`, `other` must have a parent
 */
dommy.core.insert_before_BANG_ = (function dommy$core$insert_before_BANG_(elem,other){
var p = dommy.core.parent(other);
if(cljs.core.truth_(p)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("Target element must have a parent"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.Symbol(null,"p","p",1791580836,null)], 0)))].join('')));
}

p.insertBefore(elem,other);

return elem;
});
/**
 * Insert `elem` after `other`, `other` must have a parent
 */
dommy.core.insert_after_BANG_ = (function dommy$core$insert_after_BANG_(elem,other){
var temp__4124__auto___37426 = other.nextSibling;
if(cljs.core.truth_(temp__4124__auto___37426)){
var next_37427 = temp__4124__auto___37426;
dommy.core.insert_before_BANG_(elem,next_37427);
} else {
dommy.core.append_BANG_.cljs$core$IFn$_invoke$arity$2(dommy.core.parent(other),elem);
}

return elem;
});
/**
 * Replace `elem` with `new`, return `new`
 */
dommy.core.replace_BANG_ = (function dommy$core$replace_BANG_(elem,new$){
var p = dommy.core.parent(elem);
if(cljs.core.truth_(p)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("Target element must have a parent"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.Symbol(null,"p","p",1791580836,null)], 0)))].join('')));
}

p.replaceChild(new$,elem);

return new$;
});
/**
 * Replace children of `elem` with `child`
 */
dommy.core.replace_contents_BANG_ = (function dommy$core$replace_contents_BANG_(p,child){
return dommy.core.append_BANG_.cljs$core$IFn$_invoke$arity$2(dommy.core.clear_BANG_(p),child);
});
/**
 * Remove `elem` from `parent`, return `parent`
 */
dommy.core.remove_BANG_ = (function() {
var dommy$core$remove_BANG_ = null;
var dommy$core$remove_BANG___1 = (function (elem){
var p = dommy.core.parent(elem);
if(cljs.core.truth_(p)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("Target element must have a parent"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.Symbol(null,"p","p",1791580836,null)], 0)))].join('')));
}

return dommy$core$remove_BANG_.cljs$core$IFn$_invoke$arity$2(p,elem);
});
var dommy$core$remove_BANG___2 = (function (p,elem){
var G__37431 = p;
G__37431.removeChild(elem);

return G__37431;
});
dommy$core$remove_BANG_ = function(p,elem){
switch(arguments.length){
case 1:
return dommy$core$remove_BANG___1.call(this,p);
case 2:
return dommy$core$remove_BANG___2.call(this,p,elem);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
dommy$core$remove_BANG_.cljs$core$IFn$_invoke$arity$1 = dommy$core$remove_BANG___1;
dommy$core$remove_BANG_.cljs$core$IFn$_invoke$arity$2 = dommy$core$remove_BANG___2;
return dommy$core$remove_BANG_;
})()
;
dommy.core.special_listener_makers = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__37432){
var vec__37433 = p__37432;
var special_mouse_event = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37433,(0),null);
var real_mouse_event = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37433,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [special_mouse_event,new cljs.core.PersistentArrayMap.fromArray([real_mouse_event,((function (vec__37433,special_mouse_event,real_mouse_event){
return (function (f){
return ((function (vec__37433,special_mouse_event,real_mouse_event){
return (function (event){
var related_target = event.relatedTarget;
var listener_target = (function (){var or__24177__auto__ = event.selectedTarget;
if(cljs.core.truth_(or__24177__auto__)){
return or__24177__auto__;
} else {
return event.currentTarget;
}
})();
if(cljs.core.truth_((function (){var and__24165__auto__ = related_target;
if(cljs.core.truth_(and__24165__auto__)){
return dommy.core.descendant_QMARK_(related_target,listener_target);
} else {
return and__24165__auto__;
}
})())){
return null;
} else {
var G__37434 = event;
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__37434) : f.call(null,G__37434));
}
});
;})(vec__37433,special_mouse_event,real_mouse_event))
});})(vec__37433,special_mouse_event,real_mouse_event))
], true, false)], null);
}),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$mouseenter,cljs.core.constant$keyword$mouseover,cljs.core.constant$keyword$mouseleave,cljs.core.constant$keyword$mouseout], null)));
/**
 * fires f if event.target is found with `selector`
 */
dommy.core.live_listener = (function dommy$core$live_listener(elem,selector,f){
return (function (event){
var selected_target = dommy.core.closest.cljs$core$IFn$_invoke$arity$3(elem,event.target,selector);
if(cljs.core.truth_((function (){var and__24165__auto__ = selected_target;
if(cljs.core.truth_(and__24165__auto__)){
return cljs.core.not(dommy.core.attr(selected_target,cljs.core.constant$keyword$disabled));
} else {
return and__24165__auto__;
}
})())){
event.selectedTarget = selected_target;

var G__37436 = event;
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__37436) : f.call(null,G__37436));
} else {
return null;
}
});
});
/**
 * Returns a nested map of event listeners on `elem`
 */
dommy.core.event_listeners = (function dommy$core$event_listeners(elem){
var or__24177__auto__ = elem.dommyEventListeners;
if(cljs.core.truth_(or__24177__auto__)){
return or__24177__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
});
/**
 * @param {...*} var_args
 */
dommy.core.update_event_listeners_BANG_ = (function() { 
var dommy$core$update_event_listeners_BANG___delegate = function (elem,f,args){
var elem__$1 = elem;
return elem__$1.dommyEventListeners = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(f,dommy.core.event_listeners(elem__$1),args);
};
var dommy$core$update_event_listeners_BANG_ = function (elem,f,var_args){
var args = null;
if (arguments.length > 2) {
var G__37437__i = 0, G__37437__a = new Array(arguments.length -  2);
while (G__37437__i < G__37437__a.length) {G__37437__a[G__37437__i] = arguments[G__37437__i + 2]; ++G__37437__i;}
  args = new cljs.core.IndexedSeq(G__37437__a,0);
} 
return dommy$core$update_event_listeners_BANG___delegate.call(this,elem,f,args);};
dommy$core$update_event_listeners_BANG_.cljs$lang$maxFixedArity = 2;
dommy$core$update_event_listeners_BANG_.cljs$lang$applyTo = (function (arglist__37438){
var elem = cljs.core.first(arglist__37438);
arglist__37438 = cljs.core.next(arglist__37438);
var f = cljs.core.first(arglist__37438);
var args = cljs.core.rest(arglist__37438);
return dommy$core$update_event_listeners_BANG___delegate(elem,f,args);
});
dommy$core$update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic = dommy$core$update_event_listeners_BANG___delegate;
return dommy$core$update_event_listeners_BANG_;
})()
;
dommy.core.elem_and_selector = (function dommy$core$elem_and_selector(elem_sel){
if(cljs.core.sequential_QMARK_(elem_sel)){
return cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.rest).call(null,elem_sel);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [elem_sel,null], null);
}
});
/**
 * Adds `f` as a listener for events of type `event-type` on
 * `elem-sel`, which must either be a DOM node, or a sequence
 * whose first item is a DOM node.
 * 
 * In other words, the call to `listen!` can take two forms:
 * 
 * If `elem-sel` is a DOM node, i.e., you're doing something like:
 * 
 * (listen! elem :click click-handler)
 * 
 * then `click-handler` will be set as a listener for `click` events
 * on the `elem`.
 * 
 * If `elem-sel` is a sequence:
 * 
 * (listen! [elem :.selector.for :.some.descendants] :click click-handler)
 * 
 * then `click-handler` will be set as a listener for `click` events
 * on descendants of `elem` that match the selector
 * 
 * Also accepts any number of event-type and handler pairs for setting
 * multiple listeners at once:
 * 
 * (listen! some-elem :click click-handler :hover hover-handler)
 * @param {...*} var_args
 */
dommy.core.listen_BANG_ = (function() { 
var dommy$core$listen_BANG___delegate = function (elem_sel,type_fs){
if(cljs.core.even_QMARK_(cljs.core.count(type_fs))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1827825394,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-514511684,null),new cljs.core.Symbol(null,"type-fs","type-fs",1567896074,null)))], 0)))].join('')));
}

var vec__37466_37493 = dommy.core.elem_and_selector(elem_sel);
var elem_37494 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37466_37493,(0),null);
var selector_37495 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37466_37493,(1),null);
var seq__37467_37496 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),type_fs));
var chunk__37474_37497 = null;
var count__37475_37498 = (0);
var i__37476_37499 = (0);
while(true){
if((i__37476_37499 < count__37475_37498)){
var vec__37483_37500 = chunk__37474_37497.cljs$core$IIndexed$_nth$arity$2(null,i__37476_37499);
var orig_type_37501 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37483_37500,(0),null);
var f_37502 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37483_37500,(1),null);
var seq__37477_37503 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$3(dommy.core.special_listener_makers,orig_type_37501,new cljs.core.PersistentArrayMap.fromArray([orig_type_37501,cljs.core.identity], true, false)));
var chunk__37479_37504 = null;
var count__37480_37505 = (0);
var i__37481_37506 = (0);
while(true){
if((i__37481_37506 < count__37480_37505)){
var vec__37484_37507 = chunk__37479_37504.cljs$core$IIndexed$_nth$arity$2(null,i__37481_37506);
var actual_type_37508 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37484_37507,(0),null);
var factory_37509 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37484_37507,(1),null);
var canonical_f_37510 = (cljs.core.truth_(selector_37495)?cljs.core.partial.cljs$core$IFn$_invoke$arity$3(dommy.core.live_listener,elem_37494,selector_37495):cljs.core.identity).call(null,(function (){var G__37485 = f_37502;
return (factory_37509.cljs$core$IFn$_invoke$arity$1 ? factory_37509.cljs$core$IFn$_invoke$arity$1(G__37485) : factory_37509.call(null,G__37485));
})());
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37494,cljs.core.assoc_in,cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37495,actual_type_37508,f_37502], null),canonical_f_37510], 0));

if(cljs.core.truth_(elem_37494.addEventListener)){
elem_37494.addEventListener(cljs.core.name(actual_type_37508),canonical_f_37510);
} else {
elem_37494.attachEvent(cljs.core.name(actual_type_37508),canonical_f_37510);
}

var G__37511 = seq__37477_37503;
var G__37512 = chunk__37479_37504;
var G__37513 = count__37480_37505;
var G__37514 = (i__37481_37506 + (1));
seq__37477_37503 = G__37511;
chunk__37479_37504 = G__37512;
count__37480_37505 = G__37513;
i__37481_37506 = G__37514;
continue;
} else {
var temp__4126__auto___37515 = cljs.core.seq(seq__37477_37503);
if(temp__4126__auto___37515){
var seq__37477_37516__$1 = temp__4126__auto___37515;
if(cljs.core.chunked_seq_QMARK_(seq__37477_37516__$1)){
var c__24962__auto___37517 = cljs.core.chunk_first(seq__37477_37516__$1);
var G__37518 = cljs.core.chunk_rest(seq__37477_37516__$1);
var G__37519 = c__24962__auto___37517;
var G__37520 = cljs.core.count(c__24962__auto___37517);
var G__37521 = (0);
seq__37477_37503 = G__37518;
chunk__37479_37504 = G__37519;
count__37480_37505 = G__37520;
i__37481_37506 = G__37521;
continue;
} else {
var vec__37486_37522 = cljs.core.first(seq__37477_37516__$1);
var actual_type_37523 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37486_37522,(0),null);
var factory_37524 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37486_37522,(1),null);
var canonical_f_37525 = (cljs.core.truth_(selector_37495)?cljs.core.partial.cljs$core$IFn$_invoke$arity$3(dommy.core.live_listener,elem_37494,selector_37495):cljs.core.identity).call(null,(function (){var G__37487 = f_37502;
return (factory_37524.cljs$core$IFn$_invoke$arity$1 ? factory_37524.cljs$core$IFn$_invoke$arity$1(G__37487) : factory_37524.call(null,G__37487));
})());
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37494,cljs.core.assoc_in,cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37495,actual_type_37523,f_37502], null),canonical_f_37525], 0));

if(cljs.core.truth_(elem_37494.addEventListener)){
elem_37494.addEventListener(cljs.core.name(actual_type_37523),canonical_f_37525);
} else {
elem_37494.attachEvent(cljs.core.name(actual_type_37523),canonical_f_37525);
}

var G__37526 = cljs.core.next(seq__37477_37516__$1);
var G__37527 = null;
var G__37528 = (0);
var G__37529 = (0);
seq__37477_37503 = G__37526;
chunk__37479_37504 = G__37527;
count__37480_37505 = G__37528;
i__37481_37506 = G__37529;
continue;
}
} else {
}
}
break;
}

var G__37530 = seq__37467_37496;
var G__37531 = chunk__37474_37497;
var G__37532 = count__37475_37498;
var G__37533 = (i__37476_37499 + (1));
seq__37467_37496 = G__37530;
chunk__37474_37497 = G__37531;
count__37475_37498 = G__37532;
i__37476_37499 = G__37533;
continue;
} else {
var temp__4126__auto___37534 = cljs.core.seq(seq__37467_37496);
if(temp__4126__auto___37534){
var seq__37467_37535__$1 = temp__4126__auto___37534;
if(cljs.core.chunked_seq_QMARK_(seq__37467_37535__$1)){
var c__24962__auto___37536 = cljs.core.chunk_first(seq__37467_37535__$1);
var G__37537 = cljs.core.chunk_rest(seq__37467_37535__$1);
var G__37538 = c__24962__auto___37536;
var G__37539 = cljs.core.count(c__24962__auto___37536);
var G__37540 = (0);
seq__37467_37496 = G__37537;
chunk__37474_37497 = G__37538;
count__37475_37498 = G__37539;
i__37476_37499 = G__37540;
continue;
} else {
var vec__37488_37541 = cljs.core.first(seq__37467_37535__$1);
var orig_type_37542 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37488_37541,(0),null);
var f_37543 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37488_37541,(1),null);
var seq__37468_37544 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$3(dommy.core.special_listener_makers,orig_type_37542,new cljs.core.PersistentArrayMap.fromArray([orig_type_37542,cljs.core.identity], true, false)));
var chunk__37470_37545 = null;
var count__37471_37546 = (0);
var i__37472_37547 = (0);
while(true){
if((i__37472_37547 < count__37471_37546)){
var vec__37489_37548 = chunk__37470_37545.cljs$core$IIndexed$_nth$arity$2(null,i__37472_37547);
var actual_type_37549 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37489_37548,(0),null);
var factory_37550 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37489_37548,(1),null);
var canonical_f_37551 = (cljs.core.truth_(selector_37495)?cljs.core.partial.cljs$core$IFn$_invoke$arity$3(dommy.core.live_listener,elem_37494,selector_37495):cljs.core.identity).call(null,(function (){var G__37490 = f_37543;
return (factory_37550.cljs$core$IFn$_invoke$arity$1 ? factory_37550.cljs$core$IFn$_invoke$arity$1(G__37490) : factory_37550.call(null,G__37490));
})());
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37494,cljs.core.assoc_in,cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37495,actual_type_37549,f_37543], null),canonical_f_37551], 0));

if(cljs.core.truth_(elem_37494.addEventListener)){
elem_37494.addEventListener(cljs.core.name(actual_type_37549),canonical_f_37551);
} else {
elem_37494.attachEvent(cljs.core.name(actual_type_37549),canonical_f_37551);
}

var G__37552 = seq__37468_37544;
var G__37553 = chunk__37470_37545;
var G__37554 = count__37471_37546;
var G__37555 = (i__37472_37547 + (1));
seq__37468_37544 = G__37552;
chunk__37470_37545 = G__37553;
count__37471_37546 = G__37554;
i__37472_37547 = G__37555;
continue;
} else {
var temp__4126__auto___37556__$1 = cljs.core.seq(seq__37468_37544);
if(temp__4126__auto___37556__$1){
var seq__37468_37557__$1 = temp__4126__auto___37556__$1;
if(cljs.core.chunked_seq_QMARK_(seq__37468_37557__$1)){
var c__24962__auto___37558 = cljs.core.chunk_first(seq__37468_37557__$1);
var G__37559 = cljs.core.chunk_rest(seq__37468_37557__$1);
var G__37560 = c__24962__auto___37558;
var G__37561 = cljs.core.count(c__24962__auto___37558);
var G__37562 = (0);
seq__37468_37544 = G__37559;
chunk__37470_37545 = G__37560;
count__37471_37546 = G__37561;
i__37472_37547 = G__37562;
continue;
} else {
var vec__37491_37563 = cljs.core.first(seq__37468_37557__$1);
var actual_type_37564 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37491_37563,(0),null);
var factory_37565 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37491_37563,(1),null);
var canonical_f_37566 = (cljs.core.truth_(selector_37495)?cljs.core.partial.cljs$core$IFn$_invoke$arity$3(dommy.core.live_listener,elem_37494,selector_37495):cljs.core.identity).call(null,(function (){var G__37492 = f_37543;
return (factory_37565.cljs$core$IFn$_invoke$arity$1 ? factory_37565.cljs$core$IFn$_invoke$arity$1(G__37492) : factory_37565.call(null,G__37492));
})());
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37494,cljs.core.assoc_in,cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37495,actual_type_37564,f_37543], null),canonical_f_37566], 0));

if(cljs.core.truth_(elem_37494.addEventListener)){
elem_37494.addEventListener(cljs.core.name(actual_type_37564),canonical_f_37566);
} else {
elem_37494.attachEvent(cljs.core.name(actual_type_37564),canonical_f_37566);
}

var G__37567 = cljs.core.next(seq__37468_37557__$1);
var G__37568 = null;
var G__37569 = (0);
var G__37570 = (0);
seq__37468_37544 = G__37567;
chunk__37470_37545 = G__37568;
count__37471_37546 = G__37569;
i__37472_37547 = G__37570;
continue;
}
} else {
}
}
break;
}

var G__37571 = cljs.core.next(seq__37467_37535__$1);
var G__37572 = null;
var G__37573 = (0);
var G__37574 = (0);
seq__37467_37496 = G__37571;
chunk__37474_37497 = G__37572;
count__37475_37498 = G__37573;
i__37476_37499 = G__37574;
continue;
}
} else {
}
}
break;
}

return elem_sel;
};
var dommy$core$listen_BANG_ = function (elem_sel,var_args){
var type_fs = null;
if (arguments.length > 1) {
var G__37575__i = 0, G__37575__a = new Array(arguments.length -  1);
while (G__37575__i < G__37575__a.length) {G__37575__a[G__37575__i] = arguments[G__37575__i + 1]; ++G__37575__i;}
  type_fs = new cljs.core.IndexedSeq(G__37575__a,0);
} 
return dommy$core$listen_BANG___delegate.call(this,elem_sel,type_fs);};
dommy$core$listen_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$listen_BANG_.cljs$lang$applyTo = (function (arglist__37576){
var elem_sel = cljs.core.first(arglist__37576);
var type_fs = cljs.core.rest(arglist__37576);
return dommy$core$listen_BANG___delegate(elem_sel,type_fs);
});
dommy$core$listen_BANG_.cljs$core$IFn$_invoke$arity$variadic = dommy$core$listen_BANG___delegate;
return dommy$core$listen_BANG_;
})()
;
/**
 * Removes event listener for the element defined in `elem-sel`,
 * which is the same format as listen!.
 * 
 * The following forms are allowed, and will remove all handlers
 * that match the parameters passed in:
 * 
 * (unlisten! [elem :.selector] :click event-listener)
 * 
 * (unlisten! [elem :.selector]
 * :click event-listener
 * :mouseover other-event-listener)
 * @param {...*} var_args
 */
dommy.core.unlisten_BANG_ = (function() { 
var dommy$core$unlisten_BANG___delegate = function (elem_sel,type_fs){
if(cljs.core.even_QMARK_(cljs.core.count(type_fs))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1827825394,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-514511684,null),new cljs.core.Symbol(null,"type-fs","type-fs",1567896074,null)))], 0)))].join('')));
}

var vec__37600_37623 = dommy.core.elem_and_selector(elem_sel);
var elem_37624 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37600_37623,(0),null);
var selector_37625 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37600_37623,(1),null);
var seq__37601_37626 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),type_fs));
var chunk__37608_37627 = null;
var count__37609_37628 = (0);
var i__37610_37629 = (0);
while(true){
if((i__37610_37629 < count__37609_37628)){
var vec__37617_37630 = chunk__37608_37627.cljs$core$IIndexed$_nth$arity$2(null,i__37610_37629);
var orig_type_37631 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37617_37630,(0),null);
var f_37632 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37617_37630,(1),null);
var seq__37611_37633 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$3(dommy.core.special_listener_makers,orig_type_37631,new cljs.core.PersistentArrayMap.fromArray([orig_type_37631,cljs.core.identity], true, false)));
var chunk__37613_37634 = null;
var count__37614_37635 = (0);
var i__37615_37636 = (0);
while(true){
if((i__37615_37636 < count__37614_37635)){
var vec__37618_37637 = chunk__37613_37634.cljs$core$IIndexed$_nth$arity$2(null,i__37615_37636);
var actual_type_37638 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37618_37637,(0),null);
var __37639 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37618_37637,(1),null);
var keys_37640 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37625,actual_type_37638,f_37632], null);
var canonical_f_37641 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(dommy.core.event_listeners(elem_37624),keys_37640);
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37624,dommy.utils.dissoc_in,cljs.core.array_seq([keys_37640], 0));

if(cljs.core.truth_(elem_37624.removeEventListener)){
elem_37624.removeEventListener(cljs.core.name(actual_type_37638),canonical_f_37641);
} else {
elem_37624.detachEvent(cljs.core.name(actual_type_37638),canonical_f_37641);
}

var G__37642 = seq__37611_37633;
var G__37643 = chunk__37613_37634;
var G__37644 = count__37614_37635;
var G__37645 = (i__37615_37636 + (1));
seq__37611_37633 = G__37642;
chunk__37613_37634 = G__37643;
count__37614_37635 = G__37644;
i__37615_37636 = G__37645;
continue;
} else {
var temp__4126__auto___37646 = cljs.core.seq(seq__37611_37633);
if(temp__4126__auto___37646){
var seq__37611_37647__$1 = temp__4126__auto___37646;
if(cljs.core.chunked_seq_QMARK_(seq__37611_37647__$1)){
var c__24962__auto___37648 = cljs.core.chunk_first(seq__37611_37647__$1);
var G__37649 = cljs.core.chunk_rest(seq__37611_37647__$1);
var G__37650 = c__24962__auto___37648;
var G__37651 = cljs.core.count(c__24962__auto___37648);
var G__37652 = (0);
seq__37611_37633 = G__37649;
chunk__37613_37634 = G__37650;
count__37614_37635 = G__37651;
i__37615_37636 = G__37652;
continue;
} else {
var vec__37619_37653 = cljs.core.first(seq__37611_37647__$1);
var actual_type_37654 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37619_37653,(0),null);
var __37655 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37619_37653,(1),null);
var keys_37656 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37625,actual_type_37654,f_37632], null);
var canonical_f_37657 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(dommy.core.event_listeners(elem_37624),keys_37656);
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37624,dommy.utils.dissoc_in,cljs.core.array_seq([keys_37656], 0));

if(cljs.core.truth_(elem_37624.removeEventListener)){
elem_37624.removeEventListener(cljs.core.name(actual_type_37654),canonical_f_37657);
} else {
elem_37624.detachEvent(cljs.core.name(actual_type_37654),canonical_f_37657);
}

var G__37658 = cljs.core.next(seq__37611_37647__$1);
var G__37659 = null;
var G__37660 = (0);
var G__37661 = (0);
seq__37611_37633 = G__37658;
chunk__37613_37634 = G__37659;
count__37614_37635 = G__37660;
i__37615_37636 = G__37661;
continue;
}
} else {
}
}
break;
}

var G__37662 = seq__37601_37626;
var G__37663 = chunk__37608_37627;
var G__37664 = count__37609_37628;
var G__37665 = (i__37610_37629 + (1));
seq__37601_37626 = G__37662;
chunk__37608_37627 = G__37663;
count__37609_37628 = G__37664;
i__37610_37629 = G__37665;
continue;
} else {
var temp__4126__auto___37666 = cljs.core.seq(seq__37601_37626);
if(temp__4126__auto___37666){
var seq__37601_37667__$1 = temp__4126__auto___37666;
if(cljs.core.chunked_seq_QMARK_(seq__37601_37667__$1)){
var c__24962__auto___37668 = cljs.core.chunk_first(seq__37601_37667__$1);
var G__37669 = cljs.core.chunk_rest(seq__37601_37667__$1);
var G__37670 = c__24962__auto___37668;
var G__37671 = cljs.core.count(c__24962__auto___37668);
var G__37672 = (0);
seq__37601_37626 = G__37669;
chunk__37608_37627 = G__37670;
count__37609_37628 = G__37671;
i__37610_37629 = G__37672;
continue;
} else {
var vec__37620_37673 = cljs.core.first(seq__37601_37667__$1);
var orig_type_37674 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37620_37673,(0),null);
var f_37675 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37620_37673,(1),null);
var seq__37602_37676 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$3(dommy.core.special_listener_makers,orig_type_37674,new cljs.core.PersistentArrayMap.fromArray([orig_type_37674,cljs.core.identity], true, false)));
var chunk__37604_37677 = null;
var count__37605_37678 = (0);
var i__37606_37679 = (0);
while(true){
if((i__37606_37679 < count__37605_37678)){
var vec__37621_37680 = chunk__37604_37677.cljs$core$IIndexed$_nth$arity$2(null,i__37606_37679);
var actual_type_37681 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37621_37680,(0),null);
var __37682 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37621_37680,(1),null);
var keys_37683 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37625,actual_type_37681,f_37675], null);
var canonical_f_37684 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(dommy.core.event_listeners(elem_37624),keys_37683);
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37624,dommy.utils.dissoc_in,cljs.core.array_seq([keys_37683], 0));

if(cljs.core.truth_(elem_37624.removeEventListener)){
elem_37624.removeEventListener(cljs.core.name(actual_type_37681),canonical_f_37684);
} else {
elem_37624.detachEvent(cljs.core.name(actual_type_37681),canonical_f_37684);
}

var G__37685 = seq__37602_37676;
var G__37686 = chunk__37604_37677;
var G__37687 = count__37605_37678;
var G__37688 = (i__37606_37679 + (1));
seq__37602_37676 = G__37685;
chunk__37604_37677 = G__37686;
count__37605_37678 = G__37687;
i__37606_37679 = G__37688;
continue;
} else {
var temp__4126__auto___37689__$1 = cljs.core.seq(seq__37602_37676);
if(temp__4126__auto___37689__$1){
var seq__37602_37690__$1 = temp__4126__auto___37689__$1;
if(cljs.core.chunked_seq_QMARK_(seq__37602_37690__$1)){
var c__24962__auto___37691 = cljs.core.chunk_first(seq__37602_37690__$1);
var G__37692 = cljs.core.chunk_rest(seq__37602_37690__$1);
var G__37693 = c__24962__auto___37691;
var G__37694 = cljs.core.count(c__24962__auto___37691);
var G__37695 = (0);
seq__37602_37676 = G__37692;
chunk__37604_37677 = G__37693;
count__37605_37678 = G__37694;
i__37606_37679 = G__37695;
continue;
} else {
var vec__37622_37696 = cljs.core.first(seq__37602_37690__$1);
var actual_type_37697 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37622_37696,(0),null);
var __37698 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37622_37696,(1),null);
var keys_37699 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37625,actual_type_37697,f_37675], null);
var canonical_f_37700 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(dommy.core.event_listeners(elem_37624),keys_37699);
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37624,dommy.utils.dissoc_in,cljs.core.array_seq([keys_37699], 0));

if(cljs.core.truth_(elem_37624.removeEventListener)){
elem_37624.removeEventListener(cljs.core.name(actual_type_37697),canonical_f_37700);
} else {
elem_37624.detachEvent(cljs.core.name(actual_type_37697),canonical_f_37700);
}

var G__37701 = cljs.core.next(seq__37602_37690__$1);
var G__37702 = null;
var G__37703 = (0);
var G__37704 = (0);
seq__37602_37676 = G__37701;
chunk__37604_37677 = G__37702;
count__37605_37678 = G__37703;
i__37606_37679 = G__37704;
continue;
}
} else {
}
}
break;
}

var G__37705 = cljs.core.next(seq__37601_37667__$1);
var G__37706 = null;
var G__37707 = (0);
var G__37708 = (0);
seq__37601_37626 = G__37705;
chunk__37608_37627 = G__37706;
count__37609_37628 = G__37707;
i__37610_37629 = G__37708;
continue;
}
} else {
}
}
break;
}

return elem_sel;
};
var dommy$core$unlisten_BANG_ = function (elem_sel,var_args){
var type_fs = null;
if (arguments.length > 1) {
var G__37709__i = 0, G__37709__a = new Array(arguments.length -  1);
while (G__37709__i < G__37709__a.length) {G__37709__a[G__37709__i] = arguments[G__37709__i + 1]; ++G__37709__i;}
  type_fs = new cljs.core.IndexedSeq(G__37709__a,0);
} 
return dommy$core$unlisten_BANG___delegate.call(this,elem_sel,type_fs);};
dommy$core$unlisten_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$unlisten_BANG_.cljs$lang$applyTo = (function (arglist__37710){
var elem_sel = cljs.core.first(arglist__37710);
var type_fs = cljs.core.rest(arglist__37710);
return dommy$core$unlisten_BANG___delegate(elem_sel,type_fs);
});
dommy$core$unlisten_BANG_.cljs$core$IFn$_invoke$arity$variadic = dommy$core$unlisten_BANG___delegate;
return dommy$core$unlisten_BANG_;
})()
;
/**
 * Behaves like `listen!`, but removes the listener after the first event occurs.
 * @param {...*} var_args
 */
dommy.core.listen_once_BANG_ = (function() { 
var dommy$core$listen_once_BANG___delegate = function (elem_sel,type_fs){
if(cljs.core.even_QMARK_(cljs.core.count(type_fs))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1827825394,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-514511684,null),new cljs.core.Symbol(null,"type-fs","type-fs",1567896074,null)))], 0)))].join('')));
}

var vec__37722_37733 = dommy.core.elem_and_selector(elem_sel);
var elem_37734 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37722_37733,(0),null);
var selector_37735 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37722_37733,(1),null);
var seq__37723_37736 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),type_fs));
var chunk__37724_37737 = null;
var count__37725_37738 = (0);
var i__37726_37739 = (0);
while(true){
if((i__37726_37739 < count__37725_37738)){
var vec__37727_37740 = chunk__37724_37737.cljs$core$IIndexed$_nth$arity$2(null,i__37726_37739);
var type_37741 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37727_37740,(0),null);
var f_37742 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37727_37740,(1),null);
dommy.core.listen_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_sel,cljs.core.array_seq([type_37741,((function (seq__37723_37736,chunk__37724_37737,count__37725_37738,i__37726_37739,vec__37727_37740,type_37741,f_37742,vec__37722_37733,elem_37734,selector_37735){
return (function dommy$core$listen_once_BANG__$_this_fn(e){
dommy.core.unlisten_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_sel,cljs.core.array_seq([type_37741,dommy$core$listen_once_BANG__$_this_fn], 0));

var G__37729 = e;
return (f_37742.cljs$core$IFn$_invoke$arity$1 ? f_37742.cljs$core$IFn$_invoke$arity$1(G__37729) : f_37742.call(null,G__37729));
});})(seq__37723_37736,chunk__37724_37737,count__37725_37738,i__37726_37739,vec__37727_37740,type_37741,f_37742,vec__37722_37733,elem_37734,selector_37735))
], 0));

var G__37743 = seq__37723_37736;
var G__37744 = chunk__37724_37737;
var G__37745 = count__37725_37738;
var G__37746 = (i__37726_37739 + (1));
seq__37723_37736 = G__37743;
chunk__37724_37737 = G__37744;
count__37725_37738 = G__37745;
i__37726_37739 = G__37746;
continue;
} else {
var temp__4126__auto___37747 = cljs.core.seq(seq__37723_37736);
if(temp__4126__auto___37747){
var seq__37723_37748__$1 = temp__4126__auto___37747;
if(cljs.core.chunked_seq_QMARK_(seq__37723_37748__$1)){
var c__24962__auto___37749 = cljs.core.chunk_first(seq__37723_37748__$1);
var G__37750 = cljs.core.chunk_rest(seq__37723_37748__$1);
var G__37751 = c__24962__auto___37749;
var G__37752 = cljs.core.count(c__24962__auto___37749);
var G__37753 = (0);
seq__37723_37736 = G__37750;
chunk__37724_37737 = G__37751;
count__37725_37738 = G__37752;
i__37726_37739 = G__37753;
continue;
} else {
var vec__37730_37754 = cljs.core.first(seq__37723_37748__$1);
var type_37755 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37730_37754,(0),null);
var f_37756 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37730_37754,(1),null);
dommy.core.listen_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_sel,cljs.core.array_seq([type_37755,((function (seq__37723_37736,chunk__37724_37737,count__37725_37738,i__37726_37739,vec__37730_37754,type_37755,f_37756,seq__37723_37748__$1,temp__4126__auto___37747,vec__37722_37733,elem_37734,selector_37735){
return (function dommy$core$listen_once_BANG__$_this_fn(e){
dommy.core.unlisten_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_sel,cljs.core.array_seq([type_37755,dommy$core$listen_once_BANG__$_this_fn], 0));

var G__37732 = e;
return (f_37756.cljs$core$IFn$_invoke$arity$1 ? f_37756.cljs$core$IFn$_invoke$arity$1(G__37732) : f_37756.call(null,G__37732));
});})(seq__37723_37736,chunk__37724_37737,count__37725_37738,i__37726_37739,vec__37730_37754,type_37755,f_37756,seq__37723_37748__$1,temp__4126__auto___37747,vec__37722_37733,elem_37734,selector_37735))
], 0));

var G__37757 = cljs.core.next(seq__37723_37748__$1);
var G__37758 = null;
var G__37759 = (0);
var G__37760 = (0);
seq__37723_37736 = G__37757;
chunk__37724_37737 = G__37758;
count__37725_37738 = G__37759;
i__37726_37739 = G__37760;
continue;
}
} else {
}
}
break;
}

return elem_sel;
};
var dommy$core$listen_once_BANG_ = function (elem_sel,var_args){
var type_fs = null;
if (arguments.length > 1) {
var G__37761__i = 0, G__37761__a = new Array(arguments.length -  1);
while (G__37761__i < G__37761__a.length) {G__37761__a[G__37761__i] = arguments[G__37761__i + 1]; ++G__37761__i;}
  type_fs = new cljs.core.IndexedSeq(G__37761__a,0);
} 
return dommy$core$listen_once_BANG___delegate.call(this,elem_sel,type_fs);};
dommy$core$listen_once_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$listen_once_BANG_.cljs$lang$applyTo = (function (arglist__37762){
var elem_sel = cljs.core.first(arglist__37762);
var type_fs = cljs.core.rest(arglist__37762);
return dommy$core$listen_once_BANG___delegate(elem_sel,type_fs);
});
dommy$core$listen_once_BANG_.cljs$core$IFn$_invoke$arity$variadic = dommy$core$listen_once_BANG___delegate;
return dommy$core$listen_once_BANG_;
})()
;
