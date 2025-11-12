import { Calendar, TrendingUp, ArrowLeft } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useState, useMemo } from 'react';

interface MealItem {
  id: string;
  name: string;
  calories: number;
  time: string;
  date: string;       // e.g., "2025-11-09"
  thumbnail: string;  // tailwind bg class
  ingredients: string[];
}

interface HistoryProps {
  meals?: MealItem[];         // <-- make optional
  onBack?: () => void;        // optional back handler (if you need it)
}

export function History({ meals = [], onBack }: HistoryProps) {
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  // Safe derived data (meals may be empty)
  const selectedMealData = useMemo(
    () => meals.find(m => m.id === selectedMeal) || null,
    [meals, selectedMeal]
  );

  const groupedMeals = useMemo(() => {
    const acc: Record<string, MealItem[]> = {};
    for (const meal of meals) {
      if (!acc[meal.date]) acc[meal.date] = [];
      acc[meal.date].push(meal);
    }
    return acc;
  }, [meals]);

  const dailyTotals = useMemo(
    () =>
      Object.entries(groupedMeals).map(([date, dateMeals]) => ({
        date,
        total: dateMeals.reduce((sum, meal) => sum + (meal.calories || 0), 0),
      })),
    [groupedMeals]
  );

  const mealEmojis: Record<string, string> = {
    'Breakfast Bowl': '🍳',
    'Garden Salad': '🥗',
    'Grilled Chicken': '🍗',
    'Protein Smoothie': '🥤',
    'Pasta Carbonara': '🍝',
  };

  if (selectedMealData) {
    return (
      <div className="flex flex-col h-full pb-20 bg-gradient-to-b from-emerald-50 to-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
          <button
            onClick={() => setSelectedMeal(null)}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2>Meal Details</h2>
          <div className="w-9" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video">
            <div className={`${selectedMealData.thumbnail} w-full h-full flex items-center justify-center text-6xl`}>
              {mealEmojis[selectedMealData.name] || '🍽️'}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          <Card className="p-5 border-0 shadow-lg bg-gradient-to-br from-white to-emerald-50/30">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="mb-1">{selectedMealData.name}</h3>
                <p className="text-muted-foreground text-sm">{selectedMealData.time}</p>
              </div>
              <div className="text-right">
                <div className="inline-flex items-baseline gap-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-xl shadow-md">
                  <span className="text-2xl">{selectedMealData.calories ?? 0}</span>
                  <span className="text-xs">kcal</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5 border-0 shadow-lg">
            <h3 className="mb-3">Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {(selectedMealData.ingredients ?? []).map((ingredient, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0 px-3 py-1"
                >
                  {ingredient}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-5 border-0 shadow-lg">
            <h3 className="mb-4">Nutrition Breakdown</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm">
                <div className="text-2xl mb-2">💪</div>
                <p className="text-xl mb-1 text-blue-600">45g</p>
                <p className="text-sm text-blue-700">Protein</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl shadow-sm">
                <div className="text-2xl mb-2">🌾</div>
                <p className="text-xl mb-1 text-amber-600">120g</p>
                <p className="text-sm text-amber-700">Carbs</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Empty state if no meals
  const hasMeals = meals.length > 0;

  return (
    <div className="flex flex-col h-full pb-20 bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
        <h2 className="mb-2 text-white">History</h2>
        <div className="flex items-center gap-2 text-emerald-50">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Last 7 days</span>
        </div>
      </div>

      {/* Weekly Summary */}
      <Card className="m-4 p-5 border-0 shadow-xl bg-gradient-to-br from-white to-emerald-50/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground mb-1 text-sm">Weekly Average</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl text-emerald-600">{hasMeals ? '1,850' : '0'}</p>
              <span className="text-muted-foreground">kcal/day</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 bg-green-100 px-3 py-1.5 rounded-full">
              <TrendingUp className="w-4 h-4 text-green-700" />
              <span className="text-sm text-green-700">{hasMeals ? '-5%' : '—'}</span>
            </div>
            <span className="text-xs text-muted-foreground">vs last week</span>
          </div>
        </div>
      </Card>

      {/* Meals List */}
      <div className="flex-1 overflow-auto">
        {!hasMeals && (
          <div className="p-6 text-center text-muted-foreground">No meals yet. Log your first meal to see history.</div>
        )}

        {Object.entries(groupedMeals).map(([date, dateMeals]) => {
          const dayTotal = dailyTotals.find(d => d.date === date)?.total || 0;
          return (
            <div key={date} className="mb-4">
              <div className="px-4 py-3 bg-gradient-to-r from-emerald-100/50 to-teal-100/50 border-y border-emerald-200/50">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-emerald-800">{date}</p>
                  <p className="text-sm text-emerald-600">{dayTotal} kcal total</p>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {dateMeals.map((meal) => (
                  <Card
                    key={meal.id}
                    className="p-4 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-all border-0 shadow-md group bg-white"
                    onClick={() => setSelectedMeal(meal.id)}
                  >
                    <div className={`w-16 h-16 rounded-xl ${meal.thumbnail} flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform`}>
                      {mealEmojis[meal.name] || '🍽️'}
                    </div>
                    <div className="flex-1">
                      <p className="mb-1">{meal.name}</p>
                      <p className="text-sm text-muted-foreground">{meal.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-600">{meal.calories ?? 0}</p>
                      <p className="text-xs text-muted-foreground">kcal</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
