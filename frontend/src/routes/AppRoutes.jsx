import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "../pages/auth/Register";
import VerifyEmail from "../pages/auth/VerifyEmail";
import Login from "../pages/auth/Login";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Register />} />

                <Route
                    path="/verify-email/:uid/:token"
                    element={<VerifyEmail />}
                />

               

                <Route path="/login" element={<Login />} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;