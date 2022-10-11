import { Route, Routes } from "react-router-dom";
import Login from "src/modules/login";
import Logout from "src/modules/logout";
import PageNotFound from "src/modules/pageNotFound";
import ProtectedRoutes from "src/components/ProtectedRoutes";
import Pivots from "src/modules/pivots";
import Dashboard from "src/modules/dashboard";
import CashReports from "src/modules/cashReports";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/cash-reports">
            <Route path="bhavcopy" element={<CashReports.Bhavcopy />} />
            <Route
              path="gainers-loosers"
              element={<CashReports.GainersLoosers />}
            />
            <Route path="graph" element={<CashReports.Graph />} />
          </Route>

          <Route path="/pivots">
            <Route path="create" element={<Pivots.CreatePivots />} />
            <Route path="show" element={<Pivots.ShowPivots />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
