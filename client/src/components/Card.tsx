import {motion, PanInfo} from 'framer-motion';
import React from 'react';

interface CardProps {
  content: string;
  onSwipe: (direction: 'left' | 'right') => void;
}

const Card: React.FC<CardProps> = ({content, onSwipe}) => {
  const dragConstraints = {left: -150, right: 150};

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x > 100) {
      onSwipe('right');
    } else if (info.offset.x < -100) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={dragConstraints}
      onDragEnd={handleDragEnd}
      className="card"
      style={{
        width: '80%',
        height: '52.5%',
        borderRadius: 20,
        backgroundColor: '#f2f2f2',
        // backgroundImage: `url(${background_img1})`,
        // backgroundColor: background_img1 ? 'transparent' : '#f2f2f2', // Fallback color
        // backgroundSize: 'cover', // Ensure the image covers the entire card
        // backgroundPosition: 'center', // Center the image
        // backgroundRepeat: 'no-repeat', // Prevent tiling
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px rgba(72, 72, 72, 0.15)',
        fontSize: '2.75vh',
        padding: '20px',
        color: 'rgb(72, 72, 72)',
        alignItems: 'center',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        position: 'absolute',
      }}
      whileTap={{scale: 0.85}}
      initial={{opacity: 0, y: 50, scale: 0.85, rotateZ: -5}}
      animate={{opacity: 1, y: 0, scale: 1, rotateZ: 0}}
      exit={{opacity: 0, y: -20, scale: 0.5, rotateZ: 5}}
    >
      {content}
    </motion.div>
  );
};

export default Card;