import { ArrowLeft } from 'lucide-react';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { MealResult } from '../api/client';

interface ResultsScreenProps {
  result: MealResult;
  onBack: () => void;
}

export function ResultsScreen({ result, onBack }: ResultsScreenProps) {
  const { meal, ingredients, totals } = result;

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-gray-600"><ArrowLeft /></button>
        <h2 className="font-semibold">Analysis Result</h2>
      </div>

      {/* Summary */}
      <Card className="p-5 border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{meal.title}</h3>
            <p className="text-sm text-gray-600">{new Date(meal.created_at).toLocaleString()}</p>
          </div>
          <Badge className="bg-emerald-600">{Math.round(totals.kcal)} kcal</Badge>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-xs text-gray-500">Protein</div>
            <div className="font-semibold">{totals.protein_g.toFixed(1)} g</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Fat</div>
            <div className="font-semibold">{totals.fat_g.toFixed(1)} g</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Carbs</div>
            <div className="font-semibold">{totals.carb_g.toFixed(1)} g</div>
          </div>
        </div>
      </Card>

      {/* Ingredients */}
      <Card className="p-5 border-0 shadow">
        <h3 className="font-semibold mb-3">Detected Items</h3>
        <div>
          {ingredients.map((ing, idx) => (
            <div key={ing.id}>
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="font-medium capitalize">{ing.name.replace('_', ' ')}</div>
                  <div className="text-xs text-gray-500">
                    confidence {(ing.confidence*100).toFixed(0)}% · {ing.grams.toFixed(0)} g
                  </div>
                </div>
                <Badge>{Math.round(ing.kcal)} kcal</Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 mb-2">
                <div>Protein: {ing.protein_g.toFixed(1)} g</div>
                <div>Fat: {ing.fat_g.toFixed(1)} g</div>
                <div>Carbs: {ing.carb_g.toFixed(1)} g</div>
              </div>
              {idx < ingredients.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
