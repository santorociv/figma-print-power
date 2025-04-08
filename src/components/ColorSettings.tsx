
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { usePrintSettings } from "@/context/PrintSettingsContext";
import { Input } from "@/components/ui/input";

const ColorSettings = () => {
  const { settings, updateSettings } = usePrintSettings();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Color Settings</h3>
        
        <div className="space-y-6">
          {/* ICC Profile Selection */}
          <div className="space-y-2">
            <Label htmlFor="colorProfile">Color Profile</Label>
            <Select
              value={settings.colorProfile}
              onValueChange={(value) => updateSettings({ colorProfile: value as any })}
            >
              <SelectTrigger id="colorProfile">
                <SelectValue placeholder="Select color profile" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sRGB">sRGB IEC61966-2.1 (Digital/Web)</SelectItem>
                <SelectItem value="AdobeRGB">Adobe RGB (1998)</SelectItem>
                <SelectItem value="CMYK">U.S. Web Coated (SWOP) v2 (CMYK)</SelectItem>
                <SelectItem value="ProPhoto">ProPhoto RGB (Wide Gamut)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1">
              {settings.colorProfile === 'CMYK' 
                ? 'Best for commercial printing on offset presses'
                : settings.colorProfile === 'sRGB'
                ? 'Standard for digital displays and consumer printing'
                : settings.colorProfile === 'AdobeRGB'
                ? 'Wider gamut for photography and professional printing'
                : 'Very wide gamut for photography (may cause clipping on some devices)'}
            </p>
          </div>

          {/* DPI/Resolution Setting */}
          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between">
              <Label htmlFor="dpi">Resolution (DPI)</Label>
              <span className="text-sm text-gray-500">{settings.dpi} DPI</span>
            </div>
            <div className="flex items-center gap-2">
              <Slider
                id="dpi"
                min={72}
                max={600}
                step={1}
                value={[settings.dpi]}
                onValueChange={(value) => updateSettings({ dpi: value[0] })}
                className="flex-1"
              />
              <Input
                type="number"
                value={settings.dpi}
                onChange={(e) => updateSettings({ dpi: Number(e.target.value) })}
                className="w-16"
                min={72}
                max={600}
                step={1}
              />
            </div>
            <div className="grid grid-cols-4 text-xs text-gray-500 mt-1">
              <span>72dpi</span>
              <span className="text-center">150dpi</span>
              <span className="text-center">300dpi</span>
              <span className="text-right">600dpi</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {settings.dpi < 150
                ? 'Low resolution suitable for screen viewing only'
                : settings.dpi < 300
                ? 'Medium resolution suitable for draft printing'
                : settings.dpi <= 450
                ? 'High quality suitable for commercial printing'
                : 'Very high resolution for detailed commercial printing'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <h4 className="text-sm font-medium text-gray-700 mb-1">Color Management Tips</h4>
        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
          <li>Use CMYK for commercial offset printing</li>
          <li>300 DPI is standard for high-quality print</li>
          <li>Check with your printer for specific ICC profile recommendations</li>
        </ul>
      </div>
    </div>
  );
};

export default ColorSettings;
