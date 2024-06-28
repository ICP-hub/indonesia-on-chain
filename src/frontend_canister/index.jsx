import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store, { persistor } from "../src/Components/Store/Store";
import { PersistGate } from "redux-persist/integration/react";

import "../assets/main.css"
import i18n from "./i18n";  
import i18next from "i18next";
// import global_en from "./locales/en/"
// i18next.init({
//     interpolation:{escapValue},
//     lng:"en",
//     en:{

//     }

// })
// const root = createRoot(document.getElementById('root')); // Create a root using createRoot
// i18n
// root.render(
// 
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </BrowserRouter>
    </Provider>,
     document.getElementById("root")
);

