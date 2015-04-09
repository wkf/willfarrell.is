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
var or__24185__auto__ = elem.textContent;
if(cljs.core.truth_(or__24185__auto__)){
return or__24185__auto__;
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
var G__37032 = pixels;
return parseInt(G__37032);
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
return cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(dommy.core.matches_pred.cljs$core$IFn$_invoke$arity$2(base,selector),cljs.core.take_while.cljs$core$IFn$_invoke$arity$2((function (p1__37035_SHARP_){
return !((p1__37035_SHARP_ === base));
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
var seq__37045_37051 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),kvs));
var chunk__37046_37052 = null;
var count__37047_37053 = (0);
var i__37048_37054 = (0);
while(true){
if((i__37048_37054 < count__37047_37053)){
var vec__37049_37055 = chunk__37046_37052.cljs$core$IIndexed$_nth$arity$2(null,i__37048_37054);
var k_37056 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37049_37055,(0),null);
var v_37057 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37049_37055,(1),null);
style.setProperty(dommy.utils.as_str(k_37056),v_37057);

var G__37058 = seq__37045_37051;
var G__37059 = chunk__37046_37052;
var G__37060 = count__37047_37053;
var G__37061 = (i__37048_37054 + (1));
seq__37045_37051 = G__37058;
chunk__37046_37052 = G__37059;
count__37047_37053 = G__37060;
i__37048_37054 = G__37061;
continue;
} else {
var temp__4126__auto___37062 = cljs.core.seq(seq__37045_37051);
if(temp__4126__auto___37062){
var seq__37045_37063__$1 = temp__4126__auto___37062;
if(cljs.core.chunked_seq_QMARK_(seq__37045_37063__$1)){
var c__24970__auto___37064 = cljs.core.chunk_first(seq__37045_37063__$1);
var G__37065 = cljs.core.chunk_rest(seq__37045_37063__$1);
var G__37066 = c__24970__auto___37064;
var G__37067 = cljs.core.count(c__24970__auto___37064);
var G__37068 = (0);
seq__37045_37051 = G__37065;
chunk__37046_37052 = G__37066;
count__37047_37053 = G__37067;
i__37048_37054 = G__37068;
continue;
} else {
var vec__37050_37069 = cljs.core.first(seq__37045_37063__$1);
var k_37070 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37050_37069,(0),null);
var v_37071 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37050_37069,(1),null);
style.setProperty(dommy.utils.as_str(k_37070),v_37071);

var G__37072 = cljs.core.next(seq__37045_37063__$1);
var G__37073 = null;
var G__37074 = (0);
var G__37075 = (0);
seq__37045_37051 = G__37072;
chunk__37046_37052 = G__37073;
count__37047_37053 = G__37074;
i__37048_37054 = G__37075;
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
var G__37076__i = 0, G__37076__a = new Array(arguments.length -  1);
while (G__37076__i < G__37076__a.length) {G__37076__a[G__37076__i] = arguments[G__37076__i + 1]; ++G__37076__i;}
  kvs = new cljs.core.IndexedSeq(G__37076__a,0);
} 
return dommy$core$set_style_BANG___delegate.call(this,elem,kvs);};
dommy$core$set_style_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$set_style_BANG_.cljs$lang$applyTo = (function (arglist__37077){
var elem = cljs.core.first(arglist__37077);
var kvs = cljs.core.rest(arglist__37077);
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

var seq__37084_37090 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),kvs));
var chunk__37085_37091 = null;
var count__37086_37092 = (0);
var i__37087_37093 = (0);
while(true){
if((i__37087_37093 < count__37086_37092)){
var vec__37088_37094 = chunk__37085_37091.cljs$core$IIndexed$_nth$arity$2(null,i__37087_37093);
var k_37095 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37088_37094,(0),null);
var v_37096 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37088_37094,(1),null);
dommy.core.set_style_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem,cljs.core.array_seq([k_37095,[cljs.core.str(v_37096),cljs.core.str("px")].join('')], 0));

var G__37097 = seq__37084_37090;
var G__37098 = chunk__37085_37091;
var G__37099 = count__37086_37092;
var G__37100 = (i__37087_37093 + (1));
seq__37084_37090 = G__37097;
chunk__37085_37091 = G__37098;
count__37086_37092 = G__37099;
i__37087_37093 = G__37100;
continue;
} else {
var temp__4126__auto___37101 = cljs.core.seq(seq__37084_37090);
if(temp__4126__auto___37101){
var seq__37084_37102__$1 = temp__4126__auto___37101;
if(cljs.core.chunked_seq_QMARK_(seq__37084_37102__$1)){
var c__24970__auto___37103 = cljs.core.chunk_first(seq__37084_37102__$1);
var G__37104 = cljs.core.chunk_rest(seq__37084_37102__$1);
var G__37105 = c__24970__auto___37103;
var G__37106 = cljs.core.count(c__24970__auto___37103);
var G__37107 = (0);
seq__37084_37090 = G__37104;
chunk__37085_37091 = G__37105;
count__37086_37092 = G__37106;
i__37087_37093 = G__37107;
continue;
} else {
var vec__37089_37108 = cljs.core.first(seq__37084_37102__$1);
var k_37109 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37089_37108,(0),null);
var v_37110 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37089_37108,(1),null);
dommy.core.set_style_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem,cljs.core.array_seq([k_37109,[cljs.core.str(v_37110),cljs.core.str("px")].join('')], 0));

var G__37111 = cljs.core.next(seq__37084_37102__$1);
var G__37112 = null;
var G__37113 = (0);
var G__37114 = (0);
seq__37084_37090 = G__37111;
chunk__37085_37091 = G__37112;
count__37086_37092 = G__37113;
i__37087_37093 = G__37114;
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
var G__37115__i = 0, G__37115__a = new Array(arguments.length -  1);
while (G__37115__i < G__37115__a.length) {G__37115__a[G__37115__i] = arguments[G__37115__i + 1]; ++G__37115__i;}
  kvs = new cljs.core.IndexedSeq(G__37115__a,0);
} 
return dommy$core$set_px_BANG___delegate.call(this,elem,kvs);};
dommy$core$set_px_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$set_px_BANG_.cljs$lang$applyTo = (function (arglist__37116){
var elem = cljs.core.first(arglist__37116);
var kvs = cljs.core.rest(arglist__37116);
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
var G__37134 = elem;
(G__37134[k__$1] = v);

return G__37134;
} else {
var G__37135 = elem;
G__37135.setAttribute(k__$1,v);

return G__37135;
}
} else {
return null;
}
});
var dommy$core$set_attr_BANG___4 = (function() { 
var G__37142__delegate = function (elem,k,v,kvs){
if(cljs.core.even_QMARK_(cljs.core.count(kvs))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1827825394,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-514511684,null),new cljs.core.Symbol(null,"kvs","kvs",-1695980277,null)))], 0)))].join('')));
}

var seq__37136_37143 = cljs.core.seq(cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null),cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),kvs)));
var chunk__37137_37144 = null;
var count__37138_37145 = (0);
var i__37139_37146 = (0);
while(true){
if((i__37139_37146 < count__37138_37145)){
var vec__37140_37147 = chunk__37137_37144.cljs$core$IIndexed$_nth$arity$2(null,i__37139_37146);
var k_37148__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37140_37147,(0),null);
var v_37149__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37140_37147,(1),null);
dommy$core$set_attr_BANG_.cljs$core$IFn$_invoke$arity$3(elem,k_37148__$1,v_37149__$1);

