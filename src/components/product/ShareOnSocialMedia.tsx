import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { faCircleXmark, faCopy, faSquareShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faSquareInstagram, faSquareWhatsapp, faTelegram } from '@fortawesome/free-brands-svg-icons';
import toast from "react-hot-toast";

interface SharePlatform {
  name: string;
  icon: any;
  link: (url: string) => string;
  className: string;
  label?: string;
}

interface ShareService {
  copyToClipboard: (text: string) => Promise<void>;
  notifySuccess: (message: string) => void;
  notifyError: (message: string) => void;
  isMobile: () => boolean;
}

const defaultShareService: ShareService = {
  copyToClipboard: async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      throw new Error("خطا در کپی کردن لینک");
    }
  },
  notifySuccess: (message: string) => toast.success(message),
  notifyError: (message: string) => toast.error(message),
  isMobile: () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
};

const sharePlatforms: SharePlatform[] = [
  {
    name: 'telegram',
    icon: faTelegram,
    link: (url: string) => `https://t.me/share/url?url=${encodeURIComponent(url)}`,
    className: 'bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-lg',
  },
  {
    name: 'whatsapp',
    icon: faSquareWhatsapp,
    link: (url: string) => `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
    className: 'bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg',
  },
  {
    name: 'instagram',
    icon: faSquareInstagram,
    link: (url: string) => defaultShareService.isMobile() ? 'instagram://direct' : 'https://www.instagram.com/',
    className: 'bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg',
  },
  {
    name: 'soroush',
    icon: null,
    link: (url: string) => `https://splus.ir/share?url=${encodeURIComponent(url)}`,
    className: 'bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-2 rounded-lg text-sm font-EstedadExtraBold tracking-wider',
    label: 'سروش',
  },
  {
    name: 'copy',
    icon: faCopy,
    link: () => '',
    className: 'bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg',
  },
];

interface ShareOnSocialMediaProps {
  url: string;
  shareService?: ShareService;
}

const ShareOnSocialMedia: React.FC<ShareOnSocialMediaProps> = ({ url, shareService = defaultShareService }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShareClick = async (platform: SharePlatform) => {
    if (platform.name === 'copy') {
      try {
        await shareService.copyToClipboard(url);
        shareService.notifySuccess('لینک کپی شدW');
      } catch {
        shareService.notifyError('خطا در کپی کردن لینک');
      }
      return;
    }

    if (platform.name === 'instagram') {
      try {
        await shareService.copyToClipboard(url);
        shareService.notifySuccess('لینک کپی شد');
      } catch {
        shareService.notifyError('خطا در کپی کردن لینک');
      }
    }

    window.open(platform.link(url), '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isModalOpen]);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-[2.2rem] duration-100 transition-all ease-in-out text-gray-500 hover:text-purple-500 p-0.5"
      >
        <FontAwesomeIcon icon={faSquareShareNodes} />
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-EstedadLight">این صفحه را به اشتراک بگذارید</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="بستن"
                title="بستن"
              >
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-2xl">
              {sharePlatforms.map((platform) => (
                <button
                  key={platform.name}
                  onClick={() => handleShareClick(platform)}
                  className={platform.className}
                >
                  {platform.icon ? (
                    <FontAwesomeIcon icon={platform.icon} />
                  ) : (
                    platform.label
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareOnSocialMedia;