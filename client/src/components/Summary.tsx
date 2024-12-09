import React, {useState} from 'react';

interface SummaryProps {
  summaryText: string | null;
}

const Summary: React.FC<SummaryProps> = ({summaryText}) => {
  const [feedbackSent, setFeedbackSent] = useState(false);

  if (!summaryText) {
    return <p>Loading summary...</p>;
  }

  const handleSendFeedback = () => {
    setFeedbackSent(true);
  };

  return (
    <>
      {!feedbackSent && (
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            margin: '20px auto',
            maxWidth: '600px',
            textAlign: 'center',
            overflow: 'hidden',
          }}
          className="summary-container"
        >
          <h1 style={{fontSize: '24px', color: '#333'}}>
            Your short summary story:
          </h1>
          <br />
          <p style={{fontSize: '18px', color: '#666'}}>{summaryText}</p>
          <button
            onClick={handleSendFeedback}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Send Feedback
          </button>
        </div>
      )}

      {feedbackSent && (
        <h1
          style={{
            fontSize: '30px',
            color: '#333',
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: '40px',
          }}
        >
          Thank you for the feedback!
        </h1>
      )}
    </>
  );
};

export default Summary;