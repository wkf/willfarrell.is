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
var or__24183__auto__ = elem.textContent;
if(cljs.core.truth_(or__24183__auto__)){
return or__24183__auto__;
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
var G__37073 = pixels;
return parseInt(G__37073);
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
return cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(dommy.core.matches_pred.cljs$core$IFn$_invoke$arity$2(base,selector),cljs.core.take_while.cljs$core$IFn$_invoke$arity$2((function (p1__37076_SHARP_){
return !((p1__37076_SHARP_ === base));
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
var seq__37086_37092 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),kvs));
var chunk__37087_37093 = null;
var count__37088_37094 = (0);
var i__37089_37095 = (0);
while(true){
if((i__37089_37095 < count__37088_37094)){
var vec__37090_37096 = chunk__37087_37093.cljs$core$IIndexed$_nth$arity$2(null,i__37089_37095);
var k_37097 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37090_37096,(0),null);
var v_37098 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37090_37096,(1),null);
style.setProperty(dommy.utils.as_str(k_37097),v_37098);

var G__37099 = seq__37086_37092;
var G__37100 = chunk__37087_37093;
var G__37101 = count__37088_37094;
var G__37102 = (i__37089_37095 + (1));
seq__37086_37092 = G__37099;
chunk__37087_37093 = G__37100;
count__37088_37094 = G__37101;
i__37089_37095 = G__37102;
continue;
} else {
var temp__4126__auto___37103 = cljs.core.seq(seq__37086_37092);
if(temp__4126__auto___37103){
var seq__37086_37104__$1 = temp__4126__auto___37103;
if(cljs.core.chunked_seq_QMARK_(seq__37086_37104__$1)){
var c__24968__auto___37105 = cljs.core.chunk_first(seq__37086_37104__$1);
var G__37106 = cljs.core.chunk_rest(seq__37086_37104__$1);
var G__37107 = c__24968__auto___37105;
var G__37108 = cljs.core.count(c__24968__auto___37105);
var G__37109 = (0);
seq__37086_37092 = G__37106;
chunk__37087_37093 = G__37107;
count__37088_37094 = G__37108;
i__37089_37095 = G__37109;
continue;
} else {
var vec__37091_37110 = cljs.core.first(seq__37086_37104__$1);
var k_37111 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37091_37110,(0),null);
var v_37112 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37091_37110,(1),null);
style.setProperty(dommy.utils.as_str(k_37111),v_37112);

var G__37113 = cljs.core.next(seq__37086_37104__$1);
var G__37114 = null;
var G__37115 = (0);
var G__37116 = (0);
seq__37086_37092 = G__37113;
chunk__37087_37093 = G__37114;
count__37088_37094 = G__37115;
i__37089_37095 = G__37116;
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
var G__37117__i = 0, G__37117__a = new Array(arguments.length -  1);
while (G__37117__i < G__37117__a.length) {G__37117__a[G__37117__i] = arguments[G__37117__i + 1]; ++G__37117__i;}
  kvs = new cljs.core.IndexedSeq(G__37117__a,0);
} 
return dommy$core$set_style_BANG___delegate.call(this,elem,kvs);};
dommy$core$set_style_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$set_style_BANG_.cljs$lang$applyTo = (function (arglist__37118){
var elem = cljs.core.first(arglist__37118);
var kvs = cljs.core.rest(arglist__37118);
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

var seq__37125_37131 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),kvs));
var chunk__37126_37132 = null;
var count__37127_37133 = (0);
var i__37128_37134 = (0);
while(true){
if((i__37128_37134 < count__37127_37133)){
var vec__37129_37135 = chunk__37126_37132.cljs$core$IIndexed$_nth$arity$2(null,i__37128_37134);
var k_37136 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37129_37135,(0),null);
var v_37137 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37129_37135,(1),null);
dommy.core.set_style_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem,cljs.core.array_seq([k_37136,[cljs.core.str(v_37137),cljs.core.str("px")].join('')], 0));

var G__37138 = seq__37125_37131;
var G__37139 = chunk__37126_37132;
var G__37140 = count__37127_37133;
var G__37141 = (i__37128_37134 + (1));
seq__37125_37131 = G__37138;
chunk__37126_37132 = G__37139;
count__37127_37133 = G__37140;
i__37128_37134 = G__37141;
continue;
} else {
var temp__4126__auto___37142 = cljs.core.seq(seq__37125_37131);
if(temp__4126__auto___37142){
var seq__37125_37143__$1 = temp__4126__auto___37142;
if(cljs.core.chunked_seq_QMARK_(seq__37125_37143__$1)){
var c__24968__auto___37144 = cljs.core.chunk_first(seq__37125_37143__$1);
var G__37145 = cljs.core.chunk_rest(seq__37125_37143__$1);
var G__37146 = c__24968__auto___37144;
var G__37147 = cljs.core.count(c__24968__auto___37144);
var G__37148 = (0);
seq__37125_37131 = G__37145;
chunk__37126_37132 = G__37146;
count__37127_37133 = G__37147;
i__37128_37134 = G__37148;
continue;
} else {
var vec__37130_37149 = cljs.core.first(seq__37125_37143__$1);
var k_37150 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37130_37149,(0),null);
var v_37151 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37130_37149,(1),null);
dommy.core.set_style_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem,cljs.core.array_seq([k_37150,[cljs.core.str(v_37151),cljs.core.str("px")].join('')], 0));

var G__37152 = cljs.core.next(seq__37125_37143__$1);
var G__37153 = null;
var G__37154 = (0);
var G__37155 = (0);
seq__37125_37131 = G__37152;
chunk__37126_37132 = G__37153;
count__37127_37133 = G__37154;
i__37128_37134 = G__37155;
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
var G__37156__i = 0, G__37156__a = new Array(arguments.length -  1);
while (G__37156__i < G__37156__a.length) {G__37156__a[G__37156__i] = arguments[G__37156__i + 1]; ++G__37156__i;}
  kvs = new cljs.core.IndexedSeq(G__37156__a,0);
} 
return dommy$core$set_px_BANG___delegate.call(this,elem,kvs);};
dommy$core$set_px_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$set_px_BANG_.cljs$lang$applyTo = (function (arglist__37157){
var elem = cljs.core.first(arglist__37157);
var kvs = cljs.core.rest(arglist__37157);
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
var G__37175 = elem;
(G__37175[k__$1] = v);

return G__37175;
} else {
var G__37176 = elem;
G__37176.setAttribute(k__$1,v);

return G__37176;
}
} else {
return null;
}
});
var dommy$core$set_attr_BANG___4 = (function() { 
var G__37183__delegate = function (elem,k,v,kvs){
if(cljs.core.even_QMARK_(cljs.core.count(kvs))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1827825394,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-514511684,null),new cljs.core.Symbol(null,"kvs","kvs",-1695980277,null)))], 0)))].join('')));
}

var seq__37177_37184 = cljs.core.seq(cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null),cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),kvs)));
var chunk__37178_37185 = null;
var count__37179_37186 = (0);
var i__37180_37187 = (0);
while(true){
if((i__37180_37187 < count__37179_37186)){
var vec__37181_37188 = chunk__37178_37185.cljs$core$IIndexed$_nth$arity$2(null,i__37180_37187);
var k_37189__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37181_37188,(0),null);
var v_37190__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37181_37188,(1),null);
dommy$core$set_attr_BANG_.cljs$core$IFn$_invoke$arity$3(elem,k_37189__$1,v_37190__$1);

var G__37191 = seq__37177_37184;
var G__37192 = chunk__37178_37185;
var G__37193 = count__37179_37186;
var G__37194 = (i__37180_37187 + (1));
seq__37177_37184 = G__37191;
chunk__37178_37185 = G__37192;
count__37179_37186 = G__37193;
i__37180_37187 = G__37194;
continue;
} else {
var temp__4126__auto___37195 = cljs.core.seq(seq__37177_37184);
if(temp__4126__auto___37195){
var seq__37177_37196__$1 = temp__4126__auto___37195;
if(cljs.core.chunked_seq_QMARK_(seq__37177_37196__$1)){
var c__24968__auto___37197 = cljs.core.chunk_first(seq__37177_37196__$1);
var G__37198 = cljs.core.chunk_rest(seq__37177_37196__$1);
var G__37199 = c__24968__auto___37197;
var G__37200 = cljs.core.count(c__24968__auto___37197);
var G__37201 = (0);
seq__37177_37184 = G__37198;
chunk__37178_37185 = G__37199;
count__37179_37186 = G__37200;
i__37180_37187 = G__37201;
continue;
} else {
var vec__37182_37202 = cljs.core.first(seq__37177_37196__$1);
var k_37203__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37182_37202,(0),null);
var v_37204__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37182_37202,(1),null);
dommy$core$set_attr_BANG_.cljs$core$IFn$_invoke$arity$3(elem,k_37203__$1,v_37204__$1);

var G__37205 = cljs.core.next(seq__37177_37196__$1);
var G__37206 = null;
var G__37207 = (0);
var G__37208 = (0);
seq__37177_37184 = G__37205;
chunk__37178_37185 = G__37206;
count__37179_37186 = G__37207;
i__37180_37187 = G__37208;
continue;
}
} else {
}
}
break;
}

return elem;
};
var G__37183 = function (elem,k,v,var_args){
var kvs = null;
if (arguments.length > 3) {
var G__37209__i = 0, G__37209__a = new Array(arguments.length -  3);
while (G__37209__i < G__37209__a.length) {G__37209__a[G__37209__i] = arguments[G__37209__i + 3]; ++G__37209__i;}
  kvs = new cljs.core.IndexedSeq(G__37209__a,0);
} 
return G__37183__delegate.call(this,elem,k,v,kvs);};
G__37183.cljs$lang$maxFixedArity = 3;
G__37183.cljs$lang$applyTo = (function (arglist__37210){
var elem = cljs.core.first(arglist__37210);
arglist__37210 = cljs.core.next(arglist__37210);
var k = cljs.core.first(arglist__37210);
arglist__37210 = cljs.core.next(arglist__37210);
var v = cljs.core.first(arglist__37210);
var kvs = cljs.core.rest(arglist__37210);
return G__37183__delegate(elem,k,v,kvs);
});
G__37183.cljs$core$IFn$_invoke$arity$variadic = G__37183__delegate;
return G__37183;
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
var G__37211 = null;
if (arguments.length > 3) {
var G__37212__i = 0, G__37212__a = new Array(arguments.length -  3);
while (G__37212__i < G__37212__a.length) {G__37212__a[G__37212__i] = arguments[G__37212__i + 3]; ++G__37212__i;}
G__37211 = new cljs.core.IndexedSeq(G__37212__a,0);
}
return dommy$core$set_attr_BANG___4.cljs$core$IFn$_invoke$arity$variadic(elem,k,v, G__37211);
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
var k_37225__$1 = dommy.utils.as_str(k);
if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["class",null,"classes",null], null), null).call(null,k_37225__$1))){
dommy.core.set_class_BANG_(elem,"");
} else {
elem.removeAttribute(k_37225__$1);
}

