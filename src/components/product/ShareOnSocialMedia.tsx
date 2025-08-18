import React, { useState } from 'react';

interface ShareOnSocialMediaProps {
  url: string;
}

const ShareOnSocialMedia: React.FC<ShareOnSocialMediaProps> = ({ url }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const encodedUrl = encodeURIComponent(url);

  const shareLinks = {
    telegram: `https://t.me/share/url?url=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedUrl}`,
    instagram: `https://www.instagram.com/`, // Instagram doesn't have a direct share API, so we redirect to Instagram
  };

  const handleShareClick = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
      >
        Share
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Share this link</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleShareClick('telegram')}
                className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.664 7.466l-1.8 8.4c-.133.622-.733.933-1.333.6l-2.533-1.867-1.2 1.133c-.133.133-.333.267-.667.267l.2-2.8 5.133-4.667c.267-.2-.067-.467-.4-.267l-6.4 4-2.733-867c-.4-.133-.733.133-.533.533l.667 2.133 4.933-3.067c.533-.333 1-.067 1.2.467l-1.333 6.533 2.4 2.267 3.4-10.8c.267-.667-.133-1 .267z"/>
                </svg>
                Share on Telegram
              </button>
              <button
                onClick={() => handleShareClick('whatsapp')}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm3.6 14.4l-1.2.667c-.333.2-.733.2-1 .067-.533-.267-2.4-1.067-4.267-3.2-.667-.733-1.067-1.6-1.333-2.533-.2-.733-.067-1.333.267-1.733l.667-.667c.2-.2.467-.333.733-.333.133 0 .267.067.4.133l.933.933c.133.133.2.333.133.533l-.667 2c-.067.2 0 .467.2.6.267.333.667.533 1.067.733.2.067.467.067.667 0l2-.667c.2-.067.467-.067.667.067l.933.933c.133.2.2.467.067.667z"/>
                </svg>
                Share on WhatsApp
              </button>
              <button
                onClick={() => handleShareClick('instagram')}
                className="bg-pink-500 hover:bg-pink芝2.0 pink-600 text-white py-2 px-4 rounded-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 2c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8zm-1 3h2v2h-2V5zm0 3h2v2h-2V8zm0 3h2v2h-2v-2zm0 3h2v4h-2v-4zm-4-6h2v2h-2V8zm4 6h2v2h-2v-2zm-4 0h2v2h-2v-2zm-2-3h2v2h-2v-2z"/>
                </svg>
                Share on Instagram
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareOnSocialMedia;