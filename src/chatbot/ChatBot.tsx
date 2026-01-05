'use client';

import React from 'react';
import ChatHeader from '@/src/chatbot/ChatHeader';
import ChatMessage from '@/src/chatbot/ChatMessage';
import ChatInput from '@/src/chatbot/ChatInput';
import { useChat } from '@/src/chatbot/hooks/useChat';

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
  const { messages, loading, sendMessage, clearChat, messagesEndRef } =
    useChat();

  if (!isOpen) return null;

  return (
    <>
      <div
        className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fade-in'
        onClick={onClose}
      />

      <div className='fixed inset-0 sm:inset-auto sm:bottom-4 sm:right-4 sm:w-[420px] sm:h-[600px] bg-white/80 backdrop-blur-xl sm:rounded-3xl shadow-2xl border-t sm:border border-white/30 z-50 flex flex-col animate-slide-up overflow-hidden'>
        <ChatHeader onClose={onClose} onClearChat={clearChat} />

        <div className='flex-1 overflow-y-auto p-3 sm:p-4 space-y-4'>
          {messages.length === 0 && !loading && (
            <div className='flex flex-col items-center justify-center h-full text-center space-y-6 animate-fade-in px-4'>
              <div className='w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center shadow-xl mb-2'>
                <svg
                  className='w-10 h-10'
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
              <div className='space-y-1'>
                <h2 className='text-xl font-bold text-gray-900'>
                  Hello! I'm IntelliTask
                </h2>
                <p className='text-sm text-gray-500 max-w-[250px]'>
                  Your personal AI assistant for managing todos and stay
                  organized.
                </p>
              </div>

              <div className='w-full space-y-2'>
                {[
                  'How do I create a new task?',
                  'Show my most recent todos',
                  'What can you help me with?',
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(suggestion)}
                    className='w-full p-3 text-sm text-left text-gray-700 bg-white hover:bg-black hover:text-white border border-gray-100 rounded-xl shadow-sm transition-all duration-200 group flex items-center justify-between gap-2'
                  >
                    <span className='block flex-1'>{suggestion}</span>
                    <svg
                      className='w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M14 5l7 7m0 0l-7 7m7-7H3'
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {loading && (
            <div className='flex justify-start mb-4'>
              <div className='bg-white/60 backdrop-blur-xl border border-white/30 rounded-2xl px-4 py-3 rounded-tl-none'>
                <div className='flex gap-1'>
                  <div
                    className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                    style={{ animationDelay: '0ms' }}
                  ></div>
                  <div
                    className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                    style={{ animationDelay: '150ms' }}
                  ></div>
                  <div
                    className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                    style={{ animationDelay: '300ms' }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput onSendMessage={sendMessage} isLoading={loading} />
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slide-in {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default ChatBot;
