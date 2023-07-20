import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { FolderSubmit } from "./pages/FolderSubmit";
import { PrivateRoute } from "./components/PrivateRoute";
import { Files } from "./pages/Files";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { useDispatch } from "react-redux";
import { auth } from "./api/user";
import { FileView } from "./pages/FileView";
import { Sidebar } from "./layouts/Sidebar";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    dispatch(auth(controller?.signal || null));
    return () => {
      controller.abort();
      console.log("aborting");
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Outlet />
            </PrivateRoute>
          }
        >
          <Route
            path="/"
            element={
              <Sidebar>
                <Outlet />
              </Sidebar>
            }
          >
            <Route index element={<Files />} />
            <Route path="file/:fileId" element={<FileView />} />
          </Route>
        </Route>
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="setFolder" element={<FolderSubmit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
