import { Link } from 'react-router-dom';
import './ReceptionistDashboard.css';
import { AuthService } from '@/services/AuthService';
import { MockDataService } from '@/services/MockData';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CalendarClock, CalendarCheck, Users, CalendarDays, Stethoscope, Clock } from 'lucide-react';

const STATUS_STYLES: Record<string, string> = {
  SCHEDULED: 'bg-primary/10 text-primary border-primary/20',
  COMPLETED: 'bg-success/10 text-success border-success/20',
  CANCELLED: 'bg-destructive/10 text-destructive border-destructive/20',
  RESCHEDULED: 'bg-warning/10 text-warning border-warning/20',
};

export default function ReceptionistDashboard() {
  const user = AuthService.getCurrentUser()!;
  const allAppointments = MockDataService.getAllAppointments();
  const scheduled = allAppointments.filter(a => a.status === 'SCHEDULED');
  const doctors = MockDataService.getDoctors();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Reception Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage all appointments across the system</p>
        </div>

        <div className="dashboard-grid">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Appointments</p>
                <p className="text-3xl font-heading font-bold text-foreground mt-1">{allAppointments.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <CalendarDays className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-3xl font-heading font-bold text-foreground mt-1">{scheduled.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Doctors</p>
                <p className="text-3xl font-heading font-bold text-foreground mt-1">{doctors.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-accent-foreground" />
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unique Patients</p>
                <p className="text-3xl font-heading font-bold text-foreground mt-1">{new Set(allAppointments.map(a => a.patientId)).size}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <Button asChild><Link to="/receptionist/schedule"><CalendarClock className="w-4 h-4 mr-2" />Schedule Appointment</Link></Button>
          <Button variant="outline" asChild><Link to="/receptionist/reschedule"><CalendarCheck className="w-4 h-4 mr-2" />Reschedule</Link></Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-primary" />
              All System Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allAppointments.map(appt => (
                  <TableRow key={appt.id}>
                    <TableCell className="font-medium">{appt.patientName}</TableCell>
                    <TableCell>{appt.doctorName}</TableCell>
                    <TableCell className="text-muted-foreground">{appt.specialty}</TableCell>
                    <TableCell>{appt.appointmentTime}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={STATUS_STYLES[appt.status]}>{appt.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
