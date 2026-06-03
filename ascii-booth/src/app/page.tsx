'use client';
import { useState, useRef, useEffect } from 'react';
import AsciiCamera, { AsciiCameraRef } from '@/components/AsciiCamera';
import { Camera, Upload, Download, Share2, Printer, RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';

type ScreenState = 'capture' | 'printing' | 'pickup';
type FrameData = { type: 'ascii' | 'bw'; data: string };

export default function Home() {
  const [screen, setScreen] = useState<ScreenState>('capture');
  const [mode, setMode] = useState<'ascii' | 'bw'>('ascii');
  const [countdown, setCountdown] = useState<number | null>(null);
  const [frames, setFrames] = useState<FrameData[]>([]);
  const [flash, setFlash] = useState(false);
  const cameraRef = useRef<AsciiCameraRef>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [printSeconds, setPrintSeconds] = useState(3);

  const startCaptureSequence = async () => {
    setFrames([]);
    
    const newFrames: FrameData[] = [];
    
    for (let i = 0; i < 4; i++) {
      // Countdown 3..2..1
      for (let c = 3; c > 0; c--) {
        setCountdown(c);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      setCountdown(null);
      setFlash(true);
      
      // Capture frame
      const frame = cameraRef.current?.captureFrame();
      if (frame) {
        newFrames.push(frame);
        setFrames([...newFrames]);
      }
      
      // Flash duration
      await new Promise(resolve => setTimeout(resolve, 150)); 
      setFlash(false);
      
      if (i < 3) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Pause before next shot
      }
    }
    
    // Go to printing screen
    setScreen('printing');
    setPrintSeconds(3);
    
    for (let c = 3; c >= 0; c--) {
      setPrintSeconds(c);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Go to pickup screen
    setScreen('pickup');
  };

  const handleDownload = async () => {
    if (!stripRef.current) return;
    try {
      const canvas = await html2canvas(stripRef.current, { backgroundColor: '#ffffff', scale: 2 });
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `ascii-booth-${new Date().getTime()}.png`;
      link.click();
    } catch (err) {
      console.error('Error downloading strip:', err);
    }
  };

  const handleRestart = () => {
    setFrames([]);
    setScreen('capture');
  };

  return (
    <main className="min-h-screen bg-[#fcfbfa] flex flex-col items-center py-12 p-4 font-sans text-black selection:bg-black selection:text-white">
      
      {/* Top empty box */}
      <div className="w-48 h-10 border-4 border-black mb-12 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)]"></div>

      {screen === 'capture' && (
        <div className="relative flex flex-col items-center w-full max-w-md animate-in fade-in duration-500">
          
          {/* Eye level indicator */}
          <div className="absolute top-32 -left-20 flex flex-col items-end">
            <span className="font-bold text-sm mb-1 font-mono tracking-tighter">eye</span>
            <span className="font-bold text-sm mb-1 font-mono tracking-tighter">level</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>

          {/* Pricing indicator */}
          <div className="absolute top-1/2 -right-16 translate-x-full -translate-y-1/2 flex items-center justify-center w-20 h-20 border-4 border-black rounded-full bg-white rotate-6">
            <div className="flex flex-col items-center justify-center font-bold">
              <span>$0</span>
              <div className="h-0.5 w-8 bg-black my-0.5"></div>
              <span className="text-sm">4 pics</span>
            </div>
          </div>
          
          {/* Camera Container */}
          <div className="w-full relative z-10 p-4 border-4 border-black bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] mb-8">
            <AsciiCamera ref={cameraRef} mode={mode} />
            
            {/* Flash Overlay */}
            {flash && <div className="absolute inset-0 bg-white z-50"></div>}
            
            {/* Countdown Overlay */}
            {countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center z-40">
                <span className="text-white text-8xl font-black drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">{countdown}</span>
              </div>
            )}

            {/* Buttons Overlay */}
            {countdown === null && !flash && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20 p-8 opacity-0 hover:opacity-100 transition-opacity bg-white/30 backdrop-blur-sm">
                <button 
                  onClick={startCaptureSequence}
                  className="w-48 bg-white border-2 border-black px-4 py-3 flex items-center justify-center gap-2 hover:bg-gray-100 font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
                >
                  take photo <Camera size={18} />
                </button>
                <button className="w-48 bg-white border-2 border-black px-4 py-3 flex items-center justify-center gap-2 hover:bg-gray-100 font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all cursor-not-allowed opacity-50">
                  upload photo <Upload size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center gap-4 font-bold text-sm uppercase tracking-wider mb-12">
            <span className={mode === 'ascii' ? 'opacity-100' : 'opacity-30 transition-opacity'}>ASCII</span>
            
            <button 
              onClick={() => setMode(mode === 'ascii' ? 'bw' : 'ascii')}
              className="w-16 h-8 border-[3px] border-black rounded-full relative flex items-center p-1 bg-white cursor-pointer"
              aria-label="Toggle filter mode"
            >
              <div 
                className={`w-5 h-5 bg-black rounded-full transition-transform duration-300 ease-in-out ${mode === 'bw' ? 'translate-x-8' : 'translate-x-0'}`} 
              />
            </button>
            
            <span className={mode === 'bw' ? 'opacity-100' : 'opacity-30 transition-opacity'}>B&W</span>
          </div>

          {/* Instructions Bottom Row */}
          <div className="w-full flex gap-4 max-w-lg items-end">
            <div className="flex-1 border-4 border-black bg-white rounded-3xl p-4 flex font-medium text-sm leading-snug shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <div className="flex-1 px-2 border-r-2 border-black/20">
                <span className="text-xl font-bold mr-1">1</span> 
                Choose ASCII or b&w filters with the toggle switch
              </div>
              <div className="flex-1 px-3 border-r-2 border-black/20">
                <span className="text-xl font-bold mr-1">2</span> 
                Choose a frame using the arrows on the sides and click the take photo button
              </div>
              <div className="flex-1 pl-3">
                <span className="text-xl font-bold mr-1">3</span> 
                Wait 3 seconds for the countdown and get your photo strip printed
              </div>
            </div>

            <div className="w-16 border-4 border-black bg-white flex flex-col items-center py-6 gap-6 self-stretch rounded-sm shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <div className="w-4 h-4 bg-red-400 rounded-full border-2 border-black"></div>
              <div className="w-2 h-10 bg-black rounded-full"></div>
              <div className="w-8 h-10 border-4 border-black mt-auto"></div>
            </div>
          </div>
        </div>
      )}

      {screen === 'printing' && (
        <div className="flex flex-col items-center justify-center flex-1 animate-in zoom-in-95 duration-500">
          <div className="w-48 p-4 border-4 border-black text-center font-bold bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] mb-4">
            PHOTOS<br />DELIVERED<br />HERE IN<br />
            <span className="text-2xl my-2 block">{printSeconds} SECONDS</span>
            <div className="flex justify-center mt-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            </div>
          </div>
          
          <div className="w-48 h-96 border-4 border-black bg-white relative overflow-hidden flex justify-center">
            {/* Slot */}
            <div className="absolute top-10 left-4 right-4 h-2 bg-black/10 border-y-2 border-black/20 z-10"></div>
            
            {/* Animating Strip */}
            <div className="w-32 bg-white border-2 border-black flex flex-col p-1 gap-1 absolute transition-all duration-1000 ease-out z-0"
                 style={{ top: printSeconds <= 1 ? '48px' : '-200%' }}>
              {frames.map((frame, idx) => (
                <div key={idx} className="w-full aspect-[3/4] bg-gray-200 border border-black overflow-hidden flex items-center justify-center">
                  {frame.type === 'ascii' ? (
                     <pre className="text-[4px] leading-[4px] font-mono font-bold">{frame.data.split('\n').slice(0, 15).join('\n')}...</pre>
                  ) : (
                     <img src={frame.data} className="w-full h-full object-cover grayscale" alt="" />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <button className="mt-8 px-12 py-3 border-4 border-black bg-white font-bold hover:bg-gray-100 shadow-[2px_2px_0_0_rgba(0,0,0,1)] flex items-center gap-2">
            Pick up &rarr;
          </button>
        </div>
      )}

      {screen === 'pickup' && (
        <div className="flex flex-col items-center flex-1 w-full max-w-4xl relative animate-in slide-in-from-bottom-8 duration-500">
          
          {/* Decorations */}
          <div className="absolute top-20 right-32 flex flex-col items-center -rotate-12">
            <span className="font-bold text-2xl font-mono">your</span>
            <span className="font-bold text-2xl font-mono">photostrip!</span>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-rotate-45 mt-2">
              <path d="M10 9l-6 6 6 6" />
              <path d="M20 4v7a4 4 0 0 1-4 4H4" />
            </svg>
          </div>

          <div className="absolute bottom-32 left-32 flex flex-col items-center">
            <span className="font-bold text-lg font-mono rotate-12">tag me :)</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-[120deg] mb-4">
              <path d="M10 9l-6 6 6 6" />
              <path d="M20 4v7a4 4 0 0 1-4 4H4" />
            </svg>
            <div className="flex gap-2 text-black">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
            </div>
          </div>

          <div className="absolute bottom-32 right-32">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-rotate-45">
              <circle cx="6" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
              <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
              <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
            </svg>
          </div>

          {/* Actual Photo Strip */}
          <div 
            ref={stripRef}
            className="w-48 bg-white border-4 border-black flex flex-col p-2 gap-2 shadow-xl mb-12"
          >
            {frames.map((frame, idx) => (
              <div key={idx} className="w-full aspect-[3/4] bg-white border-2 border-black overflow-hidden flex items-center justify-center">
                {frame.type === 'ascii' ? (
                  <pre 
                    className="w-full h-full bg-white text-black font-mono whitespace-pre flex items-center justify-center overflow-hidden p-1 m-0 font-bold"
                    style={{ 
                      fontSize: 'min(0.6vw, 4px)',
                      lineHeight: 'min(0.6vw, 4px)',
                      letterSpacing: '0px'
                    }}
                  >
                    {frame.data}
                  </pre>
                ) : (
                  <img src={frame.data} className="w-full h-full object-cover grayscale" alt={`Frame ${idx+1}`} />
                )}
              </div>
            ))}
            <div className="py-2 text-center border-t-2 border-black mt-2">
              <p className="font-bold text-xs uppercase tracking-widest font-mono">ascii booth</p>
              <p className="font-medium text-[10px] font-mono">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex gap-4">
            <button onClick={handleDownload} className="px-6 py-2 border-2 border-black bg-white hover:bg-gray-100 font-bold flex items-center gap-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all text-sm">
              <Download size={16} /> download
            </button>
            <button className="px-6 py-2 border-2 border-black bg-white hover:bg-gray-100 font-bold flex items-center gap-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all text-sm">
              <Share2 size={16} /> share
            </button>
            <button className="px-6 py-2 border-2 border-black bg-white hover:bg-gray-100 font-bold flex items-center gap-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all text-sm">
              <Printer size={16} /> print
            </button>
            <button onClick={handleRestart} className="px-6 py-2 border-2 border-black bg-white hover:bg-gray-100 font-bold flex items-center gap-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all text-sm">
              <RotateCcw size={16} /> restart
            </button>
          </div>
        </div>
      )}

    </main>
  );
}
