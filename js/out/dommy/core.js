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
var G__37038 = pixels;
return parseInt(G__37038);
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
return cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(dommy.core.matches_pred.cljs$core$IFn$_invoke$arity$2(base,selector),cljs.core.take_while.cljs$core$IFn$_invoke$arity$2((function (p1__37041_SHARP_){
return !((p1__37041_SHARP_ === base));
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
var seq__37051_37057 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),kvs));
var chunk__37052_37058 = null;
var count__37053_37059 = (0);
var i__37054_37060 = (0);
while(true){
if((i__37054_37060 < count__37053_37059)){
var vec__37055_37061 = chunk__37052_37058.cljs$core$IIndexed$_nth$arity$2(null,i__37054_37060);
var k_37062 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37055_37061,(0),null);
var v_37063 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37055_37061,(1),null);
style.setProperty(dommy.utils.as_str(k_37062),v_37063);

var G__37064 = seq__37051_37057;
var G__37065 = chunk__37052_37058;
var G__37066 = count__37053_37059;
var G__37067 = (i__37054_37060 + (1));
seq__37051_37057 = G__37064;
chunk__37052_37058 = G__37065;
count__37053_37059 = G__37066;
i__37054_37060 = G__37067;
continue;
} else {
var temp__4126__auto___37068 = cljs.core.seq(seq__37051_37057);
if(temp__4126__auto___37068){
var seq__37051_37069__$1 = temp__4126__auto___37068;
if(cljs.core.chunked_seq_QMARK_(seq__37051_37069__$1)){
var c__24962__auto___37070 = cljs.core.chunk_first(seq__37051_37069__$1);
var G__37071 = cljs.core.chunk_rest(seq__37051_37069__$1);
var G__37072 = c__24962__auto___37070;
var G__37073 = cljs.core.count(c__24962__auto___37070);
var G__37074 = (0);
seq__37051_37057 = G__37071;
chunk__37052_37058 = G__37072;
count__37053_37059 = G__37073;
i__37054_37060 = G__37074;
continue;
} else {
var vec__37056_37075 = cljs.core.first(seq__37051_37069__$1);
var k_37076 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37056_37075,(0),null);
var v_37077 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37056_37075,(1),null);
style.setProperty(dommy.utils.as_str(k_37076),v_37077);

var G__37078 = cljs.core.next(seq__37051_37069__$1);
var G__37079 = null;
var G__37080 = (0);
var G__37081 = (0);
seq__37051_37057 = G__37078;
chunk__37052_37058 = G__37079;
count__37053_37059 = G__37080;
i__37054_37060 = G__37081;
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
var G__37082__i = 0, G__37082__a = new Array(arguments.length -  1);
while (G__37082__i < G__37082__a.length) {G__37082__a[G__37082__i] = arguments[G__37082__i + 1]; ++G__37082__i;}
  kvs = new cljs.core.IndexedSeq(G__37082__a,0);
} 
return dommy$core$set_style_BANG___delegate.call(this,elem,kvs);};
dommy$core$set_style_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$set_style_BANG_.cljs$lang$applyTo = (function (arglist__37083){
var elem = cljs.core.first(arglist__37083);
var kvs = cljs.core.rest(arglist__37083);
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

var seq__37090_37096 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),kvs));
var chunk__37091_37097 = null;
var count__37092_37098 = (0);
var i__37093_37099 = (0);
while(true){
if((i__37093_37099 < count__37092_37098)){
var vec__37094_37100 = chunk__37091_37097.cljs$core$IIndexed$_nth$arity$2(null,i__37093_37099);
var k_37101 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37094_37100,(0),null);
var v_37102 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37094_37100,(1),null);
dommy.core.set_style_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem,cljs.core.array_seq([k_37101,[cljs.core.str(v_37102),cljs.core.str("px")].join('')], 0));

var G__37103 = seq__37090_37096;
var G__37104 = chunk__37091_37097;
var G__37105 = count__37092_37098;
var G__37106 = (i__37093_37099 + (1));
seq__37090_37096 = G__37103;
chunk__37091_37097 = G__37104;
count__37092_37098 = G__37105;
i__37093_37099 = G__37106;
continue;
} else {
var temp__4126__auto___37107 = cljs.core.seq(seq__37090_37096);
if(temp__4126__auto___37107){
var seq__37090_37108__$1 = temp__4126__auto___37107;
if(cljs.core.chunked_seq_QMARK_(seq__37090_37108__$1)){
var c__24962__auto___37109 = cljs.core.chunk_first(seq__37090_37108__$1);
var G__37110 = cljs.core.chunk_rest(seq__37090_37108__$1);
var G__37111 = c__24962__auto___37109;
var G__37112 = cljs.core.count(c__24962__auto___37109);
var G__37113 = (0);
seq__37090_37096 = G__37110;
chunk__37091_37097 = G__37111;
count__37092_37098 = G__37112;
i__37093_37099 = G__37113;
continue;
} else {
var vec__37095_37114 = cljs.core.first(seq__37090_37108__$1);
var k_37115 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37095_37114,(0),null);
var v_37116 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37095_37114,(1),null);
dommy.core.set_style_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem,cljs.core.array_seq([k_37115,[cljs.core.str(v_37116),cljs.core.str("px")].join('')], 0));

var G__37117 = cljs.core.next(seq__37090_37108__$1);
var G__37118 = null;
var G__37119 = (0);
var G__37120 = (0);
seq__37090_37096 = G__37117;
chunk__37091_37097 = G__37118;
count__37092_37098 = G__37119;
i__37093_37099 = G__37120;
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
var G__37121__i = 0, G__37121__a = new Array(arguments.length -  1);
while (G__37121__i < G__37121__a.length) {G__37121__a[G__37121__i] = arguments[G__37121__i + 1]; ++G__37121__i;}
  kvs = new cljs.core.IndexedSeq(G__37121__a,0);
} 
return dommy$core$set_px_BANG___delegate.call(this,elem,kvs);};
dommy$core$set_px_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$set_px_BANG_.cljs$lang$applyTo = (function (arglist__37122){
var elem = cljs.core.first(arglist__37122);
var kvs = cljs.core.rest(arglist__37122);
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
var G__37140 = elem;
(G__37140[k__$1] = v);

return G__37140;
} else {
var G__37141 = elem;
G__37141.setAttribute(k__$1,v);

return G__37141;
}
} else {
return null;
}
});
var dommy$core$set_attr_BANG___4 = (function() { 
var G__37148__delegate = function (elem,k,v,kvs){
if(cljs.core.even_QMARK_(cljs.core.count(kvs))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1827825394,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-514511684,null),new cljs.core.Symbol(null,"kvs","kvs",-1695980277,null)))], 0)))].join('')));
}

var seq__37142_37149 = cljs.core.seq(cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null),cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),kvs)));
var chunk__37143_37150 = null;
var count__37144_37151 = (0);
var i__37145_37152 = (0);
while(true){
if((i__37145_37152 < count__37144_37151)){
var vec__37146_37153 = chunk__37143_37150.cljs$core$IIndexed$_nth$arity$2(null,i__37145_37152);
var k_37154__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37146_37153,(0),null);
var v_37155__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37146_37153,(1),null);
dommy$core$set_attr_BANG_.cljs$core$IFn$_invoke$arity$3(elem,k_37154__$1,v_37155__$1);

