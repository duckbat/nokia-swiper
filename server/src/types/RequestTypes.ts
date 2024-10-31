type AddQuestionRequest = {
  text?: string; // The question text (optional if generating)
  generate?: boolean; // Whether to generate questions
};

type AddSummaryRequest = {
  questionId: string; // ID of the associated question
  summaryText: string; // The generated summary text
};

type AddResponseRequest = {
    questionId: string; // ID of the associated question
    userName: string; // Name provided by the user
    responseType: 'like' | 'dislike'; // Type of response
  };

export {AddQuestionRequest, AddSummaryRequest, AddResponseRequest};
