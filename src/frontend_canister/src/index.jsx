import React from "react";
import { createRoot } from "react-dom/client";
import App from "./Components/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "../src/Components/Store/Store";
import { PersistGate } from "redux-persist/integration/react";
import "../assets/main.css"

const root = createRoot(document.getElementById('root')); // Create a root using createRoot

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </BrowserRouter>
    </Provider>

);