var G__37156 = seq__37142_37149;
var G__37157 = chunk__37143_37150;
var G__37158 = count__37144_37151;
var G__37159 = (i__37145_37152 + (1));
seq__37142_37149 = G__37156;
chunk__37143_37150 = G__37157;
count__37144_37151 = G__37158;
i__37145_37152 = G__37159;
continue;
} else {
var temp__4126__auto___37160 = cljs.core.seq(seq__37142_37149);
if(temp__4126__auto___37160){
var seq__37142_37161__$1 = temp__4126__auto___37160;
if(cljs.core.chunked_seq_QMARK_(seq__37142_37161__$1)){
var c__24962__auto___37162 = cljs.core.chunk_first(seq__37142_37161__$1);
var G__37163 = cljs.core.chunk_rest(seq__37142_37161__$1);
var G__37164 = c__24962__auto___37162;
var G__37165 = cljs.core.count(c__24962__auto___37162);
var G__37166 = (0);
seq__37142_37149 = G__37163;
chunk__37143_37150 = G__37164;
count__37144_37151 = G__37165;
i__37145_37152 = G__37166;
continue;
} else {
var vec__37147_37167 = cljs.core.first(seq__37142_37161__$1);
var k_37168__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37147_37167,(0),null);
var v_37169__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37147_37167,(1),null);
dommy$core$set_attr_BANG_.cljs$core$IFn$_invoke$arity$3(elem,k_37168__$1,v_37169__$1);

var G__37170 = cljs.core.next(seq__37142_37161__$1);
var G__37171 = null;
var G__37172 = (0);
var G__37173 = (0);
seq__37142_37149 = G__37170;
chunk__37143_37150 = G__37171;
count__37144_37151 = G__37172;
i__37145_37152 = G__37173;
continue;
}
} else {
}
}
break;
}

return elem;
};
var G__37148 = function (elem,k,v,var_args){
var kvs = null;
if (arguments.length > 3) {
var G__37174__i = 0, G__37174__a = new Array(arguments.length -  3);
while (G__37174__i < G__37174__a.length) {G__37174__a[G__37174__i] = arguments[G__37174__i + 3]; ++G__37174__i;}
  kvs = new cljs.core.IndexedSeq(G__37174__a,0);
} 
return G__37148__delegate.call(this,elem,k,v,kvs);};
G__37148.cljs$lang$maxFixedArity = 3;
G__37148.cljs$lang$applyTo = (function (arglist__37175){
var elem = cljs.core.first(arglist__37175);
arglist__37175 = cljs.core.next(arglist__37175);
var k = cljs.core.first(arglist__37175);
arglist__37175 = cljs.core.next(arglist__37175);
var v = cljs.core.first(arglist__37175);
var kvs = cljs.core.rest(arglist__37175);
return G__37148__delegate(elem,k,v,kvs);
});
G__37148.cljs$core$IFn$_invoke$arity$variadic = G__37148__delegate;
return G__37148;
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
var G__37176 = null;
if (arguments.length > 3) {
var G__37177__i = 0, G__37177__a = new Array(arguments.length -  3);
while (G__37177__i < G__37177__a.length) {G__37177__a[G__37177__i] = arguments[G__37177__i + 3]; ++G__37177__i;}
G__37176 = new cljs.core.IndexedSeq(G__37177__a,0);
}
return dommy$core$set_attr_BANG___4.cljs$core$IFn$_invoke$arity$variadic(elem,k,v, G__37176);
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
var k_37190__$1 = dommy.utils.as_str(k);
if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["class",null,"classes",null], null), null).call(null,k_37190__$1))){
dommy.core.set_class_BANG_(elem,"");
} else {
elem.removeAttribute(k_37190__$1);
}

