type MessageResponse = {
  message: string;
};

type ErrorResponse = MessageResponse & {
  stack?: string;
};

type ApiResponse<T> = {
  success: boolean; // Indicates if the operation was successful
  data?: T; // The actual data returned
  message?: string; // Optional message for errors or success
};

export {MessageResponse, ErrorResponse, ApiResponse};
