import { useState } from 'react';
import './DoctorAvailability.css';
import { AuthService } from '@/services/AuthService';
import { MockDataService } from '@/services/MockData';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ToggleLeft, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function DoctorAvailability() {
  const user = AuthService.getCurrentUser()!;
  const doctor = MockDataService.getDoctors().find(d => d.id === user.id);
  const [available, setAvailable] = useState(doctor?.available ?? true);

  const handleToggle = (checked: boolean) => {
    setAvailable(checked);
    MockDataService.toggleAvailability(user.id, checked);
    toast.success(checked ? 'You are now available for appointments' : 'You are now unavailable');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Availability Settings</h1>
          <p className="text-muted-foreground mt-1">Control whether patients can book appointments with you</p>
        </div>

        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <ToggleLeft className="w-5 h-5 text-primary" />
              Availability Toggle
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-6 rounded-xl bg-muted/50">
              <div className="flex items-center gap-4">
                {available ? (
                  <CheckCircle className="w-8 h-8 text-success" />
                ) : (
                  <XCircle className="w-8 h-8 text-destructive" />
                )}
                <div>
                  <p className="font-heading font-semibold text-lg text-foreground">
                    {available ? 'Currently Available' : 'Currently Unavailable'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {available ? 'Patients can see and book you' : 'You won\'t appear in search results'}
                  </p>
                </div>
              </div>
              <Switch checked={available} onCheckedChange={handleToggle} />
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• When available, patients can find you via the doctor search</p>
              <p>• Existing appointments are not affected by availability changes</p>
              <p>• Receptionists can still book on your behalf when unavailable</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
