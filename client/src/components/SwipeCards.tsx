/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import {useEffect, useState} from 'react';
import Card from './Card';
import Summary from './Summary';
import SwipeButtons from './SwipeButtons';
import {AnimatePresence, motion} from 'framer-motion';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';

interface Question {
  _id: string;
  text: string;
}

type SwipeDirection = 'left' | 'right';

const SwipeCards: React.FC = () => {
  const [cards, setCards] = useState<Question[]>([]);
  const [responses, setResponses] = useState<{[key: string]: boolean}>({});
  const [name, setName] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [tapped, setTapped] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [summaryText, setSummaryText] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    // Fetch cards from backend
    const fetchCards = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/questions`);
        setCards(response.data.data);
      } catch (error) {
        console.error('Failed to fetch cards:', error);
      }
    };

    fetchCards();
  }, [API_BASE_URL]);

  const startSwiping = async (isAnonymous = false) => {
    if (!isAnonymous && username.trim() === '') {
      setError('Please enter your name before starting.');
      setTimeout(() => setError(''), 1250);
      return;
    }
    setName(isAnonymous ? 'Anonymous' : username);
    setError('');

    try {
      // Create a new session in the backend
      const response = await axios.post(`${API_BASE_URL}/sessions`, {
        username: isAnonymous ? 'Anonymous' : username,
        anonymous: isAnonymous,
      });
      setSessionId(response.data.data.sessionId);
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  };

  const handleSwipe = async (direction: SwipeDirection) => {
    const currentCard = cards[0];
    if (currentCard && sessionId) {
      try {
        // Send swipe data to the backend
        await axios.post(`${API_BASE_URL}/sessions/swipe`, {
          sessionId,
          questionId: currentCard._id,
          response: direction === 'right', // true if liked (right), false if disliked (left)
        });

        // Update UI to remove swiped card
        setResponses((prevResponses) => ({
          ...prevResponses,
          [currentCard.text]: direction === 'right',
        }));
        setCards((prev) => prev.slice(1));
      } catch (error) {
        console.error('Failed to record swipe:', error);
      }
    }
  };

  const handleSubmit = async () => {
    if (sessionId) {
      try {
        // Mark session as complete and generate summary
        const response = await axios.post(`${API_BASE_URL}/sessions/complete`, {
          sessionId,
        });
        console.log('Summary created:', response.data);
        setSummaryText(response.data.data.summaryText);
        setSubmitted(true);
      } catch (error) {
        console.error('Failed to complete session:', error);
      }
    }
  };

  const handleTap = () => {
    setTapped(true);
  };

  if (!name) {
    return (
      <div className="swipe-container" onClick={handleTap}>
        {tapped ? (
          <>
            <motion.h1
              className="swipe-title"
              initial={{opacity: 0, y: -20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5}}
            >
              Enter your name
            </motion.h1>
            <motion.div
              className="swipe-input-container"
              initial={{opacity: 0, y: -20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: 0.4}}
            >
              <input
                type="text"
                placeholder="Matti Meikäläinen"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="swipe-input"
              />
              <button
                onClick={() => startSwiping()}
                className="swipe-start-button"
              >
                Start
              </button>
            </motion.div>
            <motion.button
              onClick={() => startSwiping(true)}
              className="swipe-anonymous-button"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 0.5, delay: 0.6}}
            >
              Or continue without name
            </motion.button>
          </>
        ) : (
          <motion.div
            className="swipe-tap-message"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
          >
            <h1 className="swipe-tap-title">Feedback Swiper</h1>
            <p>Tap the screen to enter</p>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="swipe-container">
      {cards.length > 0 && (
        <div
          className="swipe-instructions"
          style={{
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '15px',
          }}
        >
          <div>
            <p>Swipe left</p>
            <p
              style={{
                fontSize: '14px',
                fontWeight: 'normal',
                letterSpacing: '2px',
              }}
            >
              Disagree
            </p>
          </div>
          <div>
            <p>Swipe right</p>
            <p
              style={{
                fontSize: '14px',
                fontWeight: 'normal',
                letterSpacing: '2px',
              }}
            >
              Agree
            </p>
          </div>
        </div>
      )}

      <AnimatePresence>
        {cards.length > 0 ? (
          <Card
            key={cards[0]._id}
            content={cards[0].text}
            onSwipe={handleSwipe}
          />
        ) : (
          <motion.div
            key="results"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
          >
            {submitted ? (
              <Summary summaryText={summaryText} />
            ) : (
              <>
                <h1>You have swiped everything!</h1>
                <button
                  onClick={handleSubmit}
                  style={{
                    marginTop: '30px',
                    padding: '15px',
                    fontSize: '30px',
                    fontWeight: 'normal',
                    borderRadius: '15px',
                    background: 'linear-gradient(45deg, #0070f3, #00c6ff)',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'all 1s ease',
                    backgroundSize: '200% 200%',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundImage =
                      'linear-gradient(135deg, #1e90ff, #00bfff, #3cb371, #00fa9a)';
                    e.currentTarget.style.animation =
                      'wavyGradient 6s ease infinite';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundImage =
                      'linear-gradient(45deg, #0070f3, #00c6ff)';
                    e.currentTarget.style.animation = 'none';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Generate Summary
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Buttons */}
      {cards.length > 0 && <SwipeButtons onSwipe={handleSwipe} />}
    </div>
  );
};

export default SwipeCards;
