import "./hero.css";

const Hero = ({ heroText }) => {
  return (
    <>
      {heroText ? (
        <div className="hero">
          <h1>{heroText}</h1>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Hero;
