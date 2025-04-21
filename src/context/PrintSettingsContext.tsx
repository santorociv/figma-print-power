
import React, { createContext, useContext, useState } from 'react';

// Define types for our context
export type PageSize = 'a4' | 'a3' | 'letter' | 'legal' | 'tabloid' | 'custom';
export type PageOrientation = 'portrait' | 'landscape';
export type ColorProfile = 
  // Standard profiles
  'sRGB' | 'AdobeRGB' | 'CMYK' | 'ProPhoto' | 
  // FOGRA profiles - coated
  'FOGRA39' | 'FOGRA51' | 'FOGRA28' |
  // FOGRA profiles - uncoated
  'FOGRA47' | 'FOGRA52' | 'FOGRA29' |
  // Japan profiles
  'TOYO' | 'JAPAN' | 'JAPAN_UNCOATED' |
  // American profiles
  'SWOP' | 'GRACoL' | 'SNAP';
export type BleedType = 'none' | 'standard' | 'custom';
export type ExportType = 'full' | 'pages' | 'selection';

interface PrintSettings {
  // Page Settings
  pageSize: PageSize;
  orientation: PageOrientation;
  customWidth: number;
  customHeight: number;
  
  // Print Marks
  showBleedMarks: boolean;
  bleedType: BleedType;
  bleedSize: number;
  showCropMarks: boolean;
  showSafeArea: boolean;
  safeAreaSize: number;
  
  // Color Settings
  colorProfile: ColorProfile;
  dpi: number;
  
  // Export Options
  exportType: ExportType;
  selectedPages: number[];
  includeLayers: boolean;
  exportPDF: boolean;
  exportJPG: boolean;
  compressionQuality: number;
}

interface SavedPreset {
  id: string;
  name: string;
  settings: Partial<PrintSettings>;
}

interface PrintSettingsContextType {
  settings: PrintSettings;
  updateSettings: (newSettings: Partial<PrintSettings>) => void;
  userPresets: SavedPreset[];
  addPreset: (name: string, settings: Partial<PrintSettings>) => void;
  removePreset: (id: string) => void;
  loadPreset: (preset: SavedPreset) => void;
}

const defaultSettings: PrintSettings = {
  // Page Settings
  pageSize: 'a4',
  orientation: 'portrait',
  customWidth: 210,
  customHeight: 297,
  
  // Print Marks
  showBleedMarks: true,
  bleedType: 'standard',
  bleedSize: 3,
  showCropMarks: true,
  showSafeArea: true,
  safeAreaSize: 5,
  
  // Color Settings
  colorProfile: 'CMYK',
  dpi: 300,
  
  // Export Options
  exportType: 'full',
  selectedPages: [1],
  includeLayers: true,
  exportPDF: true,
  exportJPG: false,
  compressionQuality: 90,
};

const PrintSettingsContext = createContext<PrintSettingsContextType | undefined>(undefined);

export const PrintSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<PrintSettings>(defaultSettings);
  const [userPresets, setUserPresets] = useState<SavedPreset[]>([]);

  const updateSettings = (newSettings: Partial<PrintSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addPreset = (name: string, presetSettings: Partial<PrintSettings>) => {
    const newPreset: SavedPreset = {
      id: Date.now().toString(),
      name,
      settings: presetSettings,
    };
    setUserPresets(prev => [newPreset, ...prev]);
    return newPreset;
  };

  const removePreset = (id: string) => {
    setUserPresets(prev => prev.filter(preset => preset.id !== id));
  };

  const loadPreset = (preset: SavedPreset) => {
    updateSettings(preset.settings);
  };

  return (
    <PrintSettingsContext.Provider value={{ 
      settings, 
      updateSettings, 
      userPresets, 
      addPreset, 
      removePreset, 
      loadPreset 
    }}>
      {children}
    </PrintSettingsContext.Provider>
  );
};

export const usePrintSettings = () => {
  const context = useContext(PrintSettingsContext);
  if (context === undefined) {
    throw new Error('usePrintSettings must be used within a PrintSettingsProvider');
  }
  return context;
};