return elem;
});
var dommy$core$remove_attr_BANG___3 = (function() { 
var G__37191__delegate = function (elem,k,ks){
var seq__37186_37192 = cljs.core.seq(cljs.core.cons(k,ks));
var chunk__37187_37193 = null;
var count__37188_37194 = (0);
var i__37189_37195 = (0);
while(true){
if((i__37189_37195 < count__37188_37194)){
var k_37196__$1 = chunk__37187_37193.cljs$core$IIndexed$_nth$arity$2(null,i__37189_37195);
dommy$core$remove_attr_BANG_.cljs$core$IFn$_invoke$arity$2(elem,k_37196__$1);

var G__37197 = seq__37186_37192;
var G__37198 = chunk__37187_37193;
var G__37199 = count__37188_37194;
var G__37200 = (i__37189_37195 + (1));
seq__37186_37192 = G__37197;
chunk__37187_37193 = G__37198;
count__37188_37194 = G__37199;
i__37189_37195 = G__37200;
continue;
} else {
var temp__4126__auto___37201 = cljs.core.seq(seq__37186_37192);
if(temp__4126__auto___37201){
var seq__37186_37202__$1 = temp__4126__auto___37201;
if(cljs.core.chunked_seq_QMARK_(seq__37186_37202__$1)){
var c__24962__auto___37203 = cljs.core.chunk_first(seq__37186_37202__$1);
var G__37204 = cljs.core.chunk_rest(seq__37186_37202__$1);
var G__37205 = c__24962__auto___37203;
var G__37206 = cljs.core.count(c__24962__auto___37203);
var G__37207 = (0);
seq__37186_37192 = G__37204;
chunk__37187_37193 = G__37205;
count__37188_37194 = G__37206;
i__37189_37195 = G__37207;
continue;
} else {
var k_37208__$1 = cljs.core.first(seq__37186_37202__$1);
dommy$core$remove_attr_BANG_.cljs$core$IFn$_invoke$arity$2(elem,k_37208__$1);

var G__37209 = cljs.core.next(seq__37186_37202__$1);
var G__37210 = null;
var G__37211 = (0);
var G__37212 = (0);
seq__37186_37192 = G__37209;
chunk__37187_37193 = G__37210;
count__37188_37194 = G__37211;
i__37189_37195 = G__37212;
continue;
}
} else {
}
}
break;
}

return elem;
};
var G__37191 = function (elem,k,var_args){
var ks = null;
if (arguments.length > 2) {
var G__37213__i = 0, G__37213__a = new Array(arguments.length -  2);
while (G__37213__i < G__37213__a.length) {G__37213__a[G__37213__i] = arguments[G__37213__i + 2]; ++G__37213__i;}
  ks = new cljs.core.IndexedSeq(G__37213__a,0);
} 
return G__37191__delegate.call(this,elem,k,ks);};
G__37191.cljs$lang$maxFixedArity = 2;
G__37191.cljs$lang$applyTo = (function (arglist__37214){
var elem = cljs.core.first(arglist__37214);
arglist__37214 = cljs.core.next(arglist__37214);
var k = cljs.core.first(arglist__37214);
var ks = cljs.core.rest(arglist__37214);
return G__37191__delegate(elem,k,ks);
});
G__37191.cljs$core$IFn$_invoke$arity$variadic = G__37191__delegate;
return G__37191;
})()
;
dommy$core$remove_attr_BANG_ = function(elem,k,var_args){
var ks = var_args;
switch(arguments.length){
case 2:
return dommy$core$remove_attr_BANG___2.call(this,elem,k);
default:
var G__37215 = null;
if (arguments.length > 2) {
var G__37216__i = 0, G__37216__a = new Array(arguments.length -  2);
while (G__37216__i < G__37216__a.length) {G__37216__a[G__37216__i] = arguments[G__37216__i + 2]; ++G__37216__i;}
G__37215 = new cljs.core.IndexedSeq(G__37216__a,0);
}
return dommy$core$remove_attr_BANG___3.cljs$core$IFn$_invoke$arity$variadic(elem,k, G__37215);
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
var temp__4124__auto___37248 = elem.classList;
if(cljs.core.truth_(temp__4124__auto___37248)){
var class_list_37249 = temp__4124__auto___37248;
var seq__37236_37250 = cljs.core.seq(classes__$1);
var chunk__37237_37251 = null;
var count__37238_37252 = (0);
var i__37239_37253 = (0);
while(true){
if((i__37239_37253 < count__37238_37252)){
var c_37254 = chunk__37237_37251.cljs$core$IIndexed$_nth$arity$2(null,i__37239_37253);
class_list_37249.add(c_37254);

var G__37255 = seq__37236_37250;
var G__37256 = chunk__37237_37251;
var G__37257 = count__37238_37252;
var G__37258 = (i__37239_37253 + (1));
seq__37236_37250 = G__37255;
chunk__37237_37251 = G__37256;
count__37238_37252 = G__37257;
i__37239_37253 = G__37258;
continue;
} else {
var temp__4126__auto___37259 = cljs.core.seq(seq__37236_37250);
if(temp__4126__auto___37259){
var seq__37236_37260__$1 = temp__4126__auto___37259;
if(cljs.core.chunked_seq_QMARK_(seq__37236_37260__$1)){
var c__24962__auto___37261 = cljs.core.chunk_first(seq__37236_37260__$1);
var G__37262 = cljs.core.chunk_rest(seq__37236_37260__$1);
var G__37263 = c__24962__auto___37261;
var G__37264 = cljs.core.count(c__24962__auto___37261);
var G__37265 = (0);
seq__37236_37250 = G__37262;
chunk__37237_37251 = G__37263;
count__37238_37252 = G__37264;
i__37239_37253 = G__37265;
continue;
} else {
var c_37266 = cljs.core.first(seq__37236_37260__$1);
class_list_37249.add(c_37266);

var G__37267 = cljs.core.next(seq__37236_37260__$1);
var G__37268 = null;
var G__37269 = (0);
var G__37270 = (0);
seq__37236_37250 = G__37267;
chunk__37237_37251 = G__37268;
count__37238_37252 = G__37269;
i__37239_37253 = G__37270;
continue;
}
} else {
}
}
break;
}
} else {
var seq__37240_37271 = cljs.core.seq(classes__$1);
var chunk__37241_37272 = null;
var count__37242_37273 = (0);
var i__37243_37274 = (0);
while(true){
if((i__37243_37274 < count__37242_37273)){
var c_37275 = chunk__37241_37272.cljs$core$IIndexed$_nth$arity$2(null,i__37243_37274);
var class_name_37276 = dommy.core.class$(elem);
if(cljs.core.truth_(dommy.utils.class_index(class_name_37276,c_37275))){
} else {
dommy.core.set_class_BANG_(elem,(((class_name_37276 === ""))?c_37275:[cljs.core.str(class_name_37276),cljs.core.str(" "),cljs.core.str(c_37275)].join('')));
}

var G__37277 = seq__37240_37271;
var G__37278 = chunk__37241_37272;
var G__37279 = count__37242_37273;
var G__37280 = (i__37243_37274 + (1));
seq__37240_37271 = G__37277;
chunk__37241_37272 = G__37278;
count__37242_37273 = G__37279;
i__37243_37274 = G__37280;
continue;
} else {
var temp__4126__auto___37281 = cljs.core.seq(seq__37240_37271);
if(temp__4126__auto___37281){
var seq__37240_37282__$1 = temp__4126__auto___37281;
if(cljs.core.chunked_seq_QMARK_(seq__37240_37282__$1)){
var c__24962__auto___37283 = cljs.core.chunk_first(seq__37240_37282__$1);
var G__37284 = cljs.core.chunk_rest(seq__37240_37282__$1);
var G__37285 = c__24962__auto___37283;
var G__37286 = cljs.core.count(c__24962__auto___37283);
var G__37287 = (0);
seq__37240_37271 = G__37284;
chunk__37241_37272 = G__37285;
count__37242_37273 = G__37286;
i__37243_37274 = G__37287;
continue;
} else {
var c_37288 = cljs.core.first(seq__37240_37282__$1);
var class_name_37289 = dommy.core.class$(elem);
if(cljs.core.truth_(dommy.utils.class_index(class_name_37289,c_37288))){
} else {
dommy.core.set_class_BANG_(elem,(((class_name_37289 === ""))?c_37288:[cljs.core.str(class_name_37289),cljs.core.str(" "),cljs.core.str(c_37288)].join('')));
}

var G__37290 = cljs.core.next(seq__37240_37282__$1);
var G__37291 = null;
var G__37292 = (0);
var G__37293 = (0);
seq__37240_37271 = G__37290;
chunk__37241_37272 = G__37291;
count__37242_37273 = G__37292;
i__37243_37274 = G__37293;
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
var G__37294__delegate = function (elem,classes,more_classes){
var seq__37244_37295 = cljs.core.seq(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(more_classes,classes));
var chunk__37245_37296 = null;
var count__37246_37297 = (0);
var i__37247_37298 = (0);
while(true){
if((i__37247_37298 < count__37246_37297)){
var c_37299 = chunk__37245_37296.cljs$core$IIndexed$_nth$arity$2(null,i__37247_37298);
dommy$core$add_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem,c_37299);

var G__37300 = seq__37244_37295;
var G__37301 = chunk__37245_37296;
var G__37302 = count__37246_37297;
var G__37303 = (i__37247_37298 + (1));
seq__37244_37295 = G__37300;
chunk__37245_37296 = G__37301;
count__37246_37297 = G__37302;
i__37247_37298 = G__37303;
continue;
} else {
var temp__4126__auto___37304 = cljs.core.seq(seq__37244_37295);
if(temp__4126__auto___37304){
var seq__37244_37305__$1 = temp__4126__auto___37304;
if(cljs.core.chunked_seq_QMARK_(seq__37244_37305__$1)){
var c__24962__auto___37306 = cljs.core.chunk_first(seq__37244_37305__$1);
var G__37307 = cljs.core.chunk_rest(seq__37244_37305__$1);
var G__37308 = c__24962__auto___37306;
var G__37309 = cljs.core.count(c__24962__auto___37306);
var G__37310 = (0);
seq__37244_37295 = G__37307;
chunk__37245_37296 = G__37308;
count__37246_37297 = G__37309;
i__37247_37298 = G__37310;
continue;
} else {
var c_37311 = cljs.core.first(seq__37244_37305__$1);
dommy$core$add_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem,c_37311);

var G__37312 = cljs.core.next(seq__37244_37305__$1);
var G__37313 = null;
var G__37314 = (0);
var G__37315 = (0);
seq__37244_37295 = G__37312;
chunk__37245_37296 = G__37313;
count__37246_37297 = G__37314;
i__37247_37298 = G__37315;
continue;
}
} else {
}
}
break;
}

return elem;
};
var G__37294 = function (elem,classes,var_args){
var more_classes = null;
if (arguments.length > 2) {
var G__37316__i = 0, G__37316__a = new Array(arguments.length -  2);
while (G__37316__i < G__37316__a.length) {G__37316__a[G__37316__i] = arguments[G__37316__i + 2]; ++G__37316__i;}
  more_classes = new cljs.core.IndexedSeq(G__37316__a,0);
} 
return G__37294__delegate.call(this,elem,classes,more_classes);};
G__37294.cljs$lang$maxFixedArity = 2;
G__37294.cljs$lang$applyTo = (function (arglist__37317){
var elem = cljs.core.first(arglist__37317);
arglist__37317 = cljs.core.next(arglist__37317);
var classes = cljs.core.first(arglist__37317);
var more_classes = cljs.core.rest(arglist__37317);
return G__37294__delegate(elem,classes,more_classes);
});
G__37294.cljs$core$IFn$_invoke$arity$variadic = G__37294__delegate;
return G__37294;
})()
;
dommy$core$add_class_BANG_ = function(elem,classes,var_args){
var more_classes = var_args;
switch(arguments.length){
case 2:
return dommy$core$add_class_BANG___2.call(this,elem,classes);
default:
var G__37318 = null;
if (arguments.length > 2) {
var G__37319__i = 0, G__37319__a = new Array(arguments.length -  2);
while (G__37319__i < G__37319__a.length) {G__37319__a[G__37319__i] = arguments[G__37319__i + 2]; ++G__37319__i;}
G__37318 = new cljs.core.IndexedSeq(G__37319__a,0);
}
return dommy$core$add_class_BANG___3.cljs$core$IFn$_invoke$arity$variadic(elem,classes, G__37318);
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
var temp__4124__auto___37332 = elem.classList;
if(cljs.core.truth_(temp__4124__auto___37332)){
var class_list_37333 = temp__4124__auto___37332;
class_list_37333.remove(c__$1);
} else {
var class_name_37334 = dommy.core.class$(elem);
var new_class_name_37335 = dommy.utils.remove_class_str(class_name_37334,c__$1);
if((class_name_37334 === new_class_name_37335)){
} else {
dommy.core.set_class_BANG_(elem,new_class_name_37335);
}
}

return elem;
});
var dommy$core$remove_class_BANG___3 = (function() { 
var G__37336__delegate = function (elem,class$,classes){
var seq__37328 = cljs.core.seq(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(classes,class$));
var chunk__37329 = null;
var count__37330 = (0);
var i__37331 = (0);
while(true){
if((i__37331 < count__37330)){
var c = chunk__37329.cljs$core$IIndexed$_nth$arity$2(null,i__37331);
dommy$core$remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem,c);

var G__37337 = seq__37328;
var G__37338 = chunk__37329;
var G__37339 = count__37330;
var G__37340 = (i__37331 + (1));
seq__37328 = G__37337;
chunk__37329 = G__37338;
count__37330 = G__37339;
i__37331 = G__37340;
continue;
} else {
var temp__4126__auto__ = cljs.core.seq(seq__37328);
if(temp__4126__auto__){
var seq__37328__$1 = temp__4126__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__37328__$1)){
var c__24962__auto__ = cljs.core.chunk_first(seq__37328__$1);
var G__37341 = cljs.core.chunk_rest(seq__37328__$1);
var G__37342 = c__24962__auto__;
var G__37343 = cljs.core.count(c__24962__auto__);
var G__37344 = (0);
seq__37328 = G__37341;
chunk__37329 = G__37342;
count__37330 = G__37343;
i__37331 = G__37344;
continue;
} else {
var c = cljs.core.first(seq__37328__$1);
dommy$core$remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem,c);

var G__37345 = cljs.core.next(seq__37328__$1);
var G__37346 = null;
var G__37347 = (0);
var G__37348 = (0);
seq__37328 = G__37345;
chunk__37329 = G__37346;
count__37330 = G__37347;
i__37331 = G__37348;
continue;
}
} else {
return null;
}
}
break;
}
};
var G__37336 = function (elem,class$,var_args){
var classes = null;
if (arguments.length > 2) {
var G__37349__i = 0, G__37349__a = new Array(arguments.length -  2);
while (G__37349__i < G__37349__a.length) {G__37349__a[G__37349__i] = arguments[G__37349__i + 2]; ++G__37349__i;}
  classes = new cljs.core.IndexedSeq(G__37349__a,0);
} 
return G__37336__delegate.call(this,elem,class$,classes);};
G__37336.cljs$lang$maxFixedArity = 2;
G__37336.cljs$lang$applyTo = (function (arglist__37350){
var elem = cljs.core.first(arglist__37350);
arglist__37350 = cljs.core.next(arglist__37350);
var class$ = cljs.core.first(arglist__37350);
var classes = cljs.core.rest(arglist__37350);
return G__37336__delegate(elem,class$,classes);
});
G__37336.cljs$core$IFn$_invoke$arity$variadic = G__37336__delegate;
return G__37336;
})()
;
dommy$core$remove_class_BANG_ = function(elem,class$,var_args){
var classes = var_args;
switch(arguments.length){
case 2:
return dommy$core$remove_class_BANG___2.call(this,elem,class$);
default:
var G__37351 = null;
if (arguments.length > 2) {
var G__37352__i = 0, G__37352__a = new Array(arguments.length -  2);
while (G__37352__i < G__37352__a.length) {G__37352__a[G__37352__i] = arguments[G__37352__i + 2]; ++G__37352__i;}
G__37351 = new cljs.core.IndexedSeq(G__37352__a,0);
}
return dommy$core$remove_class_BANG___3.cljs$core$IFn$_invoke$arity$variadic(elem,class$, G__37351);
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
var temp__4124__auto___37356 = elem.classList;
if(cljs.core.truth_(temp__4124__auto___37356)){
var class_list_37357 = temp__4124__auto___37356;
class_list_37357.toggle(c__$1);
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
var G__37369 = parent;
G__37369.appendChild(child);

return G__37369;
});
var dommy$core$append_BANG___3 = (function() { 
var G__37374__delegate = function (parent,child,more_children){
var seq__37370_37375 = cljs.core.seq(cljs.core.cons(child,more_children));
var chunk__37371_37376 = null;
var count__37372_37377 = (0);
var i__37373_37378 = (0);
while(true){
if((i__37373_37378 < count__37372_37377)){
var c_37379 = chunk__37371_37376.cljs$core$IIndexed$_nth$arity$2(null,i__37373_37378);
dommy$core$append_BANG_.cljs$core$IFn$_invoke$arity$2(parent,c_37379);

var G__37380 = seq__37370_37375;
var G__37381 = chunk__37371_37376;
var G__37382 = count__37372_37377;
var G__37383 = (i__37373_37378 + (1));
seq__37370_37375 = G__37380;
chunk__37371_37376 = G__37381;
count__37372_37377 = G__37382;
i__37373_37378 = G__37383;
continue;
} else {
var temp__4126__auto___37384 = cljs.core.seq(seq__37370_37375);
if(temp__4126__auto___37384){
var seq__37370_37385__$1 = temp__4126__auto___37384;
if(cljs.core.chunked_seq_QMARK_(seq__37370_37385__$1)){
var c__24962__auto___37386 = cljs.core.chunk_first(seq__37370_37385__$1);
var G__37387 = cljs.core.chunk_rest(seq__37370_37385__$1);
var G__37388 = c__24962__auto___37386;
var G__37389 = cljs.core.count(c__24962__auto___37386);
var G__37390 = (0);
seq__37370_37375 = G__37387;
chunk__37371_37376 = G__37388;
count__37372_37377 = G__37389;
i__37373_37378 = G__37390;
continue;
} else {
var c_37391 = cljs.core.first(seq__37370_37385__$1);
dommy$core$append_BANG_.cljs$core$IFn$_invoke$arity$2(parent,c_37391);

var G__37392 = cljs.core.next(seq__37370_37385__$1);
var G__37393 = null;
var G__37394 = (0);
var G__37395 = (0);
seq__37370_37375 = G__37392;
chunk__37371_37376 = G__37393;
count__37372_37377 = G__37394;
i__37373_37378 = G__37395;
continue;
}
} else {
}
}
break;
}

return parent;
};
var G__37374 = function (parent,child,var_args){
var more_children = null;
if (arguments.length > 2) {
var G__37396__i = 0, G__37396__a = new Array(arguments.length -  2);
while (G__37396__i < G__37396__a.length) {G__37396__a[G__37396__i] = arguments[G__37396__i + 2]; ++G__37396__i;}
  more_children = new cljs.core.IndexedSeq(G__37396__a,0);
} 
return G__37374__delegate.call(this,parent,child,more_children);};
G__37374.cljs$lang$maxFixedArity = 2;
G__37374.cljs$lang$applyTo = (function (arglist__37397){
var parent = cljs.core.first(arglist__37397);
arglist__37397 = cljs.core.next(arglist__37397);
var child = cljs.core.first(arglist__37397);
var more_children = cljs.core.rest(arglist__37397);
return G__37374__delegate(parent,child,more_children);
});
G__37374.cljs$core$IFn$_invoke$arity$variadic = G__37374__delegate;
return G__37374;
})()
;
dommy$core$append_BANG_ = function(parent,child,var_args){
var more_children = var_args;
switch(arguments.length){
case 2:
return dommy$core$append_BANG___2.call(this,parent,child);
default:
var G__37398 = null;
if (arguments.length > 2) {
var G__37399__i = 0, G__37399__a = new Array(arguments.length -  2);
while (G__37399__i < G__37399__a.length) {G__37399__a[G__37399__i] = arguments[G__37399__i + 2]; ++G__37399__i;}
G__37398 = new cljs.core.IndexedSeq(G__37399__a,0);
}
return dommy$core$append_BANG___3.cljs$core$IFn$_invoke$arity$variadic(parent,child, G__37398);
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
var G__37409 = parent;
G__37409.insertBefore(child,parent.firstChild);

return G__37409;
});
var dommy$core$prepend_BANG___3 = (function() { 
var G__37414__delegate = function (parent,child,more_children){
var seq__37410_37415 = cljs.core.seq(cljs.core.cons(child,more_children));
var chunk__37411_37416 = null;
var count__37412_37417 = (0);
var i__37413_37418 = (0);
while(true){
if((i__37413_37418 < count__37412_37417)){
var c_37419 = chunk__37411_37416.cljs$core$IIndexed$_nth$arity$2(null,i__37413_37418);
dommy$core$prepend_BANG_.cljs$core$IFn$_invoke$arity$2(parent,c_37419);

var G__37420 = seq__37410_37415;
var G__37421 = chunk__37411_37416;
var G__37422 = count__37412_37417;
var G__37423 = (i__37413_37418 + (1));
seq__37410_37415 = G__37420;
chunk__37411_37416 = G__37421;
count__37412_37417 = G__37422;
i__37413_37418 = G__37423;
continue;
} else {
var temp__4126__auto___37424 = cljs.core.seq(seq__37410_37415);
if(temp__4126__auto___37424){
var seq__37410_37425__$1 = temp__4126__auto___37424;
if(cljs.core.chunked_seq_QMARK_(seq__37410_37425__$1)){
var c__24962__auto___37426 = cljs.core.chunk_first(seq__37410_37425__$1);
var G__37427 = cljs.core.chunk_rest(seq__37410_37425__$1);
var G__37428 = c__24962__auto___37426;
var G__37429 = cljs.core.count(c__24962__auto___37426);
var G__37430 = (0);
seq__37410_37415 = G__37427;
chunk__37411_37416 = G__37428;
count__37412_37417 = G__37429;
i__37413_37418 = G__37430;
continue;
} else {
var c_37431 = cljs.core.first(seq__37410_37425__$1);
dommy$core$prepend_BANG_.cljs$core$IFn$_invoke$arity$2(parent,c_37431);

var G__37432 = cljs.core.next(seq__37410_37425__$1);
var G__37433 = null;
var G__37434 = (0);
var G__37435 = (0);
seq__37410_37415 = G__37432;
chunk__37411_37416 = G__37433;
count__37412_37417 = G__37434;
i__37413_37418 = G__37435;
continue;
}
} else {
}
}
break;
}

return parent;
};
var G__37414 = function (parent,child,var_args){
var more_children = null;
if (arguments.length > 2) {
var G__37436__i = 0, G__37436__a = new Array(arguments.length -  2);
while (G__37436__i < G__37436__a.length) {G__37436__a[G__37436__i] = arguments[G__37436__i + 2]; ++G__37436__i;}
  more_children = new cljs.core.IndexedSeq(G__37436__a,0);
} 
return G__37414__delegate.call(this,parent,child,more_children);};
G__37414.cljs$lang$maxFixedArity = 2;
G__37414.cljs$lang$applyTo = (function (arglist__37437){
var parent = cljs.core.first(arglist__37437);
arglist__37437 = cljs.core.next(arglist__37437);
var child = cljs.core.first(arglist__37437);
var more_children = cljs.core.rest(arglist__37437);
return G__37414__delegate(parent,child,more_children);
});
G__37414.cljs$core$IFn$_invoke$arity$variadic = G__37414__delegate;
return G__37414;
})()
;
dommy$core$prepend_BANG_ = function(parent,child,var_args){
var more_children = var_args;
switch(arguments.length){
case 2:
return dommy$core$prepend_BANG___2.call(this,parent,child);
default:
var G__37438 = null;
if (arguments.length > 2) {
var G__37439__i = 0, G__37439__a = new Array(arguments.length -  2);
while (G__37439__i < G__37439__a.length) {G__37439__a[G__37439__i] = arguments[G__37439__i + 2]; ++G__37439__i;}
G__37438 = new cljs.core.IndexedSeq(G__37439__a,0);
}
return dommy$core$prepend_BANG___3.cljs$core$IFn$_invoke$arity$variadic(parent,child, G__37438);
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
var temp__4124__auto___37440 = other.nextSibling;
if(cljs.core.truth_(temp__4124__auto___37440)){
var next_37441 = temp__4124__auto___37440;
dommy.core.insert_before_BANG_(elem,next_37441);
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
var G__37445 = p;
G__37445.removeChild(elem);

return G__37445;
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
dommy.core.special_listener_makers = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__37446){
var vec__37447 = p__37446;
var special_mouse_event = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37447,(0),null);
var real_mouse_event = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37447,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [special_mouse_event,new cljs.core.PersistentArrayMap.fromArray([real_mouse_event,((function (vec__37447,special_mouse_event,real_mouse_event){
return (function (f){
return ((function (vec__37447,special_mouse_event,real_mouse_event){
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
var G__37448 = event;
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__37448) : f.call(null,G__37448));
}
});
;})(vec__37447,special_mouse_event,real_mouse_event))
});})(vec__37447,special_mouse_event,real_mouse_event))
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

var G__37450 = event;
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__37450) : f.call(null,G__37450));
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
var G__37451__i = 0, G__37451__a = new Array(arguments.length -  2);
while (G__37451__i < G__37451__a.length) {G__37451__a[G__37451__i] = arguments[G__37451__i + 2]; ++G__37451__i;}
  args = new cljs.core.IndexedSeq(G__37451__a,0);
} 
return dommy$core$update_event_listeners_BANG___delegate.call(this,elem,f,args);};
dommy$core$update_event_listeners_BANG_.cljs$lang$maxFixedArity = 2;
dommy$core$update_event_listeners_BANG_.cljs$lang$applyTo = (function (arglist__37452){
var elem = cljs.core.first(arglist__37452);
arglist__37452 = cljs.core.next(arglist__37452);
var f = cljs.core.first(arglist__37452);
var args = cljs.core.rest(arglist__37452);
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

var vec__37480_37507 = dommy.core.elem_and_selector(elem_sel);
var elem_37508 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37480_37507,(0),null);
var selector_37509 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37480_37507,(1),null);
var seq__37481_37510 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),type_fs));
var chunk__37488_37511 = null;
var count__37489_37512 = (0);
var i__37490_37513 = (0);
while(true){
if((i__37490_37513 < count__37489_37512)){
var vec__37497_37514 = chunk__37488_37511.cljs$core$IIndexed$_nth$arity$2(null,i__37490_37513);
var orig_type_37515 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37497_37514,(0),null);
var f_37516 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37497_37514,(1),null);
var seq__37491_37517 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$3(dommy.core.special_listener_makers,orig_type_37515,new cljs.core.PersistentArrayMap.fromArray([orig_type_37515,cljs.core.identity], true, false)));
var chunk__37493_37518 = null;
var count__37494_37519 = (0);
var i__37495_37520 = (0);
while(true){
if((i__37495_37520 < count__37494_37519)){
var vec__37498_37521 = chunk__37493_37518.cljs$core$IIndexed$_nth$arity$2(null,i__37495_37520);
var actual_type_37522 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37498_37521,(0),null);
var factory_37523 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37498_37521,(1),null);
var canonical_f_37524 = (cljs.core.truth_(selector_37509)?cljs.core.partial.cljs$core$IFn$_invoke$arity$3(dommy.core.live_listener,elem_37508,selector_37509):cljs.core.identity).call(null,(function (){var G__37499 = f_37516;
return (factory_37523.cljs$core$IFn$_invoke$arity$1 ? factory_37523.cljs$core$IFn$_invoke$arity$1(G__37499) : factory_37523.call(null,G__37499));
})());
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37508,cljs.core.assoc_in,cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37509,actual_type_37522,f_37516], null),canonical_f_37524], 0));

