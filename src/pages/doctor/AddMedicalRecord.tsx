import { useState } from 'react';
import './AddMedicalRecord.css';
import { AuthService } from '@/services/AuthService';
import { MockDataService } from '@/services/MockData';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClipboardPlus, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function AddMedicalRecord() {
  const user = AuthService.getCurrentUser()!;
  const appointments = MockDataService.getDoctorAppointments(user.id);
  const patients = [...new Map(appointments.map(a => [a.patientId, { id: a.patientId, name: a.patientName }])).values()];

  const [patientId, setPatientId] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = patients.find(p => p.id === patientId);
    if (!patient) { toast.error('Select a patient'); return; }

    MockDataService.addMedicalRecord({
      patientId: patient.id,
      patientName: patient.name,
      doctorId: user.id,
      doctorName: user.fullName,
      notes,
      diagnosis,
    });

    toast.success('Medical record added successfully!');
    setSubmitted(true);
    setPatientId('');
    setDiagnosis('');
    setNotes('');
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Add Medical Record</h1>
          <p className="text-muted-foreground mt-1">Create a new medical record after a consultation</p>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <ClipboardPlus className="w-5 h-5 text-primary" />
              New Record
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label>Patient</Label>
                <Select value={patientId} onValueChange={setPatientId}>
                  <SelectTrigger><SelectValue placeholder="Select patient" /></SelectTrigger>
                  <SelectContent>
                    {patients.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Diagnosis</Label>
                <Input placeholder="e.g., Hypertension Stage 1" value={diagnosis} onChange={e => setDiagnosis(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea placeholder="Detailed consultation notes..." rows={5} value={notes} onChange={e => setNotes(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full">
                {submitted ? <><CheckCircle className="w-4 h-4 mr-2" />Saved!</> : <><ClipboardPlus className="w-4 h-4 mr-2" />Save Record</>}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
