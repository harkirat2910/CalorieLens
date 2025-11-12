import { Loader2, Sparkles, Zap, Brain } from 'lucide-react';
import { Progress } from './ui/progress';
import { useEffect, useState } from 'react';

interface ProcessingScreenProps {
  onComplete: () => void;
}

export function ProcessingScreen({ onComplete }: ProcessingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Analyzing your meal...');

  useEffect(() => {
    // Simulate AI processing with progress updates
    const messages = [
      'Analyzing your meal...',
      'Detecting ingredients...',
      'Calculating nutrition...',
      'Almost done...',
    ];

    let currentProgress = 0;
    let messageIndex = 0;

    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);

      // Update message at certain milestones
      if (currentProgress === 25 || currentProgress === 50 || currentProgress === 75) {
        messageIndex++;
        setMessage(messages[messageIndex]);
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => onComplete(), 500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Main animated icon */}
        <div className="relative mb-8">
          {/* Outer pulsing ring */}
          <div className="absolute inset-0 scale-150 animate-ping opacity-20">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" />
          </div>
          
          {/* Middle rotating ring */}
          <div className="absolute inset-0 animate-spin-slow">
            <div className="w-20 h-20 rounded-full border-4 border-transparent border-t-emerald-400 border-r-teal-400" />
          </div>
          
          {/* Center icon */}
          <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-2xl">
            <Sparkles className="w-10 h-10 text-white animate-pulse" />
          </div>
        </div>

        {/* Processing icons */}
        <div className="flex items-center gap-6 mb-8">
          <div className="flex flex-col items-center gap-2 animate-bounce" style={{ animationDelay: '0ms' }}>
            <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-xs text-muted-foreground">AI Vision</span>
          </div>
          
          <div className="flex flex-col items-center gap-2 animate-bounce" style={{ animationDelay: '200ms' }}>
            <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-amber-500" />
            </div>
            <span className="text-xs text-muted-foreground">Processing</span>
          </div>
          
          <div className="flex flex-col items-center gap-2 animate-bounce" style={{ animationDelay: '400ms' }}>
            <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-teal-500" />
            </div>
            <span className="text-xs text-muted-foreground">Results</span>
          </div>
        </div>

        {/* Message */}
        <h2 className="mb-2 text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{message}</h2>
        <p className="text-muted-foreground text-center mb-8">
          Our AI is analyzing your meal ✨
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-xs">
          <div className="relative">
            <Progress value={progress} className="h-3 mb-2 shadow-inner" />
            {/* Animated shimmer effect */}
            <div 
              className="absolute top-0 left-0 h-3 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{progress}%</p>
            <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
