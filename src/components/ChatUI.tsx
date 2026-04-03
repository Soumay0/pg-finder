import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
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
    <div className="flex flex-col h-96 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl overflow-hidden border border-white/10 backdrop-blur-xl">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full flex items-center justify-center"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">💬</div>
              <p className="text-gray-400 font-medium">No messages yet. Start a conversation!</p>
            </div>
          </motion.div>
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
                className={`max-w-xs px-4 py-3 rounded-xl backdrop-blur-md ${
                  msg.senderId === currentUserId
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-none shadow-lg'
                    : 'bg-white/10 text-gray-100 rounded-bl-none border border-white/20'
                }`}
              >
                {msg.senderId !== currentUserId && (
                  <p className="text-xs font-semibold mb-1 text-gray-300">
                    {msg.senderName}
                  </p>
                )}
                <p className="text-sm break-words leading-relaxed">{msg.content}</p>
                <p className="text-xs opacity-70 mt-1 font-medium">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/10 flex gap-2 bg-white/5 backdrop-blur">
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all text-sm"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
        >
          <Send size={20} />
        </motion.button>
      </div>
    </div>
  );
};
