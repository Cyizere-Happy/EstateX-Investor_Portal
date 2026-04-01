'use client';

import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';

interface FileUploadProps {
  label?: string;
  accept?: string;
  maxSizeMB?: number;
  onFileSelect: (file: File) => void;
  error?: string;
  hint?: string;
  preview?: boolean;
}

export default function FileUpload({
  label, accept = 'image/*', maxSizeMB = 5, onFileSelect,
  error, hint, preview = true,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      setSizeError(`File too large. Maximum ${maxSizeMB}MB allowed.`);
      return;
    }
    setSizeError('');
    setSelectedFile(file);
    onFileSelect(file);

    if (preview && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  return (
    <div className="ex-upload">
      {label && <label className="ex-upload__label">{label}</label>}
      <div
        className={`ex-upload__zone ${dragActive ? 'ex-upload__zone--active' : ''} ${error || sizeError ? 'ex-upload__zone--error' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="ex-upload__input"
        />

        {previewUrl ? (
          <div className="ex-upload__preview">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt="Preview" className="ex-upload__preview-img" />
            <span className="ex-upload__file-name">{selectedFile?.name}</span>
          </div>
        ) : (
          <div className="ex-upload__placeholder">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17,8 12,3 7,8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="ex-upload__text">
              <strong>Click to upload</strong> or drag and drop
            </p>
            <p className="ex-upload__hint">{accept.replace(/\*/g, 'files')} up to {maxSizeMB}MB</p>
          </div>
        )}
      </div>
      {(error || sizeError) && <span className="ex-upload__error">{error || sizeError}</span>}
      {hint && !error && !sizeError && <span className="ex-upload__hint-text">{hint}</span>}
    </div>
  );
}
