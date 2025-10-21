import React, { useEffect, useRef, useState } from "react";
import "./textmorph.css"; // We'll define this CSS file below

const TextMorph = () => {
  // State and refs
  const [textIndex, setTextIndex] = useState(0);
  const [morph, setMorph] = useState(0);
  const [cooldown, setCooldown] = useState(0.35); // cooldownTime
  const timeRef = useRef(new Date());
  const requestRef = useRef();

  // Configuration
  const texts = ["Bid", "Win", "BidHub"];
  const morphTime = 0.75;
  const cooldownTime = 0.35;

  // Refs for DOM elements
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  // Morphing function
  const doMorph = () => {
    setMorph((prevMorph) => {
      let newMorph = prevMorph - cooldown;
      let newCooldown = 0;

      let fraction = newMorph / morphTime;

      if (fraction > 1) {
        newCooldown = cooldownTime;
        fraction = 1;
      }

      setMorphEffect(fraction);
      return newMorph;
    });

    setCooldown((prevCooldown) => {
      let newCooldown = prevCooldown;
      if (morph / morphTime > 1) {
        newCooldown = cooldownTime;
      }
      return newCooldown;
    });
  };

  // Set morph effect (update styles)
  const setMorphEffect = (fraction) => {
    if (text2Ref.current && text1Ref.current) {
      text2Ref.current.style.filter = `blur(${Math.min(
        8 / fraction - 8,
        100
      )}px)`;
      text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      const reverseFraction = 1 - fraction;
      text1Ref.current.style.filter = `blur(${Math.min(
        8 / reverseFraction - 8,
        100
      )}px)`;
      text1Ref.current.style.opacity = `${
        Math.pow(reverseFraction, 0.4) * 100
      }%`;

      text1Ref.current.textContent = texts[textIndex % texts.length];
      text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
    }
  };

  // Cooldown function
  const doCooldown = () => {
    setMorph(0);
    if (text2Ref.current && text1Ref.current) {
      text2Ref.current.style.filter = "";
      text2Ref.current.style.opacity = "100%";
      text1Ref.current.style.filter = "";
      text1Ref.current.style.opacity = "0%";
    }
  };

  // Animation loop
  const animate = () => {
    const newTime = new Date();
    const dt = (newTime - timeRef.current) / 1000;
    timeRef.current = newTime;

    setCooldown((prevCooldown) => {
      let newCooldown = prevCooldown - dt;
      const shouldIncrementIndex = newCooldown > 0;

      if (newCooldown <= 0) {
        if (shouldIncrementIndex) {
          setTextIndex((prevIndex) => prevIndex + 1);
        }
        doMorph();
      } else {
        doCooldown();
      }

      return newCooldown;
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  // Start animation on mount, clean up on unmount
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Empty dependency array to run once on mount

  // Initialize text content
  useEffect(() => {
    if (text1Ref.current && text2Ref.current) {
      text1Ref.current.textContent = texts[textIndex % texts.length];
      text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
    }
  }, [textIndex, texts]);

  return (
    <>
      <div id="container">
        <span id="text1" ref={text1Ref}></span>
        <span id="text2" ref={text2Ref}></span>
      </div>
      <svg id="filters">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default TextMorph;
