import { AuthService } from '@/services/AuthService';
import './DoctorAppointments.css';
import { MockDataService } from '@/services/MockData';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Users } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const STATUS_STYLES: Record<string, string> = {
  SCHEDULED: 'bg-primary/10 text-primary border-primary/20',
  COMPLETED: 'bg-success/10 text-success border-success/20',
  CANCELLED: 'bg-destructive/10 text-destructive border-destructive/20',
  RESCHEDULED: 'bg-warning/10 text-warning border-warning/20',
};

export default function DoctorAppointments() {
  const user = AuthService.getCurrentUser()!;
  const appointments = MockDataService.getDoctorAppointments(user.id);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">My Appointments</h1>
          <p className="text-muted-foreground mt-1">View all your scheduled and past appointments</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-primary" />
              Appointments ({appointments.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map(appt => (
                  <TableRow key={appt.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">{appt.patientName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{appt.appointmentTime}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={STATUS_STYLES[appt.status]}>{appt.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {appointments.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No appointments found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