if(cljs.core.truth_(elem_37508.addEventListener)){
elem_37508.addEventListener(cljs.core.name(actual_type_37522),canonical_f_37524);
} else {
elem_37508.attachEvent(cljs.core.name(actual_type_37522),canonical_f_37524);
}

var G__37525 = seq__37491_37517;
var G__37526 = chunk__37493_37518;
var G__37527 = count__37494_37519;
var G__37528 = (i__37495_37520 + (1));
seq__37491_37517 = G__37525;
chunk__37493_37518 = G__37526;
count__37494_37519 = G__37527;
i__37495_37520 = G__37528;
continue;
} else {
var temp__4126__auto___37529 = cljs.core.seq(seq__37491_37517);
if(temp__4126__auto___37529){
var seq__37491_37530__$1 = temp__4126__auto___37529;
if(cljs.core.chunked_seq_QMARK_(seq__37491_37530__$1)){
var c__24962__auto___37531 = cljs.core.chunk_first(seq__37491_37530__$1);
var G__37532 = cljs.core.chunk_rest(seq__37491_37530__$1);
var G__37533 = c__24962__auto___37531;
var G__37534 = cljs.core.count(c__24962__auto___37531);
var G__37535 = (0);
seq__37491_37517 = G__37532;
chunk__37493_37518 = G__37533;
count__37494_37519 = G__37534;
i__37495_37520 = G__37535;
continue;
} else {
var vec__37500_37536 = cljs.core.first(seq__37491_37530__$1);
var actual_type_37537 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37500_37536,(0),null);
var factory_37538 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37500_37536,(1),null);
var canonical_f_37539 = (cljs.core.truth_(selector_37509)?cljs.core.partial.cljs$core$IFn$_invoke$arity$3(dommy.core.live_listener,elem_37508,selector_37509):cljs.core.identity).call(null,(function (){var G__37501 = f_37516;
return (factory_37538.cljs$core$IFn$_invoke$arity$1 ? factory_37538.cljs$core$IFn$_invoke$arity$1(G__37501) : factory_37538.call(null,G__37501));
})());
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37508,cljs.core.assoc_in,cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37509,actual_type_37537,f_37516], null),canonical_f_37539], 0));

