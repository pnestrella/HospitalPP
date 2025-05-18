import { useState } from 'react';
import ChatBotImage from '../assets/ChatBot_pfp.png'; // ✅ Rename the image import

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat toggle button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-[#005F92] hover:bg-[#0077B6] text-white p-4 rounded-full shadow-lg text-lg font-bold"
          aria-label="Open chat"
        >
          💬
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#005F92] text-white px-4 py-2 flex justify-between items-center">
            <span className="font-semibold">Medical HelpBot</span>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white text-xl font-bold"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {/* Chat area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {/* Bot Message */}
            <div className="flex items-start space-x-2">
              <img 
                src={ChatBotImage} 
                alt="ChatBot Avatar" 
                className="w-8 h-8 rounded-full object-cover" 
              />
              <div className="bg-gray-100 p-2 rounded-lg max-w-xs">
                <p>Hello! How can I help you today?</p>
              </div>
            </div>

            {/* User Message */}
            <div className="flex items-end justify-end">
              <div className="bg-[#005F92] text-white p-2 rounded-lg max-w-xs">
                <p>I need help with my billing.</p>
              </div>
            </div>
          </div>

          {/* Input box */}
          <div className="p-2 bg-gray-100 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 text-sm rounded-full outline-none bg-white"
            />
            <button className="bg-[#005F92] hover:bg-[#0077B6] text-white px-4 py-2 rounded-full text-sm">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
