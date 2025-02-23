import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LoginData } from '../types';
import config from '../config';
import { User, Lock, LogIn, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError(config.messages.error);
      return;
    }
    localStorage.setItem('user', JSON.stringify({
      name: formData.username,
      initials: formData.username.split(' ').map(word => word[0]).join('').toUpperCase()
    }));
    navigate('/events');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 px-4"
    >
      <motion.div 
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center space-y-2 mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900">{config.title}</h2>
          <p className="text-sm text-gray-600">{config.subtitle}</p>
        </motion.div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                {config.labels.username}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  placeholder={config.placeholders.username}
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                {config.labels.password}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  placeholder={config.placeholders.password}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-4 text-red-700 bg-red-50 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="p-4 bg-blue-50 rounded-lg space-y-1">
            <p className="text-sm text-blue-700">{config.messages.demo}</p>
            <p className="text-sm font-medium text-blue-700">{config.messages.disclaimer}</p>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <LogIn className="h-5 w-5" />
            {config.buttons.submit}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}