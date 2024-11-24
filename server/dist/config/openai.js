import rateLimit from 'express-rate-limit';
import { Configuration } from 'openai';
export const configureOpenAI = () => {
    const config = new Configuration({
        apiKey: process.env.OPENAI_SECRET,
        organization: process.env.OPENAI_ORGANIZATION_ID
    });
    return config;
};
export const openaiRateLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 2,
    message: {
        error: 'Too many requests',
        message: 'You have exceeded the maximum 2 requests limit for today.'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false // Disable the `X-RateLimit-*` headers
});
//# sourceMappingURL=openai.js.map