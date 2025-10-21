import "./about.css";
import bidhubLogo from "../../../assets/Bidhub_Marketplace_Logo.png";

const About = () => {
  return (
    <div className="about container">
      <img src={bidhubLogo} alt="Bidhub Marketplace Logo" />
      <h1>About Bidhub</h1>
      <h2>Where Great Finds Meet Great Bids.</h2>
      <p>
        <strong>Bidhub</strong> is your go-to online marketplace for buying and
        selling unique items through live bidding.
        <br />
        <br />
        <span style={{ color: "#4e73df", fontWeight: 600 }}>Sellers</span>{" "}
        showcase their listings to a wide audience, while{" "}
        <span style={{ color: "#1cc88a", fontWeight: 600 }}>buyers</span> chase
        the best deals in a fun, competitive environment.
        <br />
        <br />
        Our mission is to create a community-driven auction hub where every item
        has a story, every bid counts, and every user feels in control.
        <br />
        <br />
        From collectibles and gadgets to one-of-a-kind treasures, Bidhub
        connects sellers and buyers in real time—safely, fairly, and with a
        touch of excitement.
        <br />
        <br />
        <span style={{ color: "#e74a3b", fontWeight: 600 }}>
          Join Bidhub today, explore what’s up for grabs, and start bidding
          smarter. Happy Bidding!
        </span>
      </p>
    </div>
  );
};

export default About;
