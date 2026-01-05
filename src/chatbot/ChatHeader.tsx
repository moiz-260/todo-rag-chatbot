import React from 'react';

interface ChatHeaderProps {
  onClose: () => void;
  onClearChat: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose, onClearChat }) => {
  return (
    <div className='p-3 sm:p-4 bg-white/60 backdrop-blur-xl border-b border-white/30 flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 rounded-full bg-black flex items-center justify-center'>
          <svg
            className='w-6 h-6 text-white'
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
            <rect
              x='9'
              y='10'
              width='1.5'
              height='1.5'
              rx='0.75'
              fill='currentColor'
            />
            <rect
              x='13.5'
              y='10'
              width='1.5'
              height='1.5'
              rx='0.75'
              fill='currentColor'
            />
            <rect
              x='4'
              y='6'
              width='16'
              height='13'
              rx='4'
              stroke='currentColor'
              strokeWidth='1.5'
            />
            <path
              d='M12 6V3'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
            />
            <circle
              cx='12'
              cy='2'
              r='1'
              fill='currentColor'
              stroke='currentColor'
              strokeWidth='0.5'
            />
          </svg>
        </div>
        <div>
          <h3 className='font-bold text-gray-900'>IntelliTask</h3>
          <p className='text-xs text-gray-600'>
            Ask me anything about your todos
          </p>
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <button
          onClick={onClearChat}
          className='p-2 rounded-full hover:bg-gray-200 transition-colors'
          title='Clear chat'
        >
          <svg
            className='w-5 h-5 text-gray-600'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
            />
          </svg>
        </button>
        <button
          onClick={onClose}
          className='p-2 rounded-full hover:bg-gray-200 transition-colors'
          title='Close chat'
        >
          <svg
            className='w-5 h-5 text-gray-600'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
