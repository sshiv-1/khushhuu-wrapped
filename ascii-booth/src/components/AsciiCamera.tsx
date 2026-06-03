'use client';
import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { Camera, Upload } from 'lucide-react';

const ASCII_CHARS = ['@', '#', 'S', '%', '?', '*', '+', ';', ':', ',', '.', ' '];

interface AsciiCameraProps {
  mode: 'ascii' | 'bw';
}

export interface AsciiCameraRef {
  captureFrame: () => { type: 'ascii' | 'bw'; data: string } | null;
}

const AsciiCamera = forwardRef<AsciiCameraRef, AsciiCameraProps>(({ mode }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [asciiText, setAsciiText] = useState<string>('');
  const [streamActive, setStreamActive] = useState(false);
  const displayVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setStreamActive(true);
        }
      } catch (err) {
        console.error('Error accessing webcam:', err);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Effect to attach stream to display video when in B&W mode
  useEffect(() => {
    if (mode === 'bw' && displayVideoRef.current && videoRef.current?.srcObject) {
      displayVideoRef.current.srcObject = videoRef.current.srcObject;
      displayVideoRef.current.play();
    }
  }, [mode, streamActive]);

  useEffect(() => {
    let animationFrameId: number;
    let lastDrawTime = 0;
    const FPS = 15;
    const interval = 1000 / FPS;

    const processFrame = (time: number) => {
      animationFrameId = requestAnimationFrame(processFrame);

      if (time - lastDrawTime < interval) return;
      lastDrawTime = time;

      if (!videoRef.current || !canvasRef.current || !streamActive || mode !== 'ascii') return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      // Ensure video has loaded dimensions
      if (video.videoWidth === 0 || video.videoHeight === 0) return;

      // Fixed width in characters for ASCII representation
      const width = 140; // Increased density from 80
      // The aspect ratio of the video feed
      const aspectRatio = video.videoHeight / video.videoWidth;
      // Monospace characters are taller than they are wide. 
      // Multiplying by ~0.45 compensates for this so the image doesn't stretch vertically.
      const height = Math.floor(width * aspectRatio * 0.45); 
      
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(video, 0, 0, width, height);
      
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      let asciiStr = '';

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const offset = (y * width + x) * 4;
          const r = data[offset];
          const g = data[offset + 1];
          const b = data[offset + 2];
          
          // Calculate brightness
          const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
          
          // Map brightness (0-255) to ASCII character index
          // Darker (0) -> '@' (index 0), Lighter (255) -> ' ' (index 11)
          const charIndex = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1));
          asciiStr += ASCII_CHARS[charIndex];
        }
        asciiStr += '\n';
      }
      setAsciiText(asciiStr);
    };

    if (streamActive && mode === 'ascii') {
      animationFrameId = requestAnimationFrame(processFrame);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [mode, streamActive]);

  useImperativeHandle(ref, () => ({
    captureFrame: () => {
      if (mode === 'ascii') {
        return { type: 'ascii', data: asciiText };
      } else {
        if (!canvasRef.current || !videoRef.current) return null;
        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.filter = 'grayscale(100%)';
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          return { type: 'bw', data: canvas.toDataURL('image/jpeg', 0.8) };
        }
        return null;
      }
    }
  }));

  return (
    <div className="relative w-full aspect-[3/4] max-w-sm mx-auto border-4 border-black bg-white flex flex-col items-center justify-center overflow-hidden rounded-md shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
      {/* Hidden video element to capture feed for processing */}
      <video ref={videoRef} className="hidden" playsInline muted />
      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Render Output based on mode */}
      {mode === 'ascii' ? (
        <pre 
          className="absolute inset-0 bg-white text-black font-mono whitespace-pre flex items-center justify-center overflow-hidden p-2 m-0 font-bold"
          style={{ 
            fontSize: 'min(0.7vw, 8px)',
            lineHeight: 'min(0.7vw, 8px)',
            letterSpacing: '0px'
          }}
        >
          {asciiText}
        </pre>
      ) : (
        <video 
          ref={displayVideoRef}
          className="absolute inset-0 w-full h-full object-cover grayscale" 
          playsInline 
          muted 
        />
      )}

    </div>
  );
});

export default AsciiCamera;