var G__37150 = seq__37136_37143;
var G__37151 = chunk__37137_37144;
var G__37152 = count__37138_37145;
var G__37153 = (i__37139_37146 + (1));
seq__37136_37143 = G__37150;
chunk__37137_37144 = G__37151;
count__37138_37145 = G__37152;
i__37139_37146 = G__37153;
continue;
} else {
var temp__4126__auto___37154 = cljs.core.seq(seq__37136_37143);
if(temp__4126__auto___37154){
var seq__37136_37155__$1 = temp__4126__auto___37154;
if(cljs.core.chunked_seq_QMARK_(seq__37136_37155__$1)){
var c__24970__auto___37156 = cljs.core.chunk_first(seq__37136_37155__$1);
var G__37157 = cljs.core.chunk_rest(seq__37136_37155__$1);
var G__37158 = c__24970__auto___37156;
var G__37159 = cljs.core.count(c__24970__auto___37156);
var G__37160 = (0);
seq__37136_37143 = G__37157;
chunk__37137_37144 = G__37158;
count__37138_37145 = G__37159;
i__37139_37146 = G__37160;
continue;
} else {
var vec__37141_37161 = cljs.core.first(seq__37136_37155__$1);
var k_37162__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37141_37161,(0),null);
var v_37163__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37141_37161,(1),null);
dommy$core$set_attr_BANG_.cljs$core$IFn$_invoke$arity$3(elem,k_37162__$1,v_37163__$1);

var G__37164 = cljs.core.next(seq__37136_37155__$1);
var G__37165 = null;
var G__37166 = (0);
var G__37167 = (0);
seq__37136_37143 = G__37164;
chunk__37137_37144 = G__37165;
count__37138_37145 = G__37166;
i__37139_37146 = G__37167;
continue;
}
} else {
}
}
break;
}

return elem;
};
var G__37142 = function (elem,k,v,var_args){
var kvs = null;
if (arguments.length > 3) {
var G__37168__i = 0, G__37168__a = new Array(arguments.length -  3);
while (G__37168__i < G__37168__a.length) {G__37168__a[G__37168__i] = arguments[G__37168__i + 3]; ++G__37168__i;}
  kvs = new cljs.core.IndexedSeq(G__37168__a,0);
} 
return G__37142__delegate.call(this,elem,k,v,kvs);};
G__37142.cljs$lang$maxFixedArity = 3;
G__37142.cljs$lang$applyTo = (function (arglist__37169){
var elem = cljs.core.first(arglist__37169);
arglist__37169 = cljs.core.next(arglist__37169);
var k = cljs.core.first(arglist__37169);
arglist__37169 = cljs.core.next(arglist__37169);
var v = cljs.core.first(arglist__37169);
var kvs = cljs.core.rest(arglist__37169);
return G__37142__delegate(elem,k,v,kvs);
});
G__37142.cljs$core$IFn$_invoke$arity$variadic = G__37142__delegate;
return G__37142;
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
var G__37170 = null;
if (arguments.length > 3) {
var G__37171__i = 0, G__37171__a = new Array(arguments.length -  3);
while (G__37171__i < G__37171__a.length) {G__37171__a[G__37171__i] = arguments[G__37171__i + 3]; ++G__37171__i;}
G__37170 = new cljs.core.IndexedSeq(G__37171__a,0);
}
return dommy$core$set_attr_BANG___4.cljs$core$IFn$_invoke$arity$variadic(elem,k,v, G__37170);
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
var k_37184__$1 = dommy.utils.as_str(k);
if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["class",null,"classes",null], null), null).call(null,k_37184__$1))){
dommy.core.set_class_BANG_(elem,"");
} else {
elem.removeAttribute(k_37184__$1);
}

