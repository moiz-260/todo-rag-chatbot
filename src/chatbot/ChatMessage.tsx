import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const normalizeText = (text: string) => {
    return text
      .replace(/\r\n/g, '\n')
      .replace(/•/g, '\n-')
      .replace(/\n(?!\n)/g, '  \n')
      .trim();
  };


  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'
        } mb-4 animate-slide-in`}
    >
      <div
        className={`flex gap-2 sm:gap-3 max-w-[85%] sm:max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'
          }`}
      >
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-black text-white' : 'bg-black text-white'
            }`}
        >
          {isUser ? (
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
              />
            </svg>
          ) : (
            <svg
              className='w-5 h-5'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M16 14C16 14 14.5 16 12 16C9.5 16 8 14 8 14'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
              />
              <rect x='9' y='10' width='1.5' height='1.5' rx='0.75' fill='currentColor' />
              <rect x='13.5' y='10' width='1.5' height='1.5' rx='0.75' fill='currentColor' />
              <rect
                x='4'
                y='6'
                width='16'
                height='13'
                rx='4'
                stroke='currentColor'
                strokeWidth='1.5'
              />
              <path d='M12 6V3' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
              <circle cx='12' cy='2' r='1' fill='currentColor' stroke='currentColor' strokeWidth='0.5' />
            </svg>
          )}
        </div>

        <div
          className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl ${isUser
            ? 'bg-black text-white rounded-tr-none shadow-sm'
            : 'bg-white/60 backdrop-blur-xl text-gray-800 border border-white/30 rounded-tl-none shadow-sm'
            }`}
        >
          <div className='text-sm break-words markdown-content'>
            <ReactMarkdown>{normalizeText(message.text)}</ReactMarkdown>
          </div>
          <p
            className={`text-xs mt-1 ${isUser ? 'text-gray-300' : 'text-gray-500'
              }`}
          >
            {message.timestamp.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>

      <style jsx>{`
        .markdown-content :global(p) {
          margin: 0.25rem 0;
        }
        .markdown-content :global(p:first-child) {
          margin-top: 0;
        }
        .markdown-content :global(p:last-child) {
          margin-bottom: 0;
        }
        .markdown-content :global(ul), .markdown-content :global(ol) {
          margin: 0.5rem 0;
          padding-left: 1.25rem;
        }
        .markdown-content :global(li) {
          margin: 0.25rem 0;
        }
        .markdown-content :global(li > p) {
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default ChatMessage;
