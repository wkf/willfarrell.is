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
var G__36817 = pixels;
return parseInt(G__36817);
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
return cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(dommy.core.matches_pred.cljs$core$IFn$_invoke$arity$2(base,selector),cljs.core.take_while.cljs$core$IFn$_invoke$arity$2((function (p1__36820_SHARP_){
return !((p1__36820_SHARP_ === base));
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
var seq__36830_36836 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),kvs));
var chunk__36831_36837 = null;
var count__36832_36838 = (0);
var i__36833_36839 = (0);
while(true){
if((i__36833_36839 < count__36832_36838)){
var vec__36834_36840 = chunk__36831_36837.cljs$core$IIndexed$_nth$arity$2(null,i__36833_36839);
var k_36841 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36834_36840,(0),null);
var v_36842 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36834_36840,(1),null);
style.setProperty(dommy.utils.as_str(k_36841),v_36842);

var G__36843 = seq__36830_36836;
var G__36844 = chunk__36831_36837;
var G__36845 = count__36832_36838;
var G__36846 = (i__36833_36839 + (1));
seq__36830_36836 = G__36843;
chunk__36831_36837 = G__36844;
count__36832_36838 = G__36845;
i__36833_36839 = G__36846;
continue;
} else {
var temp__4126__auto___36847 = cljs.core.seq(seq__36830_36836);
if(temp__4126__auto___36847){
var seq__36830_36848__$1 = temp__4126__auto___36847;
if(cljs.core.chunked_seq_QMARK_(seq__36830_36848__$1)){
var c__24962__auto___36849 = cljs.core.chunk_first(seq__36830_36848__$1);
var G__36850 = cljs.core.chunk_rest(seq__36830_36848__$1);
var G__36851 = c__24962__auto___36849;
var G__36852 = cljs.core.count(c__24962__auto___36849);
var G__36853 = (0);
seq__36830_36836 = G__36850;
chunk__36831_36837 = G__36851;
count__36832_36838 = G__36852;
i__36833_36839 = G__36853;
continue;
} else {
var vec__36835_36854 = cljs.core.first(seq__36830_36848__$1);
var k_36855 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36835_36854,(0),null);
var v_36856 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36835_36854,(1),null);
style.setProperty(dommy.utils.as_str(k_36855),v_36856);

var G__36857 = cljs.core.next(seq__36830_36848__$1);
var G__36858 = null;
var G__36859 = (0);
var G__36860 = (0);
seq__36830_36836 = G__36857;
chunk__36831_36837 = G__36858;
count__36832_36838 = G__36859;
i__36833_36839 = G__36860;
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
var G__36861__i = 0, G__36861__a = new Array(arguments.length -  1);
while (G__36861__i < G__36861__a.length) {G__36861__a[G__36861__i] = arguments[G__36861__i + 1]; ++G__36861__i;}
  kvs = new cljs.core.IndexedSeq(G__36861__a,0);
} 
return dommy$core$set_style_BANG___delegate.call(this,elem,kvs);};
dommy$core$set_style_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$set_style_BANG_.cljs$lang$applyTo = (function (arglist__36862){
var elem = cljs.core.first(arglist__36862);
var kvs = cljs.core.rest(arglist__36862);
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

var seq__36869_36875 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),kvs));
var chunk__36870_36876 = null;
var count__36871_36877 = (0);
var i__36872_36878 = (0);
while(true){
if((i__36872_36878 < count__36871_36877)){
var vec__36873_36879 = chunk__36870_36876.cljs$core$IIndexed$_nth$arity$2(null,i__36872_36878);
var k_36880 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36873_36879,(0),null);
var v_36881 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36873_36879,(1),null);
dommy.core.set_style_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem,cljs.core.array_seq([k_36880,[cljs.core.str(v_36881),cljs.core.str("px")].join('')], 0));

var G__36882 = seq__36869_36875;
var G__36883 = chunk__36870_36876;
var G__36884 = count__36871_36877;
var G__36885 = (i__36872_36878 + (1));
seq__36869_36875 = G__36882;
chunk__36870_36876 = G__36883;
count__36871_36877 = G__36884;
i__36872_36878 = G__36885;
continue;
} else {
var temp__4126__auto___36886 = cljs.core.seq(seq__36869_36875);
if(temp__4126__auto___36886){
var seq__36869_36887__$1 = temp__4126__auto___36886;
if(cljs.core.chunked_seq_QMARK_(seq__36869_36887__$1)){
var c__24962__auto___36888 = cljs.core.chunk_first(seq__36869_36887__$1);
var G__36889 = cljs.core.chunk_rest(seq__36869_36887__$1);
var G__36890 = c__24962__auto___36888;
var G__36891 = cljs.core.count(c__24962__auto___36888);
var G__36892 = (0);
seq__36869_36875 = G__36889;
chunk__36870_36876 = G__36890;
count__36871_36877 = G__36891;
i__36872_36878 = G__36892;
continue;
} else {
var vec__36874_36893 = cljs.core.first(seq__36869_36887__$1);
var k_36894 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36874_36893,(0),null);
var v_36895 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36874_36893,(1),null);
dommy.core.set_style_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem,cljs.core.array_seq([k_36894,[cljs.core.str(v_36895),cljs.core.str("px")].join('')], 0));

var G__36896 = cljs.core.next(seq__36869_36887__$1);
var G__36897 = null;
var G__36898 = (0);
var G__36899 = (0);
seq__36869_36875 = G__36896;
chunk__36870_36876 = G__36897;
count__36871_36877 = G__36898;
i__36872_36878 = G__36899;
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
var G__36900__i = 0, G__36900__a = new Array(arguments.length -  1);
while (G__36900__i < G__36900__a.length) {G__36900__a[G__36900__i] = arguments[G__36900__i + 1]; ++G__36900__i;}
  kvs = new cljs.core.IndexedSeq(G__36900__a,0);
} 
return dommy$core$set_px_BANG___delegate.call(this,elem,kvs);};
dommy$core$set_px_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$set_px_BANG_.cljs$lang$applyTo = (function (arglist__36901){
var elem = cljs.core.first(arglist__36901);
var kvs = cljs.core.rest(arglist__36901);
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
var G__36919 = elem;
(G__36919[k__$1] = v);

return G__36919;
} else {
var G__36920 = elem;
G__36920.setAttribute(k__$1,v);

return G__36920;
}
} else {
return null;
}
});
var dommy$core$set_attr_BANG___4 = (function() { 
var G__36927__delegate = function (elem,k,v,kvs){
if(cljs.core.even_QMARK_(cljs.core.count(kvs))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1827825394,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-514511684,null),new cljs.core.Symbol(null,"kvs","kvs",-1695980277,null)))], 0)))].join('')));
}

var seq__36921_36928 = cljs.core.seq(cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null),cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),kvs)));
var chunk__36922_36929 = null;
var count__36923_36930 = (0);
var i__36924_36931 = (0);
while(true){
if((i__36924_36931 < count__36923_36930)){
var vec__36925_36932 = chunk__36922_36929.cljs$core$IIndexed$_nth$arity$2(null,i__36924_36931);
var k_36933__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36925_36932,(0),null);
var v_36934__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36925_36932,(1),null);
dommy$core$set_attr_BANG_.cljs$core$IFn$_invoke$arity$3(elem,k_36933__$1,v_36934__$1);

