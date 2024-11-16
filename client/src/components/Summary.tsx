interface SummaryProps {
  summaryText: string | null;
}

const Summary: React.FC<SummaryProps> = ({ summaryText }) => {
  if (!summaryText) {
    return <p>Loading summary...</p>;
  }

  return (
    <div className="summary-container">
      <h1>Your short summary story:</h1>
      <p>{summaryText}</p>
    </div>
  );
};

export default Summary;
