import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import AdminLayout from "./layout/admin/AdminLayout";
import UserLayout from "./layout/UserLayout";
import Register from "./components/register/Register";
import CreateRoutesFromList from "./components/routes/CreateRoutesFromList";
import {
  adminPrivateRoutes,
  publicRoutes,
  publicRoutesNoLayout,
  userInfoRoutes,
  userPrivateRoutes,
} from "./config/routes";
import RequireAuth from "./components/RequireAuth";
import Persist from "./components/Persist";

import React, { Suspense } from "react";
import Missing from "./pages/Missing";
import User from "./pages/users/User";
import ClockLoader from "./components/ClockLoader";

function App() {
  return (
    <Suspense fallback={<ClockLoader />}>
      <Routes>
        {/* regis, login */}
        {/* <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} /> */}
        {CreateRoutesFromList(publicRoutesNoLayout)}

        {/* user routes */}
        <Route element={<Persist />}>
          <Route path="/" element={<UserLayout />}>
            {CreateRoutesFromList(publicRoutes)}
            <Route element={<RequireAuth allowedRoles={[1234]} />}>
              {CreateRoutesFromList(userPrivateRoutes)}
            </Route>
            <Route path="/user-info/*" element={<User />}>
              <Route element={<RequireAuth allowedRoles={[1234]} />}>
                {CreateRoutesFromList(userInfoRoutes)}
              </Route>
            </Route>
          </Route>
        </Route>

        {/* admin routes */}
        {/* <Route element={<Persist />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route element={<RequireAuth allowedRoles={[9012]} />}>
              {CreateRoutesFromList(adminPrivateRoutes)}
            </Route>
          </Route>
        </Route> */}

        <Route path="*" element={<Missing />} />
      </Routes>
    </Suspense>
  );
}

export default App;