var G__36935 = seq__36921_36928;
var G__36936 = chunk__36922_36929;
var G__36937 = count__36923_36930;
var G__36938 = (i__36924_36931 + (1));
seq__36921_36928 = G__36935;
chunk__36922_36929 = G__36936;
count__36923_36930 = G__36937;
i__36924_36931 = G__36938;
continue;
} else {
var temp__4126__auto___36939 = cljs.core.seq(seq__36921_36928);
if(temp__4126__auto___36939){
var seq__36921_36940__$1 = temp__4126__auto___36939;
if(cljs.core.chunked_seq_QMARK_(seq__36921_36940__$1)){
var c__24962__auto___36941 = cljs.core.chunk_first(seq__36921_36940__$1);
var G__36942 = cljs.core.chunk_rest(seq__36921_36940__$1);
var G__36943 = c__24962__auto___36941;
var G__36944 = cljs.core.count(c__24962__auto___36941);
var G__36945 = (0);
seq__36921_36928 = G__36942;
chunk__36922_36929 = G__36943;
count__36923_36930 = G__36944;
i__36924_36931 = G__36945;
continue;
} else {
var vec__36926_36946 = cljs.core.first(seq__36921_36940__$1);
var k_36947__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36926_36946,(0),null);
var v_36948__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36926_36946,(1),null);
dommy$core$set_attr_BANG_.cljs$core$IFn$_invoke$arity$3(elem,k_36947__$1,v_36948__$1);

var G__36949 = cljs.core.next(seq__36921_36940__$1);
var G__36950 = null;
var G__36951 = (0);
var G__36952 = (0);
seq__36921_36928 = G__36949;
chunk__36922_36929 = G__36950;
count__36923_36930 = G__36951;
i__36924_36931 = G__36952;
continue;
}
} else {
}
}
break;
}

return elem;
};
var G__36927 = function (elem,k,v,var_args){
var kvs = null;
if (arguments.length > 3) {
var G__36953__i = 0, G__36953__a = new Array(arguments.length -  3);
while (G__36953__i < G__36953__a.length) {G__36953__a[G__36953__i] = arguments[G__36953__i + 3]; ++G__36953__i;}
  kvs = new cljs.core.IndexedSeq(G__36953__a,0);
} 
return G__36927__delegate.call(this,elem,k,v,kvs);};
G__36927.cljs$lang$maxFixedArity = 3;
G__36927.cljs$lang$applyTo = (function (arglist__36954){
var elem = cljs.core.first(arglist__36954);
arglist__36954 = cljs.core.next(arglist__36954);
var k = cljs.core.first(arglist__36954);
arglist__36954 = cljs.core.next(arglist__36954);
var v = cljs.core.first(arglist__36954);
var kvs = cljs.core.rest(arglist__36954);
return G__36927__delegate(elem,k,v,kvs);
});
G__36927.cljs$core$IFn$_invoke$arity$variadic = G__36927__delegate;
return G__36927;
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
var G__36955 = null;
if (arguments.length > 3) {
var G__36956__i = 0, G__36956__a = new Array(arguments.length -  3);
while (G__36956__i < G__36956__a.length) {G__36956__a[G__36956__i] = arguments[G__36956__i + 3]; ++G__36956__i;}
G__36955 = new cljs.core.IndexedSeq(G__36956__a,0);
}
return dommy$core$set_attr_BANG___4.cljs$core$IFn$_invoke$arity$variadic(elem,k,v, G__36955);
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
var k_36969__$1 = dommy.utils.as_str(k);
if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["class",null,"classes",null], null), null).call(null,k_36969__$1))){
dommy.core.set_class_BANG_(elem,"");
} else {
elem.removeAttribute(k_36969__$1);
}

