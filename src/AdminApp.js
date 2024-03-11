import { Route, Routes } from "react-router-dom";
import CreateRoutesFromList from "./components/routes/CreateRoutesFromList";
import Persist from "./components/Persist";
import AdminLayout from "./layout/admin/AdminLayout";
import RequireAuth from "./components/RequireAuth";
import { adminPrivateRoutes } from "./config/routes";
import { Suspense } from "react";

function AdminApp() {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <Routes>
        {/* admin routes */}
        <Route element={<Persist />}>
          <Route path="/" element={<AdminLayout />}>
            <Route element={<RequireAuth allowedRoles={[9012]} />}>
              {CreateRoutesFromList(adminPrivateRoutes)}
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
export default AdminApp;
