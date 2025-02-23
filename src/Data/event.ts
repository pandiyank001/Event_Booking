// src/data/events.ts
import reactimage from '../assets/reactimage.jpg';
import nodeimage from '../assets/nodejsimage.jpg';
import uximage from '../assets/uiuximage.png';
import { Event } from '../types';
import config from '../config';

export const eventsData: Event[] = [
  {
    id: '1',
    title: 'React Workshop',
    date: 'March 1st, 2024',
    time: '2:00 PM - 5:00 PM',
    location: 'Tech Hub, Downtown',
    capacity: config.TOTAL_SLOTS,
    availableSlots: config.TOTAL_SLOTS,
    image: reactimage,
    description: 'Deep dive into React fundamentals and advanced concepts. Perfect for developers looking to enhance their frontend skills.'
  },
  {
    id: '2',
    title: 'Node.js Masterclass',
    date: 'March 15th, 2024',
    time: '1:00 PM - 4:00 PM',
    location: 'Innovation Center',
    capacity: config.TOTAL_SLOTS,
    availableSlots: config.TOTAL_SLOTS,
    image: nodeimage,
    description: 'Master backend development with Node.js. Learn about APIs, databases, and server-side concepts.'
  },
  {
    id: '3',
    title: 'UI/UX Design Workshop',
    date: 'March 30th, 2024',
    time: '10:00 AM - 2:00 PM',
    location: 'Design Studio',
    capacity: config.TOTAL_SLOTS,
    availableSlots: config.TOTAL_SLOTS,
    image: uximage,
    description: 'Learn modern UI/UX design principles and practices. Hands-on experience with design tools.'
  }
];