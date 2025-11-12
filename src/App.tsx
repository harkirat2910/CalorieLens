import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { CaptureMeal } from './components/CaptureMeal';
import { ProcessingScreen } from './components/ProcessingScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { History } from './components/History';
import { BottomNav } from './components/BottomNav';
import { recognizeMeal, MealResult } from './api/client';

type Screen = 'home' | 'capture' | 'processing' | 'results' | 'history' | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [mealResult, setMealResult] = useState<MealResult | null>(null);

  const handleStartCapture = () => setCurrentScreen('capture');

  const handleCapture = async (file: File, previewUrl: string) => {
    setCapturedImage(previewUrl);
    setCurrentScreen('processing');
    try {
      const res = await recognizeMeal(file, "Meal");
      setMealResult(res);
      setCurrentScreen('results');
    } catch (e) {
      console.error(e);
      alert("Failed to analyze the image. Is the backend running?");
      setCurrentScreen('home');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {currentScreen === 'home' && (
        <Dashboard onLogMeal={handleStartCapture} onNavigate={setCurrentScreen} />
      )}

      {currentScreen === 'capture' && (
        <CaptureMeal onCapture={handleCapture} onBack={() => setCurrentScreen('home')} />
      )}

      {currentScreen === 'processing' && (
        <ProcessingScreen />
      )}

      {currentScreen === 'results' && mealResult && (
        <ResultsScreen result={mealResult} onBack={() => setCurrentScreen('home')} />
      )}

      {currentScreen === 'history' && (
        <History onBack={() => setCurrentScreen('home')} />
      )}

       {currentScreen === 'profile' && (
          <div className="flex flex-col h-full pb-20 bg-gradient-to-b from-emerald-50 to-white">
            <div className="p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 via-teal-400 to-green-500 rounded-full mb-4 mx-auto flex items-center justify-center shadow-lg">
                <span className="text-4xl">👤</span>
              </div>
              <h2 className="mb-1">Harkirat Singh Nagpal</h2>
              <p className="text-muted-foreground">
                Manage your health goals
              </p>
            </div>
            
            <div className="px-6 space-y-3 flex-1">
              <div className="p-5 bg-white border border-border rounded-xl text-left shadow-sm hover:shadow-md transition-shadow">
                <p className="text-sm text-muted-foreground mb-1">Daily Calorie Goal</p>
                <p className="text-xl text-emerald-600">2,000 kcal</p>
              </div>
              <div className="p-5 bg-white border border-border rounded-xl text-left shadow-sm hover:shadow-md transition-shadow">
                <p className="text-sm text-muted-foreground mb-1">Activity Level</p>
                <p className="text-xl">Moderate</p>
              </div>
            </div>
          </div>
        )}

      <BottomNav currentScreen={currentScreen} onNavigate={(s:any) => setCurrentScreen(s)} />
    </div>
  );
}
