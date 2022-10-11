import { Link } from "react-router-dom";
import { Grid, GridCell } from "src/atoms/grid";
import LogoImage from "src/img/logo-sm.png";
import "./logo.scss";

function Logo() {
  return (
    <div className="logo">
      <Link className="logo__block" to="/">
        <Grid>
          <GridCell>
            <img src={LogoImage} alt="NSE Stock Analysis" width="75" />
          </GridCell>
          <GridCell className="logo__text">
            <div className="logo__title">
              <strong>NSE</strong>
            </div>
            <div className="logo__subtitle">
              <strong>Stock Analysis</strong>
            </div>
          </GridCell>
        </Grid>
      </Link>
    </div>
  );
}

export default Logo;