return elem;
});
var dommy$core$remove_attr_BANG___3 = (function() { 
var G__37185__delegate = function (elem,k,ks){
var seq__37180_37186 = cljs.core.seq(cljs.core.cons(k,ks));
var chunk__37181_37187 = null;
var count__37182_37188 = (0);
var i__37183_37189 = (0);
while(true){
if((i__37183_37189 < count__37182_37188)){
var k_37190__$1 = chunk__37181_37187.cljs$core$IIndexed$_nth$arity$2(null,i__37183_37189);
dommy$core$remove_attr_BANG_.cljs$core$IFn$_invoke$arity$2(elem,k_37190__$1);

var G__37191 = seq__37180_37186;
var G__37192 = chunk__37181_37187;
var G__37193 = count__37182_37188;
var G__37194 = (i__37183_37189 + (1));
seq__37180_37186 = G__37191;
chunk__37181_37187 = G__37192;
count__37182_37188 = G__37193;
i__37183_37189 = G__37194;
continue;
} else {
var temp__4126__auto___37195 = cljs.core.seq(seq__37180_37186);
if(temp__4126__auto___37195){
var seq__37180_37196__$1 = temp__4126__auto___37195;
if(cljs.core.chunked_seq_QMARK_(seq__37180_37196__$1)){
var c__24970__auto___37197 = cljs.core.chunk_first(seq__37180_37196__$1);
var G__37198 = cljs.core.chunk_rest(seq__37180_37196__$1);
var G__37199 = c__24970__auto___37197;
var G__37200 = cljs.core.count(c__24970__auto___37197);
var G__37201 = (0);
seq__37180_37186 = G__37198;
chunk__37181_37187 = G__37199;
count__37182_37188 = G__37200;
i__37183_37189 = G__37201;
continue;
} else {
var k_37202__$1 = cljs.core.first(seq__37180_37196__$1);
dommy$core$remove_attr_BANG_.cljs$core$IFn$_invoke$arity$2(elem,k_37202__$1);

var G__37203 = cljs.core.next(seq__37180_37196__$1);
var G__37204 = null;
var G__37205 = (0);
var G__37206 = (0);
seq__37180_37186 = G__37203;
chunk__37181_37187 = G__37204;
count__37182_37188 = G__37205;
i__37183_37189 = G__37206;
continue;
}
} else {
}
}
break;
}

return elem;
};
var G__37185 = function (elem,k,var_args){
var ks = null;
if (arguments.length > 2) {
var G__37207__i = 0, G__37207__a = new Array(arguments.length -  2);
while (G__37207__i < G__37207__a.length) {G__37207__a[G__37207__i] = arguments[G__37207__i + 2]; ++G__37207__i;}
  ks = new cljs.core.IndexedSeq(G__37207__a,0);
} 
return G__37185__delegate.call(this,elem,k,ks);};
G__37185.cljs$lang$maxFixedArity = 2;
G__37185.cljs$lang$applyTo = (function (arglist__37208){
var elem = cljs.core.first(arglist__37208);
arglist__37208 = cljs.core.next(arglist__37208);
var k = cljs.core.first(arglist__37208);
var ks = cljs.core.rest(arglist__37208);
return G__37185__delegate(elem,k,ks);
});
G__37185.cljs$core$IFn$_invoke$arity$variadic = G__37185__delegate;
return G__37185;
})()
;
dommy$core$remove_attr_BANG_ = function(elem,k,var_args){
var ks = var_args;
switch(arguments.length){
case 2:
return dommy$core$remove_attr_BANG___2.call(this,elem,k);
default:
var G__37209 = null;
if (arguments.length > 2) {
var G__37210__i = 0, G__37210__a = new Array(arguments.length -  2);
while (G__37210__i < G__37210__a.length) {G__37210__a[G__37210__i] = arguments[G__37210__i + 2]; ++G__37210__i;}
G__37209 = new cljs.core.IndexedSeq(G__37210__a,0);
}
return dommy$core$remove_attr_BANG___3.cljs$core$IFn$_invoke$arity$variadic(elem,k, G__37209);
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
var temp__4124__auto___37242 = elem.classList;
if(cljs.core.truth_(temp__4124__auto___37242)){
var class_list_37243 = temp__4124__auto___37242;
var seq__37230_37244 = cljs.core.seq(classes__$1);
var chunk__37231_37245 = null;
var count__37232_37246 = (0);
var i__37233_37247 = (0);
while(true){
if((i__37233_37247 < count__37232_37246)){
var c_37248 = chunk__37231_37245.cljs$core$IIndexed$_nth$arity$2(null,i__37233_37247);
class_list_37243.add(c_37248);

var G__37249 = seq__37230_37244;
var G__37250 = chunk__37231_37245;
var G__37251 = count__37232_37246;
var G__37252 = (i__37233_37247 + (1));
seq__37230_37244 = G__37249;
chunk__37231_37245 = G__37250;
count__37232_37246 = G__37251;
i__37233_37247 = G__37252;
continue;
} else {
var temp__4126__auto___37253 = cljs.core.seq(seq__37230_37244);
if(temp__4126__auto___37253){
var seq__37230_37254__$1 = temp__4126__auto___37253;
if(cljs.core.chunked_seq_QMARK_(seq__37230_37254__$1)){
var c__24970__auto___37255 = cljs.core.chunk_first(seq__37230_37254__$1);
var G__37256 = cljs.core.chunk_rest(seq__37230_37254__$1);
var G__37257 = c__24970__auto___37255;
var G__37258 = cljs.core.count(c__24970__auto___37255);
var G__37259 = (0);
seq__37230_37244 = G__37256;
chunk__37231_37245 = G__37257;
count__37232_37246 = G__37258;
i__37233_37247 = G__37259;
continue;
} else {
var c_37260 = cljs.core.first(seq__37230_37254__$1);
class_list_37243.add(c_37260);

var G__37261 = cljs.core.next(seq__37230_37254__$1);
var G__37262 = null;
var G__37263 = (0);
var G__37264 = (0);
seq__37230_37244 = G__37261;
chunk__37231_37245 = G__37262;
count__37232_37246 = G__37263;
i__37233_37247 = G__37264;
continue;
}
} else {
}
}
break;
}
} else {
var seq__37234_37265 = cljs.core.seq(classes__$1);
var chunk__37235_37266 = null;
var count__37236_37267 = (0);
var i__37237_37268 = (0);
while(true){
if((i__37237_37268 < count__37236_37267)){
var c_37269 = chunk__37235_37266.cljs$core$IIndexed$_nth$arity$2(null,i__37237_37268);
var class_name_37270 = dommy.core.class$(elem);
if(cljs.core.truth_(dommy.utils.class_index(class_name_37270,c_37269))){
} else {
dommy.core.set_class_BANG_(elem,(((class_name_37270 === ""))?c_37269:[cljs.core.str(class_name_37270),cljs.core.str(" "),cljs.core.str(c_37269)].join('')));
}

var G__37271 = seq__37234_37265;
var G__37272 = chunk__37235_37266;
var G__37273 = count__37236_37267;
var G__37274 = (i__37237_37268 + (1));
seq__37234_37265 = G__37271;
chunk__37235_37266 = G__37272;
count__37236_37267 = G__37273;
i__37237_37268 = G__37274;
continue;
} else {
var temp__4126__auto___37275 = cljs.core.seq(seq__37234_37265);
if(temp__4126__auto___37275){
var seq__37234_37276__$1 = temp__4126__auto___37275;
if(cljs.core.chunked_seq_QMARK_(seq__37234_37276__$1)){
var c__24970__auto___37277 = cljs.core.chunk_first(seq__37234_37276__$1);
var G__37278 = cljs.core.chunk_rest(seq__37234_37276__$1);
var G__37279 = c__24970__auto___37277;
var G__37280 = cljs.core.count(c__24970__auto___37277);
var G__37281 = (0);
seq__37234_37265 = G__37278;
chunk__37235_37266 = G__37279;
count__37236_37267 = G__37280;
i__37237_37268 = G__37281;
continue;
} else {
var c_37282 = cljs.core.first(seq__37234_37276__$1);
var class_name_37283 = dommy.core.class$(elem);
if(cljs.core.truth_(dommy.utils.class_index(class_name_37283,c_37282))){
} else {
dommy.core.set_class_BANG_(elem,(((class_name_37283 === ""))?c_37282:[cljs.core.str(class_name_37283),cljs.core.str(" "),cljs.core.str(c_37282)].join('')));
}

var G__37284 = cljs.core.next(seq__37234_37276__$1);
var G__37285 = null;
var G__37286 = (0);
var G__37287 = (0);
seq__37234_37265 = G__37284;
chunk__37235_37266 = G__37285;
count__37236_37267 = G__37286;
i__37237_37268 = G__37287;
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
var G__37288__delegate = function (elem,classes,more_classes){
var seq__37238_37289 = cljs.core.seq(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(more_classes,classes));
var chunk__37239_37290 = null;
var count__37240_37291 = (0);
var i__37241_37292 = (0);
while(true){
if((i__37241_37292 < count__37240_37291)){
var c_37293 = chunk__37239_37290.cljs$core$IIndexed$_nth$arity$2(null,i__37241_37292);
dommy$core$add_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem,c_37293);

var G__37294 = seq__37238_37289;
var G__37295 = chunk__37239_37290;
var G__37296 = count__37240_37291;
var G__37297 = (i__37241_37292 + (1));
seq__37238_37289 = G__37294;
chunk__37239_37290 = G__37295;
count__37240_37291 = G__37296;
i__37241_37292 = G__37297;
continue;
} else {
var temp__4126__auto___37298 = cljs.core.seq(seq__37238_37289);
if(temp__4126__auto___37298){
var seq__37238_37299__$1 = temp__4126__auto___37298;
if(cljs.core.chunked_seq_QMARK_(seq__37238_37299__$1)){
var c__24970__auto___37300 = cljs.core.chunk_first(seq__37238_37299__$1);
var G__37301 = cljs.core.chunk_rest(seq__37238_37299__$1);
var G__37302 = c__24970__auto___37300;
var G__37303 = cljs.core.count(c__24970__auto___37300);
var G__37304 = (0);
seq__37238_37289 = G__37301;
chunk__37239_37290 = G__37302;
count__37240_37291 = G__37303;
i__37241_37292 = G__37304;
continue;
} else {
var c_37305 = cljs.core.first(seq__37238_37299__$1);
dommy$core$add_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem,c_37305);

var G__37306 = cljs.core.next(seq__37238_37299__$1);
var G__37307 = null;
var G__37308 = (0);
var G__37309 = (0);
seq__37238_37289 = G__37306;
chunk__37239_37290 = G__37307;
count__37240_37291 = G__37308;
i__37241_37292 = G__37309;
continue;
}
} else {
}
}
break;
}

return elem;
};
var G__37288 = function (elem,classes,var_args){
var more_classes = null;
if (arguments.length > 2) {
var G__37310__i = 0, G__37310__a = new Array(arguments.length -  2);
while (G__37310__i < G__37310__a.length) {G__37310__a[G__37310__i] = arguments[G__37310__i + 2]; ++G__37310__i;}
  more_classes = new cljs.core.IndexedSeq(G__37310__a,0);
} 
return G__37288__delegate.call(this,elem,classes,more_classes);};
G__37288.cljs$lang$maxFixedArity = 2;
G__37288.cljs$lang$applyTo = (function (arglist__37311){
var elem = cljs.core.first(arglist__37311);
arglist__37311 = cljs.core.next(arglist__37311);
var classes = cljs.core.first(arglist__37311);
var more_classes = cljs.core.rest(arglist__37311);
return G__37288__delegate(elem,classes,more_classes);
});
G__37288.cljs$core$IFn$_invoke$arity$variadic = G__37288__delegate;
return G__37288;
})()
;
dommy$core$add_class_BANG_ = function(elem,classes,var_args){
var more_classes = var_args;
switch(arguments.length){
case 2:
return dommy$core$add_class_BANG___2.call(this,elem,classes);
default:
var G__37312 = null;
if (arguments.length > 2) {
var G__37313__i = 0, G__37313__a = new Array(arguments.length -  2);
while (G__37313__i < G__37313__a.length) {G__37313__a[G__37313__i] = arguments[G__37313__i + 2]; ++G__37313__i;}
G__37312 = new cljs.core.IndexedSeq(G__37313__a,0);
}
return dommy$core$add_class_BANG___3.cljs$core$IFn$_invoke$arity$variadic(elem,classes, G__37312);
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
var temp__4124__auto___37326 = elem.classList;
if(cljs.core.truth_(temp__4124__auto___37326)){
var class_list_37327 = temp__4124__auto___37326;
class_list_37327.remove(c__$1);
} else {
var class_name_37328 = dommy.core.class$(elem);
var new_class_name_37329 = dommy.utils.remove_class_str(class_name_37328,c__$1);
if((class_name_37328 === new_class_name_37329)){
} else {
dommy.core.set_class_BANG_(elem,new_class_name_37329);
}
}

return elem;
});
var dommy$core$remove_class_BANG___3 = (function() { 
var G__37330__delegate = function (elem,class$,classes){
var seq__37322 = cljs.core.seq(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(classes,class$));
var chunk__37323 = null;
var count__37324 = (0);
var i__37325 = (0);
while(true){
if((i__37325 < count__37324)){
var c = chunk__37323.cljs$core$IIndexed$_nth$arity$2(null,i__37325);
dommy$core$remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem,c);

var G__37331 = seq__37322;
var G__37332 = chunk__37323;
var G__37333 = count__37324;
var G__37334 = (i__37325 + (1));
seq__37322 = G__37331;
chunk__37323 = G__37332;
count__37324 = G__37333;
i__37325 = G__37334;
continue;
} else {
var temp__4126__auto__ = cljs.core.seq(seq__37322);
if(temp__4126__auto__){
var seq__37322__$1 = temp__4126__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__37322__$1)){
var c__24970__auto__ = cljs.core.chunk_first(seq__37322__$1);
var G__37335 = cljs.core.chunk_rest(seq__37322__$1);
var G__37336 = c__24970__auto__;
var G__37337 = cljs.core.count(c__24970__auto__);
var G__37338 = (0);
seq__37322 = G__37335;
chunk__37323 = G__37336;
count__37324 = G__37337;
i__37325 = G__37338;
continue;
} else {
var c = cljs.core.first(seq__37322__$1);
dommy$core$remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem,c);

var G__37339 = cljs.core.next(seq__37322__$1);
var G__37340 = null;
var G__37341 = (0);
var G__37342 = (0);
seq__37322 = G__37339;
chunk__37323 = G__37340;
count__37324 = G__37341;
i__37325 = G__37342;
continue;
}
} else {
return null;
}
}
break;
}
};
var G__37330 = function (elem,class$,var_args){
var classes = null;
if (arguments.length > 2) {
var G__37343__i = 0, G__37343__a = new Array(arguments.length -  2);
while (G__37343__i < G__37343__a.length) {G__37343__a[G__37343__i] = arguments[G__37343__i + 2]; ++G__37343__i;}
  classes = new cljs.core.IndexedSeq(G__37343__a,0);
} 
return G__37330__delegate.call(this,elem,class$,classes);};
G__37330.cljs$lang$maxFixedArity = 2;
G__37330.cljs$lang$applyTo = (function (arglist__37344){
var elem = cljs.core.first(arglist__37344);
arglist__37344 = cljs.core.next(arglist__37344);
var class$ = cljs.core.first(arglist__37344);
var classes = cljs.core.rest(arglist__37344);
return G__37330__delegate(elem,class$,classes);
});
G__37330.cljs$core$IFn$_invoke$arity$variadic = G__37330__delegate;
return G__37330;
})()
;
dommy$core$remove_class_BANG_ = function(elem,class$,var_args){
var classes = var_args;
switch(arguments.length){
case 2:
return dommy$core$remove_class_BANG___2.call(this,elem,class$);
default:
var G__37345 = null;
if (arguments.length > 2) {
var G__37346__i = 0, G__37346__a = new Array(arguments.length -  2);
while (G__37346__i < G__37346__a.length) {G__37346__a[G__37346__i] = arguments[G__37346__i + 2]; ++G__37346__i;}
G__37345 = new cljs.core.IndexedSeq(G__37346__a,0);
}
return dommy$core$remove_class_BANG___3.cljs$core$IFn$_invoke$arity$variadic(elem,class$, G__37345);
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
var temp__4124__auto___37350 = elem.classList;
if(cljs.core.truth_(temp__4124__auto___37350)){
var class_list_37351 = temp__4124__auto___37350;
class_list_37351.toggle(c__$1);
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
var G__37363 = parent;
G__37363.appendChild(child);

return G__37363;
});
var dommy$core$append_BANG___3 = (function() { 
var G__37368__delegate = function (parent,child,more_children){
var seq__37364_37369 = cljs.core.seq(cljs.core.cons(child,more_children));
var chunk__37365_37370 = null;
var count__37366_37371 = (0);
var i__37367_37372 = (0);
while(true){
if((i__37367_37372 < count__37366_37371)){
var c_37373 = chunk__37365_37370.cljs$core$IIndexed$_nth$arity$2(null,i__37367_37372);
dommy$core$append_BANG_.cljs$core$IFn$_invoke$arity$2(parent,c_37373);

var G__37374 = seq__37364_37369;
var G__37375 = chunk__37365_37370;
var G__37376 = count__37366_37371;
var G__37377 = (i__37367_37372 + (1));
seq__37364_37369 = G__37374;
chunk__37365_37370 = G__37375;
count__37366_37371 = G__37376;
i__37367_37372 = G__37377;
continue;
} else {
var temp__4126__auto___37378 = cljs.core.seq(seq__37364_37369);
if(temp__4126__auto___37378){
var seq__37364_37379__$1 = temp__4126__auto___37378;
if(cljs.core.chunked_seq_QMARK_(seq__37364_37379__$1)){
var c__24970__auto___37380 = cljs.core.chunk_first(seq__37364_37379__$1);
var G__37381 = cljs.core.chunk_rest(seq__37364_37379__$1);
var G__37382 = c__24970__auto___37380;
var G__37383 = cljs.core.count(c__24970__auto___37380);
var G__37384 = (0);
seq__37364_37369 = G__37381;
chunk__37365_37370 = G__37382;
count__37366_37371 = G__37383;
i__37367_37372 = G__37384;
continue;
} else {
var c_37385 = cljs.core.first(seq__37364_37379__$1);
dommy$core$append_BANG_.cljs$core$IFn$_invoke$arity$2(parent,c_37385);

var G__37386 = cljs.core.next(seq__37364_37379__$1);
var G__37387 = null;
var G__37388 = (0);
var G__37389 = (0);
seq__37364_37369 = G__37386;
chunk__37365_37370 = G__37387;
count__37366_37371 = G__37388;
i__37367_37372 = G__37389;
continue;
}
} else {
}
}
break;
}

return parent;
};
var G__37368 = function (parent,child,var_args){
var more_children = null;
if (arguments.length > 2) {
var G__37390__i = 0, G__37390__a = new Array(arguments.length -  2);
while (G__37390__i < G__37390__a.length) {G__37390__a[G__37390__i] = arguments[G__37390__i + 2]; ++G__37390__i;}
  more_children = new cljs.core.IndexedSeq(G__37390__a,0);
} 
return G__37368__delegate.call(this,parent,child,more_children);};
G__37368.cljs$lang$maxFixedArity = 2;
G__37368.cljs$lang$applyTo = (function (arglist__37391){
var parent = cljs.core.first(arglist__37391);
arglist__37391 = cljs.core.next(arglist__37391);
var child = cljs.core.first(arglist__37391);
var more_children = cljs.core.rest(arglist__37391);
return G__37368__delegate(parent,child,more_children);
});
G__37368.cljs$core$IFn$_invoke$arity$variadic = G__37368__delegate;
return G__37368;
})()
;
dommy$core$append_BANG_ = function(parent,child,var_args){
var more_children = var_args;
switch(arguments.length){
case 2:
return dommy$core$append_BANG___2.call(this,parent,child);
default:
var G__37392 = null;
if (arguments.length > 2) {
var G__37393__i = 0, G__37393__a = new Array(arguments.length -  2);
while (G__37393__i < G__37393__a.length) {G__37393__a[G__37393__i] = arguments[G__37393__i + 2]; ++G__37393__i;}
G__37392 = new cljs.core.IndexedSeq(G__37393__a,0);
}
return dommy$core$append_BANG___3.cljs$core$IFn$_invoke$arity$variadic(parent,child, G__37392);
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
var G__37403 = parent;
G__37403.insertBefore(child,parent.firstChild);

return G__37403;
});
var dommy$core$prepend_BANG___3 = (function() { 
var G__37408__delegate = function (parent,child,more_children){
var seq__37404_37409 = cljs.core.seq(cljs.core.cons(child,more_children));
var chunk__37405_37410 = null;
var count__37406_37411 = (0);
var i__37407_37412 = (0);
while(true){
if((i__37407_37412 < count__37406_37411)){
var c_37413 = chunk__37405_37410.cljs$core$IIndexed$_nth$arity$2(null,i__37407_37412);
dommy$core$prepend_BANG_.cljs$core$IFn$_invoke$arity$2(parent,c_37413);

var G__37414 = seq__37404_37409;
var G__37415 = chunk__37405_37410;
var G__37416 = count__37406_37411;
var G__37417 = (i__37407_37412 + (1));
seq__37404_37409 = G__37414;
chunk__37405_37410 = G__37415;
count__37406_37411 = G__37416;
i__37407_37412 = G__37417;
continue;
} else {
var temp__4126__auto___37418 = cljs.core.seq(seq__37404_37409);
if(temp__4126__auto___37418){
var seq__37404_37419__$1 = temp__4126__auto___37418;
if(cljs.core.chunked_seq_QMARK_(seq__37404_37419__$1)){
var c__24970__auto___37420 = cljs.core.chunk_first(seq__37404_37419__$1);
var G__37421 = cljs.core.chunk_rest(seq__37404_37419__$1);
var G__37422 = c__24970__auto___37420;
var G__37423 = cljs.core.count(c__24970__auto___37420);
var G__37424 = (0);
seq__37404_37409 = G__37421;
chunk__37405_37410 = G__37422;
count__37406_37411 = G__37423;
i__37407_37412 = G__37424;
continue;
} else {
var c_37425 = cljs.core.first(seq__37404_37419__$1);
dommy$core$prepend_BANG_.cljs$core$IFn$_invoke$arity$2(parent,c_37425);

var G__37426 = cljs.core.next(seq__37404_37419__$1);
var G__37427 = null;
var G__37428 = (0);
var G__37429 = (0);
seq__37404_37409 = G__37426;
chunk__37405_37410 = G__37427;
count__37406_37411 = G__37428;
i__37407_37412 = G__37429;
continue;
}
} else {
}
}
break;
}

return parent;
};
var G__37408 = function (parent,child,var_args){
var more_children = null;
if (arguments.length > 2) {
var G__37430__i = 0, G__37430__a = new Array(arguments.length -  2);
while (G__37430__i < G__37430__a.length) {G__37430__a[G__37430__i] = arguments[G__37430__i + 2]; ++G__37430__i;}
  more_children = new cljs.core.IndexedSeq(G__37430__a,0);
} 
return G__37408__delegate.call(this,parent,child,more_children);};
G__37408.cljs$lang$maxFixedArity = 2;
G__37408.cljs$lang$applyTo = (function (arglist__37431){
var parent = cljs.core.first(arglist__37431);
arglist__37431 = cljs.core.next(arglist__37431);
var child = cljs.core.first(arglist__37431);
var more_children = cljs.core.rest(arglist__37431);
return G__37408__delegate(parent,child,more_children);
});
G__37408.cljs$core$IFn$_invoke$arity$variadic = G__37408__delegate;
return G__37408;
})()
;
dommy$core$prepend_BANG_ = function(parent,child,var_args){
var more_children = var_args;
switch(arguments.length){
case 2:
return dommy$core$prepend_BANG___2.call(this,parent,child);
default:
var G__37432 = null;
if (arguments.length > 2) {
var G__37433__i = 0, G__37433__a = new Array(arguments.length -  2);
while (G__37433__i < G__37433__a.length) {G__37433__a[G__37433__i] = arguments[G__37433__i + 2]; ++G__37433__i;}
G__37432 = new cljs.core.IndexedSeq(G__37433__a,0);
}
return dommy$core$prepend_BANG___3.cljs$core$IFn$_invoke$arity$variadic(parent,child, G__37432);
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
var temp__4124__auto___37434 = other.nextSibling;
if(cljs.core.truth_(temp__4124__auto___37434)){
var next_37435 = temp__4124__auto___37434;
dommy.core.insert_before_BANG_(elem,next_37435);
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
var G__37439 = p;
G__37439.removeChild(elem);

return G__37439;
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
dommy.core.special_listener_makers = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__37440){
var vec__37441 = p__37440;
var special_mouse_event = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37441,(0),null);
var real_mouse_event = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37441,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [special_mouse_event,new cljs.core.PersistentArrayMap.fromArray([real_mouse_event,((function (vec__37441,special_mouse_event,real_mouse_event){
return (function (f){
return ((function (vec__37441,special_mouse_event,real_mouse_event){
return (function (event){
var related_target = event.relatedTarget;
var listener_target = (function (){var or__24185__auto__ = event.selectedTarget;
if(cljs.core.truth_(or__24185__auto__)){
return or__24185__auto__;
} else {
return event.currentTarget;
}
})();
if(cljs.core.truth_((function (){var and__24173__auto__ = related_target;
if(cljs.core.truth_(and__24173__auto__)){
return dommy.core.descendant_QMARK_(related_target,listener_target);
} else {
return and__24173__auto__;
}
})())){
return null;
} else {
var G__37442 = event;
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__37442) : f.call(null,G__37442));
}
});
;})(vec__37441,special_mouse_event,real_mouse_event))
});})(vec__37441,special_mouse_event,real_mouse_event))
], true, false)], null);
}),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$mouseenter,cljs.core.constant$keyword$mouseover,cljs.core.constant$keyword$mouseleave,cljs.core.constant$keyword$mouseout], null)));
/**
 * fires f if event.target is found with `selector`
 */
