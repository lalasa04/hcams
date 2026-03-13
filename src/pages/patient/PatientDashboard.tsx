import { Link } from 'react-router-dom';
import './PatientDashboard.css';
import { AuthService } from '@/services/AuthService';
import { MockDataService } from '@/services/MockData';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, CalendarPlus, FileText, Clock, CheckCircle, XCircle, Stethoscope } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const STATUS_STYLES: Record<string, string> = {
  SCHEDULED: 'bg-primary/10 text-primary border-primary/20',
  COMPLETED: 'bg-success/10 text-success border-success/20',
  CANCELLED: 'bg-destructive/10 text-destructive border-destructive/20',
  RESCHEDULED: 'bg-warning/10 text-warning border-warning/20',
};

export default function PatientDashboard() {
  const user = AuthService.getCurrentUser()!;
  const appointments = MockDataService.getPatientAppointments(user.id);
  const records = MockDataService.getPatientRecords(user.id);
  const upcoming = appointments.filter(a => a.status === 'SCHEDULED');

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Welcome back, {user.fullName}</h1>
          <p className="text-muted-foreground mt-1">Here's your health overview</p>
        </div>

        <div className="dashboard-grid">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-3xl font-heading font-bold text-foreground mt-1">{upcoming.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <CalendarDays className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Visits</p>
                <p className="text-3xl font-heading font-bold text-foreground mt-1">{appointments.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Records</p>
                <p className="text-3xl font-heading font-bold text-foreground mt-1">{records.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <FileText className="w-6 h-6 text-accent-foreground" />
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Doctors Seen</p>
                <p className="text-3xl font-heading font-bold text-foreground mt-1">{new Set(appointments.map(a => a.doctorId)).size}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <Button asChild><Link to="/patient/book"><CalendarPlus className="w-4 h-4 mr-2" />Book Appointment</Link></Button>
          <Button variant="outline" asChild><Link to="/patient/appointments"><CalendarDays className="w-4 h-4 mr-2" />View All Appointments</Link></Button>
          <Button variant="outline" asChild><Link to="/patient/records"><FileText className="w-4 h-4 mr-2" />Medical Records</Link></Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcoming.length === 0 ? (
              <p className="text-muted-foreground text-sm py-4">No upcoming appointments. Book one now!</p>
            ) : (
              <div className="space-y-3">
                {upcoming.map(appt => (
                  <div key={appt.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full healthcare-gradient flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{appt.doctorName}</p>
                        <p className="text-sm text-muted-foreground">{appt.specialty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{appt.appointmentTime.split(' ')[0]}</p>
                      <p className="text-xs text-muted-foreground">{appt.appointmentTime.split(' ')[1]}</p>
                    </div>
                    <Badge variant="outline" className={STATUS_STYLES[appt.status]}>{appt.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
