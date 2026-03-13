import { AuthService } from '@/services/AuthService';
import './MedicalRecordsPage.css';
import { MockDataService } from '@/services/MockData';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Stethoscope, Calendar } from 'lucide-react';

export default function MedicalRecordsPage() {
  const user = AuthService.getCurrentUser()!;
  const records = MockDataService.getPatientRecords(user.id);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Medical Records</h1>
          <p className="text-muted-foreground mt-1">Your complete medical history</p>
        </div>

        {records.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No medical records found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {records.map(rec => (
              <Card key={rec.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-heading text-lg flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-primary" />
                      {rec.doctorName}
                    </CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {rec.date}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Diagnosis</p>
                    <p className="text-sm text-muted-foreground">{rec.diagnosis}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Notes</p>
                    <p className="text-sm text-muted-foreground">{rec.notes}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
