
import { usePrintSettings } from "@/context/PrintSettingsContext";
import { Skeleton } from "@/components/ui/skeleton";
import { getPageDimensions } from "@/utils/paperUtils";
import CropMarks from "./CropMarks";

interface PaperPreviewProps {
  scale: number;
  isLoading: boolean;
}

const PaperPreview = ({ scale, isLoading }: PaperPreviewProps) => {
  const { settings } = usePrintSettings();
  const dimensions = getPageDimensions(settings);
  
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Skeleton className="w-4/5 h-4/5" />
      </div>
    );
  }

  // Calculate display dimensions
  const displayWidth = dimensions.width * scale;
  const displayHeight = dimensions.height * scale;
  
  // Calculate bleed area dimensions
  const bleedSize = settings.bleedType === 'standard' ? 3 : settings.bleedSize;
  const bleedWidth = displayWidth + (settings.showBleedMarks ? bleedSize * 2 * scale : 0);
  const bleedHeight = displayHeight + (settings.showBleedMarks ? bleedSize * 2 * scale : 0);
  
  // Calculate safe area dimensions
  const safeAreaInset = settings.safeAreaSize * scale;

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
        {settings.showCropMarks && (
          <CropMarks 
            scale={scale} 
            bleedSize={bleedSize} 
            showBleedMarks={settings.showBleedMarks} 
          />
        )}
      </div>
      
      {/* Info Overlay */}
      <div className="absolute bottom-1 left-1 bg-white/90 backdrop-blur-sm p-2 rounded text-xs border border-gray-200 shadow-sm" 
        style={{
          fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)",
          maxWidth: "98%",
          overflowWrap: "anywhere"
        }}>
        <div className="flex flex-col gap-1">
          <div className="font-medium text-gray-700">
            {settings.pageSize.toUpperCase()} {settings.orientation} • {dimensions.width} × {dimensions.height} mm
          </div>
          <div className="flex gap-2 text-gray-600 flex-wrap">
            <div>
              <span className="font-medium">DPI:</span> {settings.dpi}
            </div>
            <div>
              <span className="font-medium">Profile:</span> {settings.colorProfile}
            </div>
            {settings.showBleedMarks && (
              <div>
                <span className="font-medium">Bleed:</span> {bleedSize}mm
              </div>
            )}
            {settings.showSafeArea && (
              <div>
                <span className="font-medium">Safe Area:</span> {settings.safeAreaSize}mm
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperPreview;
