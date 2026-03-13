import { Link } from 'react-router-dom';
import './Index.css';
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight, Shield, CalendarDays, FileText, Users, Stethoscope, Clock } from 'lucide-react';

const features = [
  { icon: <Shield className="w-6 h-6" />, title: 'Secure Authentication', desc: 'Role-based JWT login for patients, doctors, and receptionists' },
  { icon: <CalendarDays className="w-6 h-6" />, title: 'Appointment Booking', desc: 'Book, reschedule, and manage appointments seamlessly' },
  { icon: <FileText className="w-6 h-6" />, title: 'Medical Records', desc: 'Doctors create records, patients view full history' },
  { icon: <Users className="w-6 h-6" />, title: 'Multi-Role Dashboards', desc: 'Tailored dashboards for each user role' },
  { icon: <Stethoscope className="w-6 h-6" />, title: 'Doctor Management', desc: 'Availability toggling and schedule management' },
  { icon: <Clock className="w-6 h-6" />, title: 'Reception Desk', desc: 'System-wide appointment coordination' },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
  
      <nav className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl healthcare-gradient flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-xl text-foreground">HealthCare MS</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild><Link to="/login">Sign In</Link></Button>
            <Button asChild><Link to="/register">Get Started <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 healthcare-gradient opacity-5" />
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-foreground max-w-4xl mx-auto leading-tight">
            Healthcare Management
            <span className="healthcare-gradient-text"> System</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
            A unified platform connecting patients, doctors, and receptionists with role-based access, appointment booking, and medical records management.
          </p>
          <div className="flex items-center justify-center gap-4 mt-10">
            <Button size="lg" asChild><Link to="/login">Sign In <ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
            <Button size="lg" variant="outline" asChild><Link to="/register">Create Account</Link></Button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-heading font-bold text-center text-foreground mb-4">Platform Features</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">Built with 10 microservices covering authentication, patient management, doctor scheduling, and more.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="stat-card group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {f.icon}
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold text-center text-foreground mb-12">Three Portals, One Platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { emoji: '🤒', role: 'Patient', items: ['Self-registration', 'Search doctors', 'Book appointments', 'View medical records'] },
              { emoji: '👨‍⚕️', role: 'Doctor', items: ['Manage availability', 'View appointments', 'Create medical records', 'Patient history'] },
              { emoji: '🗂️', role: 'Receptionist', items: ['System-wide view', 'Book on behalf', 'Reschedule appointments', 'Patient management'] },
            ].map((r, i) => (
              <div key={i} className="bg-card rounded-2xl p-8 shadow-sm border text-center">
                <span className="text-5xl">{r.emoji}</span>
                <h3 className="font-heading font-bold text-xl text-foreground mt-4 mb-4">{r.role} Portal</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {r.items.map((item, j) => <li key={j}>✓ {item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>HealthCare Microservice System </p>
          <p className="mt-1">We provide the best medical services with experienced doctors,
            modern technology, and compassionate care for every patient.
</p>
        </div>
      </footer>
    </div>
  );
}