return elem;
});
var dommy$core$remove_attr_BANG___3 = (function() { 
var G__36970__delegate = function (elem,k,ks){
var seq__36965_36971 = cljs.core.seq(cljs.core.cons(k,ks));
var chunk__36966_36972 = null;
var count__36967_36973 = (0);
var i__36968_36974 = (0);
while(true){
if((i__36968_36974 < count__36967_36973)){
var k_36975__$1 = chunk__36966_36972.cljs$core$IIndexed$_nth$arity$2(null,i__36968_36974);
dommy$core$remove_attr_BANG_.cljs$core$IFn$_invoke$arity$2(elem,k_36975__$1);

var G__36976 = seq__36965_36971;
var G__36977 = chunk__36966_36972;
var G__36978 = count__36967_36973;
var G__36979 = (i__36968_36974 + (1));
seq__36965_36971 = G__36976;
chunk__36966_36972 = G__36977;
count__36967_36973 = G__36978;
i__36968_36974 = G__36979;
continue;
} else {
var temp__4126__auto___36980 = cljs.core.seq(seq__36965_36971);
if(temp__4126__auto___36980){
var seq__36965_36981__$1 = temp__4126__auto___36980;
if(cljs.core.chunked_seq_QMARK_(seq__36965_36981__$1)){
var c__24962__auto___36982 = cljs.core.chunk_first(seq__36965_36981__$1);
var G__36983 = cljs.core.chunk_rest(seq__36965_36981__$1);
var G__36984 = c__24962__auto___36982;
var G__36985 = cljs.core.count(c__24962__auto___36982);
var G__36986 = (0);
seq__36965_36971 = G__36983;
chunk__36966_36972 = G__36984;
count__36967_36973 = G__36985;
i__36968_36974 = G__36986;
continue;
} else {
var k_36987__$1 = cljs.core.first(seq__36965_36981__$1);
dommy$core$remove_attr_BANG_.cljs$core$IFn$_invoke$arity$2(elem,k_36987__$1);

var G__36988 = cljs.core.next(seq__36965_36981__$1);
var G__36989 = null;
var G__36990 = (0);
var G__36991 = (0);
seq__36965_36971 = G__36988;
chunk__36966_36972 = G__36989;
count__36967_36973 = G__36990;
i__36968_36974 = G__36991;
continue;
}
} else {
}
}
break;
}

return elem;
};
var G__36970 = function (elem,k,var_args){
var ks = null;
if (arguments.length > 2) {
var G__36992__i = 0, G__36992__a = new Array(arguments.length -  2);
while (G__36992__i < G__36992__a.length) {G__36992__a[G__36992__i] = arguments[G__36992__i + 2]; ++G__36992__i;}
  ks = new cljs.core.IndexedSeq(G__36992__a,0);
} 
return G__36970__delegate.call(this,elem,k,ks);};
G__36970.cljs$lang$maxFixedArity = 2;
G__36970.cljs$lang$applyTo = (function (arglist__36993){
var elem = cljs.core.first(arglist__36993);
arglist__36993 = cljs.core.next(arglist__36993);
var k = cljs.core.first(arglist__36993);
var ks = cljs.core.rest(arglist__36993);
return G__36970__delegate(elem,k,ks);
});
G__36970.cljs$core$IFn$_invoke$arity$variadic = G__36970__delegate;
return G__36970;
})()
;
dommy$core$remove_attr_BANG_ = function(elem,k,var_args){
var ks = var_args;
switch(arguments.length){
case 2:
return dommy$core$remove_attr_BANG___2.call(this,elem,k);
default:
var G__36994 = null;
if (arguments.length > 2) {
var G__36995__i = 0, G__36995__a = new Array(arguments.length -  2);
while (G__36995__i < G__36995__a.length) {G__36995__a[G__36995__i] = arguments[G__36995__i + 2]; ++G__36995__i;}
G__36994 = new cljs.core.IndexedSeq(G__36995__a,0);
}
return dommy$core$remove_attr_BANG___3.cljs$core$IFn$_invoke$arity$variadic(elem,k, G__36994);
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
var temp__4124__auto___37027 = elem.classList;
if(cljs.core.truth_(temp__4124__auto___37027)){
var class_list_37028 = temp__4124__auto___37027;
var seq__37015_37029 = cljs.core.seq(classes__$1);
var chunk__37016_37030 = null;
var count__37017_37031 = (0);
var i__37018_37032 = (0);
while(true){
if((i__37018_37032 < count__37017_37031)){
var c_37033 = chunk__37016_37030.cljs$core$IIndexed$_nth$arity$2(null,i__37018_37032);
class_list_37028.add(c_37033);

var G__37034 = seq__37015_37029;
var G__37035 = chunk__37016_37030;
var G__37036 = count__37017_37031;
var G__37037 = (i__37018_37032 + (1));
seq__37015_37029 = G__37034;
chunk__37016_37030 = G__37035;
count__37017_37031 = G__37036;
i__37018_37032 = G__37037;
continue;
} else {
var temp__4126__auto___37038 = cljs.core.seq(seq__37015_37029);
if(temp__4126__auto___37038){
var seq__37015_37039__$1 = temp__4126__auto___37038;
if(cljs.core.chunked_seq_QMARK_(seq__37015_37039__$1)){
var c__24962__auto___37040 = cljs.core.chunk_first(seq__37015_37039__$1);
var G__37041 = cljs.core.chunk_rest(seq__37015_37039__$1);
var G__37042 = c__24962__auto___37040;
var G__37043 = cljs.core.count(c__24962__auto___37040);
var G__37044 = (0);
seq__37015_37029 = G__37041;
chunk__37016_37030 = G__37042;
count__37017_37031 = G__37043;
i__37018_37032 = G__37044;
continue;
} else {
var c_37045 = cljs.core.first(seq__37015_37039__$1);
class_list_37028.add(c_37045);

var G__37046 = cljs.core.next(seq__37015_37039__$1);
var G__37047 = null;
var G__37048 = (0);
var G__37049 = (0);
seq__37015_37029 = G__37046;
chunk__37016_37030 = G__37047;
count__37017_37031 = G__37048;
i__37018_37032 = G__37049;
continue;
}
} else {
}
}
break;
}
} else {
var seq__37019_37050 = cljs.core.seq(classes__$1);
var chunk__37020_37051 = null;
var count__37021_37052 = (0);
var i__37022_37053 = (0);
while(true){
if((i__37022_37053 < count__37021_37052)){
var c_37054 = chunk__37020_37051.cljs$core$IIndexed$_nth$arity$2(null,i__37022_37053);
var class_name_37055 = dommy.core.class$(elem);
if(cljs.core.truth_(dommy.utils.class_index(class_name_37055,c_37054))){
} else {
dommy.core.set_class_BANG_(elem,(((class_name_37055 === ""))?c_37054:[cljs.core.str(class_name_37055),cljs.core.str(" "),cljs.core.str(c_37054)].join('')));
}

var G__37056 = seq__37019_37050;
var G__37057 = chunk__37020_37051;
var G__37058 = count__37021_37052;
var G__37059 = (i__37022_37053 + (1));
seq__37019_37050 = G__37056;
chunk__37020_37051 = G__37057;
count__37021_37052 = G__37058;
i__37022_37053 = G__37059;
continue;
} else {
var temp__4126__auto___37060 = cljs.core.seq(seq__37019_37050);
if(temp__4126__auto___37060){
var seq__37019_37061__$1 = temp__4126__auto___37060;
if(cljs.core.chunked_seq_QMARK_(seq__37019_37061__$1)){
var c__24962__auto___37062 = cljs.core.chunk_first(seq__37019_37061__$1);
var G__37063 = cljs.core.chunk_rest(seq__37019_37061__$1);
var G__37064 = c__24962__auto___37062;
var G__37065 = cljs.core.count(c__24962__auto___37062);
var G__37066 = (0);
seq__37019_37050 = G__37063;
chunk__37020_37051 = G__37064;
count__37021_37052 = G__37065;
i__37022_37053 = G__37066;
continue;
} else {
var c_37067 = cljs.core.first(seq__37019_37061__$1);
var class_name_37068 = dommy.core.class$(elem);
if(cljs.core.truth_(dommy.utils.class_index(class_name_37068,c_37067))){
} else {
dommy.core.set_class_BANG_(elem,(((class_name_37068 === ""))?c_37067:[cljs.core.str(class_name_37068),cljs.core.str(" "),cljs.core.str(c_37067)].join('')));
}

var G__37069 = cljs.core.next(seq__37019_37061__$1);
var G__37070 = null;
var G__37071 = (0);
var G__37072 = (0);
seq__37019_37050 = G__37069;
chunk__37020_37051 = G__37070;
count__37021_37052 = G__37071;
i__37022_37053 = G__37072;
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
var G__37073__delegate = function (elem,classes,more_classes){
var seq__37023_37074 = cljs.core.seq(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(more_classes,classes));
var chunk__37024_37075 = null;
var count__37025_37076 = (0);
var i__37026_37077 = (0);
while(true){
if((i__37026_37077 < count__37025_37076)){
var c_37078 = chunk__37024_37075.cljs$core$IIndexed$_nth$arity$2(null,i__37026_37077);
dommy$core$add_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem,c_37078);

var G__37079 = seq__37023_37074;
var G__37080 = chunk__37024_37075;
var G__37081 = count__37025_37076;
var G__37082 = (i__37026_37077 + (1));
seq__37023_37074 = G__37079;
chunk__37024_37075 = G__37080;
count__37025_37076 = G__37081;
i__37026_37077 = G__37082;
continue;
} else {
var temp__4126__auto___37083 = cljs.core.seq(seq__37023_37074);
if(temp__4126__auto___37083){
var seq__37023_37084__$1 = temp__4126__auto___37083;
if(cljs.core.chunked_seq_QMARK_(seq__37023_37084__$1)){
var c__24962__auto___37085 = cljs.core.chunk_first(seq__37023_37084__$1);
var G__37086 = cljs.core.chunk_rest(seq__37023_37084__$1);
var G__37087 = c__24962__auto___37085;
var G__37088 = cljs.core.count(c__24962__auto___37085);
var G__37089 = (0);
seq__37023_37074 = G__37086;
chunk__37024_37075 = G__37087;
count__37025_37076 = G__37088;
i__37026_37077 = G__37089;
continue;
} else {
var c_37090 = cljs.core.first(seq__37023_37084__$1);
dommy$core$add_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem,c_37090);

var G__37091 = cljs.core.next(seq__37023_37084__$1);
var G__37092 = null;
var G__37093 = (0);
var G__37094 = (0);
seq__37023_37074 = G__37091;
chunk__37024_37075 = G__37092;
count__37025_37076 = G__37093;
i__37026_37077 = G__37094;
continue;
}
} else {
}
}
break;
}

return elem;
};
var G__37073 = function (elem,classes,var_args){
var more_classes = null;
if (arguments.length > 2) {
var G__37095__i = 0, G__37095__a = new Array(arguments.length -  2);
while (G__37095__i < G__37095__a.length) {G__37095__a[G__37095__i] = arguments[G__37095__i + 2]; ++G__37095__i;}
  more_classes = new cljs.core.IndexedSeq(G__37095__a,0);
} 
return G__37073__delegate.call(this,elem,classes,more_classes);};
G__37073.cljs$lang$maxFixedArity = 2;
G__37073.cljs$lang$applyTo = (function (arglist__37096){
var elem = cljs.core.first(arglist__37096);
arglist__37096 = cljs.core.next(arglist__37096);
var classes = cljs.core.first(arglist__37096);
var more_classes = cljs.core.rest(arglist__37096);
return G__37073__delegate(elem,classes,more_classes);
});
G__37073.cljs$core$IFn$_invoke$arity$variadic = G__37073__delegate;
return G__37073;
})()
;
dommy$core$add_class_BANG_ = function(elem,classes,var_args){
var more_classes = var_args;
switch(arguments.length){
case 2:
return dommy$core$add_class_BANG___2.call(this,elem,classes);
default:
var G__37097 = null;
if (arguments.length > 2) {
var G__37098__i = 0, G__37098__a = new Array(arguments.length -  2);
while (G__37098__i < G__37098__a.length) {G__37098__a[G__37098__i] = arguments[G__37098__i + 2]; ++G__37098__i;}
G__37097 = new cljs.core.IndexedSeq(G__37098__a,0);
}
return dommy$core$add_class_BANG___3.cljs$core$IFn$_invoke$arity$variadic(elem,classes, G__37097);
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
var temp__4124__auto___37111 = elem.classList;
if(cljs.core.truth_(temp__4124__auto___37111)){
var class_list_37112 = temp__4124__auto___37111;
class_list_37112.remove(c__$1);
} else {
var class_name_37113 = dommy.core.class$(elem);
var new_class_name_37114 = dommy.utils.remove_class_str(class_name_37113,c__$1);
if((class_name_37113 === new_class_name_37114)){
} else {
dommy.core.set_class_BANG_(elem,new_class_name_37114);
}
}

return elem;
});
var dommy$core$remove_class_BANG___3 = (function() { 
var G__37115__delegate = function (elem,class$,classes){
var seq__37107 = cljs.core.seq(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(classes,class$));
var chunk__37108 = null;
var count__37109 = (0);
var i__37110 = (0);
while(true){
if((i__37110 < count__37109)){
var c = chunk__37108.cljs$core$IIndexed$_nth$arity$2(null,i__37110);
dommy$core$remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem,c);

var G__37116 = seq__37107;
var G__37117 = chunk__37108;
var G__37118 = count__37109;
var G__37119 = (i__37110 + (1));
seq__37107 = G__37116;
chunk__37108 = G__37117;
count__37109 = G__37118;
i__37110 = G__37119;
continue;
} else {
var temp__4126__auto__ = cljs.core.seq(seq__37107);
if(temp__4126__auto__){
var seq__37107__$1 = temp__4126__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__37107__$1)){
var c__24962__auto__ = cljs.core.chunk_first(seq__37107__$1);
var G__37120 = cljs.core.chunk_rest(seq__37107__$1);
var G__37121 = c__24962__auto__;
var G__37122 = cljs.core.count(c__24962__auto__);
var G__37123 = (0);
seq__37107 = G__37120;
chunk__37108 = G__37121;
count__37109 = G__37122;
i__37110 = G__37123;
continue;
} else {
var c = cljs.core.first(seq__37107__$1);
dommy$core$remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem,c);

var G__37124 = cljs.core.next(seq__37107__$1);
var G__37125 = null;
var G__37126 = (0);
var G__37127 = (0);
seq__37107 = G__37124;
chunk__37108 = G__37125;
count__37109 = G__37126;
i__37110 = G__37127;
continue;
}
} else {
return null;
}
}
break;
}
};
var G__37115 = function (elem,class$,var_args){
var classes = null;
if (arguments.length > 2) {
var G__37128__i = 0, G__37128__a = new Array(arguments.length -  2);
while (G__37128__i < G__37128__a.length) {G__37128__a[G__37128__i] = arguments[G__37128__i + 2]; ++G__37128__i;}
  classes = new cljs.core.IndexedSeq(G__37128__a,0);
} 
return G__37115__delegate.call(this,elem,class$,classes);};
G__37115.cljs$lang$maxFixedArity = 2;
G__37115.cljs$lang$applyTo = (function (arglist__37129){
var elem = cljs.core.first(arglist__37129);
arglist__37129 = cljs.core.next(arglist__37129);
var class$ = cljs.core.first(arglist__37129);
var classes = cljs.core.rest(arglist__37129);
return G__37115__delegate(elem,class$,classes);
});
G__37115.cljs$core$IFn$_invoke$arity$variadic = G__37115__delegate;
return G__37115;
})()
;
dommy$core$remove_class_BANG_ = function(elem,class$,var_args){
var classes = var_args;
switch(arguments.length){
case 2:
return dommy$core$remove_class_BANG___2.call(this,elem,class$);
default:
var G__37130 = null;
if (arguments.length > 2) {
var G__37131__i = 0, G__37131__a = new Array(arguments.length -  2);
while (G__37131__i < G__37131__a.length) {G__37131__a[G__37131__i] = arguments[G__37131__i + 2]; ++G__37131__i;}
G__37130 = new cljs.core.IndexedSeq(G__37131__a,0);
}
return dommy$core$remove_class_BANG___3.cljs$core$IFn$_invoke$arity$variadic(elem,class$, G__37130);
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
var temp__4124__auto___37135 = elem.classList;
if(cljs.core.truth_(temp__4124__auto___37135)){
var class_list_37136 = temp__4124__auto___37135;
class_list_37136.toggle(c__$1);
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
var G__37148 = parent;
G__37148.appendChild(child);

return G__37148;
});
var dommy$core$append_BANG___3 = (function() { 
var G__37153__delegate = function (parent,child,more_children){
var seq__37149_37154 = cljs.core.seq(cljs.core.cons(child,more_children));
var chunk__37150_37155 = null;
var count__37151_37156 = (0);
var i__37152_37157 = (0);
while(true){
if((i__37152_37157 < count__37151_37156)){
var c_37158 = chunk__37150_37155.cljs$core$IIndexed$_nth$arity$2(null,i__37152_37157);
dommy$core$append_BANG_.cljs$core$IFn$_invoke$arity$2(parent,c_37158);

var G__37159 = seq__37149_37154;
var G__37160 = chunk__37150_37155;
var G__37161 = count__37151_37156;
var G__37162 = (i__37152_37157 + (1));
seq__37149_37154 = G__37159;
chunk__37150_37155 = G__37160;
count__37151_37156 = G__37161;
i__37152_37157 = G__37162;
continue;
} else {
var temp__4126__auto___37163 = cljs.core.seq(seq__37149_37154);
if(temp__4126__auto___37163){
var seq__37149_37164__$1 = temp__4126__auto___37163;
if(cljs.core.chunked_seq_QMARK_(seq__37149_37164__$1)){
var c__24962__auto___37165 = cljs.core.chunk_first(seq__37149_37164__$1);
var G__37166 = cljs.core.chunk_rest(seq__37149_37164__$1);
var G__37167 = c__24962__auto___37165;
var G__37168 = cljs.core.count(c__24962__auto___37165);
var G__37169 = (0);
seq__37149_37154 = G__37166;
chunk__37150_37155 = G__37167;
count__37151_37156 = G__37168;
i__37152_37157 = G__37169;
continue;
} else {
var c_37170 = cljs.core.first(seq__37149_37164__$1);
dommy$core$append_BANG_.cljs$core$IFn$_invoke$arity$2(parent,c_37170);

var G__37171 = cljs.core.next(seq__37149_37164__$1);
var G__37172 = null;
var G__37173 = (0);
var G__37174 = (0);
seq__37149_37154 = G__37171;
chunk__37150_37155 = G__37172;
count__37151_37156 = G__37173;
i__37152_37157 = G__37174;
continue;
}
} else {
}
}
break;
}

return parent;
};
var G__37153 = function (parent,child,var_args){
var more_children = null;
if (arguments.length > 2) {
var G__37175__i = 0, G__37175__a = new Array(arguments.length -  2);
while (G__37175__i < G__37175__a.length) {G__37175__a[G__37175__i] = arguments[G__37175__i + 2]; ++G__37175__i;}
  more_children = new cljs.core.IndexedSeq(G__37175__a,0);
} 
return G__37153__delegate.call(this,parent,child,more_children);};
G__37153.cljs$lang$maxFixedArity = 2;
G__37153.cljs$lang$applyTo = (function (arglist__37176){
var parent = cljs.core.first(arglist__37176);
arglist__37176 = cljs.core.next(arglist__37176);
var child = cljs.core.first(arglist__37176);
var more_children = cljs.core.rest(arglist__37176);
return G__37153__delegate(parent,child,more_children);
});
G__37153.cljs$core$IFn$_invoke$arity$variadic = G__37153__delegate;
return G__37153;
})()
;
dommy$core$append_BANG_ = function(parent,child,var_args){
var more_children = var_args;
switch(arguments.length){
case 2:
return dommy$core$append_BANG___2.call(this,parent,child);
default:
var G__37177 = null;
if (arguments.length > 2) {
var G__37178__i = 0, G__37178__a = new Array(arguments.length -  2);
while (G__37178__i < G__37178__a.length) {G__37178__a[G__37178__i] = arguments[G__37178__i + 2]; ++G__37178__i;}
G__37177 = new cljs.core.IndexedSeq(G__37178__a,0);
}
return dommy$core$append_BANG___3.cljs$core$IFn$_invoke$arity$variadic(parent,child, G__37177);
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
var G__37188 = parent;
G__37188.insertBefore(child,parent.firstChild);

return G__37188;
});
var dommy$core$prepend_BANG___3 = (function() { 
var G__37193__delegate = function (parent,child,more_children){
var seq__37189_37194 = cljs.core.seq(cljs.core.cons(child,more_children));
var chunk__37190_37195 = null;
var count__37191_37196 = (0);
var i__37192_37197 = (0);
while(true){
if((i__37192_37197 < count__37191_37196)){
var c_37198 = chunk__37190_37195.cljs$core$IIndexed$_nth$arity$2(null,i__37192_37197);
dommy$core$prepend_BANG_.cljs$core$IFn$_invoke$arity$2(parent,c_37198);

var G__37199 = seq__37189_37194;
var G__37200 = chunk__37190_37195;
var G__37201 = count__37191_37196;
var G__37202 = (i__37192_37197 + (1));
seq__37189_37194 = G__37199;
chunk__37190_37195 = G__37200;
count__37191_37196 = G__37201;
i__37192_37197 = G__37202;
continue;
} else {
var temp__4126__auto___37203 = cljs.core.seq(seq__37189_37194);
if(temp__4126__auto___37203){
var seq__37189_37204__$1 = temp__4126__auto___37203;
if(cljs.core.chunked_seq_QMARK_(seq__37189_37204__$1)){
var c__24962__auto___37205 = cljs.core.chunk_first(seq__37189_37204__$1);
var G__37206 = cljs.core.chunk_rest(seq__37189_37204__$1);
var G__37207 = c__24962__auto___37205;
var G__37208 = cljs.core.count(c__24962__auto___37205);
var G__37209 = (0);
seq__37189_37194 = G__37206;
chunk__37190_37195 = G__37207;
count__37191_37196 = G__37208;
i__37192_37197 = G__37209;
continue;
} else {
var c_37210 = cljs.core.first(seq__37189_37204__$1);
dommy$core$prepend_BANG_.cljs$core$IFn$_invoke$arity$2(parent,c_37210);

var G__37211 = cljs.core.next(seq__37189_37204__$1);
var G__37212 = null;
var G__37213 = (0);
var G__37214 = (0);
seq__37189_37194 = G__37211;
chunk__37190_37195 = G__37212;
count__37191_37196 = G__37213;
i__37192_37197 = G__37214;
continue;
}
} else {
}
}
break;
}

return parent;
};
var G__37193 = function (parent,child,var_args){
var more_children = null;
if (arguments.length > 2) {
var G__37215__i = 0, G__37215__a = new Array(arguments.length -  2);
while (G__37215__i < G__37215__a.length) {G__37215__a[G__37215__i] = arguments[G__37215__i + 2]; ++G__37215__i;}
  more_children = new cljs.core.IndexedSeq(G__37215__a,0);
} 
return G__37193__delegate.call(this,parent,child,more_children);};
G__37193.cljs$lang$maxFixedArity = 2;
G__37193.cljs$lang$applyTo = (function (arglist__37216){
var parent = cljs.core.first(arglist__37216);
arglist__37216 = cljs.core.next(arglist__37216);
var child = cljs.core.first(arglist__37216);
var more_children = cljs.core.rest(arglist__37216);
return G__37193__delegate(parent,child,more_children);
});
G__37193.cljs$core$IFn$_invoke$arity$variadic = G__37193__delegate;
return G__37193;
})()
;
dommy$core$prepend_BANG_ = function(parent,child,var_args){
var more_children = var_args;
switch(arguments.length){
case 2:
return dommy$core$prepend_BANG___2.call(this,parent,child);
default:
var G__37217 = null;
if (arguments.length > 2) {
var G__37218__i = 0, G__37218__a = new Array(arguments.length -  2);
while (G__37218__i < G__37218__a.length) {G__37218__a[G__37218__i] = arguments[G__37218__i + 2]; ++G__37218__i;}
G__37217 = new cljs.core.IndexedSeq(G__37218__a,0);
}
return dommy$core$prepend_BANG___3.cljs$core$IFn$_invoke$arity$variadic(parent,child, G__37217);
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
var temp__4124__auto___37219 = other.nextSibling;
if(cljs.core.truth_(temp__4124__auto___37219)){
var next_37220 = temp__4124__auto___37219;
dommy.core.insert_before_BANG_(elem,next_37220);
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
var G__37224 = p;
G__37224.removeChild(elem);

return G__37224;
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
dommy.core.special_listener_makers = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__37225){
var vec__37226 = p__37225;
var special_mouse_event = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37226,(0),null);
var real_mouse_event = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37226,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [special_mouse_event,new cljs.core.PersistentArrayMap.fromArray([real_mouse_event,((function (vec__37226,special_mouse_event,real_mouse_event){
return (function (f){
return ((function (vec__37226,special_mouse_event,real_mouse_event){
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
var G__37227 = event;
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__37227) : f.call(null,G__37227));
}
});
;})(vec__37226,special_mouse_event,real_mouse_event))
});})(vec__37226,special_mouse_event,real_mouse_event))
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

var G__37229 = event;
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__37229) : f.call(null,G__37229));
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
var G__37230__i = 0, G__37230__a = new Array(arguments.length -  2);
while (G__37230__i < G__37230__a.length) {G__37230__a[G__37230__i] = arguments[G__37230__i + 2]; ++G__37230__i;}
  args = new cljs.core.IndexedSeq(G__37230__a,0);
} 
return dommy$core$update_event_listeners_BANG___delegate.call(this,elem,f,args);};
dommy$core$update_event_listeners_BANG_.cljs$lang$maxFixedArity = 2;
dommy$core$update_event_listeners_BANG_.cljs$lang$applyTo = (function (arglist__37231){
var elem = cljs.core.first(arglist__37231);
arglist__37231 = cljs.core.next(arglist__37231);
var f = cljs.core.first(arglist__37231);
var args = cljs.core.rest(arglist__37231);
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

var vec__37259_37286 = dommy.core.elem_and_selector(elem_sel);
var elem_37287 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37259_37286,(0),null);
var selector_37288 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37259_37286,(1),null);
var seq__37260_37289 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),type_fs));
var chunk__37267_37290 = null;
var count__37268_37291 = (0);
var i__37269_37292 = (0);
while(true){
if((i__37269_37292 < count__37268_37291)){
var vec__37276_37293 = chunk__37267_37290.cljs$core$IIndexed$_nth$arity$2(null,i__37269_37292);
var orig_type_37294 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37276_37293,(0),null);
var f_37295 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37276_37293,(1),null);
var seq__37270_37296 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$3(dommy.core.special_listener_makers,orig_type_37294,new cljs.core.PersistentArrayMap.fromArray([orig_type_37294,cljs.core.identity], true, false)));
var chunk__37272_37297 = null;
var count__37273_37298 = (0);
var i__37274_37299 = (0);
while(true){
if((i__37274_37299 < count__37273_37298)){
var vec__37277_37300 = chunk__37272_37297.cljs$core$IIndexed$_nth$arity$2(null,i__37274_37299);
var actual_type_37301 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37277_37300,(0),null);
var factory_37302 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37277_37300,(1),null);
var canonical_f_37303 = (cljs.core.truth_(selector_37288)?cljs.core.partial.cljs$core$IFn$_invoke$arity$3(dommy.core.live_listener,elem_37287,selector_37288):cljs.core.identity).call(null,(function (){var G__37278 = f_37295;
return (factory_37302.cljs$core$IFn$_invoke$arity$1 ? factory_37302.cljs$core$IFn$_invoke$arity$1(G__37278) : factory_37302.call(null,G__37278));
})());
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37287,cljs.core.assoc_in,cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37288,actual_type_37301,f_37295], null),canonical_f_37303], 0));

