export type UserRole = 'PATIENT' | 'DOCTOR' | 'RECEPTIONIST';
export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  fullName: string;
  specialty?: string;
}

const MOCK_USERS: User[] = [
  { id: '1', username: 'patient1', email: 'patient@demo.com', role: 'PATIENT', fullName: 'John Smith' },
  { id: '2', username: 'doctor1', email: 'doctor@demo.com', role: 'DOCTOR', fullName: 'Dr. Sarah Johnson', specialty: 'Cardiology' },
  { id: '3', username: 'receptionist1', email: 'receptionist@demo.com', role: 'RECEPTIONIST', fullName: 'Emily Davis' },
];

const TOKEN_KEY = 'healthcare_jwt_token';
const USER_KEY = 'healthcare_user';

export const AuthService = {
  login(username: string, _password: string): { token: string; user: User } | null {
    const user = MOCK_USERS.find(u => u.username === username);
    if (user) {
      const token = `mock-jwt-${user.id}-${Date.now()}`;
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return { token, user };
    }
    return null;
  },

  register(data: { username: string; email: string; password: string; role: UserRole; fullName: string; specialty?: string }): User {
    const user: User = {
      id: String(Date.now()),
      username: data.username,
      email: data.email,
      role: data.role,
      fullName: data.fullName,
      specialty: data.specialty,
    };
    localStorage.setItem(TOKEN_KEY, `mock-jwt-${user.id}-${Date.now()}`);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  getCurrentUser(): User | null {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
