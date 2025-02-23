import { useEffect, useState } from 'react';
import { Booking, BookingState, WaitingEntry } from '../types';

const generateId = () => Math.random().toString(36).substring(2, 9);

export function useBookingSystem(storageKey: string, initialCapacity: number) {
  const [state, setState] = useState<BookingState>(() => {
    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
      return JSON.parse(savedState);
    }
    return {
      availableSlots: initialCapacity,
      bookings: [],
      waitingList: [],
    };
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
    window.dispatchEvent(new Event('storage'));
  }, [state, storageKey]);

  const book = (name: string) => {
    if (state.availableSlots > 0) {
      const newBooking: Booking = {
        id: generateId(),
        timestamp: Date.now(),
        name,
      };
      setState((prev) => ({
        ...prev,
        availableSlots: prev.availableSlots - 1,
        bookings: [...prev.bookings, newBooking],
      }));
      return true;
    }
    return false;
  };

  const joinWaitingList = (name: string) => {
    const waitingEntry: WaitingEntry = {
      id: generateId(),
      timestamp: Date.now(),
      name,
    };
    setState((prev) => ({
      ...prev,
      waitingList: [...prev.waitingList, waitingEntry],
    }));
  };

  const cancel = (bookingId: string) => {
    const booking = state.bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    let newState = {
      ...state,
      bookings: state.bookings.filter((b) => b.id !== bookingId),
      availableSlots: state.availableSlots + 1,
    };

    if (state.waitingList.length > 0) {
      const [nextInLine, ...remainingWaitList] = state.waitingList;
      newState = {
        ...newState,
        availableSlots: state.availableSlots,
        bookings: [
          ...newState.bookings,
          { ...nextInLine, timestamp: Date.now() },
        ],
        waitingList: remainingWaitList,
      };
    }

    setState(newState);
  };

  const reset = () => {
    const initialState: BookingState = {
      availableSlots: initialCapacity,
      bookings: [],
      waitingList: [],
    };
    setState(initialState);
    localStorage.setItem(storageKey, JSON.stringify(initialState));
  };

  return {
    ...state,
    book,
    cancel,
    joinWaitingList,
    reset,
  };
}