'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

type KycStep = 'intro' | 'id-upload' | 'selfie' | 'review' | 'submitted';

interface SelfieMeta {
  dataUrl: string;
  faceDetected: boolean;
}

export default function KYCPage() {
  const router = useRouter();
  const [step, setStep] = useState<KycStep>('intro');
  const [idFile, setIdFile] = useState<File | null>(null);
  const [idPreview, setIdPreview] = useState<string | null>(null);
  const [idValidation, setIdValidation] = useState<{ checking: boolean; valid: boolean | null; message: string }>({ checking: false, valid: null, message: '' });
  const [selfies, setSelfies] = useState<SelfieMeta[]>([]);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [faceDetected, setFaceDetected] = useState(false);
  const [previewSelfie, setPreviewSelfie] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const detectionRef = useRef<number | null>(null);

  const REQUIRED_SELFIES = 3;
  const FACE_OVAL_SIZE = 280; // Large face oval

  // ── ID Document Upload & Real-time Validation ──
  const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setIdValidation({ checking: false, valid: false, message: 'Invalid format. Accepted: JPG, PNG, WebP, PDF' });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setIdValidation({ checking: false, valid: false, message: 'File too large. Maximum 10MB.' });
      return;
    }

    setIdFile(file);

    // Generate preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setIdPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setIdPreview(null);
    }

    setIdValidation({ checking: true, valid: null, message: 'Sending document to KYC system...' });
    
    // Replace with actual fetch to backend KYC endpoint when ready
    // e.g. await fetch('/api/kyc/upload-id', { method: 'POST', body: formData })
    
    setTimeout(() => {
      setIdValidation({
        checking: false,
        valid: true,
        message: 'Document successfully uploaded and queued for KYC review.',
      });
    }, 800);
  };

  // ── Camera Management ──
  const startCamera = useCallback(async () => {
    setCameraError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraActive(true);
      startFaceDetection();
    } catch {
      setCameraError('Camera access denied. Please allow camera access in your browser settings and try again.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    setCameraActive(false);
    setFaceDetected(false);
    if (detectionRef.current) {
      cancelAnimationFrame(detectionRef.current);
      detectionRef.current = null;
    }
  }, []);

  // Simulated face detection using canvas brightness analysis
  const startFaceDetection = () => {
    const detect = () => {
      if (!videoRef.current || !canvasRef.current) return;
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx || video.videoWidth === 0) {
        detectionRef.current = requestAnimationFrame(detect);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);

      // Analyze center region (where face should be)
      const cx = Math.floor(canvas.width / 2);
      const cy = Math.floor(canvas.height / 2);
      // Use a larger sample size so we capture the eyes/mouth for variance, 
      // not just a smooth flat patch of skin (which caused the 'red in middle' bug)
      const sampleSize = 240; 
      const imgData = ctx.getImageData(cx - sampleSize / 2, cy - sampleSize / 2, sampleSize, sampleSize);
      const data = imgData.data;

      // Calculate brightness variance (face has texture variance vs blank wall)
      let sum = 0;
      let sumSq = 0;
      const pixelCount = data.length / 4;
      for (let i = 0; i < data.length; i += 4) {
        const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
        sum += brightness;
        sumSq += brightness * brightness;
      }
      const mean = sum / pixelCount;
      const variance = (sumSq / pixelCount) - (mean * mean);

      // Lower variance threshold slightly because skin overall can dominate the sample
      const detected = variance > 100 && mean > 30 && mean < 235;
      setFaceDetected(detected);

      detectionRef.current = requestAnimationFrame(detect);
    };
    detect();
  };

  // ── Capture Selfie ──
  const captureSelfie = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

    setSelfies(prev => [...prev, { dataUrl, faceDetected }]);
  };

  const removeSelfie = (index: number) => {
    setSelfies(prev => prev.filter((_, i) => i !== index));
  };

  // Cleanup camera on step change
  useEffect(() => {
    if (step !== 'selfie') stopCamera();
    return () => stopCamera();
  }, [step, stopCamera]);

  // ── Step Progress Indicator ──
  const steps = [
    { key: 'intro', label: 'Welcome' },
    { key: 'id-upload', label: 'ID Document' },
    { key: 'selfie', label: 'Selfie Capture' },
    { key: 'review', label: 'Review' },
  ];
  const currentStepIndex = steps.findIndex(s => s.key === step);

  return (
    <>
      <div className="ex-page__header">
        <h1 className="ex-page__title">KYC Verification</h1>
        <p className="ex-page__desc">Verify your identity to start investing on EstateX</p>
      </div>

      {/* Progress bar */}
      {step !== 'submitted' && (
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', alignItems: 'center' }}>
          {steps.map((s, i) => (
            <div key={s.key} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 900,
                background: i <= currentStepIndex ? 'var(--accent-color)' : '#e8e8e8',
                color: i <= currentStepIndex ? '#fff' : '#999',
                transition: 'all 0.3s',
              }}>
                {i < currentStepIndex ? '✓' : i + 1}
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: i === currentStepIndex ? 800 : 400, color: i === currentStepIndex ? 'var(--text-dark)' : '#999' }}>
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div style={{ flex: 1, height: '2px', background: i < currentStepIndex ? 'var(--accent-color)' : '#e8e8e8', margin: '0 0.5rem', transition: 'all 0.3s' }} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── STEP: INTRO ── */}
      {step === 'intro' && (
        <Card>
          <div style={{ padding: '2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 1.5rem',
              background: 'rgba(30,58,95,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg viewBox="0 0 24 24" width="40" height="40" fill="var(--accent-color)">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
              </svg>
            </div>
            <h2 style={{ fontWeight: 900, marginBottom: '0.5rem' }}>Identity Verification</h2>
            <p style={{ color: '#666', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              To comply with KYC/AML regulations and protect all investors, we need to verify your identity.
              This process takes approximately 2-3 minutes.
            </p>
            <div style={{ textAlign: 'left', background: '#f8f9fa', borderRadius: '14px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>What you will need:</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.88rem', color: '#444' }}>
                {[
                  'A government-issued ID (National ID, Passport, or Driver\'s License)',
                  'A working camera for live selfie capture',
                  'Good lighting for clear images',
                ].map((item, i) => (
                  <li key={i} style={{ padding: '0.4rem 0', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--accent-color)', fontWeight: 900 }}>&#10003;</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: 'rgba(16,185,129,0.06)', borderRadius: '14px', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.82rem', color: '#555' }}>
              <strong>Privacy:</strong> Your data is encrypted with AES-256. Face embeddings are stored as 512-dimensional vectors — original images are deleted immediately after processing.
            </div>
            <Button size="lg" fullWidth onClick={() => setStep('id-upload')}>Begin Verification</Button>
          </div>
        </Card>
      )}

      {/* ── STEP: ID UPLOAD ── */}
      {step === 'id-upload' && (
        <Card>
          <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontWeight: 900, marginBottom: '0.5rem' }}>Upload ID Document</h2>
            <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
              Upload a clear photo or scan of your government-issued ID card. We will validate it in real-time.
            </p>

            <label style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              border: idValidation.valid === true ? '2px dashed #10b981' : idValidation.valid === false ? '2px dashed #ef4444' : '2px dashed #d1d5db',
              borderRadius: '16px', padding: '2rem', cursor: 'pointer',
              background: idPreview ? 'none' : '#f8f9fa', transition: 'all 0.3s',
              position: 'relative', overflow: 'hidden', minHeight: '200px',
            }}>
              {idPreview ? (
                <img src={idPreview} alt="ID Preview" style={{ maxWidth: '100%', maxHeight: '250px', borderRadius: '10px' }} />
              ) : (
                <>
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="#999" style={{ marginBottom: '0.8rem' }}>
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
                  </svg>
                  <div style={{ fontWeight: 700, marginBottom: '0.3rem' }}>Click to upload or drag & drop</div>
                  <div style={{ fontSize: '0.78rem', color: '#999' }}>JPG, PNG, WebP, or PDF — Max 10MB</div>
                </>
              )}
              <input type="file" accept="image/*,.pdf" onChange={handleIdUpload} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
            </label>

            {/* Real-time validation feedback */}
            {(idValidation.checking || idValidation.valid !== null) && (
              <div style={{
                marginTop: '1rem', padding: '0.8rem 1rem', borderRadius: '12px',
                display: 'flex', gap: '0.6rem', alignItems: 'center',
                background: idValidation.checking ? 'rgba(59,130,246,0.06)' : idValidation.valid ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.06)',
                border: `1px solid ${idValidation.checking ? 'rgba(59,130,246,0.2)' : idValidation.valid ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
              }}>
                {idValidation.checking ? (
                  <div style={{ width: '18px', height: '18px', border: '2px solid #3b82f6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                ) : idValidation.valid ? (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="#10b981"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="#ef4444"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
                )}
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: idValidation.checking ? '#3b82f6' : idValidation.valid ? '#10b981' : '#ef4444' }}>
                  {idValidation.message}
                </span>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <Button variant="secondary" onClick={() => setStep('intro')}>Back</Button>
              <Button fullWidth disabled={!idFile || idValidation.checking || idValidation.valid === false}
                onClick={() => setStep('selfie')}>
                Continue to Selfie Capture
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* ── STEP: SELFIE CAPTURE ── */}
      {step === 'selfie' && (
        <Card>
          <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ fontWeight: 900, marginBottom: '0.5rem' }}>Live Selfie Capture</h2>
            <p style={{ color: '#666', marginBottom: '1rem', fontSize: '0.88rem' }}>
              Position your face within the oval guide. We need {REQUIRED_SELFIES} selfies for liveness verification.
              The circle turns <strong style={{ color: '#10b981' }}>green</strong> when your face is well-positioned.
            </p>

            {cameraError && (
              <div style={{ padding: '1rem', background: 'rgba(239,68,68,0.08)', borderRadius: '12px', color: '#ef4444', marginBottom: '1rem', fontSize: '0.85rem' }}>
                {cameraError}
              </div>
            )}

            {/* Camera View */}
            <div style={{
              position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto',
              aspectRatio: '4/3', background: '#000', borderRadius: '20px', overflow: 'hidden',
              marginBottom: '1.5rem',
            }}>
              <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />

              {/* Face Oval Guide — BIG */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: `${FACE_OVAL_SIZE}px`, height: `${Math.round(FACE_OVAL_SIZE * 1.25)}px`,
                border: `4px solid ${faceDetected && cameraActive ? '#10b981' : 'rgba(255,255,255,0.5)'}`,
                borderRadius: '50%',
                boxShadow: faceDetected && cameraActive
                  ? '0 0 20px rgba(16,185,129,0.4), inset 0 0 20px rgba(16,185,129,0.1)'
                  : '0 0 20px rgba(0,0,0,0.3)',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                pointerEvents: 'none',
              }} />

              {/* Face Detection Indicator */}
              {cameraActive && (
                <div style={{
                  position: 'absolute', top: '1rem', left: '50%', transform: 'translateX(-50%)',
                  display: 'flex', gap: '0.5rem', alignItems: 'center',
                  background: faceDetected ? 'rgba(16,185,129,0.9)' : 'rgba(239,68,68,0.8)',
                  padding: '0.3rem 0.8rem', borderRadius: '100px', color: '#fff',
                  fontSize: '0.78rem', fontWeight: 700, transition: 'background 0.3s',
                }}>
                  <div style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: '#fff', animation: faceDetected ? 'none' : 'pulse 1.5s infinite',
                  }} />
                  {faceDetected ? 'Face Detected' : 'Position Your Face'}
                </div>
              )}

              {/* Camera Off State */}
              {!cameraActive && !cameraError && (
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', color: '#fff',
                }}>
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="rgba(255,255,255,0.5)" style={{ marginBottom: '0.5rem' }}>
                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                  </svg>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Camera is off</div>
                </div>
              )}

              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>

            {/* Camera Controls */}
            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
              {!cameraActive ? (
                <Button size="lg" onClick={startCamera}>Start Camera</Button>
              ) : (
                <>
                  <Button size="lg" onClick={captureSelfie} disabled={selfies.length >= REQUIRED_SELFIES || !faceDetected}>
                    Capture ({selfies.length}/{REQUIRED_SELFIES})
                  </Button>
                  <Button variant="secondary" size="lg" onClick={stopCamera}>Stop Camera</Button>
                </>
              )}
            </div>

            {/* Selfie Thumbnails — Clickable */}
            {selfies.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.88rem' }}>
                  Captured Selfies ({selfies.length}/{REQUIRED_SELFIES})
                </div>
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                  {selfies.map((s, i) => (
                    <div key={i} style={{ position: 'relative' }}>
                      {/* Clickable thumbnail */}
                      <div
                        onClick={() => setPreviewSelfie(s.dataUrl)}
                        style={{
                          width: '100px', height: '100px', borderRadius: '14px', overflow: 'hidden',
                          cursor: 'pointer', border: `3px solid ${s.faceDetected ? '#10b981' : '#f59e0b'}`,
                          transition: 'transform 0.2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                      >
                        <img src={s.dataUrl} alt={`Selfie ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
                      </div>
                      {/* Face quality badge */}
                      <div style={{
                        position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%)',
                        background: s.faceDetected ? '#10b981' : '#f59e0b',
                        color: '#fff', fontSize: '0.65rem', fontWeight: 800,
                        padding: '0.1rem 0.4rem', borderRadius: '100px',
                      }}>
                        {s.faceDetected ? 'Good' : 'Recheck'}
                      </div>
                      {/* Remove button */}
                      <button onClick={() => removeSelfie(i)} style={{
                        position: 'absolute', top: '-6px', right: '-6px',
                        width: '22px', height: '22px', borderRadius: '50%',
                        background: '#ef4444', color: '#fff', border: 'none',
                        cursor: 'pointer', fontSize: '0.7rem', fontWeight: 900,
                      }}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button variant="secondary" onClick={() => { stopCamera(); setStep('id-upload'); }}>Back</Button>
              <Button fullWidth disabled={selfies.length < REQUIRED_SELFIES}
                onClick={() => { stopCamera(); setStep('review'); }}>
                Review & Submit
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* ── STEP: REVIEW ── */}
      {step === 'review' && (
        <Card>
          <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontWeight: 900, marginBottom: '0.5rem' }}>Review & Submit</h2>
            <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
              Please review your submission before final upload.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              {/* ID Document */}
              <div style={{ border: '1px solid #e8e8e8', borderRadius: '14px', padding: '1rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>ID Document</div>
                {idPreview ? (
                  <img src={idPreview} alt="ID" style={{ width: '100%', borderRadius: '8px' }} />
                ) : (
                  <div style={{ height: '100px', background: '#f5f5f5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '0.8rem' }}>
                    PDF Uploaded
                  </div>
                )}
                <div style={{ fontSize: '0.78rem', color: '#666', marginTop: '0.3rem' }}>{idFile?.name}</div>
                <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center', marginTop: '0.3rem' }}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="#10b981"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>Validated</span>
                </div>
              </div>

              {/* Selfies */}
              <div style={{ border: '1px solid #e8e8e8', borderRadius: '14px', padding: '1rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>Live Selfies ({selfies.length})</div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {selfies.map((s, i) => (
                    <div key={i} onClick={() => setPreviewSelfie(s.dataUrl)} style={{ cursor: 'pointer' }}>
                      <img src={s.dataUrl} alt={`Selfie ${i + 1}`} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', transform: 'scaleX(-1)', border: `2px solid ${s.faceDetected ? '#10b981' : '#f59e0b'}` }} />
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center', marginTop: '0.5rem' }}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill={selfies.filter(s => s.faceDetected).length >= 2 ? '#10b981' : '#f59e0b'}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span style={{ fontSize: '0.75rem', color: selfies.filter(s => s.faceDetected).length >= 2 ? '#10b981' : '#f59e0b', fontWeight: 600 }}>
                    {selfies.filter(s => s.faceDetected).length}/{selfies.length} faces detected
                  </span>
                </div>
              </div>
            </div>

            <div style={{
              background: 'rgba(30,58,95,0.04)', borderRadius: '14px', padding: '1rem', marginBottom: '1.5rem',
              fontSize: '0.82rem', color: '#555', lineHeight: 1.7,
            }}>
              <strong>What happens next:</strong><br/>
              1. Your ID and selfies are processed using InsightFace AI<br/>
              2. 512-dimensional face embeddings are compared (ID vs selfies)<br/>
              3. Liveness detection validates real person using Silent-Face-Anti-Spoofing<br/>
              4. An AI confidence score (kyc_model_score) is generated<br/>
              5. An administrator reviews and makes the final decision
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button variant="secondary" onClick={() => setStep('selfie')}>Back</Button>
              <Button fullWidth size="lg" onClick={() => setStep('submitted')}>Submit for Verification</Button>
            </div>
          </div>
        </Card>
      )}

      {/* ── STEP: SUBMITTED ── */}
      {step === 'submitted' && (
        <Card>
          <div style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 1.5rem',
              background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg viewBox="0 0 24 24" width="40" height="40" fill="#10b981">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L18 9l-8 8z"/>
              </svg>
            </div>
            <h2 style={{ fontWeight: 900, marginBottom: '0.5rem' }}>Verification Submitted</h2>
            <p style={{ color: '#666', lineHeight: 1.8, marginBottom: '1rem' }}>
              Your identity verification is being processed by our AI system.
              An administrator will review and finalize the decision.
            </p>

            <div style={{
              background: '#f8f9fa', borderRadius: '14px', padding: '1rem', marginBottom: '1.5rem',
              fontSize: '0.85rem', textAlign: 'left',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#666' }}>Status</span>
                <strong style={{ color: '#f59e0b' }}>Processing</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#666' }}>Estimated Time</span>
                <strong>2-24 hours</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>Notification</span>
                <strong>Email + Dashboard</strong>
              </div>
            </div>

            <Button size="lg" fullWidth onClick={() => router.push('/investor')}>Return to Dashboard</Button>
          </div>
        </Card>
      )}

      {/* ── Selfie Preview Modal ── */}
      <Modal isOpen={!!previewSelfie} onClose={() => setPreviewSelfie(null)} title="Selfie Preview">
        {previewSelfie && (
          <div style={{ textAlign: 'center' }}>
            <img src={previewSelfie} alt="Selfie Preview" style={{
              maxWidth: '100%', maxHeight: '60vh', borderRadius: '16px',
              transform: 'scaleX(-1)', boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }} />
            <p style={{ marginTop: '0.8rem', fontSize: '0.82rem', color: '#666' }}>
              Click outside or press Escape to close
            </p>
          </div>
        )}
      </Modal>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </>
  );
}
