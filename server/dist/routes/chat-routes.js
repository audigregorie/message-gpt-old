import { Router } from 'express';
import { verifyToken } from '../config/auth/token.js';
import { chatCompletionValidator, validate } from '../utils/validators.js';
import { deleteChats, generateChatCompletion, sendChatsToUser } from '../controllers/chat-controller.js';
import { openaiRateLimiter } from '../config/openai.js';
const chatRoutes = Router();
chatRoutes.post('/new', verifyToken, openaiRateLimiter, validate(chatCompletionValidator), generateChatCompletion);
chatRoutes.get('/all-chats', verifyToken, sendChatsToUser);
chatRoutes.delete('/delete', verifyToken, deleteChats);
export default chatRoutes;
//# sourceMappingURL=chat-routes.js.map