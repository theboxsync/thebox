import "./style.css";

import { BrowserRouter } from "react-router-dom";

import AllRoutes from "./router/AllRoutes";
import AdminRoutes from "./router/AdminRoutes";
import ManagerRoutes from "./router/ManagerRoutes";
import QsrRoutes from "./router/QsrRoutes";
import CaptainRoutes from "./router/CaptainRoutes";
import ScanForMenuRoutes from "./router/ScanForMenuRoutes";

import { AuthContextProvider } from "./admin/context/AuthContext";

export default function App() {
  const hostname = window.location.hostname;

  let routes;
  if (hostname.startsWith("admin")) {
    routes = (
      <AuthContextProvider>
        <AdminRoutes />
      </AuthContextProvider>
    );
  } else if (hostname.startsWith("manager")) {
    routes = <ManagerRoutes />;
  } else if (hostname.startsWith("qsr")) {
    routes = <QsrRoutes />;
  } else if (hostname.startsWith("captain")) {
    routes = <CaptainRoutes />;
  } else if (hostname.startsWith("menu")) {
    routes = <ScanForMenuRoutes />;
  } else {
    routes = <AllRoutes />;
  }

  return (
    <div className="App">
      <BrowserRouter>{routes}</BrowserRouter>
    </div>
  );
}
