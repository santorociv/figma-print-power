
import type { PageSize } from "@/context/PrintSettingsContext";

// Define the interface locally to avoid circular dependencies
interface PrintSettings {
  pageSize: PageSize;
  orientation: 'portrait' | 'landscape';
  customWidth: number;
  customHeight: number;
  colorProfile?: string;
  dpi?: number;
}

export const getPageDimensions = (settings: PrintSettings) => {
  if (settings.pageSize === 'custom') {
    return settings.orientation === 'portrait'
      ? { width: settings.customWidth, height: settings.customHeight }
      : { width: settings.customHeight, height: settings.customWidth };
  }
  
  // Standard page sizes
  const pageSizes: Record<PageSize, { width: number; height: number }> = {
    a4: { width: 210, height: 297 },
    a3: { width: 297, height: 420 },
    letter: { width: 215.9, height: 279.4 },
    legal: { width: 215.9, height: 355.6 },
    tabloid: { width: 279.4, height: 431.8 },
    custom: { width: 0, height: 0 } // This will never be used as it's handled above
  };
  
  const size = pageSizes[settings.pageSize];
  return settings.orientation === 'portrait'
    ? { width: size.width, height: size.height }
    : { width: size.height, height: size.width };
};

// Helper function to get size in pixels based on DPI
export const getSizeInPixels = (settings: PrintSettings) => {
  const dimensions = getPageDimensions(settings);
  const dpi = settings.dpi || 300;
  
  // Convert mm to inches, then multiply by DPI
  const widthInInches = dimensions.width / 25.4;
  const heightInInches = dimensions.height / 25.4;
  
  return {
    width: Math.round(widthInInches * dpi),
    height: Math.round(heightInInches * dpi)
  };
};
