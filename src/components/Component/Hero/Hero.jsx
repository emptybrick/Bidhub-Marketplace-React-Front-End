import { Link } from "react-router";
import "./hero.css";

const Hero = ({ heroText, seller, sellerId }) => {
  return (
    <>
      {heroText ? (
        <div className="hero">
          <h1>{heroText}</h1>
          {seller ? (
            <span className="seller-hero">
              <h2>
                Auction by{" "}
                {/* link to sellers market filter (need to make seller view to pass seller username in hero page is just render item list with seller name for hero text) */}
                <Link className="details-link"
                  to={`/bidhub/marketplace/?category=all&condition=all&owner=${sellerId}&end=none&start=none&bid=none&userbids=false&favorites=false&purchased=false`}
                >
                  {seller}
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
