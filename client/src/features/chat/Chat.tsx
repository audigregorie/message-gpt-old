import { useEffect, useRef, useState } from 'react';
import { Avatar, IconButton } from '@mui/material';
import { IoMdSend } from 'react-icons/io';
import { ChatMessage } from '../../utils/common.interface';
import toast from 'react-hot-toast';
import { deleteUserChats, getUserChats, sendChatRequest } from '../../utils/api/api-communicator';
import { Role } from '../../utils/common.enum';
import ChatItem from './ChatItem';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/auth/AuthContext';

const Chat = () => {
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const handleSubmitChats = async () => {
    try {
      const content = textareaRef.current?.value?.trim();
      if (!content) {
        toast.error('Message cannot be empty');
        return;
      }

      if (textareaRef?.current) {
        textareaRef.current.value = '';
      }

      const newMessage: ChatMessage = { role: Role.User, content };
      setChatMessages((prev) => [...prev, newMessage]);

      const chatData = await sendChatRequest(content);
      setChatMessages(chatData.chats || []);
    } catch (err) {
      console.error('Error sending message:', err);
      toast.error('Failed to send the message');
    }
  };

  const handleEnterKey = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        return;
      }

      event.preventDefault();
      handleSubmitChats();
    }
  };

  const handleTextareaResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading('Deleting Chats', { id: 'deletechats' });

      await deleteUserChats();

      setChatMessages([]);
      toast.success('Chats deleted successfully', { id: 'deletechats' });
    } catch (err) {
      console.error('Error deleting chats:', err);
      toast.error('Failed deleting chats', { id: 'deletechats' });
    }
  };

  useEffect(() => {
    if (!auth?.user) {
      navigate('/login');
      return;
    }

    if (auth?.isLoggedIn && auth?.user) {
      const loadChats = async () => {
        try {
          toast.loading('Loading Chats', { id: 'loadchats' });
          const data = await getUserChats();

          if (data.chats.length > 0) {
            setChatMessages(data.chats);
          } else {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.dismiss('loadchats');
            toast('No chats available', { id: 'loadchats', duration: 1000 });
          }
        } catch (err) {
          console.error('Failed to load chats:', err);
          toast.error('Failed loading chats', { id: 'loadchats' });
        }
      };

      loadChats();
    }
  }, [auth?.user, auth?.isLoggedIn, navigate]);

  return (
    <div className="flex flex-1 w-full h-full mt-16 gap-3">
      <div className="md:flex md:flex-[0.2] md:flex-col hidden ml-3">
        <div className="flex flex-col items-center gap-6 h-[60vh] bg-[rgb(17,29,39)] rounded-xl">
          <Avatar className="bg-white text-black font-bold mt-6">
            {auth?.user?.name ? `${auth?.user.name[0]}${auth?.user.name.split(' ')[1]?.[0] || ''}` : '?'}
          </Avatar>
          <p className='font-["work sans"] text-center'>What can I help with?</p>
          <p className='font-["work sans"] text-center'>You can ask questions related to Buisness, Education, Advice, and more.</p>
          <p className="text-center">*Please avoid sharing any personal information.</p>
          <button onClick={handleDeleteChats} className="w-[200px] bg-red-300 hover:bg-red-500 m-auto rounded-xl py-1 px-3 text-white">
            Clear Conversation
          </button>
        </div>
      </div>

      <div className="flex flex-1 sm:flex-1 md:flex-[0.8] flex-col mx-6">
        <p className="text-center text-4xl text-white mb-4 font-semibold">Model - GPT 3.5 Turbo</p>
        <div className="w-full h-[60vh] rounded-xl mx-auto flex flex-col overflow-y-auto scroll-smooth">
          {chatMessages.map((chat, index) => (
            <ChatItem role={chat.role} content={chat.content} key={index} />
          ))}
        </div>
        <div className="w-full rounded-xl bg-[rgb(17,29,39)] flex flex-col">
          <textarea
            ref={textareaRef}
            placeholder="What can I help you with..."
            onKeyDown={handleEnterKey}
            onInput={handleTextareaResize}
            className="w-full min-h-12 bg-transparent p-4 border-none outline-none text-white text-sm resize-none overflow-hidden leading-6"
            rows={1}
          />

          <div className="w-full flex justify-end items-center bg-[rgb(17,29,39)] p-2 rounded-xl">
            <IconButton onClick={handleSubmitChats} className="!text-white cursor-pointer">
              <IoMdSend />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