if(cljs.core.truth_(elem_37508.addEventListener)){
elem_37508.addEventListener(cljs.core.name(actual_type_37537),canonical_f_37539);
} else {
elem_37508.attachEvent(cljs.core.name(actual_type_37537),canonical_f_37539);
}

var G__37540 = cljs.core.next(seq__37491_37530__$1);
var G__37541 = null;
var G__37542 = (0);
var G__37543 = (0);
seq__37491_37517 = G__37540;
chunk__37493_37518 = G__37541;
count__37494_37519 = G__37542;
i__37495_37520 = G__37543;
continue;
}
} else {
}
}
break;
}

var G__37544 = seq__37481_37510;
var G__37545 = chunk__37488_37511;
var G__37546 = count__37489_37512;
var G__37547 = (i__37490_37513 + (1));
seq__37481_37510 = G__37544;
chunk__37488_37511 = G__37545;
count__37489_37512 = G__37546;
i__37490_37513 = G__37547;
continue;
} else {
var temp__4126__auto___37548 = cljs.core.seq(seq__37481_37510);
if(temp__4126__auto___37548){
var seq__37481_37549__$1 = temp__4126__auto___37548;
if(cljs.core.chunked_seq_QMARK_(seq__37481_37549__$1)){
var c__24962__auto___37550 = cljs.core.chunk_first(seq__37481_37549__$1);
var G__37551 = cljs.core.chunk_rest(seq__37481_37549__$1);
var G__37552 = c__24962__auto___37550;
var G__37553 = cljs.core.count(c__24962__auto___37550);
var G__37554 = (0);
seq__37481_37510 = G__37551;
chunk__37488_37511 = G__37552;
count__37489_37512 = G__37553;
i__37490_37513 = G__37554;
continue;
} else {
var vec__37502_37555 = cljs.core.first(seq__37481_37549__$1);
var orig_type_37556 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37502_37555,(0),null);
var f_37557 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37502_37555,(1),null);
var seq__37482_37558 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$3(dommy.core.special_listener_makers,orig_type_37556,new cljs.core.PersistentArrayMap.fromArray([orig_type_37556,cljs.core.identity], true, false)));
var chunk__37484_37559 = null;
var count__37485_37560 = (0);
var i__37486_37561 = (0);
while(true){
if((i__37486_37561 < count__37485_37560)){
var vec__37503_37562 = chunk__37484_37559.cljs$core$IIndexed$_nth$arity$2(null,i__37486_37561);
var actual_type_37563 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37503_37562,(0),null);
var factory_37564 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37503_37562,(1),null);
var canonical_f_37565 = (cljs.core.truth_(selector_37509)?cljs.core.partial.cljs$core$IFn$_invoke$arity$3(dommy.core.live_listener,elem_37508,selector_37509):cljs.core.identity).call(null,(function (){var G__37504 = f_37557;
return (factory_37564.cljs$core$IFn$_invoke$arity$1 ? factory_37564.cljs$core$IFn$_invoke$arity$1(G__37504) : factory_37564.call(null,G__37504));
})());
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37508,cljs.core.assoc_in,cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37509,actual_type_37563,f_37557], null),canonical_f_37565], 0));

