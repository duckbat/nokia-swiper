'use client';

import {useLayoutEffect, useState} from 'react';
import Card from './card';
import {AnimatePresence, motion} from 'framer-motion';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';
import {Viewport} from 'next';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  userScalable: false,
  maximumScale: 1,
};

const initialCards = [
  'The food options at Karamalmi campus are diverse and tasty.',
  'There are enough seating areas for students to enjoy meals comfortably.',
  'The campus layout makes it easy to find classrooms and facilities.',
  'The Wi-Fi connection is reliable and strong throughout the campus.',
  'The study areas at Karamalmi are quiet and well-maintained.',
  'There is enough natural light in most campus spaces.',
  'The campus offers a good range of recreational activities for students.',
  'The Karamalmi library has a great selection of resources.',
  'The staff at Karamalmi are approachable and helpful.',
  'Recycling options are clearly labeled and easy to find around campus.',
];

// Define a type for swipe direction
type SwipeDirection = 'left' | 'right';

// Define response types for each card
type Responses = {
  [key: string]: {label: string; right: string; left: string};
};

const responseOptions: Responses = {
  'The food options at Karamalmi campus are diverse and tasty.': {
    label: 'Food',
    right: 'delicious',
    left: 'bland',
  },
  'There are enough seating areas for students to enjoy meals comfortably.': {
    label: 'Seating',
    right: 'spacious',
    left: 'cramped',
  },
  'The campus layout makes it easy to find classrooms and facilities.': {
    label: 'Layout',
    right: 'accessible',
    left: 'confusing',
  },
  'The Wi-Fi connection is reliable and strong throughout the campus.': {
    label: 'Wi-Fi',
    right: 'stable',
    left: 'weak',
  },
  'The study areas at Karamalmi are quiet and well-maintained.': {
    label: 'Study Areas',
    right: 'peaceful',
    left: 'noisy',
  },
  'There is enough natural light in most campus spaces.': {
    label: 'Lighting',
    right: 'bright',
    left: 'dim',
  },
  'The campus offers a good range of recreational activities for students.': {
    label: 'Recreation',
    right: 'varied',
    left: 'limited',
  },
  'The Karamalmi library has a great selection of resources.': {
    label: 'Library',
    right: 'rich',
    left: 'scarce',
  },
  'The staff at Karamalmi are approachable and helpful.': {
    label: 'Staff',
    right: 'friendly',
    left: 'unhelpful',
  },
  'Recycling options are clearly labeled and easy to find around campus.': {
    label: 'Recycling',
    right: 'accessible',
    left: 'unclear',
  },
};

