
import { usePrintSettings } from "@/context/PrintSettingsContext";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

const dpiValues = [72, 150, 300, 600];

const DpiSelector = () => {
  const { settings, updateSettings } = usePrintSettings();
  const [tempDpi, setTempDpi] = useState(settings.dpi);
  
  // Find the closest DPI value when slider is released
  const handleDpiChange = (value: number[]) => {
    setTempDpi(value[0]);
  };
  
  // When slider is released, snap to closest predefined value
  const handleDpiChangeCommitted = () => {
    const closestDpi = dpiValues.reduce((prev, curr) => {
      return Math.abs(curr - tempDpi) < Math.abs(prev - tempDpi) ? curr : prev;
    });
    updateSettings({ dpi: closestDpi });
  };
  
  // Initialize with closest predefined value
  useEffect(() => {
    if (!dpiValues.includes(settings.dpi)) {
      const closestDpi = dpiValues.reduce((prev, curr) => {
        return Math.abs(curr - settings.dpi) < Math.abs(prev - settings.dpi) ? curr : prev;
      });
      updateSettings({ dpi: closestDpi });
    }
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <Label htmlFor="dpi">DPI</Label>
        <span
          id="dpi"
          className="text-base font-semibold text-gray-800"
        >
          {tempDpi}
        </span>
      </div>
      <Slider
        min={72}
        max={600}
        step={1}
        value={[tempDpi]}
        onValueChange={handleDpiChange}
        onValueCommit={handleDpiChangeCommitted}
        className="w-full"
        aria-label="DPI"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        {dpiValues.map((dpi) => (
          <span 
            key={dpi} 
            className={`${settings.dpi === dpi ? 'text-primary font-medium' : ''}`}
            style={{ position: 'relative', cursor: 'pointer' }}
            onClick={() => updateSettings({ dpi })}
          >
            {dpi}
            {settings.dpi === dpi && (
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DpiSelector;
