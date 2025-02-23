import { useState } from 'react';
import { toast } from 'react-toastify';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useEventDetails } from '../Hooks/useEventDetails';
import { generatePieChartData } from '../Hooks/utils/PieChartData';
import { formatDateTime } from '../Hooks/utils/DateFormatter';
import config from '../config';
import { Calendar, Clock, Users, UserPlus, AlertCircle, MapPin } from "lucide-react";
import BookingModal from '../Model/BookingModel';
import CancelModal from '../Model/ConfirmationModel';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EventDetails() {
  const {
    currentEvent,
    availableSlots,
    bookings,
    waitingList,
    isModalOpen,
    isWaitlistModal,
    cancelBookingId,
    isResetModalOpen,
    modalText,
    book,
    cancel,
    joinWaitingList,
    reset,
    setIsModalOpen,
    setIsWaitlistModal,
    setCancelBookingId,
    setIsResetModalOpen,
    setModalText,
  } = useEventDetails();

  if (!currentEvent) {
    return <div className="min-h-screen flex items-center justify-center">{config.TEXTS.LOADING}</div>;
  }

  const pieData = generatePieChartData(bookings.length, availableSlots);

  const handleBookingSubmit = (formData: any) => {
    if (isWaitlistModal) {
      joinWaitingList(formData.name);
      toast.success(config.TOAST_MESSAGES.WAITLIST_JOINED);
    } else {
      book(formData.name);
      toast.success(config.TOAST_MESSAGES.BOOKING_CONFIRMED);
    }
    setIsModalOpen(false);
  };

  const handleCancelBooking = (bookingId: string) => {
    setCancelBookingId(bookingId);
  };

  const confirmCancelBooking = () => {
    if (cancelBookingId) {
      cancel(cancelBookingId);
      toast.info(config.TOAST_MESSAGES.BOOKING_CANCELLED);
      setCancelBookingId(null);
    }
  };

  const handleResetClick = () => {
    setModalText({
      title: config.MODAL_TEXTS.RESET.TITLE,
      description: config.MODAL_TEXTS.RESET.DESCRIPTION,
      confirmButtonText: config.MODAL_TEXTS.RESET.CONFIRM_BUTTON,
    });
    setIsResetModalOpen(true);
  };

  const confirmReset = () => {
    reset();
    toast.info(config.TOAST_MESSAGES.SYSTEM_RESET);
    setIsResetModalOpen(false);
  };

  const openBookingModal = (isWaitlist: boolean = false) => {
    setIsWaitlistModal(isWaitlist);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow space-y-8 p-6">
        {/* Event Header with Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Event Info Card */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {currentEvent.title}
                </h1>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    {currentEvent.date}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2" />
                    {currentEvent.time}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    {currentEvent.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-2" />
                    {bookings.length} {config.TEXTS.REGISTERED}
                  </div>
                </div>

                <div className="mt-6 flex items-center space-x-4">
                  <button
                    onClick={() => openBookingModal(availableSlots === 0)}
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-white ${
                      availableSlots > 0 ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-orange-600 hover:bg-orange-700'
                    }`}
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    {availableSlots > 0 ? config.TEXTS.BOOK_NOW : config.TEXTS.JOIN_WAITLIST}
                  </button>

                  <button
                    onClick={handleResetClick}
                    className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {config.TEXTS.RESET_SYSTEM}
                  </button>
                </div>
              </div>

              {/* Availability Pie Chart */}
              <div className="mt-6 md:mt-0 flex flex-col items-center">
                <div className="h-40 w-40 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        <Cell fill="#4F46E5" />
                        <Cell fill="#E5E7EB" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <div className="text-2xl font-bold text-indigo-600">
                      {availableSlots}
                    </div>
                    <div className="text-sm text-gray-600">{config.TEXTS.SPOTS_LEFT}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl shadow-sm p-6 text-white">
            <h2 className="text-xl font-semibold mb-4">{config.TEXTS.QUICK_STATS}</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Total Capacity</span>
                <span className="font-bold">{currentEvent.capacity}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Booked</span>
                <span className="font-bold">{bookings.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Waitlist</span>
                <span className="font-bold">{waitingList.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings and Waitlist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Confirmed Bookings */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Users className="w-6 h-6 text-indigo-600 mr-2" />
                <h2 className="text-xl font-semibold">{config.TEXTS.CONFIRMED_BOOKINGS}</h2>
              </div>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                {bookings.length} {config.TEXTS.REGISTERED}
              </span>
            </div>

            {bookings.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">{config.TEXTS.NO_BOOKINGS}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => {
                  const { date, time } = formatDateTime(booking.timestamp);
                  return (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{booking.name}</p>
                        <p className="text-sm text-gray-500">
                          Booked at {date} {time}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full"
                      >
                        Cancel
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Waiting List */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <UserPlus className="w-6 h-6 text-orange-600 mr-2" />
                <h2 className="text-xl font-semibold">{config.TEXTS.WAITING_LIST}</h2>
              </div>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                {waitingList.length} {config.TEXTS.WAITING}
              </span>
            </div>

            {waitingList.length === 0 ? (
              <div className="text-center py-8">
                <UserPlus className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">{config.TEXTS.NO_WAITLIST}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {waitingList.map((entry) => {
                  const { date, time } = formatDateTime(entry.timestamp);
                  return (
                    <div
                      key={entry.id}
                      className="p-4 bg-orange-50 rounded-lg"
                    >
                      <p className="font-medium text-gray-900">{entry.name}</p>
                      <p className="text-sm text-gray-500">
                        Joined waitlist at {date} {time}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Modals */}
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleBookingSubmit}
          isWaitlist={isWaitlistModal}
        />

        <CancelModal
          isOpen={!!cancelBookingId}
          onClose={() => setCancelBookingId(null)}
          onConfirm={confirmCancelBooking}
          title={config.MODAL_TEXTS.CANCEL.TITLE}
          description={config.MODAL_TEXTS.CANCEL.DESCRIPTION}
          confirmButtonText={config.MODAL_TEXTS.CANCEL.CONFIRM_BUTTON}
        />

        <CancelModal
          isOpen={isResetModalOpen}
          onClose={() => setIsResetModalOpen(false)}
          onConfirm={confirmReset}
          title={modalText.title}
          description={modalText.description}
          confirmButtonText={modalText.confirmButtonText}
        />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
}