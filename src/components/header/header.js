import { Container, Grid, GridCell } from "src/atoms/grid";
import Dropdown from "src/components/dropdown";
import Navbar from "src/components/navbar";
import Logo from "src/components/logo";
import "./header.scss";

function Header(props) {
  return (
    <header className="header">
      <Container>
        <Grid>
          <GridCell>
            <Logo />
          </GridCell>

          <Navbar>
            <Dropdown title="Import" id="import-dropdown">
              <Dropdown.Item href="/nse-front-end/import/cash-bhavcopy">
                Cash Bhavcopy
              </Dropdown.Item>
              <Dropdown.Item href="/nse-front-end/import/fo-bhavcopy">
                FO Bhavcopy
              </Dropdown.Item>
            </Dropdown>

            <Dropdown title="Cash Reports" id="reports-cash-dropdown">
              <Dropdown.Item href="/nse-front-end/cash-reports/bhavcopy">
                Bhavcopy
              </Dropdown.Item>
              <Dropdown.Item href="/nse-front-end/cash-reports/gainers-loosers">
                Gainers/Loosers
              </Dropdown.Item>
              <Dropdown.Item href="/nse-front-end/cash-reports/graph">
                Graph
              </Dropdown.Item>
            </Dropdown>

            <Dropdown title="FO Reports" id="reports-fo-dropdown">
              <Dropdown.Item href="/nse-front-end/fo-reports/bhavcopy">
                Bhavcopy
              </Dropdown.Item>
            </Dropdown>

            <Dropdown title="Pivots" id="pivot-dropdown">
              <Dropdown.Item href="/nse-front-end/pivots/create">
                Create Pivots
              </Dropdown.Item>
              <Dropdown.Item href="/nse-front-end/pivots/show">
                Show Pivots
              </Dropdown.Item>
            </Dropdown>

            <Dropdown title="Portfolio" id="portfolio-dropdown">
              <Dropdown.Item href="/nse-front-end/portfolio/create">
                Create Portfolio
              </Dropdown.Item>
              <Dropdown.Item href="/nse-front-end/portfolio/manage">
                Manage Portfolio
              </Dropdown.Item>
            </Dropdown>

            <Dropdown title="Users" id="users-dropdown">
              <Dropdown.Item href="/nse-front-end/user/manage">
                Manage Users
              </Dropdown.Item>
            </Dropdown>

            <Dropdown title="Profile" id="profile-dropdown" isProfile>
              <Dropdown.Item href="/nse-front-end/logout">Logout</Dropdown.Item>
              <Dropdown.Item href="/nse-front-end/profile">
                Profile
              </Dropdown.Item>
            </Dropdown>
          </Navbar>
        </Grid>
      </Container>
    </header>
  );
}

export default Header;