dommy.core.live_listener = (function dommy$core$live_listener(elem,selector,f){
return (function (event){
var selected_target = dommy.core.closest.cljs$core$IFn$_invoke$arity$3(elem,event.target,selector);
if(cljs.core.truth_((function (){var and__24173__auto__ = selected_target;
if(cljs.core.truth_(and__24173__auto__)){
return cljs.core.not(dommy.core.attr(selected_target,cljs.core.constant$keyword$disabled));
} else {
return and__24173__auto__;
}
})())){
event.selectedTarget = selected_target;

var G__37444 = event;
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__37444) : f.call(null,G__37444));
} else {
return null;
}
});
});
/**
 * Returns a nested map of event listeners on `elem`
 */
dommy.core.event_listeners = (function dommy$core$event_listeners(elem){
var or__24185__auto__ = elem.dommyEventListeners;
if(cljs.core.truth_(or__24185__auto__)){
return or__24185__auto__;
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
var G__37445__i = 0, G__37445__a = new Array(arguments.length -  2);
while (G__37445__i < G__37445__a.length) {G__37445__a[G__37445__i] = arguments[G__37445__i + 2]; ++G__37445__i;}
  args = new cljs.core.IndexedSeq(G__37445__a,0);
} 
return dommy$core$update_event_listeners_BANG___delegate.call(this,elem,f,args);};
dommy$core$update_event_listeners_BANG_.cljs$lang$maxFixedArity = 2;
dommy$core$update_event_listeners_BANG_.cljs$lang$applyTo = (function (arglist__37446){
var elem = cljs.core.first(arglist__37446);
arglist__37446 = cljs.core.next(arglist__37446);
var f = cljs.core.first(arglist__37446);
var args = cljs.core.rest(arglist__37446);
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

var vec__37474_37501 = dommy.core.elem_and_selector(elem_sel);
var elem_37502 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37474_37501,(0),null);
var selector_37503 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37474_37501,(1),null);
var seq__37475_37504 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),type_fs));
var chunk__37482_37505 = null;
var count__37483_37506 = (0);
var i__37484_37507 = (0);
while(true){
if((i__37484_37507 < count__37483_37506)){
var vec__37491_37508 = chunk__37482_37505.cljs$core$IIndexed$_nth$arity$2(null,i__37484_37507);
var orig_type_37509 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37491_37508,(0),null);
var f_37510 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37491_37508,(1),null);
var seq__37485_37511 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$3(dommy.core.special_listener_makers,orig_type_37509,new cljs.core.PersistentArrayMap.fromArray([orig_type_37509,cljs.core.identity], true, false)));
var chunk__37487_37512 = null;
var count__37488_37513 = (0);
var i__37489_37514 = (0);
while(true){
if((i__37489_37514 < count__37488_37513)){
var vec__37492_37515 = chunk__37487_37512.cljs$core$IIndexed$_nth$arity$2(null,i__37489_37514);
var actual_type_37516 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37492_37515,(0),null);
var factory_37517 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37492_37515,(1),null);
var canonical_f_37518 = (cljs.core.truth_(selector_37503)?cljs.core.partial.cljs$core$IFn$_invoke$arity$3(dommy.core.live_listener,elem_37502,selector_37503):cljs.core.identity).call(null,(function (){var G__37493 = f_37510;
return (factory_37517.cljs$core$IFn$_invoke$arity$1 ? factory_37517.cljs$core$IFn$_invoke$arity$1(G__37493) : factory_37517.call(null,G__37493));
})());
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37502,cljs.core.assoc_in,cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37503,actual_type_37516,f_37510], null),canonical_f_37518], 0));

