import { usePrintSettings } from "@/context/PrintSettingsContext";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import DpiSelector from "./DpiSelector";

const ColorSettings = () => {
  const { settings, updateSettings } = usePrintSettings();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Color Settings</h3>
        
        <div className="space-y-4">
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
                <SelectItem value="sRGB">sRGB (Web/Screen)</SelectItem>
                <SelectItem value="AdobeRGB">Adobe RGB</SelectItem>
                <SelectItem value="CMYK">CMYK (Generic)</SelectItem>
                <SelectItem value="ProPhoto">ProPhoto RGB</SelectItem>
                <SelectItem value="FOGRA39">FOGRA39 (Coated)</SelectItem>
                <SelectItem value="FOGRA47">FOGRA47 (Uncoated)</SelectItem>
                <SelectItem value="FOGRA51">FOGRA51 (Coated)</SelectItem>
                <SelectItem value="FOGRA52">FOGRA52 (Uncoated)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Select the appropriate color profile for your printing needs
            </p>
          </div>
        </div>
      </div>

      {/* DPI selector (moved from here to shared component) */}
      <div className="border-t pt-4">
        <DpiSelector />
      </div>
    </div>
  );
};

export default ColorSettings;
