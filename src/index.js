import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/app";
import * as serviceWorker from "./serviceWorker";

// Provide a firebase context so that it can be used by components interested in utilizing its services
import Firebase, { FirebaseContext } from "./components/Firebase";
import NewsContext from "./components/News/context";
import news from "newsapi";

ReactDOM.render(
  <NewsContext.Provider value={new news(process.env.REACT_APP_NEWS_API_KEY)}>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </NewsContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