if(cljs.core.truth_(elem_37502.addEventListener)){
elem_37502.addEventListener(cljs.core.name(actual_type_37516),canonical_f_37518);
} else {
elem_37502.attachEvent(cljs.core.name(actual_type_37516),canonical_f_37518);
}

var G__37519 = seq__37485_37511;
var G__37520 = chunk__37487_37512;
var G__37521 = count__37488_37513;
var G__37522 = (i__37489_37514 + (1));
seq__37485_37511 = G__37519;
chunk__37487_37512 = G__37520;
count__37488_37513 = G__37521;
i__37489_37514 = G__37522;
continue;
} else {
var temp__4126__auto___37523 = cljs.core.seq(seq__37485_37511);
if(temp__4126__auto___37523){
var seq__37485_37524__$1 = temp__4126__auto___37523;
if(cljs.core.chunked_seq_QMARK_(seq__37485_37524__$1)){
var c__24970__auto___37525 = cljs.core.chunk_first(seq__37485_37524__$1);
var G__37526 = cljs.core.chunk_rest(seq__37485_37524__$1);
var G__37527 = c__24970__auto___37525;
var G__37528 = cljs.core.count(c__24970__auto___37525);
var G__37529 = (0);
seq__37485_37511 = G__37526;
chunk__37487_37512 = G__37527;
count__37488_37513 = G__37528;
i__37489_37514 = G__37529;
continue;
} else {
var vec__37494_37530 = cljs.core.first(seq__37485_37524__$1);
var actual_type_37531 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37494_37530,(0),null);
var factory_37532 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37494_37530,(1),null);
var canonical_f_37533 = (cljs.core.truth_(selector_37503)?cljs.core.partial.cljs$core$IFn$_invoke$arity$3(dommy.core.live_listener,elem_37502,selector_37503):cljs.core.identity).call(null,(function (){var G__37495 = f_37510;
return (factory_37532.cljs$core$IFn$_invoke$arity$1 ? factory_37532.cljs$core$IFn$_invoke$arity$1(G__37495) : factory_37532.call(null,G__37495));
})());
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37502,cljs.core.assoc_in,cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37503,actual_type_37531,f_37510], null),canonical_f_37533], 0));

