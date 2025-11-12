import { Camera, Upload, X, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useRef } from 'react';

interface CaptureMealProps {
  onCapture: (file: File, previewUrl: string) => void;
  onBack: () => void;
}

export function CaptureMeal({ onCapture, onBack }: CaptureMealProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // shared handler for upload or camera
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result as string;
        setPreviewUrl(imageData);
        onCapture(file, imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-gray-500">
          <X />
        </button>
        <h2 className="font-semibold">Capture Meal</h2>
        <div className="w-6" />
      </div>

      {/* Preview box */}
      <div className="bg-white rounded-xl shadow p-4 text-center border">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="preview"
            className="mx-auto max-h-72 rounded-lg object-contain"
          />
        ) : (
          <div className="text-gray-500">Take a picture or upload from gallery</div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        {/* Camera button */}
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => cameraInputRef.current?.click()}
        >
          <Camera className="mr-2 h-4 w-4" /> Take Photo
        </Button>

        {/* Upload button */}
        <Button className="flex-1" onClick={() => fileInputRef.current?.click()}>
          <Upload className="mr-2 h-4 w-4" /> Upload Photo
        </Button>
      </div>

      {/* Hidden inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"  // activates back camera on mobile
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Info footer */}
      <div className="text-xs text-gray-500 flex items-center gap-2">
        <Sparkles className="h-4 w-4" />
        The photo is processed on your device and analyzed by our backend.
      </div>
    </div>
  );
}
