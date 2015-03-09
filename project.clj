(defproject wkf "0.1.0-SNAPSHOT"
  :description "FIXME: Write a description."
  :url "FIXME: Add a URL."
  :scm {:name "git"
        :url "FIXME: Add a URL."}
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :main wkf.site
  :source-paths ["src/main/clj"
                 "src/main/cljs"]
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/clojurescript "0.0-2850"]
                 [aviary "0.1.12"]
                 [enlive "1.1.5"]
                 [garden "1.2.5"]
                 [endophile "0.1.2"]]
  :profiles {:dev {:source-paths ["src/dev/clj"
                                  "src/dev/cljs"]
                   :dependencies [[weasel "0.5.0"]
                                  [com.cemerick/piggieback "0.1.5"]]
                   :repl-options {:init (wkf.dev/start)
                                  :init-ns wkf.dev
                                  :nrepl-middleware
                                  [cemerick.piggieback/wrap-cljs-repl]}}}
  :aliases {"ship" ["run" ":ship"]
            "export" ["run" ":export"]})
