import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import EventDetails from './Pages/EventDetails';
import LoginPage from './Pages/LoginPage';
import AvailableEvents from './Pages/EventCard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/events" replace />} />
          <Route path="events" element={<AvailableEvents />} />
          <Route path="event/:eventId" element={<EventDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}