if(cljs.core.truth_(elem_37508.addEventListener)){
elem_37508.addEventListener(cljs.core.name(actual_type_37563),canonical_f_37565);
} else {
elem_37508.attachEvent(cljs.core.name(actual_type_37563),canonical_f_37565);
}

var G__37566 = seq__37482_37558;
var G__37567 = chunk__37484_37559;
var G__37568 = count__37485_37560;
var G__37569 = (i__37486_37561 + (1));
seq__37482_37558 = G__37566;
chunk__37484_37559 = G__37567;
count__37485_37560 = G__37568;
i__37486_37561 = G__37569;
continue;
} else {
var temp__4126__auto___37570__$1 = cljs.core.seq(seq__37482_37558);
if(temp__4126__auto___37570__$1){
var seq__37482_37571__$1 = temp__4126__auto___37570__$1;
if(cljs.core.chunked_seq_QMARK_(seq__37482_37571__$1)){
var c__24962__auto___37572 = cljs.core.chunk_first(seq__37482_37571__$1);
var G__37573 = cljs.core.chunk_rest(seq__37482_37571__$1);
var G__37574 = c__24962__auto___37572;
var G__37575 = cljs.core.count(c__24962__auto___37572);
var G__37576 = (0);
seq__37482_37558 = G__37573;
chunk__37484_37559 = G__37574;
count__37485_37560 = G__37575;
i__37486_37561 = G__37576;
continue;
} else {
var vec__37505_37577 = cljs.core.first(seq__37482_37571__$1);
var actual_type_37578 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37505_37577,(0),null);
var factory_37579 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37505_37577,(1),null);
var canonical_f_37580 = (cljs.core.truth_(selector_37509)?cljs.core.partial.cljs$core$IFn$_invoke$arity$3(dommy.core.live_listener,elem_37508,selector_37509):cljs.core.identity).call(null,(function (){var G__37506 = f_37557;
return (factory_37579.cljs$core$IFn$_invoke$arity$1 ? factory_37579.cljs$core$IFn$_invoke$arity$1(G__37506) : factory_37579.call(null,G__37506));
})());
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37508,cljs.core.assoc_in,cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37509,actual_type_37578,f_37557], null),canonical_f_37580], 0));

if(cljs.core.truth_(elem_37508.addEventListener)){
elem_37508.addEventListener(cljs.core.name(actual_type_37578),canonical_f_37580);
} else {
elem_37508.attachEvent(cljs.core.name(actual_type_37578),canonical_f_37580);
}

