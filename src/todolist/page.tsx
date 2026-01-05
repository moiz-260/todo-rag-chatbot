'use client';

import React, { useState } from 'react';
import AuthLayout from '@/src/components/layout/AuthLayout';
import GlassCard from '@/src/components/ui/GlassCard';
import { useTodoManager } from '@/src/todolist/hooks/useTodoManager';
import ConfirmModal from '@/src/todolist/components/ConfirmModal';
import TodoDetailModal from '@/src/todolist/components/TodoDetailModal';
import TodoForm from '@/src/todolist/components/TodoForm';
import TodoCard from '@/src/todolist/components/TodoCard';
import LoadingDots from '@/src/components/ui/LoadingDots';
import ChatBot from '@/src/chatbot/ChatBot';

const TodoList: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const {
    todos,
    title,
    description,
    editingId,
    loading,
    isSaving,
    confirmModal,
    detailModal,
    setTitle,
    setDescription,
    setConfirmModal,
    setDetailModal,
    handleSubmit,
    handleEdit,
    handleDeleteClick,
    handleDelete,
    handleCancel,
    handleTodoClick,
    handleLogout,
  } = useTodoManager();

  return (
    <AuthLayout>
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onConfirm={handleDelete}
        onCancel={() => setConfirmModal({ isOpen: false, todoId: null })}
        message='Are you sure you want to delete this todo? This action cannot be undone.'
      />

      <TodoDetailModal
        isOpen={detailModal.isOpen}
        todo={detailModal.todo}
        onClose={() => setDetailModal({ isOpen: false, todo: null })}
      />

      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className='fixed bottom-8 right-8 w-16 h-16 bg-black text-white rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-1 active:scale-95 transition-all duration-300 z-30 flex items-center justify-center group'
          title='Open Assistant'
        >
          <span className='absolute top-0 right-0 flex h-4 w-4'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40'></span>
            <span className='relative inline-flex rounded-full h-4 w-4 bg-white border-2 border-black'></span>
          </span>

          <svg
            className='w-8 h-8 transition-transform duration-500 group-hover:scale-110'
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
        </button>
      )}

      <div className='w-full max-w-4xl mx-auto'>
        <div className='w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4'>
            <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-900 text-center sm:text-left leading-snug'>
              My Todo List
            </h1>

            <button
              onClick={handleLogout}
              className='flex items-center justify-center px-5 py-2 rounded-full bg-black text-white font-semibold shadow-md hover:shadow-lg hover:bg-white hover:text-black transition-all text-sm sm:text-base w-full sm:w-auto'
            >
              Logout
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <TodoForm
            title={title}
            description={description}
            editingId={editingId}
            loading={isSaving}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />

          <div className='flex flex-col gap-4'>
            {loading ? (
              <LoadingDots />
            ) : todos.length === 0 ? (
              <GlassCard>
                <p className='text-center text-gray-600'>
                  No todos yet. Create your first todo!
                </p>
              </GlassCard>
            ) : (
              todos.map((todo) => (
                <TodoCard
                  key={todo._id}
                  todo={todo}
                  isEditing={editingId === todo._id}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                  onClick={handleTodoClick}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInTop {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </AuthLayout>
  );
};

export default TodoList;
