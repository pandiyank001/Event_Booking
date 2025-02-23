import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, Info, Calendar, Clock, MapPin, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import config from '../config';
import { FormData, BookingModalProps } from '../types';


const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  acceptTerms: false,
  acknowledgement: false,
};

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, onSubmit, isWaitlist = false }) => {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState<FormData>(initialFormData);

  React.useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData(initialFormData);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, config.modal.steps.total));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const isStep1Valid = () => formData.acknowledgement;
  const isStep2Valid = () => formData.name && formData.email && formData.phone;
  const isStep3Valid = () => formData.acceptTerms;

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-2 mb-6">
      {[...Array(config.modal.steps.total)].map((_, idx) => (
        <div
          key={idx + 1}
          className={`h-2 w-2 rounded-full transition-colors duration-200 ${
            step === idx + 1 ? 'bg-indigo-600' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );

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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {isWaitlist ? config.modal.titles.waitlist : config.modal.titles.booking}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 transition-colors"
                aria-label={config.buttons_MODEL.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              {renderStepIndicator()}

              <div className="relative overflow-hidden">
                <motion.div
                  initial={false}
                  animate={{ x: `${(step - 1) * -100}%` }}
                  transition={{ type: "spring", bounce: 0.2 }}
                  className="flex"
                >
                  {/* Step 1: Event Details and Disclaimers */}
                  <div className="min-w-full">
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="space-y-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            {config.eventDetails.date}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-2" />
                            {config.eventDetails.time}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            {config.eventDetails.location}
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-amber-700">
                            <p className="font-medium mb-2">{config.disclaimers.title}</p>
                            <ul className="list-disc pl-4 space-y-2">
                              {config.disclaimers.requirements.map((requirement, index) => (
                                <li key={index}>{requirement}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          name="acknowledgement"
                          checked={formData.acknowledgement}
                          onChange={handleChange}
                          className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-600">
                          {config.disclaimers.acknowledgementText}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Contact Information */}
                  <div className="min-w-full">
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <User className="w-4 h-4 mr-2" />
                          {config.formLabels.fullName}
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <Mail className="w-4 h-4 mr-2" />
                          {config.formLabels.email}
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <Phone className="w-4 h-4 mr-2" />
                          {config.formLabels.phone}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Terms and Confirmation */}
                  <div className="min-w-full">
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-blue-700">
                            <p className="font-medium mb-2">{config.confirmation.title}</p>
                            <ul className="list-disc pl-4 space-y-1">
                              {config.confirmation.points.map((point, index) => (
                                <li key={index}>{point}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          name="acceptTerms"
                          required
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-600">
                          {config.confirmation.termsText}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    {config.buttons_MODEL.back}
                  </button>
                )}
                {step < config.modal.steps.total ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={step === 1 ? !isStep1Valid() : !isStep2Valid()}
                    className={`ml-auto flex items-center px-4 py-2 rounded-lg ${
                      (step === 1 ? isStep1Valid() : isStep2Valid())
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {config.buttons_MODEL.next}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!isStep3Valid()}
                    className={`ml-auto px-6 py-2 rounded-lg ${
                      isStep3Valid()
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isWaitlist ? config.buttons_MODEL.waitlist : config.buttons_MODEL.booking}
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;