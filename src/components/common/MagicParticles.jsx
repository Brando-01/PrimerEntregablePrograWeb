import React from 'react';

const MagicParticles = () => {
  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100" 
      style={{ 
        pointerEvents: 'none', 
        zIndex: 0,
        overflow: 'hidden'
      }}
    >
      {/* Partículas mágicas en el fondo */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="position-absolute magic-particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            width: `${4 + Math.random() * 4}px`,
            height: `${4 + Math.random() * 4}px`,
            background: i % 4 === 0 ? '#d69e2e' : 
                       i % 4 === 1 ? '#6b46c1' : 
                       i % 4 === 2 ? '#3182ce' : '#38a169',
            borderRadius: '50%'
          }}
        />
      ))}
    </div>
  );
};

export default MagicParticles;