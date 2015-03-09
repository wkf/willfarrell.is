(ns wkf.style
  (:require [garden.core :refer [css]]
            [garden.units :refer [px em]]
            [garden.color :as color :refer [rgb]]
            [garden.stylesheet :refer [at-media]]
            [garden.selectors :as s]))

(def black (rgb 0 0 0 ))
(def purple (rgb 152 90 163))
(def white (rgb 255 255 255))

(def reset
  [[:html
    :color black
    :background white]
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

(def defaults
  [[:html
    {:box-sizing :border-box}]
   [:*
    :*:after
    :*:before
    {:box-sizing :inherit}]
   [:body
    {:margin 0
     :padding 0}]
   [:a
    :a:hover
    :a:active
    :a:visited {:text-decoration :none}]])

(defn font-face [family path & {:as options}]
  ["@font-face"
   {:src (str "url('" path "')")
    :font (merge options {:family family})}])

(def fonts
  [(font-face :brandon-text "../../fonts/BrandonText-Regular.otf")
   (font-face :brandon-text "../../fonts/BrandonText-Bold.otf" :weight :bold)
   (font-face :livory "../../fonts/Livory-Regular.otf")
   (font-face :livory "../../fonts/Livory-Italic.otf" :style :italic)
   (font-face :livory "../../fonts/Livory-Bold.otf" :weight :bold)
   (font-face :livory "../../fonts/Livory-BoldItalic.otf" :weight :bold :style :italic)

   [:h1
    :h2
    :h3
    :h4
    {:font-family "livory, serif"}]
   [:h1
    {:font-size (px 72)}]
   [:h2
    {:font-size (px 36)}]
   [:h3
    {:font-size (px 24)
     :font-weight :bold}
    [:em
     {:font-weight :bold}]]
   [:h4
    {:font-size (px 72)
     :font-weight :bold}
    [:em
     {:font-weight :bold}]]

   [:p
    {:font-size (px 18)
     :font-family "brandon-text, sans-serif"
     :font-weight :normal
     :line-height (px 26)}]

   [:em
    {:font-style :italic}]
   [:strong
    {:font-weight :bold}]

   ["::selection" {:color white
                   :background purple}]])

(def main
  [
   [:html {:height "100%"}]
   [:body {:display :flex
           :flex-direction :column
           :align-items :center

           :line-height 1
           :min-height "100%"
           }

   (at-media
     {:screen true :max-width (px 960)}
     [:& {:align-items :flex-start}])

    ]
   [:header {:width (px 960)
             :margin {:left (px 15)
                      :right (px 15)}

             }

    (at-media
      {:screen true :max-width (px 960)}
      [:& {:width (px 600)}])

    [:h1 {:margin {:top (px 30)
                   :left (px 15)
                   :right (px 15)}}]

    [:h2 {:color white
          :background purple
          :margin {:top (px 20)
                   :left (px 15)
                   :right (px 15)
                   :bottom (px 40)}
          :padding {:top (px 5)
                    :left (px 10)
                    :right (px 10)
                    :bottom (px 5)
                    }
          :display :inline-block}]]
   [:footer {:height (px 5)
             :width "100%"
             :background purple
             }]
   [:main {:width "100%"
           :display :flex
           :background "url('../../img/background.png')"
           :flex-wrap :wrap
           :flex-grow 1

           :flex-direction :column
           :align-items :center
           :padding (px 15)}

    [:section {:display :flex
               :max-width (px 960)}
     [(s/&
        (s/nth-child :even)) {:flex-direction :row-reverse}]
     [:h3
      {:padding
       {:top (px 30)
        :left (px 30)
        :right (px 30)
        }}]
     [:p
      {:padding
       {:top (px 10)
        :left (px 30)
        :right (px 30)
        :bottom (px 30)
        }}
      ]

     [:article {:flex-basis "66.666666667%"
                :background white
                :margin (px 15)
                }]

     [:aside {:color purple
              :display :flex
              :flex-grow 1
              :line-height (px 200)
              :background white
              :margin (px 15)
              }
      [:h4 {:margin :auto}]]]]
   [:a {:color purple
        :font-weight :bold
        :border-bottom {:width (px 2)
                        :style :solid
                        :color white}
        :transition "border 250ms"}
    [:&:hover {:border-bottom {:width (px 2)
                               :style :solid
                               :color purple}}]]
   ])

(def screen
  (concat reset defaults fonts main))

(defn manifest [config]
  {"css/out/screen.css" #(css config screen)})
