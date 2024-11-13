import React from 'react';

interface SummaryProps {
  summaryData: Record<string, { description: string }> | null;
}

const Summary: React.FC<SummaryProps> = ({ summaryData }) => {
  if (!summaryData) {
    return <p className="text-center text-gray-500">Loading summary...</p>;
  }

  return (
    <div className="bg-white p-5 rounded-lg shadow-md mt-5 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Summary</h2>
      {Object.entries(summaryData).map(([category, { description }]) => (
        <div key={category} className="mb-3">
          <strong className="block font-semibold text-gray-700">{category}:</strong>
          <p className="text-gray-600">{description}</p>
        </div>
      ))}
    </div>
  );
};

export default Summary;