var G__37581 = cljs.core.next(seq__37482_37571__$1);
var G__37582 = null;
var G__37583 = (0);
var G__37584 = (0);
seq__37482_37558 = G__37581;
chunk__37484_37559 = G__37582;
count__37485_37560 = G__37583;
i__37486_37561 = G__37584;
continue;
}
} else {
}
}
break;
}

var G__37585 = cljs.core.next(seq__37481_37549__$1);
var G__37586 = null;
var G__37587 = (0);
var G__37588 = (0);
seq__37481_37510 = G__37585;
chunk__37488_37511 = G__37586;
count__37489_37512 = G__37587;
i__37490_37513 = G__37588;
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
var G__37589__i = 0, G__37589__a = new Array(arguments.length -  1);
while (G__37589__i < G__37589__a.length) {G__37589__a[G__37589__i] = arguments[G__37589__i + 1]; ++G__37589__i;}
  type_fs = new cljs.core.IndexedSeq(G__37589__a,0);
} 
return dommy$core$listen_BANG___delegate.call(this,elem_sel,type_fs);};
dommy$core$listen_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$listen_BANG_.cljs$lang$applyTo = (function (arglist__37590){
var elem_sel = cljs.core.first(arglist__37590);
var type_fs = cljs.core.rest(arglist__37590);
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

var vec__37614_37637 = dommy.core.elem_and_selector(elem_sel);
var elem_37638 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37614_37637,(0),null);
var selector_37639 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37614_37637,(1),null);
var seq__37615_37640 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),type_fs));
var chunk__37622_37641 = null;
var count__37623_37642 = (0);
var i__37624_37643 = (0);
while(true){
if((i__37624_37643 < count__37623_37642)){
var vec__37631_37644 = chunk__37622_37641.cljs$core$IIndexed$_nth$arity$2(null,i__37624_37643);
var orig_type_37645 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37631_37644,(0),null);
var f_37646 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37631_37644,(1),null);
var seq__37625_37647 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$3(dommy.core.special_listener_makers,orig_type_37645,new cljs.core.PersistentArrayMap.fromArray([orig_type_37645,cljs.core.identity], true, false)));
var chunk__37627_37648 = null;
var count__37628_37649 = (0);
var i__37629_37650 = (0);
while(true){
if((i__37629_37650 < count__37628_37649)){
var vec__37632_37651 = chunk__37627_37648.cljs$core$IIndexed$_nth$arity$2(null,i__37629_37650);
var actual_type_37652 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37632_37651,(0),null);
var __37653 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37632_37651,(1),null);
var keys_37654 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37639,actual_type_37652,f_37646], null);
var canonical_f_37655 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(dommy.core.event_listeners(elem_37638),keys_37654);
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37638,dommy.utils.dissoc_in,cljs.core.array_seq([keys_37654], 0));

if(cljs.core.truth_(elem_37638.removeEventListener)){
elem_37638.removeEventListener(cljs.core.name(actual_type_37652),canonical_f_37655);
} else {
elem_37638.detachEvent(cljs.core.name(actual_type_37652),canonical_f_37655);
}

var G__37656 = seq__37625_37647;
var G__37657 = chunk__37627_37648;
var G__37658 = count__37628_37649;
var G__37659 = (i__37629_37650 + (1));
seq__37625_37647 = G__37656;
chunk__37627_37648 = G__37657;
count__37628_37649 = G__37658;
i__37629_37650 = G__37659;
continue;
} else {
var temp__4126__auto___37660 = cljs.core.seq(seq__37625_37647);
if(temp__4126__auto___37660){
var seq__37625_37661__$1 = temp__4126__auto___37660;
if(cljs.core.chunked_seq_QMARK_(seq__37625_37661__$1)){
var c__24962__auto___37662 = cljs.core.chunk_first(seq__37625_37661__$1);
var G__37663 = cljs.core.chunk_rest(seq__37625_37661__$1);
var G__37664 = c__24962__auto___37662;
var G__37665 = cljs.core.count(c__24962__auto___37662);
var G__37666 = (0);
seq__37625_37647 = G__37663;
chunk__37627_37648 = G__37664;
count__37628_37649 = G__37665;
i__37629_37650 = G__37666;
continue;
} else {
var vec__37633_37667 = cljs.core.first(seq__37625_37661__$1);
var actual_type_37668 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37633_37667,(0),null);
var __37669 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37633_37667,(1),null);
var keys_37670 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37639,actual_type_37668,f_37646], null);
var canonical_f_37671 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(dommy.core.event_listeners(elem_37638),keys_37670);
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37638,dommy.utils.dissoc_in,cljs.core.array_seq([keys_37670], 0));

if(cljs.core.truth_(elem_37638.removeEventListener)){
elem_37638.removeEventListener(cljs.core.name(actual_type_37668),canonical_f_37671);
} else {
elem_37638.detachEvent(cljs.core.name(actual_type_37668),canonical_f_37671);
}

var G__37672 = cljs.core.next(seq__37625_37661__$1);
var G__37673 = null;
var G__37674 = (0);
var G__37675 = (0);
seq__37625_37647 = G__37672;
chunk__37627_37648 = G__37673;
count__37628_37649 = G__37674;
i__37629_37650 = G__37675;
continue;
}
} else {
}
}
break;
}

var G__37676 = seq__37615_37640;
var G__37677 = chunk__37622_37641;
var G__37678 = count__37623_37642;
var G__37679 = (i__37624_37643 + (1));
seq__37615_37640 = G__37676;
chunk__37622_37641 = G__37677;
count__37623_37642 = G__37678;
i__37624_37643 = G__37679;
continue;
} else {
var temp__4126__auto___37680 = cljs.core.seq(seq__37615_37640);
if(temp__4126__auto___37680){
var seq__37615_37681__$1 = temp__4126__auto___37680;
if(cljs.core.chunked_seq_QMARK_(seq__37615_37681__$1)){
var c__24962__auto___37682 = cljs.core.chunk_first(seq__37615_37681__$1);
var G__37683 = cljs.core.chunk_rest(seq__37615_37681__$1);
var G__37684 = c__24962__auto___37682;
var G__37685 = cljs.core.count(c__24962__auto___37682);
var G__37686 = (0);
seq__37615_37640 = G__37683;
chunk__37622_37641 = G__37684;
count__37623_37642 = G__37685;
i__37624_37643 = G__37686;
continue;
} else {
var vec__37634_37687 = cljs.core.first(seq__37615_37681__$1);
var orig_type_37688 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37634_37687,(0),null);
var f_37689 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37634_37687,(1),null);
var seq__37616_37690 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$3(dommy.core.special_listener_makers,orig_type_37688,new cljs.core.PersistentArrayMap.fromArray([orig_type_37688,cljs.core.identity], true, false)));
var chunk__37618_37691 = null;
var count__37619_37692 = (0);
var i__37620_37693 = (0);
while(true){
if((i__37620_37693 < count__37619_37692)){
var vec__37635_37694 = chunk__37618_37691.cljs$core$IIndexed$_nth$arity$2(null,i__37620_37693);
var actual_type_37695 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37635_37694,(0),null);
var __37696 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37635_37694,(1),null);
var keys_37697 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37639,actual_type_37695,f_37689], null);
var canonical_f_37698 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(dommy.core.event_listeners(elem_37638),keys_37697);
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37638,dommy.utils.dissoc_in,cljs.core.array_seq([keys_37697], 0));

if(cljs.core.truth_(elem_37638.removeEventListener)){
elem_37638.removeEventListener(cljs.core.name(actual_type_37695),canonical_f_37698);
} else {
elem_37638.detachEvent(cljs.core.name(actual_type_37695),canonical_f_37698);
}

