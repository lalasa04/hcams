import { ReactNode, useState } from 'react';
import './DashboardLayout.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthService, UserRole } from '@/services/AuthService';
import {
  Heart, LogOut, Menu, X,
  LayoutDashboard, CalendarPlus, CalendarDays, FileText,
  Stethoscope, ToggleLeft, ClipboardPlus,
  Users, CalendarClock, CalendarCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
}

const NAV_ITEMS: Record<UserRole, NavItem[]> = {
  PATIENT: [
    { label: 'Dashboard', path: '/patient/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Book Appointment', path: '/patient/book', icon: <CalendarPlus className="w-5 h-5" /> },
    { label: 'My Appointments', path: '/patient/appointments', icon: <CalendarDays className="w-5 h-5" /> },
    { label: 'Medical Records', path: '/patient/records', icon: <FileText className="w-5 h-5" /> },
  ],
  DOCTOR: [
    { label: 'Dashboard', path: '/doctor/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'My Appointments', path: '/doctor/appointments', icon: <CalendarDays className="w-5 h-5" /> },
    { label: 'Availability', path: '/doctor/availability', icon: <ToggleLeft className="w-5 h-5" /> },
    { label: 'Add Record', path: '/doctor/add-record', icon: <ClipboardPlus className="w-5 h-5" /> },
  ],
  RECEPTIONIST: [
    { label: 'Dashboard', path: '/receptionist/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Schedule', path: '/receptionist/schedule', icon: <CalendarClock className="w-5 h-5" /> },
    { label: 'Reschedule', path: '/receptionist/reschedule', icon: <CalendarCheck className="w-5 h-5" /> },
    { label: 'All Patients', path: '/receptionist/patients', icon: <Users className="w-5 h-5" /> },
  ],
};

const ROLE_LABELS: Record<UserRole, string> = {
  PATIENT: 'Patient Portal',
  DOCTOR: 'Doctor Portal',
  RECEPTIONIST: 'Reception Desk',
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = AuthService.getCurrentUser();

  if (!user) {
    navigate('/login');
    return null;
  }

  const navItems = NAV_ITEMS[user.role];

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-background">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 healthcare-gradient flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
          <div className="w-10 h-10 rounded-xl bg-sidebar-primary/20 flex items-center justify-center">
            <Heart className="w-6 h-6 text-sidebar-primary" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-sidebar-primary text-lg leading-tight">HealthCare</h2>
            <p className="text-sidebar-foreground/70 text-xs">{ROLE_LABELS[user.role]}</p>
          </div>
          <button className="lg:hidden ml-auto text-sidebar-foreground" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-sidebar-primary/20 text-sidebar-primary'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-primary'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-9 h-9 rounded-full healthcare-gradient flex items-center justify-center text-sidebar-primary font-bold text-sm border-2 border-sidebar-primary/30">
              {user.fullName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-primary truncate">{user.fullName}</p>
              <p className="text-xs text-sidebar-foreground/60">{user.role}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full mt-2 text-sidebar-foreground/70 hover:text-sidebar-primary hover:bg-sidebar-accent justify-start gap-3"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </aside>

     
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b px-6 py-4 flex items-center gap-4">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-foreground" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Welcome, {user.fullName}</span>
          </div>
        </header>
        <div className="page-container">
          {children}
        </div>
      </main>
    </div>
  );
}