if(cljs.core.truth_(elem_37287.addEventListener)){
elem_37287.addEventListener(cljs.core.name(actual_type_37301),canonical_f_37303);
} else {
elem_37287.attachEvent(cljs.core.name(actual_type_37301),canonical_f_37303);
}

var G__37304 = seq__37270_37296;
var G__37305 = chunk__37272_37297;
var G__37306 = count__37273_37298;
var G__37307 = (i__37274_37299 + (1));
seq__37270_37296 = G__37304;
chunk__37272_37297 = G__37305;
count__37273_37298 = G__37306;
i__37274_37299 = G__37307;
continue;
} else {
var temp__4126__auto___37308 = cljs.core.seq(seq__37270_37296);
if(temp__4126__auto___37308){
var seq__37270_37309__$1 = temp__4126__auto___37308;
if(cljs.core.chunked_seq_QMARK_(seq__37270_37309__$1)){
var c__24962__auto___37310 = cljs.core.chunk_first(seq__37270_37309__$1);
var G__37311 = cljs.core.chunk_rest(seq__37270_37309__$1);
var G__37312 = c__24962__auto___37310;
var G__37313 = cljs.core.count(c__24962__auto___37310);
var G__37314 = (0);
seq__37270_37296 = G__37311;
chunk__37272_37297 = G__37312;
count__37273_37298 = G__37313;
i__37274_37299 = G__37314;
continue;
} else {
var vec__37279_37315 = cljs.core.first(seq__37270_37309__$1);
var actual_type_37316 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37279_37315,(0),null);
var factory_37317 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37279_37315,(1),null);
var canonical_f_37318 = (cljs.core.truth_(selector_37288)?cljs.core.partial.cljs$core$IFn$_invoke$arity$3(dommy.core.live_listener,elem_37287,selector_37288):cljs.core.identity).call(null,(function (){var G__37280 = f_37295;
return (factory_37317.cljs$core$IFn$_invoke$arity$1 ? factory_37317.cljs$core$IFn$_invoke$arity$1(G__37280) : factory_37317.call(null,G__37280));
})());
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37287,cljs.core.assoc_in,cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37288,actual_type_37316,f_37295], null),canonical_f_37318], 0));