if(cljs.core.truth_(elem_37502.addEventListener)){
elem_37502.addEventListener(cljs.core.name(actual_type_37531),canonical_f_37533);
} else {
elem_37502.attachEvent(cljs.core.name(actual_type_37531),canonical_f_37533);
}

var G__37534 = cljs.core.next(seq__37485_37524__$1);
var G__37535 = null;
var G__37536 = (0);
var G__37537 = (0);
seq__37485_37511 = G__37534;
chunk__37487_37512 = G__37535;
count__37488_37513 = G__37536;
i__37489_37514 = G__37537;
continue;
}
} else {
}
}
break;
}

var G__37538 = seq__37475_37504;
var G__37539 = chunk__37482_37505;
var G__37540 = count__37483_37506;
var G__37541 = (i__37484_37507 + (1));
seq__37475_37504 = G__37538;
chunk__37482_37505 = G__37539;
count__37483_37506 = G__37540;
i__37484_37507 = G__37541;
continue;
} else {
var temp__4126__auto___37542 = cljs.core.seq(seq__37475_37504);
if(temp__4126__auto___37542){
var seq__37475_37543__$1 = temp__4126__auto___37542;
if(cljs.core.chunked_seq_QMARK_(seq__37475_37543__$1)){
var c__24970__auto___37544 = cljs.core.chunk_first(seq__37475_37543__$1);
var G__37545 = cljs.core.chunk_rest(seq__37475_37543__$1);
var G__37546 = c__24970__auto___37544;
var G__37547 = cljs.core.count(c__24970__auto___37544);
var G__37548 = (0);
seq__37475_37504 = G__37545;
chunk__37482_37505 = G__37546;
count__37483_37506 = G__37547;
i__37484_37507 = G__37548;
continue;
} else {
var vec__37496_37549 = cljs.core.first(seq__37475_37543__$1);
var orig_type_37550 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37496_37549,(0),null);
var f_37551 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37496_37549,(1),null);
var seq__37476_37552 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$3(dommy.core.special_listener_makers,orig_type_37550,new cljs.core.PersistentArrayMap.fromArray([orig_type_37550,cljs.core.identity], true, false)));
var chunk__37478_37553 = null;
var count__37479_37554 = (0);
var i__37480_37555 = (0);
while(true){
if((i__37480_37555 < count__37479_37554)){
var vec__37497_37556 = chunk__37478_37553.cljs$core$IIndexed$_nth$arity$2(null,i__37480_37555);
var actual_type_37557 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37497_37556,(0),null);
var factory_37558 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37497_37556,(1),null);
var canonical_f_37559 = (cljs.core.truth_(selector_37503)?cljs.core.partial.cljs$core$IFn$_invoke$arity$3(dommy.core.live_listener,elem_37502,selector_37503):cljs.core.identity).call(null,(function (){var G__37498 = f_37551;
return (factory_37558.cljs$core$IFn$_invoke$arity$1 ? factory_37558.cljs$core$IFn$_invoke$arity$1(G__37498) : factory_37558.call(null,G__37498));
})());
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37502,cljs.core.assoc_in,cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37503,actual_type_37557,f_37551], null),canonical_f_37559], 0));

if(cljs.core.truth_(elem_37502.addEventListener)){
elem_37502.addEventListener(cljs.core.name(actual_type_37557),canonical_f_37559);
} else {
elem_37502.attachEvent(cljs.core.name(actual_type_37557),canonical_f_37559);
}

var G__37560 = seq__37476_37552;
var G__37561 = chunk__37478_37553;
var G__37562 = count__37479_37554;
var G__37563 = (i__37480_37555 + (1));
seq__37476_37552 = G__37560;
chunk__37478_37553 = G__37561;
count__37479_37554 = G__37562;
i__37480_37555 = G__37563;
continue;
} else {
var temp__4126__auto___37564__$1 = cljs.core.seq(seq__37476_37552);
if(temp__4126__auto___37564__$1){
var seq__37476_37565__$1 = temp__4126__auto___37564__$1;
if(cljs.core.chunked_seq_QMARK_(seq__37476_37565__$1)){
var c__24970__auto___37566 = cljs.core.chunk_first(seq__37476_37565__$1);
var G__37567 = cljs.core.chunk_rest(seq__37476_37565__$1);
var G__37568 = c__24970__auto___37566;
var G__37569 = cljs.core.count(c__24970__auto___37566);
var G__37570 = (0);
seq__37476_37552 = G__37567;
chunk__37478_37553 = G__37568;
count__37479_37554 = G__37569;
i__37480_37555 = G__37570;
continue;
} else {
var vec__37499_37571 = cljs.core.first(seq__37476_37565__$1);
var actual_type_37572 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37499_37571,(0),null);
var factory_37573 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37499_37571,(1),null);
var canonical_f_37574 = (cljs.core.truth_(selector_37503)?cljs.core.partial.cljs$core$IFn$_invoke$arity$3(dommy.core.live_listener,elem_37502,selector_37503):cljs.core.identity).call(null,(function (){var G__37500 = f_37551;
return (factory_37573.cljs$core$IFn$_invoke$arity$1 ? factory_37573.cljs$core$IFn$_invoke$arity$1(G__37500) : factory_37573.call(null,G__37500));
})());
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37502,cljs.core.assoc_in,cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37503,actual_type_37572,f_37551], null),canonical_f_37574], 0));

