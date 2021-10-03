import { toast } from 'react-toastify';

export const handleApiErrorCodes = (errorCode) => {
  switch (errorCode) {
    case 304:
      return {
        message: 'Not Modified',
      };
    case 404:
      return {
        message: 'Requested operation not found',
      };
    case 403:
      return {
        message:
          'API rate limit exceeded. Try waiting for sometime and refresh page',
      };
    case 422:
      return {
        message: 'Something went wrong. Unable to process request',
      };
    case 503:
      return {
        message:
          'Something went wrong. Please check your internet connection or contact our support.',
      };
    default:
      return {
        message:
          'Something went wrong. Please check your internet connection or contact our support.',
      };
  }
};

export const handleApiError = (errorCode = null) => {
  const error = handleApiErrorCodes(errorCode);
  toast.error(error?.message, {
    toastId: errorCode,
  });
};
