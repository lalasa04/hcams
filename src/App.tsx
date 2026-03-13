import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import PatientDashboard from "./pages/patient/PatientDashboard";
import BookAppointment from "./pages/patient/BookAppointment";
import ViewAppointments from "./pages/patient/ViewAppointments";
import MedicalRecordsPage from "./pages/patient/MedicalRecordsPage";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorAvailability from "./pages/doctor/DoctorAvailability";
import AddMedicalRecord from "./pages/doctor/AddMedicalRecord";
import ReceptionistDashboard from "./pages/receptionist/ReceptionistDashboard";
import ScheduleAppointment from "./pages/receptionist/ScheduleAppointment";
import RescheduleAppointment from "./pages/receptionist/RescheduleAppointment";
import AllPatients from "./pages/receptionist/AllPatients";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          
          {/* Patient Routes */}
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/book" element={<BookAppointment />} />
          <Route path="/patient/appointments" element={<ViewAppointments />} />
          <Route path="/patient/records" element={<MedicalRecordsPage />} />
          
          {/* Doctor Routes */}
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/appointments" element={<DoctorAppointments />} />
          <Route path="/doctor/availability" element={<DoctorAvailability />} />
          <Route path="/doctor/add-record" element={<AddMedicalRecord />} />
          
          {/* Receptionist Routes */}
          <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />
          <Route path="/receptionist/schedule" element={<ScheduleAppointment />} />
          <Route path="/receptionist/reschedule" element={<RescheduleAppointment />} />
          <Route path="/receptionist/patients" element={<AllPatients />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
