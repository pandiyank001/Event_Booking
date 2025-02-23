import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';
import { CancelModalProps } from '../types';
import config from '../config';


const CancelModal: React.FC<CancelModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmButtonText,
  confirmButtonColor = 'bg-red-600', // Default color for cancel action
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  {title}
                </h4>
                <p className="text-sm text-gray-600">
                  {description}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {config.BUTTONS_MODEL.CANCEL}
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`flex-1 px-4 py-2 ${confirmButtonColor} text-white rounded-lg hover:${confirmButtonColor.replace('600', '700')} transition-colors`}
                >
                  {confirmButtonText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CancelModal;