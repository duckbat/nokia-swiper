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
    <div
      style={{
        backgroundColor: '#f9f9f9',
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
      <div
        style={{
          transition: 'opacity 0.5s ease, transform 0.5s ease',
          opacity: feedbackSent ? 0 : 1,
          transform: feedbackSent ? 'translateY(-20px)' : 'translateY(0)',
          display: feedbackSent ? 'none' : 'block',
        }}
      >
        <h1 style={{fontSize: '24px', color: '#333'}}>
          Your short summary story:
        </h1>
        <br />
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

      <div
        style={{
          transition: 'opacity 0.5s ease, transform 0.5s ease',
          opacity: feedbackSent ? 1 : 0,
          transform: feedbackSent ? 'translateY(0)' : 'translateY(20px)',
          display: feedbackSent ? 'block' : 'none',
        }}
      >
        <h1 style={{fontSize: '24px', color: '#333'}}>
          Thank you for the feedback!
        </h1>
      </div>
    </div>
  );
};

export default Summary;