if(cljs.core.truth_(elem_37502.addEventListener)){
elem_37502.addEventListener(cljs.core.name(actual_type_37572),canonical_f_37574);
} else {
elem_37502.attachEvent(cljs.core.name(actual_type_37572),canonical_f_37574);
}

var G__37575 = cljs.core.next(seq__37476_37565__$1);
var G__37576 = null;
var G__37577 = (0);
var G__37578 = (0);
seq__37476_37552 = G__37575;
chunk__37478_37553 = G__37576;
count__37479_37554 = G__37577;
i__37480_37555 = G__37578;
continue;
}
} else {
}
}
break;
}

var G__37579 = cljs.core.next(seq__37475_37543__$1);
var G__37580 = null;
var G__37581 = (0);
var G__37582 = (0);
seq__37475_37504 = G__37579;
chunk__37482_37505 = G__37580;
count__37483_37506 = G__37581;
i__37484_37507 = G__37582;
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
var G__37583__i = 0, G__37583__a = new Array(arguments.length -  1);
while (G__37583__i < G__37583__a.length) {G__37583__a[G__37583__i] = arguments[G__37583__i + 1]; ++G__37583__i;}
  type_fs = new cljs.core.IndexedSeq(G__37583__a,0);
} 
return dommy$core$listen_BANG___delegate.call(this,elem_sel,type_fs);};
dommy$core$listen_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$listen_BANG_.cljs$lang$applyTo = (function (arglist__37584){
var elem_sel = cljs.core.first(arglist__37584);
var type_fs = cljs.core.rest(arglist__37584);
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

var vec__37608_37631 = dommy.core.elem_and_selector(elem_sel);
var elem_37632 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37608_37631,(0),null);
var selector_37633 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37608_37631,(1),null);
var seq__37609_37634 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),type_fs));
var chunk__37616_37635 = null;
var count__37617_37636 = (0);
var i__37618_37637 = (0);
while(true){
if((i__37618_37637 < count__37617_37636)){
var vec__37625_37638 = chunk__37616_37635.cljs$core$IIndexed$_nth$arity$2(null,i__37618_37637);
var orig_type_37639 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37625_37638,(0),null);
var f_37640 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37625_37638,(1),null);
var seq__37619_37641 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$3(dommy.core.special_listener_makers,orig_type_37639,new cljs.core.PersistentArrayMap.fromArray([orig_type_37639,cljs.core.identity], true, false)));
var chunk__37621_37642 = null;
var count__37622_37643 = (0);
var i__37623_37644 = (0);
while(true){
if((i__37623_37644 < count__37622_37643)){
var vec__37626_37645 = chunk__37621_37642.cljs$core$IIndexed$_nth$arity$2(null,i__37623_37644);
var actual_type_37646 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37626_37645,(0),null);
var __37647 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37626_37645,(1),null);
var keys_37648 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37633,actual_type_37646,f_37640], null);
var canonical_f_37649 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(dommy.core.event_listeners(elem_37632),keys_37648);
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37632,dommy.utils.dissoc_in,cljs.core.array_seq([keys_37648], 0));

if(cljs.core.truth_(elem_37632.removeEventListener)){
elem_37632.removeEventListener(cljs.core.name(actual_type_37646),canonical_f_37649);
} else {
elem_37632.detachEvent(cljs.core.name(actual_type_37646),canonical_f_37649);
}

var G__37650 = seq__37619_37641;
var G__37651 = chunk__37621_37642;
var G__37652 = count__37622_37643;
var G__37653 = (i__37623_37644 + (1));
seq__37619_37641 = G__37650;
chunk__37621_37642 = G__37651;
count__37622_37643 = G__37652;
i__37623_37644 = G__37653;
continue;
} else {
var temp__4126__auto___37654 = cljs.core.seq(seq__37619_37641);
if(temp__4126__auto___37654){
var seq__37619_37655__$1 = temp__4126__auto___37654;
if(cljs.core.chunked_seq_QMARK_(seq__37619_37655__$1)){
var c__24970__auto___37656 = cljs.core.chunk_first(seq__37619_37655__$1);
var G__37657 = cljs.core.chunk_rest(seq__37619_37655__$1);
var G__37658 = c__24970__auto___37656;
var G__37659 = cljs.core.count(c__24970__auto___37656);
var G__37660 = (0);
seq__37619_37641 = G__37657;
chunk__37621_37642 = G__37658;
count__37622_37643 = G__37659;
i__37623_37644 = G__37660;
continue;
} else {
var vec__37627_37661 = cljs.core.first(seq__37619_37655__$1);
var actual_type_37662 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37627_37661,(0),null);
var __37663 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37627_37661,(1),null);
var keys_37664 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37633,actual_type_37662,f_37640], null);
var canonical_f_37665 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(dommy.core.event_listeners(elem_37632),keys_37664);
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37632,dommy.utils.dissoc_in,cljs.core.array_seq([keys_37664], 0));

if(cljs.core.truth_(elem_37632.removeEventListener)){
elem_37632.removeEventListener(cljs.core.name(actual_type_37662),canonical_f_37665);
} else {
elem_37632.detachEvent(cljs.core.name(actual_type_37662),canonical_f_37665);
}

var G__37666 = cljs.core.next(seq__37619_37655__$1);
var G__37667 = null;
var G__37668 = (0);
var G__37669 = (0);
seq__37619_37641 = G__37666;
chunk__37621_37642 = G__37667;
count__37622_37643 = G__37668;
i__37623_37644 = G__37669;
continue;
}
} else {
}
}
break;
}

var G__37670 = seq__37609_37634;
var G__37671 = chunk__37616_37635;
var G__37672 = count__37617_37636;
var G__37673 = (i__37618_37637 + (1));
seq__37609_37634 = G__37670;
chunk__37616_37635 = G__37671;
count__37617_37636 = G__37672;
i__37618_37637 = G__37673;
continue;
} else {
var temp__4126__auto___37674 = cljs.core.seq(seq__37609_37634);
if(temp__4126__auto___37674){
var seq__37609_37675__$1 = temp__4126__auto___37674;
if(cljs.core.chunked_seq_QMARK_(seq__37609_37675__$1)){
var c__24970__auto___37676 = cljs.core.chunk_first(seq__37609_37675__$1);
var G__37677 = cljs.core.chunk_rest(seq__37609_37675__$1);
var G__37678 = c__24970__auto___37676;
var G__37679 = cljs.core.count(c__24970__auto___37676);
var G__37680 = (0);
seq__37609_37634 = G__37677;
chunk__37616_37635 = G__37678;
count__37617_37636 = G__37679;
i__37618_37637 = G__37680;
continue;
} else {
var vec__37628_37681 = cljs.core.first(seq__37609_37675__$1);
var orig_type_37682 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37628_37681,(0),null);
var f_37683 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37628_37681,(1),null);
var seq__37610_37684 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$3(dommy.core.special_listener_makers,orig_type_37682,new cljs.core.PersistentArrayMap.fromArray([orig_type_37682,cljs.core.identity], true, false)));
var chunk__37612_37685 = null;
var count__37613_37686 = (0);
var i__37614_37687 = (0);
while(true){
if((i__37614_37687 < count__37613_37686)){
var vec__37629_37688 = chunk__37612_37685.cljs$core$IIndexed$_nth$arity$2(null,i__37614_37687);
var actual_type_37689 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37629_37688,(0),null);
var __37690 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37629_37688,(1),null);
var keys_37691 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37633,actual_type_37689,f_37683], null);
var canonical_f_37692 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(dommy.core.event_listeners(elem_37632),keys_37691);
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37632,dommy.utils.dissoc_in,cljs.core.array_seq([keys_37691], 0));

if(cljs.core.truth_(elem_37632.removeEventListener)){
elem_37632.removeEventListener(cljs.core.name(actual_type_37689),canonical_f_37692);
} else {
elem_37632.detachEvent(cljs.core.name(actual_type_37689),canonical_f_37692);
}

