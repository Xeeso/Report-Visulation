import React from "react";
import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import Authentication from "views/Auth";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";
import { useSelector } from "react-redux";

export default function AppView() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <ThemeContextWrapper>
        <BackgroundColorWrapper>
          <BrowserRouter>
            <Routes>
              <Route
                path="/admin/*"
                element={
                  <>
                    {!user && <Navigate to={"/auth"} />}
                    {user && <AdminLayout />}
                  </>
                }
              />
              <Route
                path="/auth"
                element={
                  <>
                    {user && <Navigate to={"/admin"} />}
                    {!user && <Authentication />}
                  </>
                }
              />
              <Route path="/rtl/*" element={<RTLLayout />} />
              <Route
                path="*"
                element={<Navigate to="/admin/dashboard" replace />}
              />
            </Routes>
          </BrowserRouter>
        </BackgroundColorWrapper>
      </ThemeContextWrapper>
    </>
  );
}
