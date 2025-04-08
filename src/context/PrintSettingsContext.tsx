
import React, { createContext, useContext, useState } from 'react';

// Define types for our context
export type PageSize = 'a4' | 'a3' | 'letter' | 'legal' | 'tabloid' | 'custom';
export type PageOrientation = 'portrait' | 'landscape';
export type ColorProfile = 'sRGB' | 'AdobeRGB' | 'CMYK' | 'ProPhoto';
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

interface PrintSettingsContextType {
  settings: PrintSettings;
  updateSettings: (newSettings: Partial<PrintSettings>) => void;
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

  const updateSettings = (newSettings: Partial<PrintSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <PrintSettingsContext.Provider value={{ settings, updateSettings }}>
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
