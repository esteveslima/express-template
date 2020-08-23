import rateLimit from 'express-rate-limit';
import ErrorResponse from '../error/structure/error-response';

export const setupCustomRateLimit = (requestsNumber, timeWindow) => {
  const limiter = rateLimit({
    windowMs: timeWindow * 60 * 1000,
    max: requestsNumber,
    handler: () => {
      throw new ErrorResponse(ErrorResponse.errorCodes.TOO_MANY_REQUESTS, 'too many requests');
    },
  });
  return limiter;
};

export const setupGeneralRateLimit = () => {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    handler: () => {
      throw new ErrorResponse(ErrorResponse.errorCodes.TOO_MANY_REQUESTS, 'too many requests');
    },
  });
  return limiter;
};

export const setupFileUploadRateLimit = () => {
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    handler: () => {
      throw new ErrorResponse(ErrorResponse.errorCodes.TOO_MANY_UPLOADS, 'too many uploads');
    },
  });
  return limiter;
};
