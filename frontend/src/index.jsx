import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { StudentContextProvider } from "./context/StudentContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <div className="bg-gray-200">
            <StudentContextProvider>
                <RouterProvider router={router} />
            </StudentContextProvider>
        </div>
    </React.StrictMode>
);
