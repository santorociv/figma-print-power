
import { usePrintSettings } from "@/context/PrintSettingsContext";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

// Only allow strict selection of these DPIs
const dpiValues = [72, 150, 300, 600];

const DpiSelector = () => {
  const { settings, updateSettings } = usePrintSettings();
  const [selectedIdx, setSelectedIdx] = useState(
    dpiValues.indexOf(settings.dpi) !== -1 ? dpiValues.indexOf(settings.dpi) : 2 // default to index for 300
  );

  // Handle DPI change via slider or option click
  const handleDpiIdxChange = (value: number[]) => {
    setSelectedIdx(value[0]);
    updateSettings({ dpi: dpiValues[value[0]] });
  };

  useEffect(() => {
    const idx = dpiValues.indexOf(settings.dpi);
    if (idx !== -1 && idx !== selectedIdx) setSelectedIdx(idx);
  }, [settings.dpi]); // stay in sync if external change

  return (
    <div className="flex flex-col gap-1 select-none">
      <div className="flex items-center justify-between mb-1">
        <Label htmlFor="dpi-slider" className="text-base md:text-base">DPI</Label>
        <span
          id="dpi-slider"
          className="text-base md:text-lg font-semibold text-gray-800"
          style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)" }}
        >
          {dpiValues[selectedIdx]}
        </span>
      </div>

      {/* Slider with fixed steps only */}
      <Slider
        min={0}
        max={dpiValues.length - 1}
        step={1}
        value={[selectedIdx]}
        onValueChange={handleDpiIdxChange}
        className="w-full"
        aria-label="DPI"
      />

      <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
        {dpiValues.map((dpi, idx) => (
          <span 
            key={dpi}
            className={`cursor-pointer relative transition-colors ${selectedIdx === idx ? "text-primary font-semibold" : ""}`}
            onClick={() => handleDpiIdxChange([idx])}
          >
            {dpi}
            {selectedIdx === idx && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DpiSelector;