var G__37693 = seq__37610_37684;
var G__37694 = chunk__37612_37685;
var G__37695 = count__37613_37686;
var G__37696 = (i__37614_37687 + (1));
seq__37610_37684 = G__37693;
chunk__37612_37685 = G__37694;
count__37613_37686 = G__37695;
i__37614_37687 = G__37696;
continue;
} else {
var temp__4126__auto___37697__$1 = cljs.core.seq(seq__37610_37684);
if(temp__4126__auto___37697__$1){
var seq__37610_37698__$1 = temp__4126__auto___37697__$1;
if(cljs.core.chunked_seq_QMARK_(seq__37610_37698__$1)){
var c__24970__auto___37699 = cljs.core.chunk_first(seq__37610_37698__$1);
var G__37700 = cljs.core.chunk_rest(seq__37610_37698__$1);
var G__37701 = c__24970__auto___37699;
var G__37702 = cljs.core.count(c__24970__auto___37699);
var G__37703 = (0);
seq__37610_37684 = G__37700;
chunk__37612_37685 = G__37701;
count__37613_37686 = G__37702;
i__37614_37687 = G__37703;
continue;
} else {
var vec__37630_37704 = cljs.core.first(seq__37610_37698__$1);
var actual_type_37705 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37630_37704,(0),null);
var __37706 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37630_37704,(1),null);
var keys_37707 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37633,actual_type_37705,f_37683], null);
var canonical_f_37708 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(dommy.core.event_listeners(elem_37632),keys_37707);
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37632,dommy.utils.dissoc_in,cljs.core.array_seq([keys_37707], 0));

if(cljs.core.truth_(elem_37632.removeEventListener)){
elem_37632.removeEventListener(cljs.core.name(actual_type_37705),canonical_f_37708);
} else {
elem_37632.detachEvent(cljs.core.name(actual_type_37705),canonical_f_37708);
}

var G__37709 = cljs.core.next(seq__37610_37698__$1);
var G__37710 = null;
var G__37711 = (0);
var G__37712 = (0);
seq__37610_37684 = G__37709;
chunk__37612_37685 = G__37710;
count__37613_37686 = G__37711;
i__37614_37687 = G__37712;
continue;
}
} else {
}
}
break;
}

var G__37713 = cljs.core.next(seq__37609_37675__$1);
var G__37714 = null;
var G__37715 = (0);
var G__37716 = (0);
seq__37609_37634 = G__37713;
chunk__37616_37635 = G__37714;
count__37617_37636 = G__37715;
i__37618_37637 = G__37716;
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
var G__37717__i = 0, G__37717__a = new Array(arguments.length -  1);
while (G__37717__i < G__37717__a.length) {G__37717__a[G__37717__i] = arguments[G__37717__i + 1]; ++G__37717__i;}
  type_fs = new cljs.core.IndexedSeq(G__37717__a,0);
} 
return dommy$core$unlisten_BANG___delegate.call(this,elem_sel,type_fs);};
dommy$core$unlisten_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$unlisten_BANG_.cljs$lang$applyTo = (function (arglist__37718){
var elem_sel = cljs.core.first(arglist__37718);
var type_fs = cljs.core.rest(arglist__37718);
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

var vec__37730_37741 = dommy.core.elem_and_selector(elem_sel);
var elem_37742 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37730_37741,(0),null);
var selector_37743 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37730_37741,(1),null);
var seq__37731_37744 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),type_fs));
var chunk__37732_37745 = null;
var count__37733_37746 = (0);
var i__37734_37747 = (0);
while(true){
if((i__37734_37747 < count__37733_37746)){
var vec__37735_37748 = chunk__37732_37745.cljs$core$IIndexed$_nth$arity$2(null,i__37734_37747);
var type_37749 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37735_37748,(0),null);
var f_37750 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37735_37748,(1),null);
dommy.core.listen_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_sel,cljs.core.array_seq([type_37749,((function (seq__37731_37744,chunk__37732_37745,count__37733_37746,i__37734_37747,vec__37735_37748,type_37749,f_37750,vec__37730_37741,elem_37742,selector_37743){
return (function dommy$core$listen_once_BANG__$_this_fn(e){
dommy.core.unlisten_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_sel,cljs.core.array_seq([type_37749,dommy$core$listen_once_BANG__$_this_fn], 0));

var G__37737 = e;
return (f_37750.cljs$core$IFn$_invoke$arity$1 ? f_37750.cljs$core$IFn$_invoke$arity$1(G__37737) : f_37750.call(null,G__37737));
});})(seq__37731_37744,chunk__37732_37745,count__37733_37746,i__37734_37747,vec__37735_37748,type_37749,f_37750,vec__37730_37741,elem_37742,selector_37743))
], 0));

var G__37751 = seq__37731_37744;
var G__37752 = chunk__37732_37745;
var G__37753 = count__37733_37746;
var G__37754 = (i__37734_37747 + (1));
seq__37731_37744 = G__37751;
chunk__37732_37745 = G__37752;
count__37733_37746 = G__37753;
i__37734_37747 = G__37754;
continue;
} else {
var temp__4126__auto___37755 = cljs.core.seq(seq__37731_37744);
if(temp__4126__auto___37755){
var seq__37731_37756__$1 = temp__4126__auto___37755;
if(cljs.core.chunked_seq_QMARK_(seq__37731_37756__$1)){
var c__24970__auto___37757 = cljs.core.chunk_first(seq__37731_37756__$1);
var G__37758 = cljs.core.chunk_rest(seq__37731_37756__$1);
var G__37759 = c__24970__auto___37757;
var G__37760 = cljs.core.count(c__24970__auto___37757);
var G__37761 = (0);
seq__37731_37744 = G__37758;
chunk__37732_37745 = G__37759;
count__37733_37746 = G__37760;
i__37734_37747 = G__37761;
continue;
} else {
var vec__37738_37762 = cljs.core.first(seq__37731_37756__$1);
var type_37763 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37738_37762,(0),null);
var f_37764 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37738_37762,(1),null);
dommy.core.listen_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_sel,cljs.core.array_seq([type_37763,((function (seq__37731_37744,chunk__37732_37745,count__37733_37746,i__37734_37747,vec__37738_37762,type_37763,f_37764,seq__37731_37756__$1,temp__4126__auto___37755,vec__37730_37741,elem_37742,selector_37743){
return (function dommy$core$listen_once_BANG__$_this_fn(e){
dommy.core.unlisten_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_sel,cljs.core.array_seq([type_37763,dommy$core$listen_once_BANG__$_this_fn], 0));

var G__37740 = e;
return (f_37764.cljs$core$IFn$_invoke$arity$1 ? f_37764.cljs$core$IFn$_invoke$arity$1(G__37740) : f_37764.call(null,G__37740));
});})(seq__37731_37744,chunk__37732_37745,count__37733_37746,i__37734_37747,vec__37738_37762,type_37763,f_37764,seq__37731_37756__$1,temp__4126__auto___37755,vec__37730_37741,elem_37742,selector_37743))
], 0));

var G__37765 = cljs.core.next(seq__37731_37756__$1);
var G__37766 = null;
var G__37767 = (0);
var G__37768 = (0);
seq__37731_37744 = G__37765;
chunk__37732_37745 = G__37766;
count__37733_37746 = G__37767;
i__37734_37747 = G__37768;
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
var G__37769__i = 0, G__37769__a = new Array(arguments.length -  1);
while (G__37769__i < G__37769__a.length) {G__37769__a[G__37769__i] = arguments[G__37769__i + 1]; ++G__37769__i;}
  type_fs = new cljs.core.IndexedSeq(G__37769__a,0);
} 
return dommy$core$listen_once_BANG___delegate.call(this,elem_sel,type_fs);};
dommy$core$listen_once_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$listen_once_BANG_.cljs$lang$applyTo = (function (arglist__37770){
var elem_sel = cljs.core.first(arglist__37770);
var type_fs = cljs.core.rest(arglist__37770);
return dommy$core$listen_once_BANG___delegate(elem_sel,type_fs);
});
dommy$core$listen_once_BANG_.cljs$core$IFn$_invoke$arity$variadic = dommy$core$listen_once_BANG___delegate;
return dommy$core$listen_once_BANG_;
})()
;
