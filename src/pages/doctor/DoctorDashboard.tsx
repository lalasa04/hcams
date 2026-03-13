import { Link } from 'react-router-dom';
import './DoctorDashboard.css';
import { AuthService } from '@/services/AuthService';
import { MockDataService } from '@/services/MockData';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Users, ToggleLeft, ClipboardPlus, Clock, Stethoscope } from 'lucide-react';

export default function DoctorDashboard() {
  const user = AuthService.getCurrentUser()!;
  const appointments = MockDataService.getDoctorAppointments(user.id);
  const records = MockDataService.getDoctorRecords(user.id);
  const doctor = MockDataService.getDoctors().find(d => d.id === user.id);
  const todayAppts = appointments.filter(a => a.status === 'SCHEDULED');

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Welcome, {user.fullName}</h1>
            <p className="text-muted-foreground mt-1">{user.specialty || 'General Practice'} • {doctor?.available ? '🟢 Available' : '🔴 Unavailable'}</p>
          </div>
          <Badge variant={doctor?.available ? 'default' : 'destructive'} className="text-sm px-4 py-1">
            {doctor?.available ? 'Accepting Patients' : 'Not Available'}
          </Badge>
        </div>

        <div className="dashboard-grid">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Appointments</p>
                <p className="text-3xl font-heading font-bold text-foreground mt-1">{todayAppts.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <CalendarDays className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Patients</p>
                <p className="text-3xl font-heading font-bold text-foreground mt-1">{new Set(appointments.map(a => a.patientId)).size}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Records Created</p>
                <p className="text-3xl font-heading font-bold text-foreground mt-1">{records.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <ClipboardPlus className="w-6 h-6 text-accent-foreground" />
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">All Appointments</p>
                <p className="text-3xl font-heading font-bold text-foreground mt-1">{appointments.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <Button asChild><Link to="/doctor/availability"><ToggleLeft className="w-4 h-4 mr-2" />Manage Availability</Link></Button>
          <Button variant="outline" asChild><Link to="/doctor/add-record"><ClipboardPlus className="w-4 h-4 mr-2" />Add Medical Record</Link></Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />Scheduled Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todayAppts.length === 0 ? (
              <p className="text-muted-foreground text-sm py-4">No scheduled appointments.</p>
            ) : (
              <div className="space-y-3">
                {todayAppts.map(appt => (
                  <div key={appt.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{appt.patientName}</p>
                        <p className="text-sm text-muted-foreground">{appt.appointmentTime}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">{appt.status}</Badge>
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
