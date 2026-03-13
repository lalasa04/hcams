import { useState } from 'react';
import './ScheduleAppointment.css';
import { useNavigate } from 'react-router-dom';
import { MockDataService } from '@/services/MockData';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarClock } from 'lucide-react';
import { toast } from 'sonner';

export default function ScheduleAppointment() {
  const navigate = useNavigate();
  const doctors = MockDataService.getAvailableDoctors();

  const [patientName, setPatientName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [dateTime, setDateTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const doctor = doctors.find(d => d.id === doctorId);
    if (!doctor) { toast.error('Select an available doctor'); return; }

    MockDataService.bookAppointment({
      patientId: patientId || String(Date.now()),
      patientName,
      doctorId: doctor.id,
      doctorName: doctor.fullName,
      specialty: doctor.specialty,
      appointmentTime: dateTime.replace('T', ' ') + ':00',
    });

    toast.success(`Appointment scheduled for ${patientName}`);
    navigate('/receptionist/dashboard');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Schedule Appointment</h1>
          <p className="text-muted-foreground mt-1">Book an appointment on behalf of a patient</p>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <CalendarClock className="w-5 h-5 text-primary" />
              New Appointment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Patient Name</Label>
                  <Input placeholder="Patient full name" value={patientName} onChange={e => setPatientName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Patient ID (optional)</Label>
                  <Input placeholder="Patient ID" value={patientId} onChange={e => setPatientId(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Doctor</Label>
                <Select value={doctorId} onValueChange={setDoctorId}>
                  <SelectTrigger><SelectValue placeholder="Select available doctor" /></SelectTrigger>
                  <SelectContent>
                    {doctors.map(d => <SelectItem key={d.id} value={d.id}>{d.fullName} — {d.specialty}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date & Time</Label>
                <Input type="datetime-local" value={dateTime} onChange={e => setDateTime(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full">
                <CalendarClock className="w-4 h-4 mr-2" />Schedule Appointment
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
