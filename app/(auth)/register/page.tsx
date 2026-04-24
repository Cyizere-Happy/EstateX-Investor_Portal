'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

type PartyType = 'individual' | 'organization';
type PhoneVal = string | undefined;

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [partyType, setPartyType] = useState<PartyType>('individual');
  const [phone, setPhone] = useState<PhoneVal>(undefined);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [indForm, setIndForm] = useState({
    document_type: 'national_id',
    document_number: '',
    email: '',
    password: '',
    role: 'investor'
  });

  const [orgForm, setOrgForm] = useState({
    legal_name: '',
    registration_number: '',
    tin: '',
    representative_name: '',
    representative_national_id: '',
    email: '',
    password: '',
    role: 'investor'
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (step === 1) { setStep(2); return; }
    if (!phone || !isValidPhoneNumber(phone)) {
      setError('Please enter a valid phone number'); return;
    }
    setLoading(true);
    try {
      const payload = partyType === 'individual'
        ? { party_type: 'individual', ...indForm, phone_number: phone }
        : { party_type: 'organization', ...orgForm, phone_number: phone };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/v1/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Registration failed');
      router.push('/login?registered=1');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', marginTop: '0.4rem', padding: '0.75rem',
    borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '0.9rem',
    outline: 'none', background: '#fafafa'
  };
  const labelStyle = {
    fontSize: '0.72rem', fontWeight: 700, color: '#666',
    textTransform: 'uppercase' as const, letterSpacing: '0.05em'
  };

  return (
    <div className="ex-auth">
      <div className="ex-auth__brand">
        <div className="ex-auth__brand-glow" />
        <h1 className="ex-auth__brand-logo">EstateX</h1>
        <p className="ex-auth__brand-tagline">
          Rwanda&apos;s verified real estate platform. Government-integrated. Unit-based ownership.
        </p>
      </div>

      <div className="ex-auth__form-side">
        <div className="ex-auth__form-container">
          <h2 className="ex-auth__title">Create Account</h2>
          <p className="ex-auth__subtitle">Step {step} of 2 — {step === 1 ? 'Identity' : 'Credentials'}</p>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {[1, 2].map(s => (
              <div key={s} style={{
                flex: 1, height: '4px', borderRadius: '2px',
                background: s <= step ? 'var(--accent-color)' : '#e5e7eb'
              }} />
            ))}
          </div>

          {error && <div className="ex-auth__error">{error}</div>}

          <form onSubmit={handleSubmit} className="ex-auth__form">
            {step === 1 && (
              <>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={labelStyle}>Account type</label>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                    {(['individual', 'organization'] as PartyType[]).map(pt => (
                      <div key={pt} onClick={() => setPartyType(pt)} style={{
                        flex: 1, padding: '0.875rem', borderRadius: '12px', cursor: 'pointer',
                        border: `2px solid ${partyType === pt ? 'var(--accent-color)' : '#e5e7eb'}`,
                        background: partyType === pt ? 'rgba(30,58,95,0.04)' : '#fff'
                      }}>
                        <div style={{ fontWeight: 700, textTransform: 'capitalize', fontSize: '0.9rem' }}>{pt}</div>
                        <div style={{ fontSize: '0.72rem', color: '#888', marginTop: '0.2rem' }}>
                          {pt === 'individual' ? 'Natural person — NIDA verified' : 'Company or institution'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {partyType === 'individual' ? (
                  <>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={labelStyle}>Document type</label>
                      <select value={indForm.document_type}
                        onChange={e => setIndForm(p => ({ ...p, document_type: e.target.value }))}
                        style={inputStyle}>
                        <option value="national_id">National ID</option>
                        <option value="passport">Passport</option>
                      </select>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={labelStyle}>
                        {indForm.document_type === 'national_id' ? 'National ID Number' : 'Passport Number'}
                      </label>
                      <input value={indForm.document_number}
                        onChange={e => setIndForm(p => ({ ...p, document_number: e.target.value }))}
                        placeholder={indForm.document_type === 'national_id' ? '1199080000001234' : 'PC1234567'}
                        required style={inputStyle} />
                      {indForm.document_type === 'national_id' && (
                        <p style={{ fontSize: '0.72rem', color: '#888', marginTop: '0.3rem' }}>
                          Your name and date of birth will be fetched automatically from NIDA.
                        </p>
                      )}
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={labelStyle}>Role</label>
                      <select value={indForm.role}
                        onChange={e => setIndForm(p => ({ ...p, role: e.target.value }))}
                        style={inputStyle}>
                        <option value="investor">Investor — buy units in verified projects</option>
                        <option value="property_owner">Property Owner — list and manage projects</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    {[
                      { key: 'legal_name', label: 'Legal Name', placeholder: 'Kigali Properties Ltd' },
                      { key: 'registration_number', label: 'Registration Number', placeholder: 'RDB/2024/001' },
                      { key: 'tin', label: 'TIN Number', placeholder: '123456789' },
                      { key: 'representative_name', label: 'Representative Name', placeholder: 'Jean Dupont' },
                      { key: 'representative_national_id', label: 'Representative National ID', placeholder: '1199080000001234' },
                    ].map(field => (
                      <div key={field.key} style={{ marginBottom: '0.875rem' }}>
                        <label style={labelStyle}>{field.label}</label>
                        <input value={(orgForm as any)[field.key]}
                          onChange={e => setOrgForm(p => ({ ...p, [field.key]: e.target.value }))}
                          placeholder={field.placeholder} required style={inputStyle} />
                      </div>
                    ))}
                  </>
                )}

                <button type="submit" style={{
                  width: '100%', padding: '0.875rem', background: 'var(--accent-color)',
                  color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700,
                  fontSize: '0.95rem', cursor: 'pointer', marginTop: '0.5rem'
                }}>
                  Continue
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Email</label>
                  <input type="email"
                    value={partyType === 'individual' ? indForm.email : orgForm.email}
                    onChange={e => partyType === 'individual'
                      ? setIndForm(p => ({ ...p, email: e.target.value }))
                      : setOrgForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="you@example.com" required style={inputStyle} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Password</label>
                  <input type="password"
                    value={partyType === 'individual' ? indForm.password : orgForm.password}
                    onChange={e => partyType === 'individual'
                      ? setIndForm(p => ({ ...p, password: e.target.value }))
                      : setOrgForm(p => ({ ...p, password: e.target.value }))}
                    placeholder="Minimum 8 characters" required style={inputStyle} />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={labelStyle}>Phone Number</label>
                  <div style={{ marginTop: '0.4rem' }}>
                    <PhoneInput international defaultCountry="RW" value={phone}
                      onChange={setPhone} placeholder="+250 788 000 000" />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button type="button" onClick={() => setStep(1)} style={{
                    flex: 1, padding: '0.875rem', background: '#f5f5f5', border: 'none',
                    borderRadius: '12px', fontWeight: 700, cursor: 'pointer'
                  }}>Back</button>
                  <button type="submit" disabled={loading} style={{
                    flex: 2, padding: '0.875rem', background: 'var(--accent-color)',
                    color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700,
                    fontSize: '0.95rem', cursor: 'pointer', opacity: loading ? 0.7 : 1
                  }}>
                    {loading ? 'Creating account…' : 'Create Account'}
                  </button>
                </div>
              </>
            )}
          </form>

          <p className="ex-auth__footer">
            Already have an account? <Link href="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

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
