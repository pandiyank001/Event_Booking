// src/config/config.ts

import { env } from "process";

const config = {
  ABOUT_TEXT:
    "We provide high-quality tech education through expert-led workshops. Join our community of learners and advance your career in technology.",

  CONTACT_INFO: {
    EMAIL: "pandiyankrishna2001@gmail.com",
    PHONE: "9003658149",
    ADDRESS: "Sitra Airport, Coimbatore",
  },

  QUICK_LINKS: [
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "FAQs", href: "/faq" },
    { name: "Support", href: "/support" },
  ],

  FOOTER_LINKS: [
    { name: "Accessibility", href: "/accessibility" },
    { name: "Sitemap", href: "/sitemap" },
    { name: "Contact Us", href: "/contact" },
  ],

  COPYRIGHT_TEXT: "Tech Workshops. All rights reserved.",

  PLACEHOLDER_NAME: "Enter your name",
  ERROR_MESSAGE: "Please enter your name",
  BUTTONS: {
    BOOK_NOW: "Book Now",
    JOIN_WAITLIST: "Join Waitlist",
  },

  APP_NAME: "Event Booking System",
  LOGIN_ROUTE: "/login",
  LOCAL_STORAGE_USER_KEY: "user",
  NAVIGATION: {
    LOGOUT: "Logout",
  },
  TITLE: "React Workshop",
  DATE: "March 1st, 2024",
  TIME: "2:00 PM - 5:00 PM",
  
  BUTTONS_MODEL: {
    BOOK_NOW: "Book Now",
    JOIN_WAITLIST: "Join Waitlist",
    RESET_SYSTEM: "Reset System",
    CANCEL: "Cancel"
  },

  STATS: {
    QUICK_STATS: "Quick Stats",
    TOTAL_CAPACITY: "Total Capacity",
    BOOKED: "Booked",
    WAITLIST: "Waitlist",
    SPOTS_REMAINING: "spots remaining",
    ATTENDEES_REGISTERED: "attendees registered"
  },

  SECTIONS: {
    CONFIRMED_BOOKINGS: {
      TITLE: "Confirmed Bookings",
      EMPTY_STATE: "No bookings yet",
      REGISTERED_LABEL: "registered"
    },
    WAITING_LIST: {
      TITLE: "Waiting List",
      EMPTY_STATE: "No one in the waiting list",
      WAITING_LABEL: "waiting"
    }
  },

  TIMESTAMPS: {
    BOOKED_AT: "Booked",
    JOINED_WAITLIST_AT: "Joined waitlist",
    TIME_SEPARATOR: "at"
  },
  FILTER_CATEGORIES : ['All Categories', 'Frontend', 'Backend', 'Design'],

  COLORS_MODEL: ['#4F46E5', '#E5E7EB'],
  PIE_CHART: {
    INNER_RADIUS: 35,
    OUTER_RADIUS: 50,
    PADDING_ANGLE: 5
  },

  STORAGE_KEY_PREFIX: "event-booking-state-",
  PIE_COLORS: ["#4F46E5", "#E5E7EB"],
  RESET_MODAL_TEXT: {
    title: "Confirm Reset",
    description:
      "Are you sure you want to reset the booking system? This action cannot be undone.",
    confirmButtonText: "Reset",
  },

  TOTAL_SLOTS: import.meta.env.PUBLIC_TOTAL_SLOTS
  ? parseInt(import.meta.env.PUBLIC_TOTAL_SLOTS, 10)
  : 10,
  
  title: "Welcome Back",
  subtitle: "Sign in to access the Event Booking System",
  labels: {
    username: "Username",
    password: "Password"
  },
  placeholders: {
    username: "Enter any username",
    password: "Enter any password"
  },
  buttons: {
    submit: "Sign in"
  },
  messages: {
    error: "Please fill in all fields",
    demo: "Note: This is a demo application. Please use any username and password.",
    disclaimer: "Disclaimer: Do not use real credentials in this demo environment."
  },

  TEXTS: {
    LOADING: "Loading event details...",
    NO_BOOKINGS: "No bookings yet",
    NO_WAITLIST: "No one in the waiting list",
    SPOTS_LEFT: "Spots Left",
    REGISTERED: "Registered",
    WAITING: "Waiting",
    QUICK_STATS: "Quick Stats",
    CONFIRMED_BOOKINGS: "Confirmed Bookings",
    WAITING_LIST: "Waiting List",
    BOOK_NOW: "Book Now",
    JOIN_WAITLIST: "Join Waitlist",
    RESET_SYSTEM: "Reset System"
  },
  TOAST_MESSAGES: {
    BOOKING_CONFIRMED: "Booking confirmed successfully!",
    WAITLIST_JOINED: "Successfully joined the waitlist!",
    BOOKING_CANCELLED: "Booking cancelled successfully",
    SYSTEM_RESET: "Booking system has been reset"
  },
  MODAL_TEXTS: {
    RESET: {
      TITLE: "Confirm Reset",
      DESCRIPTION: "Are you sure you want to reset the booking system? This action cannot be undone.",
      CONFIRM_BUTTON: "Reset"
    },
    CANCEL: {
      TITLE: "Cancel Booking",
      DESCRIPTION: "Are you sure you want to cancel this booking?",
      CONFIRM_BUTTON: "Cancel Booking"
    }
  },

  EVENT_CARD:{
    TITLE: "Discover Tech Workshops & Events",
    DESCRIPTION : "Enhance your skills with hands-on workshops led by industry experts",
    SPOT : "spots left",
    CAPACITY: "total capacity",
    CARD : "No events found matching your search.",
  },

  modal: {
    titles: {
      waitlist: 'Join Waiting List',
      booking: 'Book Your Spot'
    },
    steps: {
      total: 3
    }
  },
  eventDetails: {
    date: 'March 1st, 2024',
    time: '2:00 PM - 5:00 PM',
    location: 'Virtual Event (Zoom)'
  },
  disclaimers: {
    title: 'Before Proceeding',
    requirements: [
      'This session requires a stable internet connection with minimum 5Mbps speed',
      'You will need a quiet environment for optimal participation',
      'The session will be recorded for quality and training purposes',
      'Cancellation is only available up to 24 hours before the event'
    ],
    acknowledgementText: 'I have read and understood the above requirements'
  },
  formLabels: {
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone'
  },
  confirmation: {
    title: 'Important Information',
    points: [
      'Join 10 minutes early',
      'Stable internet required',
      'Camera and mic needed'
    ],
    termsText: 'I agree to the terms and conditions'
  },
  buttons_MODEL: {
    back: 'Back',
    next: 'Next',
    waitlist: 'Join Waitlist',
    booking: 'Confirm Booking',
    close: 'Close modal'
  }
};

export default config;
