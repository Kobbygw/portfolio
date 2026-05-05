import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  phrases: string[];
  waitTime?: number;
  typeSpeed?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ 
  phrases, 
  waitTime = 2000, 
  typeSpeed = 100 
}) => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const current = phraseIndex % phrases.length;
    const fullTxt = phrases[current];

    const tick = () => {
      if (isDeleting) {
        setText(prev => fullTxt.substring(0, prev.length - 1));
      } else {
        setText(prev => fullTxt.substring(0, prev.length + 1));
      }

      let speed = typeSpeed;

      if (isDeleting) {
        speed /= 2;
      }

      if (!isDeleting && text === fullTxt) {
        timer = setTimeout(() => setIsDeleting(true), waitTime);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setPhraseIndex(prev => prev + 1);
        timer = setTimeout(() => {}, 500);
      } else {
        timer = setTimeout(tick, speed);
      }
    };

    timer = setTimeout(tick, typeSpeed);

    return () => clearTimeout(timer);
  }, [phraseIndex, isDeleting, phrases, waitTime, typeSpeed, text]);

  return (
    <span id="typing-text">
      {text}
    </span>
  );
};

export default Typewriter;
