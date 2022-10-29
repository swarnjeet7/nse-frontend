import _ from "lodash";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "src/components/header";
import Breadcrumb from "src/components/breadcrumb";
import { Container } from "src/atoms/grid";

function MainLayout(props: any) {
  const pathname = window.location.pathname;
  const [urlParams, setUrlParams] = useState(
    _.remove(pathname.split("/"), function (param) {
      return (
        param !== "" && param !== "nse-front-end" && param !== "nse-frontend"
      );
    })
  );

  useEffect(() => {
    if (pathname !== window.location.pathname) {
      setUrlParams(
        _.remove(window.location.pathname.split("/"), function (param) {
          return (
            param !== "" &&
            param !== "nse-front-end" &&
            param !== "nse-frontend"
          );
        })
      );
    }
  }, [pathname]);

  return (
    <>
      <Header />
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          {urlParams.map((url, i) => {
            return (
              <Breadcrumb.Item isActive key={i}>
                {_.replace(url, "-", " ")}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>

        <main>
          <Outlet {...props} />
        </main>
      </Container>
    </>
  );
}

export default MainLayout;
