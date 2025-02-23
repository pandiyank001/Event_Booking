 interface Booking {
  id: string;
  timestamp: number;
  name: string;
  email?: string;
  phone?: string;
  
}

 interface WaitingEntry {
  id: string;
  timestamp: number;
  name: string;
  email?: string;
  phone?: string;
}

 interface BookingState {
  availableSlots: number;
  bookings: Booking[];
  waitingList: WaitingEntry[];
}

interface BookingFormProps {
  availableSlots: number
  onBook: (name: string) => void
  onJoinWaitlist: (name: string) => void
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  availableSlots: number;
  image: string;
  description: string;
  bookedCount?: number;
}

interface LoginData {
  username: string;
  password: string;
}


interface FormData {
  name: string;
  email: string;
  phone: string;
  acceptTerms: boolean;
  acknowledgement: boolean;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  isWaitlist?: boolean;
}

interface CancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmButtonText: string;
  confirmButtonColor?: string;
}

export type{
  CancelModalProps,
  BookingModalProps,
  FormData,
  LoginData,
  Booking,
  Event,
  WaitingEntry,
  BookingState,
  BookingFormProps,
  
}