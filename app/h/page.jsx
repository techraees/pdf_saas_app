'use client'

// pages/index.js
import { useState } from 'react';
import PDFViewer from './PDFViewer';

export default function Home() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  console.log(file)

  return (
    <div>
      <h1>PDF Viewer App</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {file && <PDFViewer file={URL.createObjectURL(file)} />}
    </div>
  );
}
