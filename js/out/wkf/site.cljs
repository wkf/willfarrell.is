(ns wkf.site
  (:require [goog.style :as style]
            [goog.events :as events]
            [dommy.core :refer-macros [sel sel1] :as dommy]))

(defonce site (atom {:running? false}))

(defn on-scroll [e]
  (let [hr (-> (sel1 :header) (sel1 :hr))
        main (sel1 :main)
        main-top (-> main style/getClientPosition .-y)
        nav (sel1 :nav)
        nav-height (-> nav style/getSize .-height)]
    (if (<= main-top (* 2.5 nav-height))
      (dommy/add-class! hr :fixed)
      (dommy/remove-class! hr :fixed))))

(defn start
  "Start the site. Attempt to be idempotent."
  []
  (when-not (:running? @site)
    (swap! site assoc :running? true)
    (events/listen js/window "scroll" on-scroll)))

(defn stop
  "Stop the site. Attempt to be idempotent. Useful for interactive local development."
  []
  (when (:running? @site)
    (reset! site {:running? false})
    (events/unlisten js/window "scroll" on-scroll)))

(start)
