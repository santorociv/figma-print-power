
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { usePrintSettings } from "@/context/PrintSettingsContext";
import { toast } from "@/components/ui/use-toast";
import { Download, FileDown } from "lucide-react";

const ExportOptions = () => {
  const { settings, updateSettings } = usePrintSettings();
  const [isExporting, setIsExporting] = useState(false);

  // Simulate export process
  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsExporting(false);
      toast({
        title: "Export Complete",
        description: `Your ${settings.exportPDF ? 'PDF' : ''}${settings.exportPDF && settings.exportJPG ? ' and ' : ''}${settings.exportJPG ? 'JPG' : ''} files have been exported successfully.`,
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Export Options</h3>
        
        <div className="space-y-6">
          {/* Export Type */}
          <div className="space-y-2">
            <Label htmlFor="exportType">Export Type</Label>
            <Select
              value={settings.exportType}
              onValueChange={(value) => updateSettings({ exportType: value as any })}
            >
              <SelectTrigger id="exportType">
                <SelectValue placeholder="Select export type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full Document</SelectItem>
                <SelectItem value="pages">Specific Pages</SelectItem>
                <SelectItem value="selection">Current Selection</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Page Selection (only shown if exportType is 'pages') */}
          {settings.exportType === 'pages' && (
            <div className="space-y-2">
              <Label htmlFor="pageRange">Page Range</Label>
              <Input 
                id="pageRange" 
                placeholder="e.g., 1-3, 5, 7-9"
                defaultValue="1"
              />
              <p className="text-xs text-gray-500">Enter individual pages or ranges (e.g., 1-3, 5, 7-9)</p>
            </div>
          )}

          {/* Include Layers */}
          <div className="flex items-center justify-between">
            <Label htmlFor="includeLayers" className="cursor-pointer">Preserve Layers (when possible)</Label>
            <Switch 
              id="includeLayers" 
              checked={settings.includeLayers}
              onCheckedChange={(checked) => updateSettings({ includeLayers: checked })}
            />
          </div>

          {/* File Format Options */}
          <div className="space-y-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">File Formats</h4>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="exportPDF" className="cursor-pointer">PDF</Label>
                <Switch 
                  id="exportPDF" 
                  checked={settings.exportPDF}
                  onCheckedChange={(checked) => updateSettings({ exportPDF: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="exportJPG" className="cursor-pointer">JPG</Label>
                <Switch 
                  id="exportJPG" 
                  checked={settings.exportJPG}
                  onCheckedChange={(checked) => updateSettings({ exportJPG: checked })}
                />
              </div>
            </div>

            {settings.exportJPG && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="compressionQuality">JPG Quality</Label>
                  <span className="text-sm text-gray-500">{settings.compressionQuality}%</span>
                </div>
                <Slider
                  id="compressionQuality"
                  min={60}
                  max={100}
                  step={5}
                  value={[settings.compressionQuality]}
                  onValueChange={(value) => updateSettings({ compressionQuality: value[0] })}
                />
                <div className="grid grid-cols-3 text-xs text-gray-500">
                  <span>Lower Quality</span>
                  <span className="text-center">Balanced</span>
                  <span className="text-right">Higher Quality</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <Button 
          onClick={handleExport}
          disabled={!settings.exportPDF && !settings.exportJPG || isExporting}
          className="w-full"
        >
          {isExporting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Export
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ExportOptions;
