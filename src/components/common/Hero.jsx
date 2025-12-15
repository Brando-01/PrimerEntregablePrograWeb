import React from 'react';

function waveWrap(text, className = "") {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="wave-letter"
          style={{ animationDelay: `${i * 0.08}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

const Hero = () => (
  <section className="hero-spot hero-center" aria-label="Hero Powers">
    <div className="hero-inner">
      <h1 className="hero-title hero-title-white">
        {waveWrap("⚡ Poderes del Reino")}
      </h1>
      <div>
        <p className="hero-subtitle hero-subtitle-gray" style={{marginTop: '12px'}}>
          {waveWrap("Descubre hechizos ancestrales y domina los elementos")}
        </p>
      </div>
      <span className="hero-flare" aria-hidden />
    </div>
  </section>
);

export default Hero;