var G__37699 = seq__37616_37690;
var G__37700 = chunk__37618_37691;
var G__37701 = count__37619_37692;
var G__37702 = (i__37620_37693 + (1));
seq__37616_37690 = G__37699;
chunk__37618_37691 = G__37700;
count__37619_37692 = G__37701;
i__37620_37693 = G__37702;
continue;
} else {
var temp__4126__auto___37703__$1 = cljs.core.seq(seq__37616_37690);
if(temp__4126__auto___37703__$1){
var seq__37616_37704__$1 = temp__4126__auto___37703__$1;
if(cljs.core.chunked_seq_QMARK_(seq__37616_37704__$1)){
var c__24962__auto___37705 = cljs.core.chunk_first(seq__37616_37704__$1);
var G__37706 = cljs.core.chunk_rest(seq__37616_37704__$1);
var G__37707 = c__24962__auto___37705;
var G__37708 = cljs.core.count(c__24962__auto___37705);
var G__37709 = (0);
seq__37616_37690 = G__37706;
chunk__37618_37691 = G__37707;
count__37619_37692 = G__37708;
i__37620_37693 = G__37709;
continue;
} else {
var vec__37636_37710 = cljs.core.first(seq__37616_37704__$1);
var actual_type_37711 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37636_37710,(0),null);
var __37712 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37636_37710,(1),null);
var keys_37713 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37639,actual_type_37711,f_37689], null);
var canonical_f_37714 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(dommy.core.event_listeners(elem_37638),keys_37713);
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37638,dommy.utils.dissoc_in,cljs.core.array_seq([keys_37713], 0));

if(cljs.core.truth_(elem_37638.removeEventListener)){
elem_37638.removeEventListener(cljs.core.name(actual_type_37711),canonical_f_37714);
} else {
elem_37638.detachEvent(cljs.core.name(actual_type_37711),canonical_f_37714);
}

var G__37715 = cljs.core.next(seq__37616_37704__$1);
var G__37716 = null;
var G__37717 = (0);
var G__37718 = (0);
seq__37616_37690 = G__37715;
chunk__37618_37691 = G__37716;
count__37619_37692 = G__37717;
i__37620_37693 = G__37718;
continue;
}
} else {
}
}
break;
}

var G__37719 = cljs.core.next(seq__37615_37681__$1);
var G__37720 = null;
var G__37721 = (0);
var G__37722 = (0);
seq__37615_37640 = G__37719;
chunk__37622_37641 = G__37720;
count__37623_37642 = G__37721;
i__37624_37643 = G__37722;
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
var G__37723__i = 0, G__37723__a = new Array(arguments.length -  1);
while (G__37723__i < G__37723__a.length) {G__37723__a[G__37723__i] = arguments[G__37723__i + 1]; ++G__37723__i;}
  type_fs = new cljs.core.IndexedSeq(G__37723__a,0);
} 
return dommy$core$unlisten_BANG___delegate.call(this,elem_sel,type_fs);};
dommy$core$unlisten_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$unlisten_BANG_.cljs$lang$applyTo = (function (arglist__37724){
var elem_sel = cljs.core.first(arglist__37724);
var type_fs = cljs.core.rest(arglist__37724);
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

var vec__37736_37747 = dommy.core.elem_and_selector(elem_sel);
var elem_37748 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37736_37747,(0),null);
var selector_37749 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37736_37747,(1),null);
var seq__37737_37750 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),type_fs));
var chunk__37738_37751 = null;
var count__37739_37752 = (0);
var i__37740_37753 = (0);
while(true){
if((i__37740_37753 < count__37739_37752)){
var vec__37741_37754 = chunk__37738_37751.cljs$core$IIndexed$_nth$arity$2(null,i__37740_37753);
var type_37755 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37741_37754,(0),null);
var f_37756 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37741_37754,(1),null);
dommy.core.listen_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_sel,cljs.core.array_seq([type_37755,((function (seq__37737_37750,chunk__37738_37751,count__37739_37752,i__37740_37753,vec__37741_37754,type_37755,f_37756,vec__37736_37747,elem_37748,selector_37749){
return (function dommy$core$listen_once_BANG__$_this_fn(e){
dommy.core.unlisten_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_sel,cljs.core.array_seq([type_37755,dommy$core$listen_once_BANG__$_this_fn], 0));

var G__37743 = e;
return (f_37756.cljs$core$IFn$_invoke$arity$1 ? f_37756.cljs$core$IFn$_invoke$arity$1(G__37743) : f_37756.call(null,G__37743));
});})(seq__37737_37750,chunk__37738_37751,count__37739_37752,i__37740_37753,vec__37741_37754,type_37755,f_37756,vec__37736_37747,elem_37748,selector_37749))
], 0));

var G__37757 = seq__37737_37750;
var G__37758 = chunk__37738_37751;
var G__37759 = count__37739_37752;
var G__37760 = (i__37740_37753 + (1));
seq__37737_37750 = G__37757;
chunk__37738_37751 = G__37758;
count__37739_37752 = G__37759;
i__37740_37753 = G__37760;
continue;
} else {
var temp__4126__auto___37761 = cljs.core.seq(seq__37737_37750);
if(temp__4126__auto___37761){
var seq__37737_37762__$1 = temp__4126__auto___37761;
if(cljs.core.chunked_seq_QMARK_(seq__37737_37762__$1)){
var c__24962__auto___37763 = cljs.core.chunk_first(seq__37737_37762__$1);
var G__37764 = cljs.core.chunk_rest(seq__37737_37762__$1);
var G__37765 = c__24962__auto___37763;
var G__37766 = cljs.core.count(c__24962__auto___37763);
var G__37767 = (0);
seq__37737_37750 = G__37764;
chunk__37738_37751 = G__37765;
count__37739_37752 = G__37766;
i__37740_37753 = G__37767;
continue;
} else {
var vec__37744_37768 = cljs.core.first(seq__37737_37762__$1);
var type_37769 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37744_37768,(0),null);
var f_37770 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37744_37768,(1),null);
dommy.core.listen_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_sel,cljs.core.array_seq([type_37769,((function (seq__37737_37750,chunk__37738_37751,count__37739_37752,i__37740_37753,vec__37744_37768,type_37769,f_37770,seq__37737_37762__$1,temp__4126__auto___37761,vec__37736_37747,elem_37748,selector_37749){
return (function dommy$core$listen_once_BANG__$_this_fn(e){
dommy.core.unlisten_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_sel,cljs.core.array_seq([type_37769,dommy$core$listen_once_BANG__$_this_fn], 0));

var G__37746 = e;
return (f_37770.cljs$core$IFn$_invoke$arity$1 ? f_37770.cljs$core$IFn$_invoke$arity$1(G__37746) : f_37770.call(null,G__37746));
});})(seq__37737_37750,chunk__37738_37751,count__37739_37752,i__37740_37753,vec__37744_37768,type_37769,f_37770,seq__37737_37762__$1,temp__4126__auto___37761,vec__37736_37747,elem_37748,selector_37749))
], 0));

var G__37771 = cljs.core.next(seq__37737_37762__$1);
var G__37772 = null;
var G__37773 = (0);
var G__37774 = (0);
seq__37737_37750 = G__37771;
chunk__37738_37751 = G__37772;
count__37739_37752 = G__37773;
i__37740_37753 = G__37774;
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
var G__37775__i = 0, G__37775__a = new Array(arguments.length -  1);
while (G__37775__i < G__37775__a.length) {G__37775__a[G__37775__i] = arguments[G__37775__i + 1]; ++G__37775__i;}
  type_fs = new cljs.core.IndexedSeq(G__37775__a,0);
} 
return dommy$core$listen_once_BANG___delegate.call(this,elem_sel,type_fs);};
dommy$core$listen_once_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$listen_once_BANG_.cljs$lang$applyTo = (function (arglist__37776){
var elem_sel = cljs.core.first(arglist__37776);
var type_fs = cljs.core.rest(arglist__37776);
return dommy$core$listen_once_BANG___delegate(elem_sel,type_fs);
});
dommy$core$listen_once_BANG_.cljs$core$IFn$_invoke$arity$variadic = dommy$core$listen_once_BANG___delegate;
return dommy$core$listen_once_BANG_;
})()
;