if(cljs.core.truth_(elem_37287.addEventListener)){
elem_37287.addEventListener(cljs.core.name(actual_type_37316),canonical_f_37318);
} else {
elem_37287.attachEvent(cljs.core.name(actual_type_37316),canonical_f_37318);
}

var G__37319 = cljs.core.next(seq__37270_37309__$1);
var G__37320 = null;
var G__37321 = (0);
var G__37322 = (0);
seq__37270_37296 = G__37319;
chunk__37272_37297 = G__37320;
count__37273_37298 = G__37321;
i__37274_37299 = G__37322;
continue;
}
} else {
}
}
break;
}

var G__37323 = seq__37260_37289;
var G__37324 = chunk__37267_37290;
var G__37325 = count__37268_37291;
var G__37326 = (i__37269_37292 + (1));
seq__37260_37289 = G__37323;
chunk__37267_37290 = G__37324;
count__37268_37291 = G__37325;
i__37269_37292 = G__37326;
continue;
} else {
var temp__4126__auto___37327 = cljs.core.seq(seq__37260_37289);
if(temp__4126__auto___37327){
var seq__37260_37328__$1 = temp__4126__auto___37327;
if(cljs.core.chunked_seq_QMARK_(seq__37260_37328__$1)){
var c__24962__auto___37329 = cljs.core.chunk_first(seq__37260_37328__$1);
var G__37330 = cljs.core.chunk_rest(seq__37260_37328__$1);
var G__37331 = c__24962__auto___37329;
var G__37332 = cljs.core.count(c__24962__auto___37329);
var G__37333 = (0);
seq__37260_37289 = G__37330;
chunk__37267_37290 = G__37331;
count__37268_37291 = G__37332;
i__37269_37292 = G__37333;
continue;
} else {
var vec__37281_37334 = cljs.core.first(seq__37260_37328__$1);
var orig_type_37335 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37281_37334,(0),null);
var f_37336 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37281_37334,(1),null);
var seq__37261_37337 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$3(dommy.core.special_listener_makers,orig_type_37335,new cljs.core.PersistentArrayMap.fromArray([orig_type_37335,cljs.core.identity], true, false)));
var chunk__37263_37338 = null;
var count__37264_37339 = (0);
var i__37265_37340 = (0);
while(true){
if((i__37265_37340 < count__37264_37339)){
var vec__37282_37341 = chunk__37263_37338.cljs$core$IIndexed$_nth$arity$2(null,i__37265_37340);
var actual_type_37342 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37282_37341,(0),null);
var factory_37343 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37282_37341,(1),null);
var canonical_f_37344 = (cljs.core.truth_(selector_37288)?cljs.core.partial.cljs$core$IFn$_invoke$arity$3(dommy.core.live_listener,elem_37287,selector_37288):cljs.core.identity).call(null,(function (){var G__37283 = f_37336;
return (factory_37343.cljs$core$IFn$_invoke$arity$1 ? factory_37343.cljs$core$IFn$_invoke$arity$1(G__37283) : factory_37343.call(null,G__37283));
})());
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37287,cljs.core.assoc_in,cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37288,actual_type_37342,f_37336], null),canonical_f_37344], 0));

