(ns wkf.markup
  (:require [endophile.core :as endophile]
            [net.cgrand.tagsoup :as tagsoup]
            [net.cgrand.enlive-html :as html :refer [html]]))

(def defaults
  {:title "Will Farrell"
   :styles ["css/out/screen.css"]
   :scripts ["js/out/main.js"]})

(defn html5 [& nodes]
  (apply html {:type :dtd :data ["html"]} nodes))

(defn render [nodes] (apply str nodes))

(defn markdown-parser [stream]
  (html/with-options
    {:parser tagsoup/parser}
    (-> stream slurp endophile/mp endophile/to-clj)))

(html/deftemplate page
  (html5
    [:html
     [:head
      [:meta
       {:name "viewport"
        :content "width=device-width, initial-scale=1"}]
      [:title]]
     [:body
      [:header]
      [:main]
      [:footer]]])

  [{:keys [title scripts requires styles]} & [head main]]

  [:title] (html/content title)
  [:head] (html/prepend
            (map
              #(html [:link {:type "text/css" :rel "stylesheet" :href %}]) styles))
  [:body] (html/append
            (map
              #(html [:script {:type "text/javascript" :src %}]) scripts)
            (map
              #(html [:script {:type "text/javascript"} (str "goog.require('" % "')")]) requires))
  [:header] (html/content head)
  [:main] (html/content main))

(html/defsnippet head
  {:parser markdown-parser} "content/home.md"
  [#{:h1 :h2}] [])

(html/defsnippet cards
  {:parser markdown-parser} "content/home.md"
  {[:h3] [:h4]} []
  [:h4] (html/wrap :aside)
  {[:h3] [:p]} (html/wrap :article)
  {[:article] [:aside]} (html/wrap :section))

(defn manifest [config]
  (let [config (merge defaults config)]
    {"" #(render (page config (head) (cards)))}))
