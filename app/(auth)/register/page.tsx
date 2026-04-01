'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

type PhoneVal = string | undefined;

function getPasswordStrength(pw: string): { score: number; label: string; color: string } {
  if (!pw) return { score: 0, label: '', color: '#e5e7eb' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map: Record<number, { label: string; color: string }> = {
    0: { label: 'Too short', color: '#ef4444' },
    1: { label: 'Weak', color: '#ef4444' },
    2: { label: 'Fair', color: '#f59e0b' },
    3: { label: 'Good', color: '#3b82f6' },
    4: { label: 'Strong', color: '#10b981' },
    5: { label: 'Very Strong', color: '#39ff88' },
  };
  return { score, ...map[score] };
}

const ROLES = [
  { value: UserRole.INVESTOR, label: 'Investor', desc: 'Invest in property shares via NFTs' },
  { value: UserRole.PROPERTY_OWNER, label: 'Property Owner', desc: 'List properties and raise funding' },
  { value: UserRole.NOTARY, label: 'Notary', desc: 'Legally verify documents and projects' },
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole>(UserRole.INVESTOR);
  const [phone, setPhone] = useState<PhoneVal>(undefined);
  const [formData, setFormData] = useState({
    email: '', password: '', confirmPassword: '',
    first_name: '', last_name: '', date_of_birth: '', national_id: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, getDashboardRoute } = useAuth();
  const router = useRouter();

  const pw = getPasswordStrength(formData.password);
  const update = (field: string, value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (step === 1) { setStep(2); return; }
    if (step === 2) {
      if (!formData.email || !formData.password) { setError('Please fill all required fields'); return; }
      if (formData.password !== formData.confirmPassword) { setError('Passwords do not match'); return; }
      if (formData.password.length < 8) { setError('Password must be at least 8 characters'); return; }
      if (pw.score < 2) { setError('Please choose a stronger password'); return; }
      setStep(3); return;
    }
    if (!phone || !isValidPhoneNumber(phone)) {
      setError('Please enter a valid phone number'); return;
    }
    setLoading(true);
    const result = await register({ ...formData, phone_number: phone, role });
    setLoading(false);
    if (!result.success) { setError(result.error || 'Registration failed'); return; }
    router.push(getDashboardRoute());
  };

  return (
    <div className="ex-auth">
      <div className="ex-auth__brand">
        <div className="ex-auth__brand-glow" />
        <h1 className="ex-auth__brand-logo">EstateX</h1>
        <p className="ex-auth__brand-tagline">
          Join Rwanda&apos;s premier digital real estate ecosystem. Start investing in property with fractional ownership.
        </p>
      </div>

      <div className="ex-auth__form-side">
        <div className="ex-auth__form-container">
          <h2 className="ex-auth__title">Create Account</h2>
          <p className="ex-auth__subtitle">
            Step {step} of 3 — {step === 1 ? 'Choose role' : step === 2 ? 'Credentials' : 'Personal info'}
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{
                flex: 1, height: '4px', borderRadius: '2px',
                background: s <= step ? 'var(--accent-color)' : '#e5e7eb',
                transition: 'background 0.3s'
              }} />
            ))}
          </div>

          {error && <div className="ex-auth__error">{error}</div>}

          <form onSubmit={handleSubmit} className="ex-auth__form">
            {step === 1 && (
              <>
                <div className="ex-role-selector" style={{ gridTemplateColumns: '1fr', gap: '0.6rem' }}>
                  {ROLES.map(r => (
                    <div key={r.value}
                      className={`ex-role-option ${role === r.value ? 'ex-role-option--selected' : ''}`}
                      style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1rem' }}
                      onClick={() => setRole(r.value)}
                    >
                      <div style={{ flex: 1 }}>
                        <div className="ex-role-option__label">{r.label}</div>
                        <div className="ex-role-option__desc">{r.desc}</div>
                      </div>
                      {role === r.value && (
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--accent-color)">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
                <Button type="submit" fullWidth size="lg">Continue</Button>
              </>
            )}

            {step === 2 && (
              <>
                <Input label="Email Address" type="email" value={formData.email}
                  onChange={e => update('email', e.target.value)} placeholder="you@example.com" required />

                <div>
                  <Input label="Password" type="password" value={formData.password}
                    onChange={e => update('password', e.target.value)} placeholder="Minimum 8 characters" required />
                  {formData.password && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                        {[1,2,3,4,5].map(seg => (
                          <div key={seg} style={{
                            flex: 1, height: '4px', borderRadius: '2px',
                            background: seg <= pw.score ? pw.color : '#e5e7eb',
                            transition: 'background 0.3s'
                          }} />
                        ))}
                      </div>
                      <p style={{ fontSize: '0.72rem', color: pw.color, fontWeight: 700 }}>
                        {pw.label}
                        {pw.score < 3 && <span style={{ color: '#999', fontWeight: 400, marginLeft: '0.5rem' }}>— add uppercase, numbers or symbols</span>}
                      </p>
                    </div>
                  )}
                </div>

                <Input label="Confirm Password" type="password" value={formData.confirmPassword}
                  onChange={e => update('confirmPassword', e.target.value)} placeholder="Re-enter password" required />

                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <Button type="button" variant="ghost" onClick={() => setStep(1)}>Back</Button>
                  <Button type="submit" fullWidth size="lg">Continue</Button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="ex-auth__row">
                  <Input label="First Name" value={formData.first_name}
                    onChange={e => update('first_name', e.target.value)} placeholder="John" required />
                  <Input label="Last Name" value={formData.last_name}
                    onChange={e => update('last_name', e.target.value)} placeholder="Doe" required />
                </div>

                <Input label="Date of Birth" type="date" value={formData.date_of_birth}
                  onChange={e => update('date_of_birth', e.target.value)} required />

                <div className="ex-phone-group">
                  <label className="ex-input__label">Phone Number</label>
                  <PhoneInput
                    international
                    defaultCountry="RW"
                    value={phone}
                    onChange={setPhone}
                    className="ex-phone-input"
                    placeholder="+250 788 000 000"
                  />
                  {phone && !isValidPhoneNumber(phone) && (
                    <p style={{ fontSize: '0.72rem', color: '#ef4444', marginTop: '4px' }}>
                      Invalid phone number for selected country
                    </p>
                  )}
                </div>

                <Input label="National ID (Optional)" value={formData.national_id}
                  onChange={e => update('national_id', e.target.value)} placeholder="1199080000001" />

                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <Button type="button" variant="ghost" onClick={() => setStep(2)}>Back</Button>
                  <Button type="submit" fullWidth size="lg" loading={loading}>Create Account</Button>
                </div>
              </>
            )}
          </form>

          <p className="ex-auth__footer">
            Already have an account? <Link href="/login">Sign In</Link>
          </p>
          <p style={{ fontSize: '0.72rem', color: '#999', textAlign: 'center', marginTop: '0.5rem' }}>
            Admin accounts are provisioned internally.
          </p>
        </div>
      </div>
    </div>
  );
}
