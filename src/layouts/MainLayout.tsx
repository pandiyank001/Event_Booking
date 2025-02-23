import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import config from "../config";
import CancelModal from "../Model/ConfirmationModel";
import { ToastContainer, toast } from "react-toastify";

interface User {
  name: string;
  initials: string;
}

export default function MainLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [modalText, setModalText] = useState({
    title: "",
    description: "",
    confirmButtonText: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem(config.LOCAL_STORAGE_USER_KEY);
    if (!userData) {
      navigate(config.LOGIN_ROUTE);
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogoutClick = () => {
    setModalText({
      title: "Confirm Logout",
      description: "Are you sure you want to log out? You will need to log in again to access your account.",
      confirmButtonText: "Logout",
    });
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem(config.LOCAL_STORAGE_USER_KEY);
    toast.info("Logged out successfully");
    navigate(config.LOGIN_ROUTE);
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Animated Navigation */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 bg-white shadow-md z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-indigo-600">{config.APP_NAME}</h1>

          {user && (
            <div className="flex items-center gap-4">
              {/* Animated Avatar */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium cursor-pointer"
              >
                {user.initials}
              </motion.div>
              <span className="text-gray-700 hidden sm:inline">{user.name}</span>

              {/* Animated Logout Button */}
              <motion.button
                onClick={handleLogoutClick}
                whileHover={{ scale: 1.05, backgroundColor: "#4f46e5", color: "#fff" }}
                transition={{ duration: 0.3 }}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-indigo-600 hover:text-white transition-all"
              >
                {config.NAVIGATION.LOGOUT}
              </motion.button>
            </div>
          )}
        </div>
      </motion.nav>

      {/* Main Content Area */}
      <div className="pt-16">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          <Outlet />
        </motion.main>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />

      {/* Logout Confirmation Modal */}
      <CancelModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmLogout}
        title={modalText.title}
        description={modalText.description}
        confirmButtonText={modalText.confirmButtonText}
      />
    </div>
  );
}
