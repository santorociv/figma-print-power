
import { usePrintSettings } from "@/context/PrintSettingsContext";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
                <SelectGroup>
                  <SelectLabel>Standard</SelectLabel>
                  <SelectItem value="sRGB">sRGB (Web/Screen)</SelectItem>
                  <SelectItem value="AdobeRGB">Adobe RGB</SelectItem>
                  <SelectItem value="CMYK">CMYK (Generic)</SelectItem>
                  <SelectItem value="ProPhoto">ProPhoto RGB</SelectItem>
                </SelectGroup>
                
                <SelectGroup>
                  <SelectLabel>European Coated</SelectLabel>
                  <SelectItem value="FOGRA39">FOGRA39 (ISO Coated v2)</SelectItem>
                  <SelectItem value="FOGRA51">FOGRA51 (PSO Coated v3)</SelectItem>
                  <SelectItem value="FOGRA28">FOGRA28 (Web Coated)</SelectItem>
                </SelectGroup>
                
                <SelectGroup>
                  <SelectLabel>European Uncoated</SelectLabel>
                  <SelectItem value="FOGRA47">FOGRA47 (Uncoated)</SelectItem>
                  <SelectItem value="FOGRA52">FOGRA52 (PSO Uncoated v3)</SelectItem>
                  <SelectItem value="FOGRA29">FOGRA29 (Uncoated Yellowish)</SelectItem>
                </SelectGroup>
                
                <SelectGroup>
                  <SelectLabel>Japanese</SelectLabel>
                  <SelectItem value="TOYO">TOYO</SelectItem>
                  <SelectItem value="JAPAN">Japan Color 2001 Coated</SelectItem>
                  <SelectItem value="JAPAN_UNCOATED">Japan Color 2001 Uncoated</SelectItem>
                </SelectGroup>
                
                <SelectGroup>
                  <SelectLabel>American</SelectLabel>
                  <SelectItem value="SWOP">SWOP (US Web Coated)</SelectItem>
                  <SelectItem value="GRACoL">GRACoL 2006 Coated</SelectItem>
                  <SelectItem value="SNAP">SNAP (Newsprint)</SelectItem>
                </SelectGroup>
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
