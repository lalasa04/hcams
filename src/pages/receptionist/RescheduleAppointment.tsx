import { useState } from 'react';
import './RescheduleAppointment.css';
import { MockDataService } from '@/services/MockData';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CalendarCheck, Edit } from 'lucide-react';
import { toast } from 'sonner';

export default function RescheduleAppointment() {
  const appointments = MockDataService.getAllAppointments().filter(a => a.status === 'SCHEDULED' || a.status === 'RESCHEDULED');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newDateTime, setNewDateTime] = useState('');

  const handleReschedule = () => {
    if (!selectedId || !newDateTime) { toast.error('Select appointment and new time'); return; }
    MockDataService.rescheduleAppointment(selectedId, newDateTime.replace('T', ' ') + ':00');
    toast.success('Appointment rescheduled successfully!');
    setSelectedId(null);
    setNewDateTime('');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Reschedule Appointment</h1>
          <p className="text-muted-foreground mt-1">Select an appointment and set a new date/time</p>
        </div>

        <div className="grid gap-4">
          {appointments.map(appt => (
            <Card
              key={appt.id}
              className={`cursor-pointer transition-all hover:shadow-md ${selectedId === appt.id ? 'ring-2 ring-primary shadow-lg' : ''}`}
              onClick={() => setSelectedId(appt.id)}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="font-heading font-semibold text-foreground">{appt.patientName}</p>
                    <p className="text-sm text-muted-foreground">{appt.doctorName} • {appt.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{appt.appointmentTime}</p>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mt-1">{appt.status}</Badge>
                  </div>
                </div>

                {selectedId === appt.id && (
                  <div className="mt-4 pt-4 border-t space-y-3">
                    <Label>New Date & Time</Label>
                    <Input type="datetime-local" value={newDateTime} onChange={e => setNewDateTime(e.target.value)} />
                    <Button className="w-full" onClick={handleReschedule}>
                      <CalendarCheck className="w-4 h-4 mr-2" />Confirm Reschedule
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {appointments.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Edit className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No appointments available to reschedule.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
