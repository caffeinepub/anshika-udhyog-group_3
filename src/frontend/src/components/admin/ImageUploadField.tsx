import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus, Link, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

interface ImageUploadFieldProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  "data-ocid"?: string;
}

export function ImageUploadField({
  value,
  onChange,
  label,
  placeholder = "https://...",
  "data-ocid": dataOcid,
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {/* Preview */}
      {value && (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-lg border border-green-200 shadow-sm"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
            aria-label="Remove image"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Upload / URL buttons */}
      <div className="flex flex-wrap gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          data-ocid={dataOcid}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="border-green-300 text-green-700 hover:bg-green-50"
        >
          <ImagePlus className="w-4 h-4 mr-1" />
          Upload Image
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-gray-500"
        >
          <Link className="w-4 h-4 mr-1" />
          URL
        </Button>
      </div>

      {/* URL fallback */}
      {showUrlInput && (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="mt-1"
        />
      )}
    </div>
  );
}
