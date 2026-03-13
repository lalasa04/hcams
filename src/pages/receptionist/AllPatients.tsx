import { MockDataService } from '@/services/MockData';
import './AllPatients.css';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users } from 'lucide-react';

export default function AllPatients() {
  const appointments = MockDataService.getAllAppointments();
  const patientsMap = new Map<string, { id: string; name: string; totalAppts: number; lastVisit: string }>();

  appointments.forEach(a => {
    const existing = patientsMap.get(a.patientId);
    if (existing) {
      existing.totalAppts++;
      if (a.appointmentTime > existing.lastVisit) existing.lastVisit = a.appointmentTime;
    } else {
      patientsMap.set(a.patientId, { id: a.patientId, name: a.patientName, totalAppts: 1, lastVisit: a.appointmentTime });
    }
  });

  const patients = Array.from(patientsMap.values());

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">All Patients</h1>
          <p className="text-muted-foreground mt-1">Overview of all patients in the system</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Patients ({patients.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Total Appointments</TableHead>
                  <TableHead>Last Visit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map(p => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell className="text-muted-foreground">{p.id}</TableCell>
                    <TableCell>{p.totalAppts}</TableCell>
                    <TableCell>{p.lastVisit}</TableCell>
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
