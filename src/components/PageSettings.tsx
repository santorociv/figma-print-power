
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { usePrintSettings } from "@/context/PrintSettingsContext";
import { Switch } from "@/components/ui/switch";

const pageSizes = {
  a4: { width: 210, height: 297 },
  a3: { width: 297, height: 420 },
  letter: { width: 215.9, height: 279.4 },
  legal: { width: 215.9, height: 355.6 },
  tabloid: { width: 279.4, height: 431.8 },
};

const PageSettings = () => {
  const { settings, updateSettings } = usePrintSettings();
  const [isCustomSize, setIsCustomSize] = useState(settings.pageSize === 'custom');
  
  // Calculate actual dimensions based on orientation
  const getActualDimensions = () => {
    if (settings.pageSize === 'custom') {
      return settings.orientation === 'portrait' 
        ? { width: settings.customWidth, height: settings.customHeight }
        : { width: settings.customHeight, height: settings.customWidth };
    } else {
      const size = pageSizes[settings.pageSize];
      return settings.orientation === 'portrait' 
        ? { width: size.width, height: size.height }
        : { width: size.height, height: size.width };
    }
  };

  const dimensions = getActualDimensions();

  // Handle page size selection
  const handlePageSizeChange = (value: string) => {
    setIsCustomSize(value === 'custom');
    
    if (value !== 'custom') {
      const selectedSize = pageSizes[value as keyof typeof pageSizes];
      updateSettings({ 
        pageSize: value as any, 
        customWidth: selectedSize.width,
        customHeight: selectedSize.height
      });
    } else {
      updateSettings({ pageSize: 'custom' });
    }
  };

  // Handle orientation change
  const handleOrientationChange = (value: string) => {
    updateSettings({ orientation: value as any });
  };

  // Handle custom dimensions change
  const handleCustomDimensionChange = (dimension: 'width' | 'height', value: number) => {
    updateSettings({
      [`custom${dimension.charAt(0).toUpperCase() + dimension.slice(1)}`]: value
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Page Settings</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pageSize">Page Size</Label>
            <Select 
              value={settings.pageSize} 
              onValueChange={handlePageSizeChange}
            >
              <SelectTrigger id="pageSize">
                <SelectValue placeholder="Select page size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a4">A4 (210×297 mm)</SelectItem>
                <SelectItem value="a3">A3 (297×420 mm)</SelectItem>
                <SelectItem value="letter">US Letter (8.5×11 in)</SelectItem>
                <SelectItem value="legal">US Legal (8.5×14 in)</SelectItem>
                <SelectItem value="tabloid">Tabloid (11×17 in)</SelectItem>
                <SelectItem value="custom">Custom Size</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isCustomSize && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="width">Width (mm)</Label>
                <Input
                  id="width"
                  type="number"
                  value={settings.customWidth}
                  onChange={(e) => handleCustomDimensionChange('width', Number(e.target.value))}
                  min="10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (mm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={settings.customHeight}
                  onChange={(e) => handleCustomDimensionChange('height', Number(e.target.value))}
                  min="10"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Orientation</Label>
            <RadioGroup
              value={settings.orientation}
              onValueChange={handleOrientationChange}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="portrait" id="portrait" />
                <Label htmlFor="portrait" className="cursor-pointer">Portrait</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="landscape" id="landscape" />
                <Label htmlFor="landscape" className="cursor-pointer">Landscape</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Actual Dimensions</h4>
        <p className="text-sm">
          {dimensions.width} × {dimensions.height} mm
          {' '}
          ({(dimensions.width / 25.4).toFixed(2)} × {(dimensions.height / 25.4).toFixed(2)} in)
        </p>
      </div>
    </div>
  );
};

export default PageSettings;
