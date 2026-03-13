export interface Doctor {
  id: string;
  fullName: string;
  specialty: string;
  available: boolean;
  email: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  appointmentTime: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED';
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  notes: string;
  diagnosis: string;
  date: string;
}

export const MOCK_DOCTORS: Doctor[] = [
  { id: '2', fullName: 'Dr. Sarah Johnson', specialty: 'Cardiology', available: true, email: 'sarah@hospital.com' },
  { id: '4', fullName: 'Dr. Michael Chen', specialty: 'Neurology', available: true, email: 'michael@hospital.com' },
  { id: '5', fullName: 'Dr. Lisa Patel', specialty: 'Dermatology', available: false, email: 'lisa@hospital.com' },
  { id: '6', fullName: 'Dr. James Wilson', specialty: 'Orthopedics', available: true, email: 'james@hospital.com' },
  { id: '7', fullName: 'Dr. Anna Martinez', specialty: 'Pediatrics', available: true, email: 'anna@hospital.com' },
  { id: '8', fullName: 'Dr. Robert Lee', specialty: 'General Medicine', available: true, email: 'robert@hospital.com' },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: '1', patientId: '1', patientName: 'John Smith', doctorId: '2', doctorName: 'Dr. Sarah Johnson', specialty: 'Cardiology', appointmentTime: '2026-03-12 10:00:00', status: 'SCHEDULED' },
  { id: '2', patientId: '1', patientName: 'John Smith', doctorId: '4', doctorName: 'Dr. Michael Chen', specialty: 'Neurology', appointmentTime: '2026-03-10 14:30:00', status: 'COMPLETED' },
  { id: '3', patientId: '10', patientName: 'Alice Brown', doctorId: '2', doctorName: 'Dr. Sarah Johnson', specialty: 'Cardiology', appointmentTime: '2026-03-11 09:00:00', status: 'SCHEDULED' },
  { id: '4', patientId: '11', patientName: 'Bob Taylor', doctorId: '6', doctorName: 'Dr. James Wilson', specialty: 'Orthopedics', appointmentTime: '2026-03-13 11:00:00', status: 'SCHEDULED' },
  { id: '5', patientId: '1', patientName: 'John Smith', doctorId: '7', doctorName: 'Dr. Anna Martinez', specialty: 'Pediatrics', appointmentTime: '2026-02-28 16:00:00', status: 'CANCELLED' },
  { id: '6', patientId: '12', patientName: 'Carol White', doctorId: '8', doctorName: 'Dr. Robert Lee', specialty: 'General Medicine', appointmentTime: '2026-03-14 08:30:00', status: 'SCHEDULED' },
];

export const MOCK_MEDICAL_RECORDS: MedicalRecord[] = [
  { id: '1', patientId: '1', patientName: 'John Smith', doctorId: '2', doctorName: 'Dr. Sarah Johnson', notes: 'Routine cardiac checkup. Heart sounds normal. ECG within normal limits.', diagnosis: 'Healthy - No issues detected', date: '2026-02-15' },
  { id: '2', patientId: '1', patientName: 'John Smith', doctorId: '4', doctorName: 'Dr. Michael Chen', notes: 'Patient complained of recurring headaches. Prescribed MRI scan.', diagnosis: 'Tension headaches - Further investigation needed', date: '2026-03-10' },
  { id: '3', patientId: '10', patientName: 'Alice Brown', doctorId: '2', doctorName: 'Dr. Sarah Johnson', notes: 'Blood pressure slightly elevated. Advised dietary changes.', diagnosis: 'Pre-hypertension', date: '2026-03-01' },
];

let appointments = [...MOCK_APPOINTMENTS];
let records = [...MOCK_MEDICAL_RECORDS];
let doctors = [...MOCK_DOCTORS];

export const MockDataService = {

  getDoctors: () => doctors,
  getAvailableDoctors: () => doctors.filter(d => d.available),
  getPatientAppointments: (patientId: string) => appointments.filter(a => a.patientId === patientId),
  getPatientRecords: (patientId: string) => records.filter(r => r.patientId === patientId),

  
  getDoctorAppointments: (doctorId: string) => appointments.filter(a => a.doctorId === doctorId),
  getDoctorRecords: (doctorId: string) => records.filter(r => r.doctorId === doctorId),
  toggleAvailability: (doctorId: string, available: boolean) => {
    doctors = doctors.map(d => d.id === doctorId ? { ...d, available } : d);
    return doctors.find(d => d.id === doctorId);
  },

  
  getAllAppointments: () => appointments,

  bookAppointment: (data: { patientId: string; patientName: string; doctorId: string; doctorName: string; specialty: string; appointmentTime: string }) => {
    const appt: Appointment = { id: String(Date.now()), ...data, status: 'SCHEDULED' };
    appointments = [...appointments, appt];
    return appt;
  },

  rescheduleAppointment: (id: string, newTime: string) => {
    appointments = appointments.map(a => a.id === id ? { ...a, appointmentTime: newTime, status: 'RESCHEDULED' } : a);
    return appointments.find(a => a.id === id);
  },

  // Medical Records
  addMedicalRecord: (data: { patientId: string; patientName: string; doctorId: string; doctorName: string; notes: string; diagnosis: string }) => {
    const rec: MedicalRecord = { id: String(Date.now()), ...data, date: new Date().toISOString().split('T')[0] };
    records = [...records, rec];
    return rec;
  },
};