if(cljs.core.truth_(elem_37287.addEventListener)){
elem_37287.addEventListener(cljs.core.name(actual_type_37342),canonical_f_37344);
} else {
elem_37287.attachEvent(cljs.core.name(actual_type_37342),canonical_f_37344);
}

var G__37345 = seq__37261_37337;
var G__37346 = chunk__37263_37338;
var G__37347 = count__37264_37339;
var G__37348 = (i__37265_37340 + (1));
seq__37261_37337 = G__37345;
chunk__37263_37338 = G__37346;
count__37264_37339 = G__37347;
i__37265_37340 = G__37348;
continue;
} else {
var temp__4126__auto___37349__$1 = cljs.core.seq(seq__37261_37337);
if(temp__4126__auto___37349__$1){
var seq__37261_37350__$1 = temp__4126__auto___37349__$1;
if(cljs.core.chunked_seq_QMARK_(seq__37261_37350__$1)){
var c__24962__auto___37351 = cljs.core.chunk_first(seq__37261_37350__$1);
var G__37352 = cljs.core.chunk_rest(seq__37261_37350__$1);
var G__37353 = c__24962__auto___37351;
var G__37354 = cljs.core.count(c__24962__auto___37351);
var G__37355 = (0);
seq__37261_37337 = G__37352;
chunk__37263_37338 = G__37353;
count__37264_37339 = G__37354;
i__37265_37340 = G__37355;
continue;
} else {
var vec__37284_37356 = cljs.core.first(seq__37261_37350__$1);
var actual_type_37357 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37284_37356,(0),null);
var factory_37358 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37284_37356,(1),null);
var canonical_f_37359 = (cljs.core.truth_(selector_37288)?cljs.core.partial.cljs$core$IFn$_invoke$arity$3(dommy.core.live_listener,elem_37287,selector_37288):cljs.core.identity).call(null,(function (){var G__37285 = f_37336;
return (factory_37358.cljs$core$IFn$_invoke$arity$1 ? factory_37358.cljs$core$IFn$_invoke$arity$1(G__37285) : factory_37358.call(null,G__37285));
})());
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37287,cljs.core.assoc_in,cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37288,actual_type_37357,f_37336], null),canonical_f_37359], 0));

if(cljs.core.truth_(elem_37287.addEventListener)){
elem_37287.addEventListener(cljs.core.name(actual_type_37357),canonical_f_37359);
} else {
elem_37287.attachEvent(cljs.core.name(actual_type_37357),canonical_f_37359);
}