return elem;
});
var dommy$core$remove_attr_BANG___3 = (function() { 
var G__37226__delegate = function (elem,k,ks){
var seq__37221_37227 = cljs.core.seq(cljs.core.cons(k,ks));
var chunk__37222_37228 = null;
var count__37223_37229 = (0);
var i__37224_37230 = (0);
while(true){
if((i__37224_37230 < count__37223_37229)){
var k_37231__$1 = chunk__37222_37228.cljs$core$IIndexed$_nth$arity$2(null,i__37224_37230);
dommy$core$remove_attr_BANG_.cljs$core$IFn$_invoke$arity$2(elem,k_37231__$1);

var G__37232 = seq__37221_37227;
var G__37233 = chunk__37222_37228;
var G__37234 = count__37223_37229;
var G__37235 = (i__37224_37230 + (1));
seq__37221_37227 = G__37232;
chunk__37222_37228 = G__37233;
count__37223_37229 = G__37234;
i__37224_37230 = G__37235;
continue;
} else {
var temp__4126__auto___37236 = cljs.core.seq(seq__37221_37227);
if(temp__4126__auto___37236){
var seq__37221_37237__$1 = temp__4126__auto___37236;
if(cljs.core.chunked_seq_QMARK_(seq__37221_37237__$1)){
var c__24968__auto___37238 = cljs.core.chunk_first(seq__37221_37237__$1);
var G__37239 = cljs.core.chunk_rest(seq__37221_37237__$1);
var G__37240 = c__24968__auto___37238;
var G__37241 = cljs.core.count(c__24968__auto___37238);
var G__37242 = (0);
seq__37221_37227 = G__37239;
chunk__37222_37228 = G__37240;
count__37223_37229 = G__37241;
i__37224_37230 = G__37242;
continue;
} else {
var k_37243__$1 = cljs.core.first(seq__37221_37237__$1);
dommy$core$remove_attr_BANG_.cljs$core$IFn$_invoke$arity$2(elem,k_37243__$1);

var G__37244 = cljs.core.next(seq__37221_37237__$1);
var G__37245 = null;
var G__37246 = (0);
var G__37247 = (0);
seq__37221_37227 = G__37244;
chunk__37222_37228 = G__37245;
count__37223_37229 = G__37246;
i__37224_37230 = G__37247;
continue;
}
} else {
}
}
break;
}

return elem;
};
var G__37226 = function (elem,k,var_args){
var ks = null;
if (arguments.length > 2) {
var G__37248__i = 0, G__37248__a = new Array(arguments.length -  2);
while (G__37248__i < G__37248__a.length) {G__37248__a[G__37248__i] = arguments[G__37248__i + 2]; ++G__37248__i;}
  ks = new cljs.core.IndexedSeq(G__37248__a,0);
} 
return G__37226__delegate.call(this,elem,k,ks);};
G__37226.cljs$lang$maxFixedArity = 2;
G__37226.cljs$lang$applyTo = (function (arglist__37249){
var elem = cljs.core.first(arglist__37249);
arglist__37249 = cljs.core.next(arglist__37249);
var k = cljs.core.first(arglist__37249);
var ks = cljs.core.rest(arglist__37249);
return G__37226__delegate(elem,k,ks);
});
G__37226.cljs$core$IFn$_invoke$arity$variadic = G__37226__delegate;
return G__37226;
})()
;
dommy$core$remove_attr_BANG_ = function(elem,k,var_args){
var ks = var_args;
switch(arguments.length){
case 2:
return dommy$core$remove_attr_BANG___2.call(this,elem,k);
default:
var G__37250 = null;
if (arguments.length > 2) {
var G__37251__i = 0, G__37251__a = new Array(arguments.length -  2);
while (G__37251__i < G__37251__a.length) {G__37251__a[G__37251__i] = arguments[G__37251__i + 2]; ++G__37251__i;}
G__37250 = new cljs.core.IndexedSeq(G__37251__a,0);
}
return dommy$core$remove_attr_BANG___3.cljs$core$IFn$_invoke$arity$variadic(elem,k, G__37250);
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
var temp__4124__auto___37283 = elem.classList;
if(cljs.core.truth_(temp__4124__auto___37283)){
var class_list_37284 = temp__4124__auto___37283;
var seq__37271_37285 = cljs.core.seq(classes__$1);
var chunk__37272_37286 = null;
var count__37273_37287 = (0);
var i__37274_37288 = (0);
while(true){
if((i__37274_37288 < count__37273_37287)){
var c_37289 = chunk__37272_37286.cljs$core$IIndexed$_nth$arity$2(null,i__37274_37288);
class_list_37284.add(c_37289);

var G__37290 = seq__37271_37285;
var G__37291 = chunk__37272_37286;
var G__37292 = count__37273_37287;
var G__37293 = (i__37274_37288 + (1));
seq__37271_37285 = G__37290;
chunk__37272_37286 = G__37291;
count__37273_37287 = G__37292;
i__37274_37288 = G__37293;
continue;
} else {
var temp__4126__auto___37294 = cljs.core.seq(seq__37271_37285);
if(temp__4126__auto___37294){
var seq__37271_37295__$1 = temp__4126__auto___37294;
if(cljs.core.chunked_seq_QMARK_(seq__37271_37295__$1)){
var c__24968__auto___37296 = cljs.core.chunk_first(seq__37271_37295__$1);
var G__37297 = cljs.core.chunk_rest(seq__37271_37295__$1);
var G__37298 = c__24968__auto___37296;
var G__37299 = cljs.core.count(c__24968__auto___37296);
var G__37300 = (0);
seq__37271_37285 = G__37297;
chunk__37272_37286 = G__37298;
count__37273_37287 = G__37299;
i__37274_37288 = G__37300;
continue;
} else {
var c_37301 = cljs.core.first(seq__37271_37295__$1);
class_list_37284.add(c_37301);

var G__37302 = cljs.core.next(seq__37271_37295__$1);
var G__37303 = null;
var G__37304 = (0);
var G__37305 = (0);
seq__37271_37285 = G__37302;
chunk__37272_37286 = G__37303;
count__37273_37287 = G__37304;
i__37274_37288 = G__37305;
continue;
}
} else {
}
}
break;
}
} else {
var seq__37275_37306 = cljs.core.seq(classes__$1);
var chunk__37276_37307 = null;
var count__37277_37308 = (0);
var i__37278_37309 = (0);
while(true){
if((i__37278_37309 < count__37277_37308)){
var c_37310 = chunk__37276_37307.cljs$core$IIndexed$_nth$arity$2(null,i__37278_37309);
var class_name_37311 = dommy.core.class$(elem);
if(cljs.core.truth_(dommy.utils.class_index(class_name_37311,c_37310))){
} else {
dommy.core.set_class_BANG_(elem,(((class_name_37311 === ""))?c_37310:[cljs.core.str(class_name_37311),cljs.core.str(" "),cljs.core.str(c_37310)].join('')));
}

var G__37312 = seq__37275_37306;
var G__37313 = chunk__37276_37307;
var G__37314 = count__37277_37308;
var G__37315 = (i__37278_37309 + (1));
seq__37275_37306 = G__37312;
chunk__37276_37307 = G__37313;
count__37277_37308 = G__37314;
i__37278_37309 = G__37315;
continue;
} else {
var temp__4126__auto___37316 = cljs.core.seq(seq__37275_37306);
if(temp__4126__auto___37316){
var seq__37275_37317__$1 = temp__4126__auto___37316;
if(cljs.core.chunked_seq_QMARK_(seq__37275_37317__$1)){
var c__24968__auto___37318 = cljs.core.chunk_first(seq__37275_37317__$1);
var G__37319 = cljs.core.chunk_rest(seq__37275_37317__$1);
var G__37320 = c__24968__auto___37318;
var G__37321 = cljs.core.count(c__24968__auto___37318);
var G__37322 = (0);
seq__37275_37306 = G__37319;
chunk__37276_37307 = G__37320;
count__37277_37308 = G__37321;
i__37278_37309 = G__37322;
continue;
} else {
var c_37323 = cljs.core.first(seq__37275_37317__$1);
var class_name_37324 = dommy.core.class$(elem);
if(cljs.core.truth_(dommy.utils.class_index(class_name_37324,c_37323))){
} else {
dommy.core.set_class_BANG_(elem,(((class_name_37324 === ""))?c_37323:[cljs.core.str(class_name_37324),cljs.core.str(" "),cljs.core.str(c_37323)].join('')));
}

var G__37325 = cljs.core.next(seq__37275_37317__$1);
var G__37326 = null;
var G__37327 = (0);
var G__37328 = (0);
seq__37275_37306 = G__37325;
chunk__37276_37307 = G__37326;
count__37277_37308 = G__37327;
i__37278_37309 = G__37328;
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
var G__37329__delegate = function (elem,classes,more_classes){
var seq__37279_37330 = cljs.core.seq(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(more_classes,classes));
var chunk__37280_37331 = null;
var count__37281_37332 = (0);
var i__37282_37333 = (0);
while(true){
if((i__37282_37333 < count__37281_37332)){
var c_37334 = chunk__37280_37331.cljs$core$IIndexed$_nth$arity$2(null,i__37282_37333);
dommy$core$add_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem,c_37334);

var G__37335 = seq__37279_37330;
var G__37336 = chunk__37280_37331;
var G__37337 = count__37281_37332;
var G__37338 = (i__37282_37333 + (1));
seq__37279_37330 = G__37335;
chunk__37280_37331 = G__37336;
count__37281_37332 = G__37337;
i__37282_37333 = G__37338;
continue;
} else {
var temp__4126__auto___37339 = cljs.core.seq(seq__37279_37330);
if(temp__4126__auto___37339){
var seq__37279_37340__$1 = temp__4126__auto___37339;
if(cljs.core.chunked_seq_QMARK_(seq__37279_37340__$1)){
var c__24968__auto___37341 = cljs.core.chunk_first(seq__37279_37340__$1);
var G__37342 = cljs.core.chunk_rest(seq__37279_37340__$1);
var G__37343 = c__24968__auto___37341;
var G__37344 = cljs.core.count(c__24968__auto___37341);
var G__37345 = (0);
seq__37279_37330 = G__37342;
chunk__37280_37331 = G__37343;
count__37281_37332 = G__37344;
i__37282_37333 = G__37345;
continue;
} else {
var c_37346 = cljs.core.first(seq__37279_37340__$1);
dommy$core$add_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem,c_37346);

var G__37347 = cljs.core.next(seq__37279_37340__$1);
var G__37348 = null;
var G__37349 = (0);
var G__37350 = (0);
seq__37279_37330 = G__37347;
chunk__37280_37331 = G__37348;
count__37281_37332 = G__37349;
i__37282_37333 = G__37350;
continue;
}
} else {
}
}
break;
}

return elem;
};
var G__37329 = function (elem,classes,var_args){
var more_classes = null;
if (arguments.length > 2) {
var G__37351__i = 0, G__37351__a = new Array(arguments.length -  2);
while (G__37351__i < G__37351__a.length) {G__37351__a[G__37351__i] = arguments[G__37351__i + 2]; ++G__37351__i;}
  more_classes = new cljs.core.IndexedSeq(G__37351__a,0);
} 
return G__37329__delegate.call(this,elem,classes,more_classes);};
G__37329.cljs$lang$maxFixedArity = 2;
G__37329.cljs$lang$applyTo = (function (arglist__37352){
var elem = cljs.core.first(arglist__37352);
arglist__37352 = cljs.core.next(arglist__37352);
var classes = cljs.core.first(arglist__37352);
var more_classes = cljs.core.rest(arglist__37352);
return G__37329__delegate(elem,classes,more_classes);
});
G__37329.cljs$core$IFn$_invoke$arity$variadic = G__37329__delegate;
return G__37329;
})()
;
dommy$core$add_class_BANG_ = function(elem,classes,var_args){
var more_classes = var_args;
switch(arguments.length){
case 2:
return dommy$core$add_class_BANG___2.call(this,elem,classes);
default:
var G__37353 = null;
if (arguments.length > 2) {
var G__37354__i = 0, G__37354__a = new Array(arguments.length -  2);
while (G__37354__i < G__37354__a.length) {G__37354__a[G__37354__i] = arguments[G__37354__i + 2]; ++G__37354__i;}
G__37353 = new cljs.core.IndexedSeq(G__37354__a,0);
}
return dommy$core$add_class_BANG___3.cljs$core$IFn$_invoke$arity$variadic(elem,classes, G__37353);
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
var temp__4124__auto___37367 = elem.classList;
if(cljs.core.truth_(temp__4124__auto___37367)){
var class_list_37368 = temp__4124__auto___37367;
class_list_37368.remove(c__$1);
} else {
var class_name_37369 = dommy.core.class$(elem);
var new_class_name_37370 = dommy.utils.remove_class_str(class_name_37369,c__$1);
if((class_name_37369 === new_class_name_37370)){
} else {
dommy.core.set_class_BANG_(elem,new_class_name_37370);
}
}

return elem;
});
var dommy$core$remove_class_BANG___3 = (function() { 
var G__37371__delegate = function (elem,class$,classes){
var seq__37363 = cljs.core.seq(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(classes,class$));
var chunk__37364 = null;
var count__37365 = (0);
var i__37366 = (0);
while(true){
if((i__37366 < count__37365)){
var c = chunk__37364.cljs$core$IIndexed$_nth$arity$2(null,i__37366);
dommy$core$remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem,c);

var G__37372 = seq__37363;
var G__37373 = chunk__37364;
var G__37374 = count__37365;
var G__37375 = (i__37366 + (1));
seq__37363 = G__37372;
chunk__37364 = G__37373;
count__37365 = G__37374;
i__37366 = G__37375;
continue;
} else {
var temp__4126__auto__ = cljs.core.seq(seq__37363);
if(temp__4126__auto__){
var seq__37363__$1 = temp__4126__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__37363__$1)){
var c__24968__auto__ = cljs.core.chunk_first(seq__37363__$1);
var G__37376 = cljs.core.chunk_rest(seq__37363__$1);
var G__37377 = c__24968__auto__;
var G__37378 = cljs.core.count(c__24968__auto__);
var G__37379 = (0);
seq__37363 = G__37376;
chunk__37364 = G__37377;
count__37365 = G__37378;
i__37366 = G__37379;
continue;
} else {
var c = cljs.core.first(seq__37363__$1);
dommy$core$remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem,c);

var G__37380 = cljs.core.next(seq__37363__$1);
var G__37381 = null;
var G__37382 = (0);
var G__37383 = (0);
seq__37363 = G__37380;
chunk__37364 = G__37381;
count__37365 = G__37382;
i__37366 = G__37383;
continue;
}
} else {
return null;
}
}
break;
}
};
var G__37371 = function (elem,class$,var_args){
var classes = null;
if (arguments.length > 2) {
var G__37384__i = 0, G__37384__a = new Array(arguments.length -  2);
while (G__37384__i < G__37384__a.length) {G__37384__a[G__37384__i] = arguments[G__37384__i + 2]; ++G__37384__i;}
  classes = new cljs.core.IndexedSeq(G__37384__a,0);
} 
return G__37371__delegate.call(this,elem,class$,classes);};
G__37371.cljs$lang$maxFixedArity = 2;
G__37371.cljs$lang$applyTo = (function (arglist__37385){
var elem = cljs.core.first(arglist__37385);
arglist__37385 = cljs.core.next(arglist__37385);
var class$ = cljs.core.first(arglist__37385);
var classes = cljs.core.rest(arglist__37385);
return G__37371__delegate(elem,class$,classes);
});
G__37371.cljs$core$IFn$_invoke$arity$variadic = G__37371__delegate;
return G__37371;
})()
;
dommy$core$remove_class_BANG_ = function(elem,class$,var_args){
var classes = var_args;
switch(arguments.length){
case 2:
return dommy$core$remove_class_BANG___2.call(this,elem,class$);
default:
var G__37386 = null;
if (arguments.length > 2) {
var G__37387__i = 0, G__37387__a = new Array(arguments.length -  2);
while (G__37387__i < G__37387__a.length) {G__37387__a[G__37387__i] = arguments[G__37387__i + 2]; ++G__37387__i;}
G__37386 = new cljs.core.IndexedSeq(G__37387__a,0);
}
return dommy$core$remove_class_BANG___3.cljs$core$IFn$_invoke$arity$variadic(elem,class$, G__37386);
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
var temp__4124__auto___37391 = elem.classList;
if(cljs.core.truth_(temp__4124__auto___37391)){
var class_list_37392 = temp__4124__auto___37391;
class_list_37392.toggle(c__$1);
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
var G__37404 = parent;
G__37404.appendChild(child);

return G__37404;
});
var dommy$core$append_BANG___3 = (function() { 
var G__37409__delegate = function (parent,child,more_children){
var seq__37405_37410 = cljs.core.seq(cljs.core.cons(child,more_children));
var chunk__37406_37411 = null;
var count__37407_37412 = (0);
var i__37408_37413 = (0);
while(true){
if((i__37408_37413 < count__37407_37412)){
var c_37414 = chunk__37406_37411.cljs$core$IIndexed$_nth$arity$2(null,i__37408_37413);
dommy$core$append_BANG_.cljs$core$IFn$_invoke$arity$2(parent,c_37414);

var G__37415 = seq__37405_37410;
var G__37416 = chunk__37406_37411;
var G__37417 = count__37407_37412;
var G__37418 = (i__37408_37413 + (1));
seq__37405_37410 = G__37415;
chunk__37406_37411 = G__37416;
count__37407_37412 = G__37417;
i__37408_37413 = G__37418;
continue;
} else {
var temp__4126__auto___37419 = cljs.core.seq(seq__37405_37410);
if(temp__4126__auto___37419){
var seq__37405_37420__$1 = temp__4126__auto___37419;
if(cljs.core.chunked_seq_QMARK_(seq__37405_37420__$1)){
var c__24968__auto___37421 = cljs.core.chunk_first(seq__37405_37420__$1);
var G__37422 = cljs.core.chunk_rest(seq__37405_37420__$1);
var G__37423 = c__24968__auto___37421;
var G__37424 = cljs.core.count(c__24968__auto___37421);
var G__37425 = (0);
seq__37405_37410 = G__37422;
chunk__37406_37411 = G__37423;
count__37407_37412 = G__37424;
i__37408_37413 = G__37425;
continue;
} else {
var c_37426 = cljs.core.first(seq__37405_37420__$1);
dommy$core$append_BANG_.cljs$core$IFn$_invoke$arity$2(parent,c_37426);

var G__37427 = cljs.core.next(seq__37405_37420__$1);
var G__37428 = null;
var G__37429 = (0);
var G__37430 = (0);
seq__37405_37410 = G__37427;
chunk__37406_37411 = G__37428;
count__37407_37412 = G__37429;
i__37408_37413 = G__37430;
continue;
}
} else {
}
}
break;
}

return parent;
};
var G__37409 = function (parent,child,var_args){
var more_children = null;
if (arguments.length > 2) {
var G__37431__i = 0, G__37431__a = new Array(arguments.length -  2);
while (G__37431__i < G__37431__a.length) {G__37431__a[G__37431__i] = arguments[G__37431__i + 2]; ++G__37431__i;}
  more_children = new cljs.core.IndexedSeq(G__37431__a,0);
} 
return G__37409__delegate.call(this,parent,child,more_children);};
G__37409.cljs$lang$maxFixedArity = 2;
G__37409.cljs$lang$applyTo = (function (arglist__37432){
var parent = cljs.core.first(arglist__37432);
arglist__37432 = cljs.core.next(arglist__37432);
var child = cljs.core.first(arglist__37432);
var more_children = cljs.core.rest(arglist__37432);
return G__37409__delegate(parent,child,more_children);
});
G__37409.cljs$core$IFn$_invoke$arity$variadic = G__37409__delegate;
return G__37409;
})()
;
dommy$core$append_BANG_ = function(parent,child,var_args){
var more_children = var_args;
switch(arguments.length){
case 2:
return dommy$core$append_BANG___2.call(this,parent,child);
default:
var G__37433 = null;
if (arguments.length > 2) {
var G__37434__i = 0, G__37434__a = new Array(arguments.length -  2);
while (G__37434__i < G__37434__a.length) {G__37434__a[G__37434__i] = arguments[G__37434__i + 2]; ++G__37434__i;}
G__37433 = new cljs.core.IndexedSeq(G__37434__a,0);
}
return dommy$core$append_BANG___3.cljs$core$IFn$_invoke$arity$variadic(parent,child, G__37433);
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
var G__37444 = parent;
G__37444.insertBefore(child,parent.firstChild);

return G__37444;
});
var dommy$core$prepend_BANG___3 = (function() { 
var G__37449__delegate = function (parent,child,more_children){
var seq__37445_37450 = cljs.core.seq(cljs.core.cons(child,more_children));
var chunk__37446_37451 = null;
var count__37447_37452 = (0);
var i__37448_37453 = (0);
while(true){
if((i__37448_37453 < count__37447_37452)){
var c_37454 = chunk__37446_37451.cljs$core$IIndexed$_nth$arity$2(null,i__37448_37453);
dommy$core$prepend_BANG_.cljs$core$IFn$_invoke$arity$2(parent,c_37454);

var G__37455 = seq__37445_37450;
var G__37456 = chunk__37446_37451;
var G__37457 = count__37447_37452;
var G__37458 = (i__37448_37453 + (1));
seq__37445_37450 = G__37455;
chunk__37446_37451 = G__37456;
count__37447_37452 = G__37457;
i__37448_37453 = G__37458;
continue;
} else {
var temp__4126__auto___37459 = cljs.core.seq(seq__37445_37450);
if(temp__4126__auto___37459){
var seq__37445_37460__$1 = temp__4126__auto___37459;
if(cljs.core.chunked_seq_QMARK_(seq__37445_37460__$1)){
var c__24968__auto___37461 = cljs.core.chunk_first(seq__37445_37460__$1);
var G__37462 = cljs.core.chunk_rest(seq__37445_37460__$1);
var G__37463 = c__24968__auto___37461;
var G__37464 = cljs.core.count(c__24968__auto___37461);
var G__37465 = (0);
seq__37445_37450 = G__37462;
chunk__37446_37451 = G__37463;
count__37447_37452 = G__37464;
i__37448_37453 = G__37465;
continue;
} else {
var c_37466 = cljs.core.first(seq__37445_37460__$1);
dommy$core$prepend_BANG_.cljs$core$IFn$_invoke$arity$2(parent,c_37466);

var G__37467 = cljs.core.next(seq__37445_37460__$1);
var G__37468 = null;
var G__37469 = (0);
var G__37470 = (0);
seq__37445_37450 = G__37467;
chunk__37446_37451 = G__37468;
count__37447_37452 = G__37469;
i__37448_37453 = G__37470;
continue;
}
} else {
}
}
break;
}

return parent;
};
var G__37449 = function (parent,child,var_args){
var more_children = null;
if (arguments.length > 2) {
var G__37471__i = 0, G__37471__a = new Array(arguments.length -  2);
while (G__37471__i < G__37471__a.length) {G__37471__a[G__37471__i] = arguments[G__37471__i + 2]; ++G__37471__i;}
  more_children = new cljs.core.IndexedSeq(G__37471__a,0);
} 
return G__37449__delegate.call(this,parent,child,more_children);};
G__37449.cljs$lang$maxFixedArity = 2;
G__37449.cljs$lang$applyTo = (function (arglist__37472){
var parent = cljs.core.first(arglist__37472);
arglist__37472 = cljs.core.next(arglist__37472);
var child = cljs.core.first(arglist__37472);
var more_children = cljs.core.rest(arglist__37472);
return G__37449__delegate(parent,child,more_children);
});
G__37449.cljs$core$IFn$_invoke$arity$variadic = G__37449__delegate;
return G__37449;
})()
;
dommy$core$prepend_BANG_ = function(parent,child,var_args){
var more_children = var_args;
switch(arguments.length){
case 2:
return dommy$core$prepend_BANG___2.call(this,parent,child);
default:
var G__37473 = null;
if (arguments.length > 2) {
var G__37474__i = 0, G__37474__a = new Array(arguments.length -  2);
while (G__37474__i < G__37474__a.length) {G__37474__a[G__37474__i] = arguments[G__37474__i + 2]; ++G__37474__i;}
G__37473 = new cljs.core.IndexedSeq(G__37474__a,0);
}
return dommy$core$prepend_BANG___3.cljs$core$IFn$_invoke$arity$variadic(parent,child, G__37473);
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
var temp__4124__auto___37475 = other.nextSibling;
if(cljs.core.truth_(temp__4124__auto___37475)){
var next_37476 = temp__4124__auto___37475;
dommy.core.insert_before_BANG_(elem,next_37476);
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
var G__37480 = p;
G__37480.removeChild(elem);

return G__37480;
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
dommy.core.special_listener_makers = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__37481){
var vec__37482 = p__37481;
var special_mouse_event = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37482,(0),null);
var real_mouse_event = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37482,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [special_mouse_event,new cljs.core.PersistentArrayMap.fromArray([real_mouse_event,((function (vec__37482,special_mouse_event,real_mouse_event){
return (function (f){
return ((function (vec__37482,special_mouse_event,real_mouse_event){
return (function (event){
var related_target = event.relatedTarget;
var listener_target = (function (){var or__24183__auto__ = event.selectedTarget;
if(cljs.core.truth_(or__24183__auto__)){
return or__24183__auto__;
} else {
return event.currentTarget;
}
})();
if(cljs.core.truth_((function (){var and__24171__auto__ = related_target;
if(cljs.core.truth_(and__24171__auto__)){
return dommy.core.descendant_QMARK_(related_target,listener_target);
} else {
return and__24171__auto__;
}
})())){
return null;
} else {
var G__37483 = event;
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__37483) : f.call(null,G__37483));
}
});
;})(vec__37482,special_mouse_event,real_mouse_event))
});})(vec__37482,special_mouse_event,real_mouse_event))
], true, false)], null);
}),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$mouseenter,cljs.core.constant$keyword$mouseover,cljs.core.constant$keyword$mouseleave,cljs.core.constant$keyword$mouseout], null)));
/**
 * fires f if event.target is found with `selector`
 */
