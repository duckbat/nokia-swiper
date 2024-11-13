import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

interface SwipeButtonsProps {
  onSwipe: (direction: "left" | "right") => void;
}

const SwipeButtons: React.FC<SwipeButtonsProps> = ({ onSwipe }) => {
  return (
    <div className="swipe-buttons">
      <button
        onClick={() => onSwipe("left")}
        className="swipe-button swipe-left-button"
      >
        <FontAwesomeIcon icon={faThumbsDown} style={{ transform: "rotateY(180deg)" }} />
      </button>
      <button
        onClick={() => onSwipe("right")}
        className="swipe-button swipe-right-button"
      >
        <FontAwesomeIcon icon={faThumbsUp} />
      </button>
    </div>
  );
};

export default SwipeButtons;
