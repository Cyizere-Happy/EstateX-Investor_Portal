'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, verify2FA, getDashboardRoute } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (!result.success) {
      setError(result.error || 'Login failed');
      return;
    }
    if (result.requires2FA) {
      setStep('2fa');
      return;
    }
    router.push(getDashboardRoute());
  };

  const handle2FA = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await verify2FA(totpCode);
    setLoading(false);

    if (!result.success) {
      setError(result.error || 'Invalid code');
      return;
    }
    router.push(getDashboardRoute());
  };

  return (
    <div className="ex-auth">
      <div className="ex-auth__brand">
        <div className="ex-auth__brand-glow" />
        <h1 className="ex-auth__brand-logo">EstateX</h1>
        <p className="ex-auth__brand-tagline">
          Transforming Real Estate with Fractional Ownership. Invest securely through blockchain-verified NFT shares.
        </p>
      </div>

      <div className="ex-auth__form-side">
        <div className="ex-auth__form-container">
          {step === 'credentials' ? (
            <>
              <h2 className="ex-auth__title">Welcome Back</h2>
              <p className="ex-auth__subtitle">Sign in to your EstateX account</p>

              {error && <div className="ex-auth__error">{error}</div>}

              <form onSubmit={handleLogin} className="ex-auth__form">
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <Button type="submit" fullWidth loading={loading} size="lg">
                  Sign In
                </Button>
              </form>

              <p className="ex-auth__footer">
                Don&apos;t have an account? <Link href="/register">Create Account</Link>
              </p>

              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(30,58,95,0.04)', borderRadius: '12px', fontSize: '0.75rem', color: '#666' }}>
                <strong>Portal Login Emails:</strong><br />
                Investor Portal: <strong>john.doe@email.com</strong><br />
                Owner Portal: <strong>alice.owner@email.com</strong><br />
                Admin Portal: <strong>admin@estatex.com</strong> <em>(internal only)</em><br />
                Notary Portal: <strong>notary.jean@email.com</strong><br />
                <em style={{ marginTop: '0.3rem', display: 'block' }}>(any password + any 6-digit 2FA code)</em>
              </div>
            </>
          ) : (
            <>
              <h2 className="ex-auth__title">Two-Factor Authentication</h2>
              <p className="ex-auth__subtitle">Enter the 6-digit code from your authenticator app</p>

              {error && <div className="ex-auth__error">{error}</div>}

              <form onSubmit={handle2FA} className="ex-auth__form">
                <Input
                  label="Verification Code"
                  type="text"
                  value={totpCode}
                  onChange={e => setTotpCode(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                  required
                  hint="Enter any 6-digit code for demo"
                />
                <Button type="submit" fullWidth loading={loading} size="lg">
                  Verify & Sign In
                </Button>
              </form>

              <p className="ex-auth__footer">
                <button onClick={() => setStep('credentials')} style={{ background: 'none', border: 'none', color: 'var(--accent-color)', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-jost)' }}>
                  ← Back to Login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
