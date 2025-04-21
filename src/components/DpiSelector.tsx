
import { usePrintSettings } from "@/context/PrintSettingsContext";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const DpiSelector = () => {
  const { settings, updateSettings } = usePrintSettings();

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <Label htmlFor="dpi">DPI</Label>
        <span
          id="dpi"
          className="text-base font-semibold text-gray-800"
          style={{
            fontSize: `clamp(1rem, 2vw, 1.2rem)`
          }}
        >
          {settings.dpi}
        </span>
      </div>
      <Slider
        min={72}
        max={600}
        step={1}
        value={[settings.dpi]}
        onValueChange={([dpi]) => updateSettings({ dpi })}
        className="w-full"
        aria-label="DPI"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Low</span>
        <span>Standard</span>
        <span>High</span>
      </div>
    </div>
  );
};

export default DpiSelector;
