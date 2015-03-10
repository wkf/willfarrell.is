(ns wkf.style
  (:require [garden.def :refer [defcssfn]]
            [garden.core :refer [css]]
            [garden.units :refer [px em percent]]
            [garden.color :as color :refer [rgb]]
            [garden.stylesheet :refer [at-media]]
            [garden.selectors :as s]))
(def defaults
  {:vendors ["webkit"]
   :auto-prefix #{:box-align
                  :flex
                  :flex-wrap
                  :flex-grow
                  :flex-align
                  :flex-basis
                  :flex-direction
                  :align-items}})

(def black (rgb 0 0 0 ))
(def purple (rgb 152 90 163))
(def white (rgb 255 255 255))

(defcssfn url)

(defn even
  ([] (even :&))
  ([selector]
   ((s/selector selector)
    (s/nth-child :even))))

(defn font-face [properties urls]
  ["@font-face"
   {:src (url urls)
    :font properties}])

(defn ensure-unit [n]
  (if (number? n) (px n) n))

(defn sides
  ([n] (sides n n n n))
  ([n0 n1] (sides n0 n1 n1 n0))
  ([n0 n1 n2] (sides n0 n1 n1 n2))
  ([n0 n1 n2 n3] {:top (ensure-unit n0)
                  :left (ensure-unit n1)
                  :right (ensure-unit n2)
                  :bottom (ensure-unit n3)}))

(defn at-medium [properties]
  (at-media
    {:screen true
     :max-width (px 960)}
    [:& properties]))

(defn at-small [properties]
  (at-media
    {:screen true
     :max-width (px 640)}
    [:& properties]))

(def reset
  [[:html
    {:color black
     :background white
     :box-sizing :border-box
     "-ms-text-size-adjust" (percent 100)
     "-webkit-text-size-adjust" (percent 100)}]
   [:* :*:after :*:before
    {:box-sizing :inherit}]
   [:a :a:hover :a:active :a:visited
    {:text-decoration :none}]
   [:body :div :dl :dt :dd :ul :ol :li :h1 :h2 :h3 :h4 :h5 :h6 :pre :code :form :fieldset :legend :input :textarea :p :blockquote :th :td
    {:margin 0
     :padding 0}]
   [:table
    {:border-collapse :collapse
     :border-spacing 0}]
   [:fieldset :img
    {:border 0}]
   [:address :caption :cite :code :dfn :em :strong :th :var
    {:font-style :normal
     :font-weight :normal}]
   [:ol :ul
    {:list-style :none}]
   [:caption :th
    {:text-align :left }]
   [:h1 :h2 :h3 :h4 :h5 :h6
    {:font-size "100%"
     :font-weight :normal}]
   [:q:before :q:after
    {:content "''"}]
   [:abbr :acronym
    {:border 0
     :font-variant :normal}]
   [:sup
    {:vertical-align :text-top}]
   [:sub
    {:vertical-align :text-bottom}]
   [:input :textarea :select
    {:font-family :inherit
     :font-size :inherit
     :font-weight :inherit}]
   [:input :textarea :select
    {"*font-size" "100%"}]
   [:legend
    {:color black}]])

(def fonts
  [(font-face {:family :brandon-text}
              "../../fonts/BrandonText-Regular.otf")
   (font-face {:family :brandon-text
               :weight :bold}
              "../../fonts/BrandonText-Bold.otf")
   (font-face {:family :livory}
              "../../fonts/Livory-Regular.otf")
   (font-face {:family :livory
               :style :italic}
              "../../fonts/Livory-Italic.otf")
   (font-face {:family :livory
               :weight :bold}
              "../../fonts/Livory-Bold.otf")
   (font-face {:family :livory
               :weight :bold
               :style :italic}
              "../../fonts/Livory-BoldItalic.otf")

   [:h1 :h2 :h3 :h4
    {:font-family [:livory :serif]}]
   [:h3 :h4
    {:font-weight :bold}
    [:em
     {:font-weight :bold}]]
   [:h1
    {:font-size (px 72)}
    (at-small
      {:font-size (px 64)})]
   [:h2
    {:font-size (px 36)}
    (at-small
      {:font-size (px 24)})]
   [:h3
    {:font-size (px 24)}]
   [:h4
    {:font-size (px 72)}
    (at-small
      {:font-size (px 48)})]
   [:p
    {:font {:size (px 18)
            :family [:brandon-text :sans-serif]}
     :line-height (px 26)}]
   [:em
    {:font-style :italic}]
   [:strong
    {:font-weight :bold}]])

(def main
  [["::selection"
    {:color white
     :background purple}]

   [:html
    {:height (percent 100)}]

   [:body
    {:display #{:-webkit-flex :flex}
     :flex-direction :column
     :align-items :center
     :line-height 1
     :min-height (percent 100)}
    (at-medium
      {:align-items :flex-start})]

   [:header
    {:width (px 960)
     :margin (sides 0 15)}
    (at-medium
      {:width :auto})
    (at-small
      {:width (percent 100)
       :margin (sides 0)
       :border-top {:width (px 5)
                    :color purple
                    :style :solid}})

    [:h1
     {:margin (sides 30 15 0)}
     (at-small
      {:margin-top (px 20)
       :text-align :center})]
    [:h2
     {:color white
      :background purple
      :margin (sides 15 15 30)
      :padding (sides 5 5)
      :display :inline-block}
     (at-small
      {:width (percent 100)
       :margin (sides 15 0 0)
       :text-align :center
       :line-height (px 30)})]]

   [:main
    {:width (percent 100)
     :display #{:-webkit-flex :flex}
     :background (url "../../img/background.png")
     :flex-wrap :wrap
     :flex-grow 1
     :flex-direction :column
     :align-items :center
     :padding (px 15)}
    [:section
     {:display #{:-webkit-flex :flex}
      :max-width (px 960)}
     (at-small
       {:flex-wrap :wrap
        :flex-direction :column-reverse})
     [(even)
      {:flex-direction :row-reverse}
      (at-small
        {:flex-direction :column-reverse})]
     [:article
      {:flex-basis (percent (/ 200 3))
       :background white
       :margin (px 15)}
      (at-small
       {:margin-top 0
        :flex-basis :auto})]
     [:aside
      {:color purple
       :display #{:-webkit-flex :flex}
       :flex-grow 1
       :line-height (px 200)
       :background white
       :margin (px 15)}
      (at-small
        {:line-height (px 100)
         :margin-bottom 0})]
     [:h3
      {:padding (sides 30 30 0)}
      (at-small
        {:padding
         {:top (px 0)
          :bottom (px 15)}})]
     [:h4
      {:margin :auto
       :text-align :center}]
     [:p
      {:padding (sides 10 30 30)}]]]

   [:footer
    {:width "100%"
     :height (px 5)
     :background purple}]

   [:a
    {:color purple
     :font-weight :bold
     :border-bottom
     {:width (px 2)
      :style :solid
      :color white}
     :transition [:border "250ms"]}
    [:&:hover
     {:border-bottom-color purple}]]])

(def screen
  (concat reset fonts main))

(defn manifest [config]
  {"css/out/screen.css" #(css (merge defaults config) screen)})
