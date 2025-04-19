
import { useEffect, useState } from "react";
import { usePrintSettings } from "@/context/PrintSettingsContext";
import { Skeleton } from "@/components/ui/skeleton";

const PreviewPanel = () => {
  const { settings } = usePrintSettings();
  const [scale, setScale] = useState(0.15); // Further reduced scale for smaller height
  const [isLoading, setIsLoading] = useState(true);
  
  // Calculate actual dimensions based on orientation and page size
  const getPageDimensions = () => {
    if (settings.pageSize === 'custom') {
      return settings.orientation === 'portrait'
        ? { width: settings.customWidth, height: settings.customHeight }
        : { width: settings.customHeight, height: settings.customWidth };
    }
    
    // Standard page sizes
    const pageSizes: Record<string, { width: number; height: number }> = {
      a4: { width: 210, height: 297 },
      a3: { width: 297, height: 420 },
      letter: { width: 215.9, height: 279.4 },
      legal: { width: 215.9, height: 355.6 },
      tabloid: { width: 279.4, height: 431.8 },
    };
    
    const size = pageSizes[settings.pageSize];
    return settings.orientation === 'portrait'
      ? { width: size.width, height: size.height }
      : { width: size.height, height: size.width };
  };
  
  const dimensions = getPageDimensions();
  
  // Auto-adjust scale based on container size
  useEffect(() => {
    setIsLoading(true);
    
    const handleResize = () => {
      // Get container dimensions
      const container = document.querySelector('.preview-container');
      if (!container) return;
      
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      // Calculate scale that would fit the page within the container
      // with some padding, using a smaller maximum scale for reduced height
      const widthScale = (containerWidth - 40) / dimensions.width;
      const heightScale = (containerHeight - 20) / dimensions.height;
      
      // Use the smaller scale to ensure the page fits completely
      // Further limit the maximum scale to ensure the preview is compact
      const newScale = Math.min(widthScale, heightScale, 0.3);
      setScale(newScale);
      setIsLoading(false);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dimensions]);
  
  // Calculate actual sizes for display
  const displayWidth = dimensions.width * scale;
  const displayHeight = dimensions.height * scale;
  
  // Calculate bleed area dimensions
  const bleedSize = settings.bleedType === 'standard' ? 3 : settings.bleedSize;
  const bleedWidth = displayWidth + (settings.showBleedMarks ? bleedSize * 2 * scale : 0);
  const bleedHeight = displayHeight + (settings.showBleedMarks ? bleedSize * 2 * scale : 0);
  
  // Calculate safe area dimensions
  const safeAreaInset = settings.safeAreaSize * scale;
  
  // Create crop marks
  const CropMarks = () => {
    if (!settings.showCropMarks) return null;
    
    const markLength = 10 * scale;
    const markOffset = 5 * scale;
    
    return (
      <>
        {/* Top-left corner */}
        <div className="absolute" style={{ 
          left: settings.showBleedMarks ? bleedSize * scale - markLength - markOffset : -markLength - markOffset, 
          top: settings.showBleedMarks ? bleedSize * scale - markOffset : -markOffset,
          width: markLength, 
          height: 1, 
          backgroundColor: '#000' 
        }} />
        <div className="absolute" style={{ 
          left: settings.showBleedMarks ? bleedSize * scale - markOffset : -markOffset, 
          top: settings.showBleedMarks ? bleedSize * scale - markLength - markOffset : -markLength - markOffset,
          width: 1, 
          height: markLength, 
          backgroundColor: '#000'
        }} />
        
        {/* Top-right corner */}
        <div className="absolute" style={{ 
          right: settings.showBleedMarks ? bleedSize * scale - markLength - markOffset : -markLength - markOffset, 
          top: settings.showBleedMarks ? bleedSize * scale - markOffset : -markOffset,
          width: markLength, 
          height: 1, 
          backgroundColor: '#000' 
        }} />
        <div className="absolute" style={{ 
          right: settings.showBleedMarks ? bleedSize * scale - markOffset : -markOffset, 
          top: settings.showBleedMarks ? bleedSize * scale - markLength - markOffset : -markLength - markOffset,
          width: 1, 
          height: markLength, 
          backgroundColor: '#000'
        }} />
        
        {/* Bottom-left corner */}
        <div className="absolute" style={{ 
          left: settings.showBleedMarks ? bleedSize * scale - markLength - markOffset : -markLength - markOffset, 
          bottom: settings.showBleedMarks ? bleedSize * scale - markOffset : -markOffset,
          width: markLength, 
          height: 1, 
          backgroundColor: '#000' 
        }} />
        <div className="absolute" style={{ 
          left: settings.showBleedMarks ? bleedSize * scale - markOffset : -markOffset, 
          bottom: settings.showBleedMarks ? bleedSize * scale - markLength - markOffset : -markLength - markOffset,
          width: 1, 
          height: markLength, 
          backgroundColor: '#000'
        }} />
        
        {/* Bottom-right corner */}
        <div className="absolute" style={{ 
          right: settings.showBleedMarks ? bleedSize * scale - markLength - markOffset : -markLength - markOffset, 
          bottom: settings.showBleedMarks ? bleedSize * scale - markOffset : -markOffset,
          width: markLength, 
          height: 1, 
          backgroundColor: '#000' 
        }} />
        <div className="absolute" style={{ 
          right: settings.showBleedMarks ? bleedSize * scale - markOffset : -markOffset, 
          bottom: settings.showBleedMarks ? bleedSize * scale - markLength - markOffset : -markLength - markOffset,
          width: 1, 
          height: markLength, 
          backgroundColor: '#000'
        }} />
      </>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Skeleton className="w-4/5 h-4/5" />
      </div>
    );
  }

  return (
    <div className="preview-container h-full flex items-center justify-center overflow-auto relative p-2">
      <div className="relative" style={{ width: bleedWidth, height: bleedHeight }}>
        {/* Bleed Area */}
        {settings.showBleedMarks && (
          <div 
            className="absolute border border-dashed border-red-500" 
            style={{ 
              left: 0, 
              top: 0, 
              width: '100%', 
              height: '100%',
              pointerEvents: 'none' 
            }} 
          />
        )}
        
        {/* Page Area */}
        <div 
          className="preview-page absolute bg-white"
          style={{ 
            left: settings.showBleedMarks ? bleedSize * scale : 0, 
            top: settings.showBleedMarks ? bleedSize * scale : 0, 
            width: displayWidth, 
            height: displayHeight,
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' 
          }}
        >
          {/* Content placeholder */}
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-2">
            <div className="w-4/5 h-1/4 bg-gray-200 mb-2 rounded"></div>
            <div className="w-3/5 h-1/8 bg-gray-200 mb-1 rounded"></div>
            <div className="w-2/3 h-1/8 bg-gray-200 mb-2 rounded"></div>
            <div className="w-3/4 h-1/3 bg-gray-200 rounded"></div>
          </div>
          
          {/* Safe Area */}
          {settings.showSafeArea && (
            <div 
              className="absolute border border-dashed border-blue-500" 
              style={{ 
                left: safeAreaInset, 
                top: safeAreaInset, 
                width: displayWidth - (safeAreaInset * 2), 
                height: displayHeight - (safeAreaInset * 2),
                pointerEvents: 'none' 
              }} 
            />
          )}
        </div>
        
        {/* Crop Marks */}
        <CropMarks />
      </div>
      
      {/* Info Overlay */}
      <div className="absolute bottom-1 right-1 bg-white/80 backdrop-blur-sm p-1 rounded text-xs text-gray-600">
        <div className="flex gap-2">
          <div>
            <span className="font-medium">Size:</span> {dimensions.width} × {dimensions.height} mm
          </div>
          <div>
            <span className="font-medium">DPI:</span> {settings.dpi}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
