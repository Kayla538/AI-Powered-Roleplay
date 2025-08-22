import React, { useState } from 'react';
import type { Scenario } from '../types';
import ChatWindow from './ChatWindow';
import VolumeUpIcon from './icons/VolumeUpIcon';
import VolumeOffIcon from './icons/VolumeOffIcon';
import CustomerInfoPanel from './CustomerInfoPanel';
import Modal from './Modal';

interface CustomerDashboardProps {
  scenario: Scenario;
  onEndSession: () => void;
}

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ scenario, onEndSession }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>(null);

  const handleViewDetails = (details: string) => {
    setModalContent(details);
  };

  const handleCloseModal = () => {
    setModalContent(null);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // This stops any currently playing audio when muted.
    if (!isMuted === true) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100 font-sans">
      <header className="bg-gray-800 shadow-lg p-4 flex justify-between items-center z-10 shrink-0">
        <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          AI-Powered Roleplay: Working Solutions
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMute}
            className="text-gray-300 hover:text-white transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </button>
          {scenario && (
            <button
              onClick={onEndSession}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              End Session
            </button>
          )}
        </div>
      </header>
      <main className="flex-grow overflow-hidden">
        <div className="flex h-full">
          <div className="w-full md:w-1/3 lg:w-1/4 bg-gray-800 border-r border-gray-700 overflow-y-auto transition-all duration-300">
              <CustomerInfoPanel scenario={scenario} onViewDetails={handleViewDetails} />
          </div>
          <div className="w-full md:w-2/3 lg:w-3/4">
              <ChatWindow scenario={scenario} isMuted={isMuted} />
          </div>
        </div>
      </main>
      <Modal isOpen={!!modalContent} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default CustomerDashboard;