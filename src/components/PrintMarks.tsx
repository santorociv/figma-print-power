
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { usePrintSettings } from "@/context/PrintSettingsContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

const PrintMarks = () => {
  const { settings, updateSettings } = usePrintSettings();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Print Marks</h3>
        
        <div className="space-y-6">
          {/* Bleed Marks */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="bleedMarks" className="cursor-pointer">Bleed Marks</Label>
              <Switch 
                id="bleedMarks" 
                checked={settings.showBleedMarks}
                onCheckedChange={(checked) => updateSettings({ showBleedMarks: checked })}
              />
            </div>
            
            {settings.showBleedMarks && (
              <>
                <div className="space-y-2">
                  <Label>Bleed Type</Label>
                  <RadioGroup
                    value={settings.bleedType}
                    onValueChange={(value) => updateSettings({ bleedType: value as any })}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="cursor-pointer">Standard (3mm)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="custom" />
                      <Label htmlFor="custom" className="cursor-pointer">Custom</Label>
                    </div>
                  </RadioGroup>
                </div>

                {settings.bleedType === 'custom' && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="bleedSize">Bleed Size (mm)</Label>
                      <span className="text-sm text-gray-500">{settings.bleedSize} mm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Slider
                        id="bleedSize"
                        min={0}
                        max={10}
                        step={0.5}
                        value={[settings.bleedSize]}
                        onValueChange={(value) => updateSettings({ bleedSize: value[0] })}
                      />
                      <Input
                        type="number"
                        value={settings.bleedSize}
                        onChange={(e) => updateSettings({ bleedSize: Number(e.target.value) })}
                        className="w-16"
                        min={0}
                        max={10}
                        step={0.5}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Crop Marks */}
          <div className="space-y-2 pt-2 border-t">
            <div className="flex items-center justify-between">
              <Label htmlFor="cropMarks" className="cursor-pointer">Crop Marks</Label>
              <Switch 
                id="cropMarks" 
                checked={settings.showCropMarks}
                onCheckedChange={(checked) => updateSettings({ showCropMarks: checked })}
              />
            </div>
          </div>

          {/* Safe Area */}
          <div className="space-y-4 pt-2 border-t">
            <div className="flex items-center justify-between">
              <Label htmlFor="safeArea" className="cursor-pointer">Safe Area</Label>
              <Switch 
                id="safeArea" 
                checked={settings.showSafeArea}
                onCheckedChange={(checked) => updateSettings({ showSafeArea: checked })}
              />
            </div>
            
            {settings.showSafeArea && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="safeAreaSize">Safe Area Margin (mm)</Label>
                  <span className="text-sm text-gray-500">{settings.safeAreaSize} mm</span>
                </div>
                <div className="flex items-center gap-2">
                  <Slider
                    id="safeAreaSize"
                    min={3}
                    max={20}
                    step={1}
                    value={[settings.safeAreaSize]}
                    onValueChange={(value) => updateSettings({ safeAreaSize: value[0] })}
                  />
                  <Input
                    type="number"
                    value={settings.safeAreaSize}
                    onChange={(e) => updateSettings({ safeAreaSize: Number(e.target.value) })}
                    className="w-16"
                    min={3}
                    max={20}
                    step={1}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <p className="text-sm text-gray-500">
          Bleed marks indicate the area that extends beyond the final trimmed document,
          while crop marks show where the page will be cut. The safe area ensures important
          content doesn't get too close to the edge.
        </p>
      </div>
    </div>
  );
};

export default PrintMarks;
