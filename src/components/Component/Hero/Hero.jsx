import { Link } from "react-router";
import "./hero.css";

const Hero = ({ heroText, seller }) => {
  return (
    <>
      {heroText ? (
        <div className="hero">
          <h1>{heroText}</h1>
          {seller ? (
            <span className="seller-hero">
              <h2>
                Auction by{" "}
                <Link
                  className="details-link"
                  to={"/bidhub/seller/1/"}
                  state={{ seller: seller }}
                >
                  {seller.username}
                </Link>
              </h2>
            </span>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Hero;