var G__37360 = cljs.core.next(seq__37261_37350__$1);
var G__37361 = null;
var G__37362 = (0);
var G__37363 = (0);
seq__37261_37337 = G__37360;
chunk__37263_37338 = G__37361;
count__37264_37339 = G__37362;
i__37265_37340 = G__37363;
continue;
}
} else {
}
}
break;
}

var G__37364 = cljs.core.next(seq__37260_37328__$1);
var G__37365 = null;
var G__37366 = (0);
var G__37367 = (0);
seq__37260_37289 = G__37364;
chunk__37267_37290 = G__37365;
count__37268_37291 = G__37366;
i__37269_37292 = G__37367;
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
var G__37368__i = 0, G__37368__a = new Array(arguments.length -  1);
while (G__37368__i < G__37368__a.length) {G__37368__a[G__37368__i] = arguments[G__37368__i + 1]; ++G__37368__i;}
  type_fs = new cljs.core.IndexedSeq(G__37368__a,0);
} 
return dommy$core$listen_BANG___delegate.call(this,elem_sel,type_fs);};
dommy$core$listen_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$listen_BANG_.cljs$lang$applyTo = (function (arglist__37369){
var elem_sel = cljs.core.first(arglist__37369);
var type_fs = cljs.core.rest(arglist__37369);
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

var vec__37393_37416 = dommy.core.elem_and_selector(elem_sel);
var elem_37417 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37393_37416,(0),null);
var selector_37418 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37393_37416,(1),null);
var seq__37394_37419 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),type_fs));
var chunk__37401_37420 = null;
var count__37402_37421 = (0);
var i__37403_37422 = (0);
while(true){
if((i__37403_37422 < count__37402_37421)){
var vec__37410_37423 = chunk__37401_37420.cljs$core$IIndexed$_nth$arity$2(null,i__37403_37422);
var orig_type_37424 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37410_37423,(0),null);
var f_37425 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37410_37423,(1),null);
var seq__37404_37426 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$3(dommy.core.special_listener_makers,orig_type_37424,new cljs.core.PersistentArrayMap.fromArray([orig_type_37424,cljs.core.identity], true, false)));
var chunk__37406_37427 = null;
var count__37407_37428 = (0);
var i__37408_37429 = (0);
while(true){
if((i__37408_37429 < count__37407_37428)){
var vec__37411_37430 = chunk__37406_37427.cljs$core$IIndexed$_nth$arity$2(null,i__37408_37429);
var actual_type_37431 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37411_37430,(0),null);
var __37432 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37411_37430,(1),null);
var keys_37433 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37418,actual_type_37431,f_37425], null);
var canonical_f_37434 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(dommy.core.event_listeners(elem_37417),keys_37433);
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37417,dommy.utils.dissoc_in,cljs.core.array_seq([keys_37433], 0));

if(cljs.core.truth_(elem_37417.removeEventListener)){
elem_37417.removeEventListener(cljs.core.name(actual_type_37431),canonical_f_37434);
} else {
elem_37417.detachEvent(cljs.core.name(actual_type_37431),canonical_f_37434);
}

var G__37435 = seq__37404_37426;
var G__37436 = chunk__37406_37427;
var G__37437 = count__37407_37428;
var G__37438 = (i__37408_37429 + (1));
seq__37404_37426 = G__37435;
chunk__37406_37427 = G__37436;
count__37407_37428 = G__37437;
i__37408_37429 = G__37438;
continue;
} else {
var temp__4126__auto___37439 = cljs.core.seq(seq__37404_37426);
if(temp__4126__auto___37439){
var seq__37404_37440__$1 = temp__4126__auto___37439;
if(cljs.core.chunked_seq_QMARK_(seq__37404_37440__$1)){
var c__24962__auto___37441 = cljs.core.chunk_first(seq__37404_37440__$1);
var G__37442 = cljs.core.chunk_rest(seq__37404_37440__$1);
var G__37443 = c__24962__auto___37441;
var G__37444 = cljs.core.count(c__24962__auto___37441);
var G__37445 = (0);
seq__37404_37426 = G__37442;
chunk__37406_37427 = G__37443;
count__37407_37428 = G__37444;
i__37408_37429 = G__37445;
continue;
} else {
var vec__37412_37446 = cljs.core.first(seq__37404_37440__$1);
var actual_type_37447 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37412_37446,(0),null);
var __37448 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37412_37446,(1),null);
var keys_37449 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37418,actual_type_37447,f_37425], null);
var canonical_f_37450 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(dommy.core.event_listeners(elem_37417),keys_37449);
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37417,dommy.utils.dissoc_in,cljs.core.array_seq([keys_37449], 0));

if(cljs.core.truth_(elem_37417.removeEventListener)){
elem_37417.removeEventListener(cljs.core.name(actual_type_37447),canonical_f_37450);
} else {
elem_37417.detachEvent(cljs.core.name(actual_type_37447),canonical_f_37450);
}

var G__37451 = cljs.core.next(seq__37404_37440__$1);
var G__37452 = null;
var G__37453 = (0);
var G__37454 = (0);
seq__37404_37426 = G__37451;
chunk__37406_37427 = G__37452;
count__37407_37428 = G__37453;
i__37408_37429 = G__37454;
continue;
}
} else {
}
}
break;
}

var G__37455 = seq__37394_37419;
var G__37456 = chunk__37401_37420;
var G__37457 = count__37402_37421;
var G__37458 = (i__37403_37422 + (1));
seq__37394_37419 = G__37455;
chunk__37401_37420 = G__37456;
count__37402_37421 = G__37457;
i__37403_37422 = G__37458;
continue;
} else {
var temp__4126__auto___37459 = cljs.core.seq(seq__37394_37419);
if(temp__4126__auto___37459){
var seq__37394_37460__$1 = temp__4126__auto___37459;
if(cljs.core.chunked_seq_QMARK_(seq__37394_37460__$1)){
var c__24962__auto___37461 = cljs.core.chunk_first(seq__37394_37460__$1);
var G__37462 = cljs.core.chunk_rest(seq__37394_37460__$1);
var G__37463 = c__24962__auto___37461;
var G__37464 = cljs.core.count(c__24962__auto___37461);
var G__37465 = (0);
seq__37394_37419 = G__37462;
chunk__37401_37420 = G__37463;
count__37402_37421 = G__37464;
i__37403_37422 = G__37465;
continue;
} else {
var vec__37413_37466 = cljs.core.first(seq__37394_37460__$1);
var orig_type_37467 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37413_37466,(0),null);
var f_37468 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37413_37466,(1),null);
var seq__37395_37469 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$3(dommy.core.special_listener_makers,orig_type_37467,new cljs.core.PersistentArrayMap.fromArray([orig_type_37467,cljs.core.identity], true, false)));
var chunk__37397_37470 = null;
var count__37398_37471 = (0);
var i__37399_37472 = (0);
while(true){
if((i__37399_37472 < count__37398_37471)){
var vec__37414_37473 = chunk__37397_37470.cljs$core$IIndexed$_nth$arity$2(null,i__37399_37472);
var actual_type_37474 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37414_37473,(0),null);
var __37475 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37414_37473,(1),null);
var keys_37476 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37418,actual_type_37474,f_37468], null);
var canonical_f_37477 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(dommy.core.event_listeners(elem_37417),keys_37476);
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37417,dommy.utils.dissoc_in,cljs.core.array_seq([keys_37476], 0));

if(cljs.core.truth_(elem_37417.removeEventListener)){
elem_37417.removeEventListener(cljs.core.name(actual_type_37474),canonical_f_37477);
} else {
elem_37417.detachEvent(cljs.core.name(actual_type_37474),canonical_f_37477);
}

