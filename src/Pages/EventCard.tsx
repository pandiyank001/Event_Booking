import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Search, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { eventsData } from '../Data/event';
import { Event } from '../types';
import config from '../config';

export default function AvailableEvents() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const initialEvents = eventsData.map(event => {
      const storageKey = `event-booking-state-${event.id}`;
      const savedState = localStorage.getItem(storageKey);
      if (savedState) {
        const { availableSlots, bookings } = JSON.parse(savedState);
        return {
          ...event,
          availableSlots,
          bookedCount: bookings.length
        };
      }
      return event;
    });

    setEvents(initialEvents);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setEvents(prevEvents => 
        prevEvents.map(event => {
          const storageKey = `event-booking-state-${event.id}`;
          const savedState = localStorage.getItem(storageKey);
          if (savedState) {
            const { availableSlots, bookings } = JSON.parse(savedState);
            return {
              ...event,
              availableSlots,
              bookedCount: bookings.length
            };
          }
          return event;
        })
      );
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="bg-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">{config.EVENT_CARD.TITLE}</h1>
            <p className="text-indigo-100 text-lg">
              {config.EVENT_CARD.DESCRIPTION}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <select className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {config.FILTER_CATEGORIES.map((category, index) => (
                <option key={index}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleEventClick(event.id)}
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-0 right-0 mt-4 mr-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    event.availableSlots <= 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {event.availableSlots} {config.EVENT_CARD.SPOT}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {event.title}
                  </h3>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>

                <div className="space-y-2 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-indigo-500" />
                    {event.capacity} {config.EVENT_CARD.CAPACITY}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleEventClick(event.id);
                  }}
                  className={`w-full py-2 px-4 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    event.availableSlots > 0
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'bg-orange-600 hover:bg-orange-700 text-white'
                  }`}
                >
                  {event.availableSlots > 0 ? 'Book Now' : 'Join Waitlist'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">{config.EVENT_CARD.CARD}</p>
        </div>
      )}

      <Footer />
    </div>
  );
}