dommy.core.live_listener = (function dommy$core$live_listener(elem,selector,f){
return (function (event){
var selected_target = dommy.core.closest.cljs$core$IFn$_invoke$arity$3(elem,event.target,selector);
if(cljs.core.truth_((function (){var and__24171__auto__ = selected_target;
if(cljs.core.truth_(and__24171__auto__)){
return cljs.core.not(dommy.core.attr(selected_target,cljs.core.constant$keyword$disabled));
} else {
return and__24171__auto__;
}
})())){
event.selectedTarget = selected_target;

var G__37485 = event;
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__37485) : f.call(null,G__37485));
} else {
return null;
}
});
});
/**
 * Returns a nested map of event listeners on `elem`
 */
dommy.core.event_listeners = (function dommy$core$event_listeners(elem){
var or__24183__auto__ = elem.dommyEventListeners;
if(cljs.core.truth_(or__24183__auto__)){
return or__24183__auto__;
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
var G__37486__i = 0, G__37486__a = new Array(arguments.length -  2);
while (G__37486__i < G__37486__a.length) {G__37486__a[G__37486__i] = arguments[G__37486__i + 2]; ++G__37486__i;}
  args = new cljs.core.IndexedSeq(G__37486__a,0);
} 
return dommy$core$update_event_listeners_BANG___delegate.call(this,elem,f,args);};
dommy$core$update_event_listeners_BANG_.cljs$lang$maxFixedArity = 2;
dommy$core$update_event_listeners_BANG_.cljs$lang$applyTo = (function (arglist__37487){
var elem = cljs.core.first(arglist__37487);
arglist__37487 = cljs.core.next(arglist__37487);
var f = cljs.core.first(arglist__37487);
var args = cljs.core.rest(arglist__37487);
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

var vec__37515_37542 = dommy.core.elem_and_selector(elem_sel);
var elem_37543 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37515_37542,(0),null);
var selector_37544 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37515_37542,(1),null);
var seq__37516_37545 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),type_fs));
var chunk__37523_37546 = null;
var count__37524_37547 = (0);
var i__37525_37548 = (0);
while(true){
if((i__37525_37548 < count__37524_37547)){
var vec__37532_37549 = chunk__37523_37546.cljs$core$IIndexed$_nth$arity$2(null,i__37525_37548);
var orig_type_37550 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37532_37549,(0),null);
var f_37551 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37532_37549,(1),null);
var seq__37526_37552 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$3(dommy.core.special_listener_makers,orig_type_37550,new cljs.core.PersistentArrayMap.fromArray([orig_type_37550,cljs.core.identity], true, false)));
var chunk__37528_37553 = null;
var count__37529_37554 = (0);
var i__37530_37555 = (0);
while(true){
if((i__37530_37555 < count__37529_37554)){
var vec__37533_37556 = chunk__37528_37553.cljs$core$IIndexed$_nth$arity$2(null,i__37530_37555);
var actual_type_37557 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37533_37556,(0),null);
var factory_37558 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37533_37556,(1),null);
var canonical_f_37559 = (cljs.core.truth_(selector_37544)?cljs.core.partial.cljs$core$IFn$_invoke$arity$3(dommy.core.live_listener,elem_37543,selector_37544):cljs.core.identity).call(null,(function (){var G__37534 = f_37551;
return (factory_37558.cljs$core$IFn$_invoke$arity$1 ? factory_37558.cljs$core$IFn$_invoke$arity$1(G__37534) : factory_37558.call(null,G__37534));
})());
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37543,cljs.core.assoc_in,cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37544,actual_type_37557,f_37551], null),canonical_f_37559], 0));

