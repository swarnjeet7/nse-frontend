import WhiteBoard from "src/components/whiteBoard";
import ImgNotFound from "src/img/404.jpeg";
import Title from "src/atoms/title";
import Button from "src/components/button/button";
import "./pageNotFound.scss";

function PageNotFound() {
  return (
    <WhiteBoard>
      <img className="img-block" src={ImgNotFound} alt="Page not found" />
      <Title className="title-404 color-dark" center>
        404
      </Title>
      <Title className="sub-title-404 color-dark" center>
        Page not found
      </Title>
      <div className="text-wrapper">
        <p className="text-center color-dark m0 p0">
          We are sorry, the page you request could not be found.
        </p>
        <p className="text-center color-dark m0 p0">
          Please nevigate from the dropdown links
        </p>
      </div>
      <div className="text-center">
        <Button isInline isLink href="/">
          Go Home
        </Button>
      </div>
    </WhiteBoard>
  );
}

export default PageNotFound;
