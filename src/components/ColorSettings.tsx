
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePrintSettings } from "@/context/PrintSettingsContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Printer, Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const ColorSettings = () => {
  const { settings, updateSettings } = usePrintSettings();

  // Common DPI presets with descriptions
  const dpiPresets = [
    { value: 72, label: "72 DPI", description: "Screen viewing only (web/digital)" },
    { value: 150, label: "150 DPI", description: "Draft printing, internal documents" },
    { value: 300, label: "300 DPI", description: "Standard commercial printing" },
    { value: 450, label: "450 DPI", description: "High-quality commercial printing" },
    { value: 600, label: "600 DPI", description: "Fine art and detailed printing" },
  ];

  // Function to provide a human-readable description for each color profile
  const getProfileDescription = (profile: string) => {
    switch(profile) {
      // Standard profiles
      case 'sRGB': return 'Standard for digital displays and consumer printing';
      case 'AdobeRGB': return 'Wider gamut for photography and professional printing';
      case 'CMYK': return 'Generic CMYK profile for commercial printing';
      case 'ProPhoto': return 'Very wide gamut for photography (may cause clipping on some devices)';
      
      // FOGRA profiles - coated
      case 'FOGRA39': return 'ISO Coated v2 (ECI) - Coated paper, 39% dot gain';
      case 'FOGRA47': return 'PSO Uncoated ISO12647 (ECI) - Improved coated profile';
      case 'FOGRA51': return 'PSOcoated_v3 - Latest standard for premium coated paper (2013)';
      case 'FOGRA52': return 'PSOuncoated_v3 - Latest standard for premium coated offset paper';
      
      // FOGRA profiles - uncoated
      case 'FOGRA29': return 'ISO Uncoated - Standard for uncoated paper';
      case 'FOGRA50': return 'SC Paper (ECI) - Standard for super calendered printing';
      
      // Japan profiles
      case 'TOYO': return 'TOYO Printing Standard - Japanese printing standard';
      case 'JAPAN': return 'Japan Color 2011 - Japanese printing standard';
      
      default: return 'Custom color profile';
    }
  };

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
                <SelectGroup>
                  <SelectLabel>Standard Profiles</SelectLabel>
                  <SelectItem value="sRGB">sRGB IEC61966-2.1 (Digital/Web)</SelectItem>
                  <SelectItem value="AdobeRGB">Adobe RGB (1998)</SelectItem>
                  <SelectItem value="CMYK">U.S. Web Coated (SWOP) v2 (CMYK)</SelectItem>
                  <SelectItem value="ProPhoto">ProPhoto RGB (Wide Gamut)</SelectItem>
                </SelectGroup>
                
                <SelectGroup>
                  <SelectLabel>FOGRA Coated Profiles</SelectLabel>
                  <SelectItem value="FOGRA39">FOGRA39 (ISO Coated v2)</SelectItem>
                  <SelectItem value="FOGRA47">FOGRA47 (PSO Coated v3)</SelectItem>
                  <SelectItem value="FOGRA51">FOGRA51 (PSOcoated_v3)</SelectItem>
                  <SelectItem value="FOGRA52">FOGRA52 (PSOuncoated_v3_FOGRA52)</SelectItem>
                </SelectGroup>
                
                <SelectGroup>
                  <SelectLabel>FOGRA Uncoated Profiles</SelectLabel>
                  <SelectItem value="FOGRA29">FOGRA29 (ISO Uncoated)</SelectItem>
                  <SelectItem value="FOGRA50">FOGRA50 (SC Paper)</SelectItem>
                </SelectGroup>
                
                <SelectGroup>
                  <SelectLabel>Asian Profiles</SelectLabel>
                  <SelectItem value="TOYO">TOYO Printing Standard</SelectItem>
                  <SelectItem value="JAPAN">Japan Color 2011</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1">
              {getProfileDescription(settings.colorProfile)}
            </p>
          </div>

          {/* DPI/Resolution Setting with Presets */}
          <div className="space-y-2 pt-4 border-t">
            <Label htmlFor="dpi">Resolution (DPI)</Label>
            
            {/* DPI Preset Buttons */}
            <div className="grid grid-cols-5 gap-2 mb-3">
              {dpiPresets.map((preset) => (
                <Button
                  key={preset.value}
                  type="button"
                  variant={settings.dpi === preset.value ? "default" : "outline"}
                  className="h-10 px-2 py-1 text-xs"
                  onClick={() => updateSettings({ dpi: preset.value })}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
            
            {/* Custom DPI Input */}
            <div className="flex items-center gap-3">
              <Label htmlFor="custom-dpi" className="whitespace-nowrap text-sm">Custom DPI:</Label>
              <Input
                id="custom-dpi"
                type="number"
                value={settings.dpi}
                onChange={(e) => updateSettings({ dpi: Number(e.target.value) })}
                className="w-24"
                min={72}
                max={1200}
                step={1}
              />
            </div>
            
            {/* DPI Info */}
            <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-md flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-700 mb-1">Current: {settings.dpi} DPI</p>
                <p className="text-xs text-blue-600">
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
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <h4 className="text-sm font-medium text-gray-700 mb-1">Color Management Tips</h4>
        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
          <li>Use FOGRA profiles for European commercial printing standards</li>
          <li>FOGRA39 is the standard for coated paper in Europe</li>
          <li>FOGRA51/52 are the newest (2013) standards for premium papers</li>
          <li>Use JAPAN profiles for printing in Asian markets</li>
          <li>300 DPI is standard for high-quality print</li>
          <li>Check with your printer for specific ICC profile recommendations</li>
        </ul>
      </div>
    </div>
  );
};

export default ColorSettings;
