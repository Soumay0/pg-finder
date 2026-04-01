import React from 'react';
import { motion } from 'framer-motion';
import type { Message } from '../types';

interface ChatUIProps {
  messages: Message[];
  currentUserId: string;
  onSendMessage?: (message: string) => void;
}

export const ChatUI: React.FC<ChatUIProps> = ({
  messages,
  currentUserId,
  onSendMessage,
}) => {
  const [message, setMessage] = React.useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage?.(message);
      setMessage('');
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="flex flex-col h-96 bg-white rounded-lg shadow-md overflow-hidden">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">No messages yet</p>
        ) : (
          messages.map((msg) => (
            <motion.div
              key={msg.id}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              className={`flex ${
                msg.senderId === currentUserId ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.senderId === currentUserId
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-gray-300 text-dark rounded-bl-none'
                }`}
              >
                {msg.senderId !== currentUserId && (
                  <p className="text-xs font-medium opacity-75 mb-1">
                    {msg.senderName}
                  </p>
                )}
                <p className="text-sm break-words">{msg.content}</p>
                <p className="text-xs opacity-75 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="input-field flex-1"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          className="btn-primary"
        >
          Send
        </motion.button>
      </div>
    </div>
  );
};
