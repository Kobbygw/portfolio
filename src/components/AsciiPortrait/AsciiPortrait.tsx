import React, { useRef } from 'react';
import { useAsciiEngine } from './useAsciiEngine';

interface AsciiPortraitProps {
  imageSrc: string;
  fallbackSrc?: string;
}

const AsciiPortrait: React.FC<AsciiPortraitProps> = ({ imageSrc, fallbackSrc }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { handleMouseMove, handleMouseLeave } = useAsciiEngine(canvasRef, imageSrc, fallbackSrc);

  return (
    <div className="canvas-wrapper">
      <canvas 
        id="ascii-canvas" 
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseLeave}
      />
    </div>
  );
};

export default AsciiPortrait;