if(cljs.core.truth_(elem_37543.addEventListener)){
elem_37543.addEventListener(cljs.core.name(actual_type_37557),canonical_f_37559);
} else {
elem_37543.attachEvent(cljs.core.name(actual_type_37557),canonical_f_37559);
}

var G__37560 = seq__37526_37552;
var G__37561 = chunk__37528_37553;
var G__37562 = count__37529_37554;
var G__37563 = (i__37530_37555 + (1));
seq__37526_37552 = G__37560;
chunk__37528_37553 = G__37561;
count__37529_37554 = G__37562;
i__37530_37555 = G__37563;
continue;
} else {
var temp__4126__auto___37564 = cljs.core.seq(seq__37526_37552);
if(temp__4126__auto___37564){
var seq__37526_37565__$1 = temp__4126__auto___37564;
if(cljs.core.chunked_seq_QMARK_(seq__37526_37565__$1)){
var c__24968__auto___37566 = cljs.core.chunk_first(seq__37526_37565__$1);
var G__37567 = cljs.core.chunk_rest(seq__37526_37565__$1);
var G__37568 = c__24968__auto___37566;
var G__37569 = cljs.core.count(c__24968__auto___37566);
var G__37570 = (0);
seq__37526_37552 = G__37567;
chunk__37528_37553 = G__37568;
count__37529_37554 = G__37569;
i__37530_37555 = G__37570;
continue;
} else {
var vec__37535_37571 = cljs.core.first(seq__37526_37565__$1);
var actual_type_37572 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37535_37571,(0),null);
var factory_37573 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37535_37571,(1),null);
var canonical_f_37574 = (cljs.core.truth_(selector_37544)?cljs.core.partial.cljs$core$IFn$_invoke$arity$3(dommy.core.live_listener,elem_37543,selector_37544):cljs.core.identity).call(null,(function (){var G__37536 = f_37551;
return (factory_37573.cljs$core$IFn$_invoke$arity$1 ? factory_37573.cljs$core$IFn$_invoke$arity$1(G__37536) : factory_37573.call(null,G__37536));
})());
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37543,cljs.core.assoc_in,cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37544,actual_type_37572,f_37551], null),canonical_f_37574], 0));

