import { motion, PanInfo } from 'framer-motion';
import React from 'react';

interface CardProps {
  content: string;
  onSwipe: (direction: 'left' | 'right') => void;
}

const Card: React.FC<CardProps> = ({ content, onSwipe }) => {
  const dragConstraints = { left: -150, right: 150 };

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
        width: 300,
        height: 400,
        borderRadius: 10,
        backgroundColor: '#f2f2f2',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        textShadow: '0.2px 0.2px 0.7px rgba(0, 0, 0, 0.3)',
        fontSize: '22px',
        padding: '20px',
        color: 'rgb(72, 72, 72)',
        alignItems: 'center',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        position: 'absolute',
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {content}
    </motion.div>
  );
};

export default Card;
