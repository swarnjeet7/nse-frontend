import { Route, Routes } from "react-router-dom";
import Login from "src/modules/login";
import Logout from "src/modules/logout";
import PageNotFound from "src/modules/pageNotFound";
import ProtectedRoutes from "src/components/ProtectedRoutes";
import Pivots from "src/modules/pivots";
import Dashboard from "src/modules/dashboard";
import CashReports from "src/modules/cashReports";
import FoReports from "src/modules/foReports";
import Portfolio from "src/modules/portfolio";
import Import from "src/modules/import";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/nse-front-end/" element={<Login />} />
        <Route path="/nse-front-end/login" element={<Login />} />
        <Route path="/nse-front-end/logout" element={<Logout />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="/nse-front-end/import">
            <Route path="cash-bhavcopy" element={<Import.CashFile />} />
            <Route path="fo-bhavcopy" element={<Import.FoFile />} />
          </Route>

          <Route path="/nse-front-end/cash-reports">
            <Route path="bhavcopy" element={<CashReports.Bhavcopy />} />
            <Route
              path="gainers-loosers"
              element={<CashReports.GainersLoosers />}
            />
            <Route path="graph" element={<CashReports.Graph />} />
          </Route>

          <Route path="/nse-front-end/fo-reports">
            <Route path="bhavcopy" element={<FoReports.Bhavcopy />} />
          </Route>

          <Route path="/nse-front-end/pivots">
            <Route path="create" element={<Pivots.Create />} />
            <Route path="show" element={<Pivots.Show />} />
          </Route>

          <Route path="/nse-front-end/portfolio">
            <Route path="create" element={<Portfolio.Create />} />
            <Route path="manage" element={<Portfolio.Manage />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
