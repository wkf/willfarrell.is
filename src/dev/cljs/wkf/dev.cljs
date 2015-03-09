(ns ^:figwheel-no-load wkf.dev
  (:require [wkf.site :as site]
            [weasel.repl :as w]
            [aviary.figwheel :as fw]))

(enable-console-print!)

(fw/start
  {:on-jsload #(do (site/stop) (site/start))
   :websocket-url "ws://localhost:3449/figwheel-ws"})

(when-not (w/alive?)
  (w/connect "ws://localhost:3451"))
