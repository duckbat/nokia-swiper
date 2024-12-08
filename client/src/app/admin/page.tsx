'use client';

import { useEffect, useState } from 'react';
import styles from '../../styles/admin.module.css';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [questions, setQuestions] = useState<any[]>([]);
  const [summaries, setSummaries] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);

  const [newQuestion, setNewQuestion] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success) {
        setIsLoggedIn(true);
        setAuthToken(data.data.token);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const fetchData = async (endpoint: string) => {
    const res = await fetch(`${API_BASE_URL}/admin/${endpoint}`, {
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : ''
      }
    });
    return res.json();
  };

  const fetchAdminData = async () => {
    try {
      const [questionsData, summariesData, sessionsData] = await Promise.all([
        fetchData('questions'),
        fetchData('summaries'),
        fetchData('sessions'),
      ]);

      setQuestions(questionsData.data || []);
      setSummaries(summariesData.data || []);
      setSessions(sessionsData.data || []);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn && authToken) {
      fetchAdminData();
    }
  }, [isLoggedIn, authToken]);

  const handleAddQuestion = async () => {
    if (!newQuestion.trim()) return;
    try {
      const response = await fetch(`${API_BASE_URL}/admin/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authToken ? `Bearer ${authToken}` : ''
        },
        body: JSON.stringify({ text: newQuestion, createdBy: 'admin' }),
      });
      if (response.ok) {
        setNewQuestion('');
        fetchAdminData();
      }
    } catch (error) {
      console.error('Failed to add question:', error);
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/questions/${questionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : ''
        }
      });
      if (response.ok) {
        fetchAdminData();
      }
    } catch (error) {
      console.error('Failed to delete question:', error);
    }
  };

  const handleDeleteSingleSummary = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/summaries/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : ''
        }
      });
      if (response.ok) {
        fetchAdminData();
      }
    } catch (error) {
      console.error('Failed to delete summary:', error);
    }
  };

  const handleDeleteAllSummaries = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/summaries`, {
        method: 'DELETE',
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : ''
        }
      });
      if (response.ok) {
        fetchAdminData();
      }
    } catch (error) {
      console.error('Failed to delete all summaries:', error);
    }
  };

  const handleDeleteSessions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/sessions`, {
        method: 'DELETE',
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : ''
        }
      });
      if (response.ok) {
        fetchAdminData();
      }
    } catch (error) {
      console.error('Failed to delete all sessions:', error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className={styles.loginContainer}>
        <h1>Admin Dashboard Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleLogin} className={styles.button}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <nav className={styles.navBar}>
        <h1 className={styles.navTitle}>Admin Dashboard</h1>
      </nav>
      <div className={styles.container}>
        <div className={styles.gridLayout}>
          {/* Questions Section */}
          <div className={styles.card}>
            <h2>Questions</h2>
            <p className={styles.cardDescription}>Add or remove questions that users will rate or respond to.</p>
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
            <div className={styles.scrollableContent}>
              {questions.map((question: any) => (
                <div key={question._id} className={styles.listItem}>
                  <p>{question.text}</p>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteQuestion(question.questionId)}
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
            <p className={styles.cardDescription}>View summaries generated by user feedback. Remove individual ones or clear all.</p>
            <div className={styles.scrollableContent}>
              {summaries.map((summary: any) => (
                <div key={summary._id} className={styles.summaryItem}>
                  <p>{summary.summaryText}</p>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteSingleSummary(summary._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <button onClick={handleDeleteAllSummaries} className={styles.deleteButton}>
              Delete All Summaries
            </button>
          </div>

          {/* Sessions Section */}
          <div className={styles.card}>
            <h2>Sessions</h2>
            <p className={styles.cardDescription}>Manage user sessions. Clear them to reset the feedback environment.</p>
            <div className={styles.scrollableContent}>
              {sessions.map((session: any) => (
                <div key={session._id} className={styles.listItem}>
                  <p>{session.username || 'Anonymous'} - {session.isComplete ? 'Complete' : 'In Progress'}</p>
                </div>
              ))}
            </div>
            <button onClick={handleDeleteSessions} className={styles.deleteButton}>
              Delete All Sessions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