const SwipeCards: React.FC = () => {
  const [cards, setCards] = useState(initialCards);
  const [responses, setResponses] = useState<{[key: string]: string}>({});
  const [name, setName] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [tapped, setTapped] = useState(false); // Track if the screen was tapped
  const [windowHeight] = useWindowSize();

  const handleSwipe = (direction: SwipeDirection) => {
    const currentCard = cards[0];
    if (currentCard) {
      const {label} = responseOptions[currentCard];
      setResponses((prevResponses) => ({
        ...prevResponses,
        [label]: responseOptions[currentCard][direction],
      }));
      setCards((prev) => prev.slice(1));
    }
  };

  const startSwiping = (isAnonymous = false) => {
    if (!isAnonymous && username.trim() === '') {
      setError('Please enter your name before starting.');
      setTimeout(() => setError(''), 1250);
      return;
    }
    setName(isAnonymous ? 'Anonymous' : username);
    setError('');
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleTap = () => {
    setTapped(true); // Set tapped to true when the user taps anywhere
  };

  if (!name) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100dvh',
          minHeight: '-webkit-fill-available',
          textAlign: 'center',
          width: '100vw',
        }}
        onClick={handleTap} // Detect tap anywhere
      >
        {tapped ? ( // Show the name input form after tap
          <>
            <motion.h1
              style={{
                fontSize: '30px',
                fontWeight: 'bold',
                alignSelf: 'center',
                color: '#333',
              }}
              initial={{opacity: 0, y: -20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5}}
            >
              Demo mock feedback
            </motion.h1>
            <motion.h2
              style={{
                fontSize: '15px',
                fontWeight: 'bold',
                marginBottom: '50px',
                alignSelf: 'center',
                color: '#333',
                letterSpacing: '2px',
              }}
              initial={{opacity: 0, y: -20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: 0.2}}
            >
              Metropolia, Karamalmi
            </motion.h2>
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                maxWidth: '300px',
              }}
              initial={{opacity: 0, y: -20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: 0.4}}
            >
              <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  height: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  flex: 1,
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                  outline: 'none',
                  transition: 'box-shadow 0.2s ease',
                }}
                onFocus={(e) =>
                  (e.target.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.3)')
                }
                onBlur={(e) =>
                  (e.target.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)')
                }
              />
              <button
                onClick={() => startSwiping()}
                style={{
                  height: '100%',
                  padding: '10px 10px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  borderRadius: '5px',
                  border: 'none',
                  backgroundColor: '#0070f3',
                  color: '#fff',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    '0px 6px 12px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    '0px 4px 8px rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.boxShadow =
                    '0px 6px 12px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.boxShadow =
                    '0px 4px 8px rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Start
              </button>
            </motion.div>
            {error && (
              <p style={{color: 'red', marginTop: '5px', fontSize: '10.5px'}}>
                {error}
              </p>
            )}
            <motion.button
              onClick={() => startSwiping(true)}
              style={{
                marginTop: '15px',
                fontSize: '14px',
                cursor: 'pointer',
                borderRadius: '5px',
                border: 'none',
                color: '#333',
              }}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 0.5, delay: 0.6}}
            >
              Or continue without name
            </motion.button>
          </>
        ) : (
          <motion.div
            style={{
              fontSize: '15px',
              color: '#333',

              cursor: 'pointer',
            }}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
          >
            <h1 style={{fontSize: '28px', fontWeight: 'bold', color: '#333'}}>
              Feedback Swiper
            </h1>
            <p>Tap the screen to enter</p>
          </motion.div>
        )}
      </div>
    );
  }

  if (submitted) {
    return (
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100dvh',
            minHeight: '-webkit-fill-available',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          Thank you for your feedback!
        </div>
      </motion.div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100dvh',
        minHeight: '-webkit-fill-available',
      }}
    >
      {cards.length > 0 && (
        <div style={{color: '#333'}}>
          <p style={{fontSize: '15px', textAlign: 'center'}}>
            Swipe left | Swipe right
          </p>
          <p
            style={{
              fontSize: '10px',
              textAlign: 'center',
              letterSpacing: '4.5px',
            }}
          >
            Disagree | Agree
          </p>
        </div>
      )}

      <AnimatePresence>
        {cards.length > 0 ? (
          <Card key={cards[0]} content={cards[0]} onSwipe={handleSwipe} />
        ) : (
          <motion.div
            key="results" // Ensure a unique key for AnimatePresence
            initial={{opacity: 0, y: 20}} // Start off-screen
            animate={{opacity: 1, y: 0}} // Fade in and slide up
            exit={{opacity: 0, y: 20}} // Fade out and slide down on exit
            transition={{duration: 0.5}}
          >
            {Object.entries(responseOptions).map(([key, {label}]) => (
              <div key={label}>
                <span style={{fontWeight: 'bold', fontSize: '19px'}}>
                  {label}:{' '}
                </span>
                <span style={{fontSize: '19px'}}>
                  {responses[label] || 'No response'}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {cards.length > 0 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '300px',
            marginTop: '500px',
            gap: '50px',
          }}
        >
          <button
            onClick={() => handleSwipe('left')}
            style={{
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              backgroundColor: '#ff4757',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            <FontAwesomeIcon
              icon={faThumbsDown}
              style={{transform: 'rotateY(180deg)'}}
            />{' '}
            {/* Red button icon */}
          </button>
          <button
            onClick={() => handleSwipe('right')}
            style={{
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              backgroundColor: '#2ed573',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            <FontAwesomeIcon icon={faThumbsUp} /> {/* Green button icon */}
          </button>
        </div>
      ) : (
        <motion.div
          key="results" // Ensure a unique key for AnimatePresence
          initial={{opacity: 0, y: 20}} // Start off-screen
          animate={{opacity: 1, y: 0}} // Fade in and slide up
          exit={{opacity: 0, y: 20}} // Fade out and slide down on exit
          transition={{duration: 0.5}}
        >
          <button
            onClick={handleSubmit}
            style={{
              marginTop: '30px',
              padding: '10px 10px',
              fontSize: '16px',
              cursor: 'pointer',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#0070f3',
              color: '#fff',
            }}
          >
            Submit
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default SwipeCards;