if(cljs.core.truth_(elem_37543.addEventListener)){
elem_37543.addEventListener(cljs.core.name(actual_type_37572),canonical_f_37574);
} else {
elem_37543.attachEvent(cljs.core.name(actual_type_37572),canonical_f_37574);
}

var G__37575 = cljs.core.next(seq__37526_37565__$1);
var G__37576 = null;
var G__37577 = (0);
var G__37578 = (0);
seq__37526_37552 = G__37575;
chunk__37528_37553 = G__37576;
count__37529_37554 = G__37577;
i__37530_37555 = G__37578;
continue;
}
} else {
}
}
break;
}

var G__37579 = seq__37516_37545;
var G__37580 = chunk__37523_37546;
var G__37581 = count__37524_37547;
var G__37582 = (i__37525_37548 + (1));
seq__37516_37545 = G__37579;
chunk__37523_37546 = G__37580;
count__37524_37547 = G__37581;
i__37525_37548 = G__37582;
continue;
} else {
var temp__4126__auto___37583 = cljs.core.seq(seq__37516_37545);
if(temp__4126__auto___37583){
var seq__37516_37584__$1 = temp__4126__auto___37583;
if(cljs.core.chunked_seq_QMARK_(seq__37516_37584__$1)){
var c__24968__auto___37585 = cljs.core.chunk_first(seq__37516_37584__$1);
var G__37586 = cljs.core.chunk_rest(seq__37516_37584__$1);
var G__37587 = c__24968__auto___37585;
var G__37588 = cljs.core.count(c__24968__auto___37585);
var G__37589 = (0);
seq__37516_37545 = G__37586;
chunk__37523_37546 = G__37587;
count__37524_37547 = G__37588;
i__37525_37548 = G__37589;
continue;
} else {
var vec__37537_37590 = cljs.core.first(seq__37516_37584__$1);
var orig_type_37591 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37537_37590,(0),null);
var f_37592 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37537_37590,(1),null);
var seq__37517_37593 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$3(dommy.core.special_listener_makers,orig_type_37591,new cljs.core.PersistentArrayMap.fromArray([orig_type_37591,cljs.core.identity], true, false)));
var chunk__37519_37594 = null;
var count__37520_37595 = (0);
var i__37521_37596 = (0);
while(true){
if((i__37521_37596 < count__37520_37595)){
var vec__37538_37597 = chunk__37519_37594.cljs$core$IIndexed$_nth$arity$2(null,i__37521_37596);
var actual_type_37598 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37538_37597,(0),null);
var factory_37599 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37538_37597,(1),null);
var canonical_f_37600 = (cljs.core.truth_(selector_37544)?cljs.core.partial.cljs$core$IFn$_invoke$arity$3(dommy.core.live_listener,elem_37543,selector_37544):cljs.core.identity).call(null,(function (){var G__37539 = f_37592;
return (factory_37599.cljs$core$IFn$_invoke$arity$1 ? factory_37599.cljs$core$IFn$_invoke$arity$1(G__37539) : factory_37599.call(null,G__37539));
})());
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37543,cljs.core.assoc_in,cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37544,actual_type_37598,f_37592], null),canonical_f_37600], 0));

if(cljs.core.truth_(elem_37543.addEventListener)){
elem_37543.addEventListener(cljs.core.name(actual_type_37598),canonical_f_37600);
} else {
elem_37543.attachEvent(cljs.core.name(actual_type_37598),canonical_f_37600);
}

var G__37601 = seq__37517_37593;
var G__37602 = chunk__37519_37594;
var G__37603 = count__37520_37595;
var G__37604 = (i__37521_37596 + (1));
seq__37517_37593 = G__37601;
chunk__37519_37594 = G__37602;
count__37520_37595 = G__37603;
i__37521_37596 = G__37604;
continue;
} else {
var temp__4126__auto___37605__$1 = cljs.core.seq(seq__37517_37593);
if(temp__4126__auto___37605__$1){
var seq__37517_37606__$1 = temp__4126__auto___37605__$1;
if(cljs.core.chunked_seq_QMARK_(seq__37517_37606__$1)){
var c__24968__auto___37607 = cljs.core.chunk_first(seq__37517_37606__$1);
var G__37608 = cljs.core.chunk_rest(seq__37517_37606__$1);
var G__37609 = c__24968__auto___37607;
var G__37610 = cljs.core.count(c__24968__auto___37607);
var G__37611 = (0);
seq__37517_37593 = G__37608;
chunk__37519_37594 = G__37609;
count__37520_37595 = G__37610;
i__37521_37596 = G__37611;
continue;
} else {
var vec__37540_37612 = cljs.core.first(seq__37517_37606__$1);
var actual_type_37613 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37540_37612,(0),null);
var factory_37614 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37540_37612,(1),null);
var canonical_f_37615 = (cljs.core.truth_(selector_37544)?cljs.core.partial.cljs$core$IFn$_invoke$arity$3(dommy.core.live_listener,elem_37543,selector_37544):cljs.core.identity).call(null,(function (){var G__37541 = f_37592;
return (factory_37614.cljs$core$IFn$_invoke$arity$1 ? factory_37614.cljs$core$IFn$_invoke$arity$1(G__37541) : factory_37614.call(null,G__37541));
})());
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37543,cljs.core.assoc_in,cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37544,actual_type_37613,f_37592], null),canonical_f_37615], 0));

