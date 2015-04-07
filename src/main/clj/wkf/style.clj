(ns wkf.style
  (:refer-clojure :exclude [rem])
  (:require [garden.def :refer [defcssfn defkeyframes]]
            [garden.core :refer [css]]
            [garden.units :refer [px em rem percent]]
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
                  :align-items
                  :animation
                  :animation-name
                  :animation-delay
                  :animation-duration
                  :animation-timing-function
                  :animation-fill-mode
                  :animation-iteration-count
                  :font-smoothing
                  }})

(def black (rgb 0 0 0 ))
(def purple (rgb 152 90 163))
(def white (rgb 255 255 255))

(defcssfn url)

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

(defn at-large [rules]
  (at-media
    {:screen true
     :min-width (px 860)} rules))

(defn at-medium [rules]
  (at-media
    {:screen true
     :min-width (px 680)} rules))

(defn at-small [rules]
  (at-media
    {:screen true
     :min-width (px 460)} rules))

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
    {:font-style :inherit
     :font-weight :inherit}]
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

(def sentinel
  ["'Sentinel SSm A'"
   "'Sentinel SSm B'"])

(def chronicle
  ["'Chronicle SSm A'"
   "'Chronicle SSm B'"])

(defn scale-by
  ([x by] (scale-by x by 0))
  ([x by n]
   (if-not (neg? n)
     (-> (iterate #(* % by) x) (nth n))
     (-> (iterate #(/ % by) x) (nth (- n))))))

(defn step-by
  [by n]
  (->> 0
       (iterate (partial + by))
       (filter (partial < n)) first))

(defn ->px [n]
  (-> n (+ 0.5) int px))

(defn ->rem [n]
  (-> n (+ 0.5) int (/ 16) float rem))

(defn unit-comparator
  ([] (unit-comparator :px :em :rem))
  ([& units]
   (fn [x y]
     (let [result (compare (.indexOf units (:unit x))
                           (.indexOf units (:unit y)))]
       (if (not= result 0)
         result
         (compare (:magnitude x)
                  (:magnitude y)))))))

(defn rem-and-px [n]
  (sorted-set-by
    (unit-comparator :px :rem)
    (->px n)
    (->rem n)))

(def base-font-size 20)
(def base-line-height (* base-font-size 1.5))
(def base-scale-factor 1.25)

(def font-size
  (comp rem-and-px
        (partial scale-by
                 base-font-size
                 base-scale-factor)))

(def line-height
  (comp rem-and-px
        (partial step-by
                 base-line-height)
        (partial scale-by
                 base-font-size
                 base-scale-factor)))

(def lines
  (comp ->rem
        (partial *
                 base-line-height)))

(def fonts
  [[:html
    {:font-size (percent 80)}
    (at-small
     [:&
      {:font-size (percent 100)}])]
   [:h1 :h2 :h3 :h4 :nav
    {:font-family sentinel}]
   [:h1 :h2
    {:font-weight 500}]
   [:h3 :h4 :nav
    {:font-weight 500}]
   [:h1
    {:font-size (font-size 3)
     :line-height (line-height 3)}]
   [:h2
    {:font-size (font-size 2)
     :line-height (line-height 2)}]
   [:h3
    {:font-size (font-size 1)
     :line-height (line-height 1)}]
   [:h4
    {:font-size (font-size 0)
     :line-height (line-height 0)}]
   [:nav
    {:font-size (font-size 2)
     :line-height (line-height 3)}]
   [:p
    {:font {:family chronicle
            :size (font-size 0)
            :weight 300
            :kerning :normal}
     :line-height (line-height 0)}
    [:strong
     {:font-weight 500}]]
   [:small
    {:font {:family sentinel
            :size (font-size -1)
            :weight 500}
     :line-height (line-height 0)}]
   [:em
    {:font-style :italic}]])

(defkeyframes fade-in
  [:from
   {:opacity 0}]
  [:to
   {:opacity 1}])

(def nav
  [[:.page :.menu
    [:nav {:width (percent 100)
           :height (lines 2)
           :padding [[0 (lines 1)]]
           :position :absolute
           :background white
           :top (lines 1)
           :left 0
           :right 0
           :z-index 1}
     (at-large
       [:&
        {:top (lines 1)
         :background :none
         :margin [[0 :auto]]
         :max-width (px 960)}])

     [:a {:color purple
          :text-align :center}
      [:span
       {:transition [:letter-spacing "200ms"]}]
      [:&:hover
       [:span
        {:letter-spacing (->rem 2)}]]

      [:&.parens {:float :left
                  ;; enough space for the glyphs to stay centered instead of flowing to the right
                  :width (->rem 54)}]
      [:&.ellipsis {:float :right
                    ;; enough space for the glyphs to stay centered instead of flowing to the left
                    :width (->rem 50)}
       [:span
        {:position :relative
         :top (->rem (- (/ base-line-height 4)))}]]]]]
   [:.fix-page-nav
    [:.page
     [:nav {:top 0
            :position :fixed}]]]
   [:.fix-menu-nav.show-menu
    [:.menu
     [:nav {:top 0
            :position :fixed}]]]])

(def fixed-hr
  [:hr
   {:width (str "calc(100% - " (* base-line-height 2) "px)")
    :position :fixed
    :top (lines 2)}
   (at-large
     [:& {:position :absolute
          :width (->rem 280)
          :top :auto}])])

(def header
  [[:.page :.menu
    [:header
     {:text-align :center
      :padding (sides
                 (lines 1) :auto (lines 1))}

     [:h1
      {:z-index 1
       :position :relative}
      (at-large
        [:&
         {:margin-bottom (lines 1)}])]

     [:h2
      {:z-index 1
       :position :relative
       :margin-top (lines 1)
       :margin-bottom (lines 2)}
      [:span:after
       {:content "'\\A'"
        :white-space :pre-wrap}
       (at-medium
         [:&
          {:content "''"}])]]

     [:hr
      {:position :absolute
       :left 0
       :right 0
       :margin (sides 0 :auto)
       :z-index 3
       :transition {:property [:width]
                    :duration "400ms"}}]]]
   [:.fix-page-hr
    [:.page
     [:header fixed-hr]]]
   [:.fix-menu-hr
    [:.menu
     [:header fixed-hr]]]])

(def main
  [[:.page :.menu
    [:main
     {:margin-top (lines 2)}

     [:a
      {:color purple
       :font-weight :bold
       :border-bottom
       {:width (px 2)
        :style :solid
        :color white}
       :transition [:border "200ms"]}
      [:&:hover
       {:border-bottom-color purple}]]]]])

(def splash
  [[:.page
    [:header
     [:h2
      [(s/span (s/nth-child 1))
       {:animation {:name fade-in
                    :duration "1s"
                    :fill-mode :backwards
                    :timing-function :ease}}]
      [(s/span (s/nth-child 2))
       {:animation {:name fade-in
                    :delay "1s"
                    :duration "1s"
                    :fill-mode :backwards
                    :timing-function :ease}}]
      [(s/em (s/nth-child 3))
       {:animation {:name fade-in
                    :delay "2s"
                    :duration "1s"
                    :fill-mode :backwards
                    :timing-function :ease}}]]]]

   [:.page
    [:nav :main :footer
     (s/descendant :header :h1)
     (s/descendant :header :hr)
     {:animation {:name fade-in
                  :delay "3s"
                  :duration "1s"
                  :fill-mode :backwards
                  :timing-function :ease}}]]])

(def footer
  [[:.page :.menu
    [:footer
     {:position :absolute
      :bottom 0
      :left 0
      :right 0
      :height (lines 3)
      :width (percent 100)
      :margin-top (lines 3)}
     [:hr
      {:margin {:bottom 0}}]
     [:small
      {:display :block
       :text-align :center
       :margin {:top (lines 1)
                :bottom (lines 1)}}]]]])

(def common
  [["::selection"
    {:color white
     :background purple
     }]

   [:.scrollbar-measure
    {:width (px 100)
     :height (px 100)
     :overflow :scroll
     :position :absolute
     :top (px -9999)}]

   [:html :body :.page :.menu
    {:height (percent 100)}]

   [:html
    {:overflow-y :scroll}]

   [:.page :.menu
    [:.content
     {:min-height "100vh"
      :position :relative
      :padding-bottom (lines 5)}]]

   [:header :footer :main
    {:max-width (px 760)
     :margin {:left :auto
              :right :auto}
     :padding (sides 0 (lines 2))}]

   [:h3
    {:margin-top (lines 2)}]

   [:small
    {:display :block}]

   [:h4 :p :small
    {:margin {:top (lines 1)
              :bottom (lines 1)}}]

   [:hr
    {:border {:color purple
              :style :solid
              :width (px 1)}
     :width (->rem 280)
     :margin-top (px -2)
     :transition {:property :width
                  :duration "500ms"}}]

   [:.menu
    {:position :fixed
     :max-width (percent 0)}]
   [:.show-menu
    [:.page
     {:position :fixed
      :left 0
      :right 0}]
    [:.menu
     {:position :absolute
      :max-width (percent 100)
      :left :auto}
     [:.content
      {:float :right}]]]])

;; "cubic-bezier(0, 1, 0.5, 1)"

(def menu
  [[:.menu
    {:color white
     :background purple
     :top 0
     :left 0
     :right 0
     :z-index 3
     :height :auto
     :min-height "100vh"
     :overflow-x :hidden
     :transition {:property :max-width
                  :duration "500ms"}
     }

    [:.content
     {:min-height "100vh"
      ;; this isn't quite right because it doesn't account for the scrollbar, so it gets calculated dynamically at runtime
      :width "100vw"
      :float :left}]

    [:h3
     {:margin {:top (lines 1)
               :bottom (lines 1)}}]
    [:nav
     {:background purple}
     (at-large
       [:&
        {:background :none}])
     [:a
      [:span
       {:color white}]]]

    [:hr
     {:border-color :white}]]

   ])

(def screen
  (concat reset
          fonts
          common
          splash
          nav
          header
          main
          footer
          main
          menu))

(defn manifest [config]
  {"css/out/screen.css" #(css (merge defaults config) fade-in screen)})
