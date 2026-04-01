import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChatUI } from '../components/ChatUI';
import type { Message } from '../types';

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'user1',
    senderName: 'Owner',
    receiverId: 'current',
    content: 'Hi! Is the PG still available?',
    timestamp: new Date().toISOString(),
    read: true,
  },
  {
    id: '2',
    senderId: 'current',
    senderName: 'You',
    receiverId: 'user1',
    content: 'Yes, it is! Would you like to schedule a visit?',
    timestamp: new Date().toISOString(),
    read: true,
  },
];

export const MessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedChat, setSelectedChat] = useState('user1');

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: String(Date.now()),
      senderId: 'current',
      senderName: 'You',
      receiverId: selectedChat,
      content,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-light py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-dark mb-2">💬 Messages</h1>
          <p className="text-gray-600">Chat with PG owners or inquiries</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-4 border-b">
              <input
                type="text"
                placeholder="Search conversations..."
                className="input-field"
              />
            </div>
            <div className="divide-y max-h-96 overflow-y-auto">
              {['Owner 1', 'Owner 2', 'Student'].map((name, i) => (
                <motion.button
                  key={i}
                  whileHover={{ backgroundColor: '#f3f4f6' }}
                  onClick={() => setSelectedChat(`user${i}`)}
                  className={`w-full text-left p-4 transition-colors ${
                    selectedChat === `user${i}` ? 'bg-blue-50' : ''
                  }`}
                >
                  <h4 className="font-medium text-dark mb-1">{name}</h4>
                  <p className="text-sm text-gray-600 truncate">
                    Last message preview...
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Chat View */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <ChatUI
              messages={messages}
              currentUserId="current"
              onSendMessage={handleSendMessage}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
