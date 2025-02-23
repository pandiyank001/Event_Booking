import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Event } from '../types';
import { eventsData } from '../Data/event';
import { useBookingSystem } from './BookingSystem';

export const useEventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWaitlistModal, setIsWaitlistModal] = useState(false);
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [modalText, setModalText] = useState({
    title: "",
    description: "",
    confirmButtonText: "",
  });

  const event = eventsData.find((e) => e.id === eventId);
  const storageKey = `event-booking-state-${eventId}`;

  const {
    availableSlots,
    bookings,
    waitingList,
    book,
    cancel,
    joinWaitingList,
    reset,
  } = useBookingSystem(storageKey, event?.availableSlots || 0);

  useEffect(() => {
    if (!event) {
      navigate("/events");
      return;
    }

    setCurrentEvent({
      ...event,
      availableSlots,
      bookedCount: bookings.length,
    });
  }, [event, availableSlots, bookings.length, navigate]);

  return {
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
  };
};