if(cljs.core.truth_(elem_37543.addEventListener)){
elem_37543.addEventListener(cljs.core.name(actual_type_37613),canonical_f_37615);
} else {
elem_37543.attachEvent(cljs.core.name(actual_type_37613),canonical_f_37615);
}

var G__37616 = cljs.core.next(seq__37517_37606__$1);
var G__37617 = null;
var G__37618 = (0);
var G__37619 = (0);
seq__37517_37593 = G__37616;
chunk__37519_37594 = G__37617;
count__37520_37595 = G__37618;
i__37521_37596 = G__37619;
continue;
}
} else {
}
}
break;
}

var G__37620 = cljs.core.next(seq__37516_37584__$1);
var G__37621 = null;
var G__37622 = (0);
var G__37623 = (0);
seq__37516_37545 = G__37620;
chunk__37523_37546 = G__37621;
count__37524_37547 = G__37622;
i__37525_37548 = G__37623;
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
var G__37624__i = 0, G__37624__a = new Array(arguments.length -  1);
while (G__37624__i < G__37624__a.length) {G__37624__a[G__37624__i] = arguments[G__37624__i + 1]; ++G__37624__i;}
  type_fs = new cljs.core.IndexedSeq(G__37624__a,0);
} 
return dommy$core$listen_BANG___delegate.call(this,elem_sel,type_fs);};
dommy$core$listen_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$listen_BANG_.cljs$lang$applyTo = (function (arglist__37625){
var elem_sel = cljs.core.first(arglist__37625);
var type_fs = cljs.core.rest(arglist__37625);
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

var vec__37649_37672 = dommy.core.elem_and_selector(elem_sel);
var elem_37673 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37649_37672,(0),null);
var selector_37674 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37649_37672,(1),null);
var seq__37650_37675 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),type_fs));
var chunk__37657_37676 = null;
var count__37658_37677 = (0);
var i__37659_37678 = (0);
while(true){
if((i__37659_37678 < count__37658_37677)){
var vec__37666_37679 = chunk__37657_37676.cljs$core$IIndexed$_nth$arity$2(null,i__37659_37678);
var orig_type_37680 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37666_37679,(0),null);
var f_37681 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37666_37679,(1),null);
var seq__37660_37682 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$3(dommy.core.special_listener_makers,orig_type_37680,new cljs.core.PersistentArrayMap.fromArray([orig_type_37680,cljs.core.identity], true, false)));
var chunk__37662_37683 = null;
var count__37663_37684 = (0);
var i__37664_37685 = (0);
while(true){
if((i__37664_37685 < count__37663_37684)){
var vec__37667_37686 = chunk__37662_37683.cljs$core$IIndexed$_nth$arity$2(null,i__37664_37685);
var actual_type_37687 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37667_37686,(0),null);
var __37688 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37667_37686,(1),null);
var keys_37689 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37674,actual_type_37687,f_37681], null);
var canonical_f_37690 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(dommy.core.event_listeners(elem_37673),keys_37689);
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37673,dommy.utils.dissoc_in,cljs.core.array_seq([keys_37689], 0));

if(cljs.core.truth_(elem_37673.removeEventListener)){
elem_37673.removeEventListener(cljs.core.name(actual_type_37687),canonical_f_37690);
} else {
elem_37673.detachEvent(cljs.core.name(actual_type_37687),canonical_f_37690);
}

var G__37691 = seq__37660_37682;
var G__37692 = chunk__37662_37683;
var G__37693 = count__37663_37684;
var G__37694 = (i__37664_37685 + (1));
seq__37660_37682 = G__37691;
chunk__37662_37683 = G__37692;
count__37663_37684 = G__37693;
i__37664_37685 = G__37694;
continue;
} else {
var temp__4126__auto___37695 = cljs.core.seq(seq__37660_37682);
if(temp__4126__auto___37695){
var seq__37660_37696__$1 = temp__4126__auto___37695;
if(cljs.core.chunked_seq_QMARK_(seq__37660_37696__$1)){
var c__24968__auto___37697 = cljs.core.chunk_first(seq__37660_37696__$1);
var G__37698 = cljs.core.chunk_rest(seq__37660_37696__$1);
var G__37699 = c__24968__auto___37697;
var G__37700 = cljs.core.count(c__24968__auto___37697);
var G__37701 = (0);
seq__37660_37682 = G__37698;
chunk__37662_37683 = G__37699;
count__37663_37684 = G__37700;
i__37664_37685 = G__37701;
continue;
} else {
var vec__37668_37702 = cljs.core.first(seq__37660_37696__$1);
var actual_type_37703 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37668_37702,(0),null);
var __37704 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37668_37702,(1),null);
var keys_37705 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37674,actual_type_37703,f_37681], null);
var canonical_f_37706 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(dommy.core.event_listeners(elem_37673),keys_37705);
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37673,dommy.utils.dissoc_in,cljs.core.array_seq([keys_37705], 0));

if(cljs.core.truth_(elem_37673.removeEventListener)){
elem_37673.removeEventListener(cljs.core.name(actual_type_37703),canonical_f_37706);
} else {
elem_37673.detachEvent(cljs.core.name(actual_type_37703),canonical_f_37706);
}

var G__37707 = cljs.core.next(seq__37660_37696__$1);
var G__37708 = null;
var G__37709 = (0);
var G__37710 = (0);
seq__37660_37682 = G__37707;
chunk__37662_37683 = G__37708;
count__37663_37684 = G__37709;
i__37664_37685 = G__37710;
continue;
}
} else {
}
}
break;
}

var G__37711 = seq__37650_37675;
var G__37712 = chunk__37657_37676;
var G__37713 = count__37658_37677;
var G__37714 = (i__37659_37678 + (1));
seq__37650_37675 = G__37711;
chunk__37657_37676 = G__37712;
count__37658_37677 = G__37713;
i__37659_37678 = G__37714;
continue;
} else {
var temp__4126__auto___37715 = cljs.core.seq(seq__37650_37675);
if(temp__4126__auto___37715){
var seq__37650_37716__$1 = temp__4126__auto___37715;
if(cljs.core.chunked_seq_QMARK_(seq__37650_37716__$1)){
var c__24968__auto___37717 = cljs.core.chunk_first(seq__37650_37716__$1);
var G__37718 = cljs.core.chunk_rest(seq__37650_37716__$1);
var G__37719 = c__24968__auto___37717;
var G__37720 = cljs.core.count(c__24968__auto___37717);
var G__37721 = (0);
seq__37650_37675 = G__37718;
chunk__37657_37676 = G__37719;
count__37658_37677 = G__37720;
i__37659_37678 = G__37721;
continue;
} else {
var vec__37669_37722 = cljs.core.first(seq__37650_37716__$1);
var orig_type_37723 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37669_37722,(0),null);
var f_37724 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37669_37722,(1),null);
var seq__37651_37725 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$3(dommy.core.special_listener_makers,orig_type_37723,new cljs.core.PersistentArrayMap.fromArray([orig_type_37723,cljs.core.identity], true, false)));
var chunk__37653_37726 = null;
var count__37654_37727 = (0);
var i__37655_37728 = (0);
while(true){
if((i__37655_37728 < count__37654_37727)){
var vec__37670_37729 = chunk__37653_37726.cljs$core$IIndexed$_nth$arity$2(null,i__37655_37728);
var actual_type_37730 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37670_37729,(0),null);
var __37731 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37670_37729,(1),null);
var keys_37732 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37674,actual_type_37730,f_37724], null);
var canonical_f_37733 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(dommy.core.event_listeners(elem_37673),keys_37732);
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37673,dommy.utils.dissoc_in,cljs.core.array_seq([keys_37732], 0));

if(cljs.core.truth_(elem_37673.removeEventListener)){
elem_37673.removeEventListener(cljs.core.name(actual_type_37730),canonical_f_37733);
} else {
elem_37673.detachEvent(cljs.core.name(actual_type_37730),canonical_f_37733);
}

