import { useState } from 'react';
import './RegistrationPage.css';
import { useNavigate, Link } from 'react-router-dom';
import { AuthService, UserRole } from '@/services/AuthService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, ArrowRight, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

const SPECIALTIES = ['Cardiology', 'Neurology', 'Dermatology', 'Orthopedics', 'Pediatrics', 'General Medicine', 'Oncology', 'Psychiatry'];

export default function RegistrationPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '', fullName: '', role: '' as UserRole | '', specialty: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.role) { toast.error('Please select a role'); return; }
    if (form.role === 'DOCTOR' && !form.specialty) { toast.error('Please select a specialty'); return; }

    setLoading(true);
    setTimeout(() => {
      const user = AuthService.register({ ...form, role: form.role as UserRole });
      toast.success(`Account created for ${user.fullName}!`);
      const routes = { PATIENT: '/patient/dashboard', DOCTOR: '/doctor/dashboard', RECEPTIONIST: '/receptionist/dashboard' };
      navigate(routes[user.role]);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-lg border-0 shadow-xl">
        <CardHeader className="text-center pb-2">
          <div className="w-14 h-14 rounded-xl healthcare-gradient flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-7 h-7 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-foreground">Create Account</h2>
          <p className="text-muted-foreground text-sm mt-1">Join the healthcare platform</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="John Smith" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Username</Label>
                <Input placeholder="johnsmith" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="john@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" placeholder="Create a strong password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={form.role} onValueChange={v => setForm({ ...form, role: v as UserRole })}>
                <SelectTrigger><SelectValue placeholder="Select your role" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="PATIENT">🤒 Patient</SelectItem>
                  <SelectItem value="DOCTOR">👨‍⚕️ Doctor</SelectItem>
                  <SelectItem value="RECEPTIONIST">🗂️ Receptionist</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {form.role === 'DOCTOR' && (
              <div className="space-y-2">
                <Label>Specialty</Label>
                <Select value={form.specialty} onValueChange={v => setForm({ ...form, specialty: v })}>
                  <SelectTrigger><SelectValue placeholder="Select specialty" /></SelectTrigger>
                  <SelectContent>
                    {SPECIALTIES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
