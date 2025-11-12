import { Plus, Camera, Flame, TrendingUp, Apple } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

interface DashboardProps {
  onLogMeal: () => void;
  totalCalories: number;
  goalCalories: number;
}

export function Dashboard({ onLogMeal, totalCalories, goalCalories }: DashboardProps) {
  const progress = (totalCalories / goalCalories) * 100;
  const remaining = goalCalories - totalCalories;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col gap-6 p-6 pb-24 bg-gradient-to-b from-emerald-50 via-white to-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-center pt-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <h1 className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">CalorieLens</h1>
        </div>
      </div>

      {/* Daily Summary Card with Circular Progress */}
      <Card className="p-6 shadow-xl border-0 bg-gradient-to-br from-white to-emerald-50/30">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground mb-1">Today's Nutrient Breakdown</p>
              <p className="text-sm text-emerald-600">Keep it up! 🎯</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
        <Card className="p-4 text-center border-0 shadow-md bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-shadow">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <span className="text-lg">💪</span>
          </div>
          <p className="text-muted-foreground text-sm mb-1">Protein</p>
          <p className="text-blue-600">45g</p>
        </Card>
        <Card className="p-4 text-center border-0 shadow-md bg-gradient-to-br from-amber-50 to-white hover:shadow-lg transition-shadow">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <span className="text-lg">🌾</span>
          </div>
          <p className="text-muted-foreground text-sm mb-1">Carbs</p>
          <p className="text-amber-600">120g</p>
        </Card>
        <Card className="p-4 text-center border-0 shadow-md bg-gradient-to-br from-orange-50 to-white hover:shadow-lg transition-shadow">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <span className="text-lg">🥑</span>
          </div>
          <p className="text-muted-foreground text-sm mb-1">Fat</p>
          <p className="text-orange-600">35g</p>
        </Card>
      </div>

        </div>
      </Card>
      

      {/* Log Meal Button */}
      <Button 
        onClick={onLogMeal}
        size="lg"
        className="w-full h-14 gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all"
      >
        <Plus className="w-5 h-5" />
        Log New Meal
      </Button>

      {/* Today's Meals Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3>Today's Meals</h3>
          <TrendingUp className="w-5 h-5 text-emerald-500" />
        </div>
        <div className="space-y-3">
          <Card className="p-4 flex items-center gap-4 border-0 shadow-md hover:shadow-lg transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 rounded-xl shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-2xl">🍳</span>
            </div>
            <div className="flex-1">
              <p className="mb-1">Breakfast Bowl</p>
              <p className="text-sm text-muted-foreground">450 kcal</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">8:30 AM</p>
            </div>
          </Card>
          
          <Card className="p-4 flex items-center gap-4 border-0 shadow-md hover:shadow-lg transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400 rounded-xl shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-2xl">🥗</span>
            </div>
            <div className="flex-1">
              <p className="mb-1">Garden Salad</p>
              <p className="text-sm text-muted-foreground">800 kcal</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">12:45 PM</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
