import rateLimit from 'express-rate-limit';

export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        status: 'error',
        message: 'Too many requests from this IP, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false, 
    skip: (req) => {
        return req.path === '/';
    },
});


export const chatLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message: {
        status: 'error',
        message: 'Too many chat requests. Maximum 30 requests per 15 minutes.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        return (req.body?.sessionId as string) || req.ip || 'unknown';
    },
});

export const ingestionLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5, 
    message: {
        status: 'error',
        message: 'Too many ingestion requests. Maximum 5 requests per hour.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
