import "./login.css";
import "./style.css";

import { BrowserRouter } from "react-router-dom";

import AllRoutes from "./router/AllRoutes";
import AdminRoutes from "./router/AdminRoutes";
import ManagerRoutes from "./router/ManagerRoutes";
import QsrRoutes from "./router/QsrRoutes";
import CaptainRoutes from "./router/CaptainRoutes";

export default function App() {
  const hostname = window.location.hostname;

  let routes;
  if (hostname.startsWith("admin")) {
    routes = <AdminRoutes />;
  } else if (hostname.startsWith("manager")) {
    routes = <ManagerRoutes />;
  } else if (hostname.startsWith("qsr")) {
    routes = <QsrRoutes />;
  } else if (hostname.startsWith("captain")) {
    routes = <CaptainRoutes />;
  } else {
    routes = <AllRoutes />;
  }

  return (
    <div className="App">
      <BrowserRouter>{routes}</BrowserRouter>
    </div>
  );
}
