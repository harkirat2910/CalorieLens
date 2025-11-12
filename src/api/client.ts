import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export const API = axios.create({
  baseURL,
  headers: { "Accept": "application/json" },
});

export const recognizeMeal = async (file: File, title: string = "Untitled Meal") => {
  const form = new FormData();
  form.append("file", file);
  form.append("title", title);
  const { data } = await API.post("/api/recognize", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data as MealResult;
};

export interface IngredientOut {
  id: string;
  meal_id: string;
  name: string;
  confidence: number;
  grams: number;
  kcal: number;
  protein_g: number;
  fat_g: number;
  carb_g: number;
}

export interface MealOut {
  id: string;
  title: string;
  created_at: string;
  status: string;
  image_path?: string;
}

export interface MealResult {
  meal: MealOut;
  ingredients: IngredientOut[];
  totals: { kcal: number; protein_g: number; fat_g: number; carb_g: number };
}
