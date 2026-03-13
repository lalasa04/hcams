import { useState } from 'react';
import './BookAppointment.css';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '@/services/AuthService';
import { MockDataService } from '@/services/MockData';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CalendarPlus, Search, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function BookAppointment() {
  const user = AuthService.getCurrentUser()!;
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [dateTime, setDateTime] = useState('');

  const doctors = MockDataService.getAvailableDoctors();
  const filtered = doctors.filter(d =>
    d.fullName.toLowerCase().includes(search.toLowerCase()) ||
    d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  const handleBook = () => {
    if (!selectedDoctor || !dateTime) {
      toast.error('Please select a doctor and date/time');
      return;
    }
    const doctor = doctors.find(d => d.id === selectedDoctor)!;
    MockDataService.bookAppointment({
      patientId: user.id,
      patientName: user.fullName,
      doctorId: doctor.id,
      doctorName: doctor.fullName,
      specialty: doctor.specialty,
      appointmentTime: dateTime.replace('T', ' ') + ':00',
    });
    toast.success('Appointment booked successfully!');
    navigate('/patient/appointments');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Book Appointment</h1>
          <p className="text-muted-foreground mt-1">Search for available doctors and schedule a visit</p>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by doctor name or specialty..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(doc => (
            <Card
              key={doc.id}
              className={`cursor-pointer transition-all hover:shadow-md ${selectedDoctor === doc.id ? 'ring-2 ring-primary shadow-lg' : ''}`}
              onClick={() => setSelectedDoctor(doc.id)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">{doc.fullName}</h3>
                    <p className="text-sm text-muted-foreground">{doc.specialty}</p>
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    <CheckCircle className="w-3 h-3 mr-1" />Available
                  </Badge>
                </div>
                {selectedDoctor === doc.id && (
                  <div className="mt-4 pt-4 border-t space-y-3">
                    <Label>Select Date & Time</Label>
                    <Input type="datetime-local" value={dateTime} onChange={e => setDateTime(e.target.value)} />
                    <Button className="w-full" onClick={handleBook}>
                      <CalendarPlus className="w-4 h-4 mr-2" />Confirm Booking
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <XCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No available doctors found matching your search.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