var G__37734 = seq__37651_37725;
var G__37735 = chunk__37653_37726;
var G__37736 = count__37654_37727;
var G__37737 = (i__37655_37728 + (1));
seq__37651_37725 = G__37734;
chunk__37653_37726 = G__37735;
count__37654_37727 = G__37736;
i__37655_37728 = G__37737;
continue;
} else {
var temp__4126__auto___37738__$1 = cljs.core.seq(seq__37651_37725);
if(temp__4126__auto___37738__$1){
var seq__37651_37739__$1 = temp__4126__auto___37738__$1;
if(cljs.core.chunked_seq_QMARK_(seq__37651_37739__$1)){
var c__24968__auto___37740 = cljs.core.chunk_first(seq__37651_37739__$1);
var G__37741 = cljs.core.chunk_rest(seq__37651_37739__$1);
var G__37742 = c__24968__auto___37740;
var G__37743 = cljs.core.count(c__24968__auto___37740);
var G__37744 = (0);
seq__37651_37725 = G__37741;
chunk__37653_37726 = G__37742;
count__37654_37727 = G__37743;
i__37655_37728 = G__37744;
continue;
} else {
var vec__37671_37745 = cljs.core.first(seq__37651_37739__$1);
var actual_type_37746 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37671_37745,(0),null);
var __37747 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37671_37745,(1),null);
var keys_37748 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37674,actual_type_37746,f_37724], null);
var canonical_f_37749 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(dommy.core.event_listeners(elem_37673),keys_37748);
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37673,dommy.utils.dissoc_in,cljs.core.array_seq([keys_37748], 0));

if(cljs.core.truth_(elem_37673.removeEventListener)){
elem_37673.removeEventListener(cljs.core.name(actual_type_37746),canonical_f_37749);
} else {
elem_37673.detachEvent(cljs.core.name(actual_type_37746),canonical_f_37749);
}

var G__37750 = cljs.core.next(seq__37651_37739__$1);
var G__37751 = null;
var G__37752 = (0);
var G__37753 = (0);
seq__37651_37725 = G__37750;
chunk__37653_37726 = G__37751;
count__37654_37727 = G__37752;
i__37655_37728 = G__37753;
continue;
}
} else {
}
}
break;
}

var G__37754 = cljs.core.next(seq__37650_37716__$1);
var G__37755 = null;
var G__37756 = (0);
var G__37757 = (0);
seq__37650_37675 = G__37754;
chunk__37657_37676 = G__37755;
count__37658_37677 = G__37756;
i__37659_37678 = G__37757;
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
var G__37758__i = 0, G__37758__a = new Array(arguments.length -  1);
while (G__37758__i < G__37758__a.length) {G__37758__a[G__37758__i] = arguments[G__37758__i + 1]; ++G__37758__i;}
  type_fs = new cljs.core.IndexedSeq(G__37758__a,0);
} 
return dommy$core$unlisten_BANG___delegate.call(this,elem_sel,type_fs);};
dommy$core$unlisten_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$unlisten_BANG_.cljs$lang$applyTo = (function (arglist__37759){
var elem_sel = cljs.core.first(arglist__37759);
var type_fs = cljs.core.rest(arglist__37759);
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

var vec__37771_37782 = dommy.core.elem_and_selector(elem_sel);
var elem_37783 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37771_37782,(0),null);
var selector_37784 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37771_37782,(1),null);
var seq__37772_37785 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),type_fs));
var chunk__37773_37786 = null;
var count__37774_37787 = (0);
var i__37775_37788 = (0);
while(true){
if((i__37775_37788 < count__37774_37787)){
var vec__37776_37789 = chunk__37773_37786.cljs$core$IIndexed$_nth$arity$2(null,i__37775_37788);
var type_37790 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37776_37789,(0),null);
var f_37791 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37776_37789,(1),null);
dommy.core.listen_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_sel,cljs.core.array_seq([type_37790,((function (seq__37772_37785,chunk__37773_37786,count__37774_37787,i__37775_37788,vec__37776_37789,type_37790,f_37791,vec__37771_37782,elem_37783,selector_37784){
return (function dommy$core$listen_once_BANG__$_this_fn(e){
dommy.core.unlisten_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_sel,cljs.core.array_seq([type_37790,dommy$core$listen_once_BANG__$_this_fn], 0));

var G__37778 = e;
return (f_37791.cljs$core$IFn$_invoke$arity$1 ? f_37791.cljs$core$IFn$_invoke$arity$1(G__37778) : f_37791.call(null,G__37778));
});})(seq__37772_37785,chunk__37773_37786,count__37774_37787,i__37775_37788,vec__37776_37789,type_37790,f_37791,vec__37771_37782,elem_37783,selector_37784))
], 0));

var G__37792 = seq__37772_37785;
var G__37793 = chunk__37773_37786;
var G__37794 = count__37774_37787;
var G__37795 = (i__37775_37788 + (1));
seq__37772_37785 = G__37792;
chunk__37773_37786 = G__37793;
count__37774_37787 = G__37794;
i__37775_37788 = G__37795;
continue;
} else {
var temp__4126__auto___37796 = cljs.core.seq(seq__37772_37785);
if(temp__4126__auto___37796){
var seq__37772_37797__$1 = temp__4126__auto___37796;
if(cljs.core.chunked_seq_QMARK_(seq__37772_37797__$1)){
var c__24968__auto___37798 = cljs.core.chunk_first(seq__37772_37797__$1);
var G__37799 = cljs.core.chunk_rest(seq__37772_37797__$1);
var G__37800 = c__24968__auto___37798;
var G__37801 = cljs.core.count(c__24968__auto___37798);
var G__37802 = (0);
seq__37772_37785 = G__37799;
chunk__37773_37786 = G__37800;
count__37774_37787 = G__37801;
i__37775_37788 = G__37802;
continue;
} else {
var vec__37779_37803 = cljs.core.first(seq__37772_37797__$1);
var type_37804 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37779_37803,(0),null);
var f_37805 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37779_37803,(1),null);
dommy.core.listen_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_sel,cljs.core.array_seq([type_37804,((function (seq__37772_37785,chunk__37773_37786,count__37774_37787,i__37775_37788,vec__37779_37803,type_37804,f_37805,seq__37772_37797__$1,temp__4126__auto___37796,vec__37771_37782,elem_37783,selector_37784){
return (function dommy$core$listen_once_BANG__$_this_fn(e){
dommy.core.unlisten_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_sel,cljs.core.array_seq([type_37804,dommy$core$listen_once_BANG__$_this_fn], 0));

var G__37781 = e;
return (f_37805.cljs$core$IFn$_invoke$arity$1 ? f_37805.cljs$core$IFn$_invoke$arity$1(G__37781) : f_37805.call(null,G__37781));
});})(seq__37772_37785,chunk__37773_37786,count__37774_37787,i__37775_37788,vec__37779_37803,type_37804,f_37805,seq__37772_37797__$1,temp__4126__auto___37796,vec__37771_37782,elem_37783,selector_37784))
], 0));

var G__37806 = cljs.core.next(seq__37772_37797__$1);
var G__37807 = null;
var G__37808 = (0);
var G__37809 = (0);
seq__37772_37785 = G__37806;
chunk__37773_37786 = G__37807;
count__37774_37787 = G__37808;
i__37775_37788 = G__37809;
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
var G__37810__i = 0, G__37810__a = new Array(arguments.length -  1);
while (G__37810__i < G__37810__a.length) {G__37810__a[G__37810__i] = arguments[G__37810__i + 1]; ++G__37810__i;}
  type_fs = new cljs.core.IndexedSeq(G__37810__a,0);
} 
return dommy$core$listen_once_BANG___delegate.call(this,elem_sel,type_fs);};
dommy$core$listen_once_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$listen_once_BANG_.cljs$lang$applyTo = (function (arglist__37811){
var elem_sel = cljs.core.first(arglist__37811);
var type_fs = cljs.core.rest(arglist__37811);
return dommy$core$listen_once_BANG___delegate(elem_sel,type_fs);
});
dommy$core$listen_once_BANG_.cljs$core$IFn$_invoke$arity$variadic = dommy$core$listen_once_BANG___delegate;
return dommy$core$listen_once_BANG_;
})()
;
