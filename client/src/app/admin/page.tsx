'use client';

import {useState} from 'react';
import styles from './admin.module.css';

const AdminPage = () => {
  // Temporarily set isLoggedIn to true for testing
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set to true for bypassing login

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Mock data for Questions, Categories, Summaries, and Sessions
  const [questions, setQuestions] = useState<string[]>([
    'The service met my expectations.',
    'The pricing is reasonable for the value offered.',
  ]);

  const [categories, setCategories] = useState<string[]>([
    'Service Quality',
    'User Experience',
  ]);

  const [summaries, setSummaries] = useState<string[]>([
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Pellentesque et justo vitae dui ultrices efficitur.',
  ]);

  const [sessions, setSessions] = useState<string[]>([
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed non risus vitae nunc accumsan sodales.',
  ]);

  // New text input state for Questions and Categories
  const [newQuestion, setNewQuestion] = useState('');
  const [newCategory, setNewCategory] = useState('');

  // Add functions for Questions and Categories
  const handleAddQuestion = () => {
    if (newQuestion) {
      setQuestions([...questions, newQuestion]);
      setNewQuestion(''); // Clear the input field after adding
    }
  };

  const handleAddCategory = () => {
    if (newCategory) {
      setCategories([...categories, newCategory]);
      setNewCategory(''); // Clear the input field after adding
    }
  };

  // Delete functions for Questions and Categories
  const handleDeleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleDeleteCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  // Delete functions for Summaries and Sessions
  const handleDeleteSummary = (index: number) => {
    setSummaries(summaries.filter((_, i) => i !== index));
  };

  const handleDeleteSession = (index: number) => {
    setSessions(sessions.filter((_, i) => i !== index));
  };

  // Handle login submission
  const handleLogin = () => {
    if (username && password) {
      setIsLoggedIn(true); // Log in successfully when both fields are filled
    } else {
      alert('Please enter both username and password');
    }
  };

  // Login form UI
  if (!isLoggedIn) {
    return (
      <div className={styles.loginContainer}>
        <h1>Login to Admin Dashboard</h1>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <button onClick={handleLogin} className={styles.button}>
          Login
        </button>
      </div>
    );
  }

  // Admin dashboard UI
  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>

      {/* Layout with CSS Grid */}
      <div className={styles.gridLayout}>
        {/* Questions Section */}
        <div className={styles.card}>
          <h2>Questions</h2>
          {/* Add Question Section */}
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Enter new question"
              className={styles.input}
            />
            <button onClick={handleAddQuestion} className={styles.button}>
              Add
            </button>
          </div>

          {/* Scrollable content */}
          <div className={styles.scrollableContent}>
            {/* Display Existing Questions */}
            {questions.map((question, index) => (
              <div key={index} className={styles.listItem}>
                <p>{question}</p>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteQuestion(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className={styles.card}>
          <h2>Categories</h2>
          {/* Add Category Section */}
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter new category"
              className={styles.input}
            />
            <button onClick={handleAddCategory} className={styles.button}>
              Add
            </button>
          </div>

          {/* Scrollable content */}
          <div className={styles.scrollableContent}>
            {/* Display Existing Categories */}
            {categories.map((category, index) => (
              <div key={index} className={styles.listItem}>
                <p>{category}</p>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteCategory(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Summaries Section */}
        <div className={styles.card}>
          <h2>Summaries</h2>
          {/* Display Existing Summaries */}
          {summaries.map((summary, index) => (
            <div key={index} className={styles.listItem}>
              <p>{summary}</p>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteSummary(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Sessions Section */}
        <div className={styles.card}>
          <h2>Sessions</h2>
          {/* Display Existing Sessions */}
          {sessions.map((session, index) => (
            <div key={index} className={styles.listItem}>
              <p>{session}</p>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteSession(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
