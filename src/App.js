import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import Users from "src/modules/users";
import "./App.scss";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="/import">
              <Route path="cash-bhavcopy" element={<Import.CashFile />} />
              <Route path="fo-bhavcopy" element={<Import.FoFile />} />
            </Route>

            <Route path="/cash-reports">
              <Route path="bhavcopy" element={<CashReports.Bhavcopy />} />
              <Route
                path="gainers-loosers"
                element={<CashReports.GainersLoosers />}
              />
              <Route path="graph" element={<CashReports.Graph />} />
            </Route>

            <Route path="/fo-reports">
              <Route path="bhavcopy" element={<FoReports.Bhavcopy />} />
            </Route>

            <Route path="/pivots">
              <Route path="create" element={<Pivots.Create />} />
              <Route path="show" element={<Pivots.Show />} />
            </Route>

            <Route path="/portfolio">
              <Route path="create" element={<Portfolio.Create />} />
              <Route path="manage" element={<Portfolio.Manage />} />
            </Route>

            <Route path="/users">
              <Route path="manage" element={<Users.Manage />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
