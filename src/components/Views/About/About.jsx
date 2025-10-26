import { useState, useEffect } from "react";
import "./about.css";
import bidhubLogo from "../../../assets/Bidhub_Marketplace_Logo.png";

const About = () => {
  const [activeBanner, setActiveBanner] = useState("banner1");
  const banners = ["banner1", "banner2", "banner3", "banner4"];

  // Auto-switch banners every 5 seconds
  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setActiveBanner((current) => {
        const currentIndex = banners.indexOf(current);
        const nextIndex = (currentIndex + 1) % banners.length;
        return banners[nextIndex];
      });
    }, 5000);

    return () => clearInterval(bannerTimer);
  }, []);

  // Reset timer when user manually clicks a banner
  const handleBannerClick = (banner) => {
    setActiveBanner(banner);
  };

  return (
    <div className="about-page">
      <section id="section-1">
        <div className="content-slider">
          <input
            type="radio"
            id="banner1"
            className="sec-1-input"
            name="banner"
            checked={activeBanner === "banner1"}
            onChange={() => handleBannerClick("banner1")}
          />
          <input
            type="radio"
            id="banner2"
            className="sec-1-input"
            name="banner"
            checked={activeBanner === "banner2"}
            onChange={() => handleBannerClick("banner2")}
          />
          <input
            type="radio"
            id="banner3"
            className="sec-1-input"
            name="banner"
            checked={activeBanner === "banner3"}
            onChange={() => handleBannerClick("banner3")}
          />
          <input
            type="radio"
            id="banner4"
            className="sec-1-input"
            name="banner"
            checked={activeBanner === "banner4"}
            onChange={() => handleBannerClick("banner4")}
          />

          <div className="slider">
            <div id="top-banner-1" className="banner">
              <div className="banner-inner-wrapper">
                <img
                  src={bidhubLogo}
                  alt="BidHub Logo"
                  className="banner-logo"
                />
                <h2>Creative Marketplace</h2>
                <h1>
                  Welcome
                  <br />
                  to BidHub
                </h1>
                <div className="line"></div>
                <div className="learn-more-button">
                  <a href="#section-2">Learn More</a>
                </div>
              </div>
            </div>

            <div id="top-banner-2" className="banner">
              <div className="banner-inner-wrapper">
                <h2>What We Do</h2>
                <h1>
                  Bid &amp; Win
                  <br />
                  Amazing Items
                </h1>
                <div className="line"></div>
                <div className="learn-more-button">
                  <a href="/bidhub/marketplace">Learn More</a>
                </div>
              </div>
            </div>

            <div id="top-banner-3" className="banner">
              <div className="banner-inner-wrapper">
                <h2>Here We Are</h2>
                <h1>
                  Your Trusted
                  <br />
                  Auction Platform
                </h1>
                <div className="line"></div>
                <div className="learn-more-button">
                  <a href="#section-6">Learn More</a>
                </div>
              </div>
            </div>

            <div id="top-banner-4" className="banner">
              <div className="banner-inner-wrapper">
                <h2>Get In Touch</h2>
                <h1>
                  Contact
                  <br />
                  BidHub
                </h1>
                <div className="line"></div>
                <div className="learn-more-button">
                  <a href="#main-footer">Learn More</a>
                </div>
              </div>
            </div>
          </div>

          <nav>
            <div className="controls">
              <label
                htmlFor="banner1"
                onClick={() => handleBannerClick("banner1")}
              >
                <span className="progressbar">
                  <span className="progressbar-fill"></span>
                </span>
                <span>01</span> Intro
              </label>
              <label
                htmlFor="banner2"
                onClick={() => handleBannerClick("banner2")}
              >
                <span className="progressbar">
                  <span className="progressbar-fill"></span>
                </span>
                <span>02</span> Bidding
              </label>
              <label
                htmlFor="banner3"
                onClick={() => handleBannerClick("banner3")}
              >
                <span className="progressbar">
                  <span className="progressbar-fill"></span>
                </span>
                <span>03</span> About
              </label>
              <label
                htmlFor="banner4"
                onClick={() => handleBannerClick("banner4")}
              >
                <span className="progressbar">
                  <span className="progressbar-fill"></span>
                </span>
                <span>04</span> Contact
              </label>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
};

export default About;