var G__37478 = seq__37395_37469;
var G__37479 = chunk__37397_37470;
var G__37480 = count__37398_37471;
var G__37481 = (i__37399_37472 + (1));
seq__37395_37469 = G__37478;
chunk__37397_37470 = G__37479;
count__37398_37471 = G__37480;
i__37399_37472 = G__37481;
continue;
} else {
var temp__4126__auto___37482__$1 = cljs.core.seq(seq__37395_37469);
if(temp__4126__auto___37482__$1){
var seq__37395_37483__$1 = temp__4126__auto___37482__$1;
if(cljs.core.chunked_seq_QMARK_(seq__37395_37483__$1)){
var c__24962__auto___37484 = cljs.core.chunk_first(seq__37395_37483__$1);
var G__37485 = cljs.core.chunk_rest(seq__37395_37483__$1);
var G__37486 = c__24962__auto___37484;
var G__37487 = cljs.core.count(c__24962__auto___37484);
var G__37488 = (0);
seq__37395_37469 = G__37485;
chunk__37397_37470 = G__37486;
count__37398_37471 = G__37487;
i__37399_37472 = G__37488;
continue;
} else {
var vec__37415_37489 = cljs.core.first(seq__37395_37483__$1);
var actual_type_37490 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37415_37489,(0),null);
var __37491 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37415_37489,(1),null);
var keys_37492 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_37418,actual_type_37490,f_37468], null);
var canonical_f_37493 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(dommy.core.event_listeners(elem_37417),keys_37492);
dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_37417,dommy.utils.dissoc_in,cljs.core.array_seq([keys_37492], 0));

if(cljs.core.truth_(elem_37417.removeEventListener)){
elem_37417.removeEventListener(cljs.core.name(actual_type_37490),canonical_f_37493);
} else {
elem_37417.detachEvent(cljs.core.name(actual_type_37490),canonical_f_37493);
}

var G__37494 = cljs.core.next(seq__37395_37483__$1);
var G__37495 = null;
var G__37496 = (0);
var G__37497 = (0);
seq__37395_37469 = G__37494;
chunk__37397_37470 = G__37495;
count__37398_37471 = G__37496;
i__37399_37472 = G__37497;
continue;
}
} else {
}
}
break;
}

var G__37498 = cljs.core.next(seq__37394_37460__$1);
var G__37499 = null;
var G__37500 = (0);
var G__37501 = (0);
seq__37394_37419 = G__37498;
chunk__37401_37420 = G__37499;
count__37402_37421 = G__37500;
i__37403_37422 = G__37501;
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
var G__37502__i = 0, G__37502__a = new Array(arguments.length -  1);
while (G__37502__i < G__37502__a.length) {G__37502__a[G__37502__i] = arguments[G__37502__i + 1]; ++G__37502__i;}
  type_fs = new cljs.core.IndexedSeq(G__37502__a,0);
} 
return dommy$core$unlisten_BANG___delegate.call(this,elem_sel,type_fs);};
dommy$core$unlisten_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$unlisten_BANG_.cljs$lang$applyTo = (function (arglist__37503){
var elem_sel = cljs.core.first(arglist__37503);
var type_fs = cljs.core.rest(arglist__37503);
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

var vec__37515_37526 = dommy.core.elem_and_selector(elem_sel);
var elem_37527 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37515_37526,(0),null);
var selector_37528 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37515_37526,(1),null);
var seq__37516_37529 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),type_fs));
var chunk__37517_37530 = null;
var count__37518_37531 = (0);
var i__37519_37532 = (0);
while(true){
if((i__37519_37532 < count__37518_37531)){
var vec__37520_37533 = chunk__37517_37530.cljs$core$IIndexed$_nth$arity$2(null,i__37519_37532);
var type_37534 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37520_37533,(0),null);
var f_37535 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37520_37533,(1),null);
dommy.core.listen_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_sel,cljs.core.array_seq([type_37534,((function (seq__37516_37529,chunk__37517_37530,count__37518_37531,i__37519_37532,vec__37520_37533,type_37534,f_37535,vec__37515_37526,elem_37527,selector_37528){
return (function dommy$core$listen_once_BANG__$_this_fn(e){
dommy.core.unlisten_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_sel,cljs.core.array_seq([type_37534,dommy$core$listen_once_BANG__$_this_fn], 0));

var G__37522 = e;
return (f_37535.cljs$core$IFn$_invoke$arity$1 ? f_37535.cljs$core$IFn$_invoke$arity$1(G__37522) : f_37535.call(null,G__37522));
});})(seq__37516_37529,chunk__37517_37530,count__37518_37531,i__37519_37532,vec__37520_37533,type_37534,f_37535,vec__37515_37526,elem_37527,selector_37528))
], 0));

var G__37536 = seq__37516_37529;
var G__37537 = chunk__37517_37530;
var G__37538 = count__37518_37531;
var G__37539 = (i__37519_37532 + (1));
seq__37516_37529 = G__37536;
chunk__37517_37530 = G__37537;
count__37518_37531 = G__37538;
i__37519_37532 = G__37539;
continue;
} else {
var temp__4126__auto___37540 = cljs.core.seq(seq__37516_37529);
if(temp__4126__auto___37540){
var seq__37516_37541__$1 = temp__4126__auto___37540;
if(cljs.core.chunked_seq_QMARK_(seq__37516_37541__$1)){
var c__24962__auto___37542 = cljs.core.chunk_first(seq__37516_37541__$1);
var G__37543 = cljs.core.chunk_rest(seq__37516_37541__$1);
var G__37544 = c__24962__auto___37542;
var G__37545 = cljs.core.count(c__24962__auto___37542);
var G__37546 = (0);
seq__37516_37529 = G__37543;
chunk__37517_37530 = G__37544;
count__37518_37531 = G__37545;
i__37519_37532 = G__37546;
continue;
} else {
var vec__37523_37547 = cljs.core.first(seq__37516_37541__$1);
var type_37548 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37523_37547,(0),null);
var f_37549 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37523_37547,(1),null);
dommy.core.listen_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_sel,cljs.core.array_seq([type_37548,((function (seq__37516_37529,chunk__37517_37530,count__37518_37531,i__37519_37532,vec__37523_37547,type_37548,f_37549,seq__37516_37541__$1,temp__4126__auto___37540,vec__37515_37526,elem_37527,selector_37528){
return (function dommy$core$listen_once_BANG__$_this_fn(e){
dommy.core.unlisten_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_sel,cljs.core.array_seq([type_37548,dommy$core$listen_once_BANG__$_this_fn], 0));

var G__37525 = e;
return (f_37549.cljs$core$IFn$_invoke$arity$1 ? f_37549.cljs$core$IFn$_invoke$arity$1(G__37525) : f_37549.call(null,G__37525));
});})(seq__37516_37529,chunk__37517_37530,count__37518_37531,i__37519_37532,vec__37523_37547,type_37548,f_37549,seq__37516_37541__$1,temp__4126__auto___37540,vec__37515_37526,elem_37527,selector_37528))
], 0));

var G__37550 = cljs.core.next(seq__37516_37541__$1);
var G__37551 = null;
var G__37552 = (0);
var G__37553 = (0);
seq__37516_37529 = G__37550;
chunk__37517_37530 = G__37551;
count__37518_37531 = G__37552;
i__37519_37532 = G__37553;
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
var G__37554__i = 0, G__37554__a = new Array(arguments.length -  1);
while (G__37554__i < G__37554__a.length) {G__37554__a[G__37554__i] = arguments[G__37554__i + 1]; ++G__37554__i;}
  type_fs = new cljs.core.IndexedSeq(G__37554__a,0);
} 
return dommy$core$listen_once_BANG___delegate.call(this,elem_sel,type_fs);};
dommy$core$listen_once_BANG_.cljs$lang$maxFixedArity = 1;
dommy$core$listen_once_BANG_.cljs$lang$applyTo = (function (arglist__37555){
var elem_sel = cljs.core.first(arglist__37555);
var type_fs = cljs.core.rest(arglist__37555);
return dommy$core$listen_once_BANG___delegate(elem_sel,type_fs);
});
dommy$core$listen_once_BANG_.cljs$core$IFn$_invoke$arity$variadic = dommy$core$listen_once_BANG___delegate;
return dommy$core$listen_once_BANG_;
})()
;
