
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

  // Visual sizes
  const displayWidth = dimensions.width * scale;
  const displayHeight = dimensions.height * scale;
  const dpi = settings.dpi;
  const profile = settings.colorProfile;

  // Bleed
  const bleedSize = settings.showBleedMarks
    ? (settings.bleedType === "standard" ? 3 : settings.bleedSize)
    : 0;

  const bleedInset = bleedSize * scale;

  // Safe area
  const safeInset = settings.showSafeArea ? settings.safeAreaSize * scale : 0;

  // Total preview area (includes bleed area if shown, for crop marks)
  const outerWidth = displayWidth + (settings.showBleedMarks ? 2 * bleedInset : 0);
  const outerHeight = displayHeight + (settings.showBleedMarks ? 2 * bleedInset : 0);

  // Tag style (bottom right), always visible, mimics Figma look from your screenshot
  const tagText = `Size: ${dimensions.width} × ${dimensions.height} mm    DPI: ${dpi}    Profile: ${profile}`;

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center min-h-60">
        <Skeleton className="w-4/5 h-4/5" />
      </div>
    );
  }

  return (
    <div className="preview-container h-full w-full flex items-center justify-center relative overflow-auto" style={{ minHeight: "350px" }}>
      <div 
        className="relative flex items-center justify-center"
        style={{ width: outerWidth, height: outerHeight }}
      >
        {/* Crop marks always visible, outside bleed */}
        <CropMarks scale={scale} bleedSize={bleedSize} showBleedMarks={settings.showBleedMarks} />

        {/* Bleed Area */}
        {settings.showBleedMarks && (
          <div
            className="absolute border-2 border-dashed"
            style={{
              borderColor: "#ea384c",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              zIndex: 1,
              pointerEvents: "none"
            }}
          />
        )}

        {/* Page visible area */}
        <div
          className="absolute bg-white"
          style={{
            left: settings.showBleedMarks ? bleedInset : 0,
            top: settings.showBleedMarks ? bleedInset : 0,
            width: displayWidth,
            height: displayHeight,
            boxShadow: "0 2px 6px rgba(0,0,0,.07)",
            zIndex: 2
          }}
        >
          {/* Page content visuals */}
          <div className="flex flex-col items-center justify-center p-3" style={{ height: '100%' }}>
            <div className="w-3/4 h-[20%] bg-gray-200 mb-2 rounded"></div>
            <div className="w-2/3 h-[17%] bg-gray-200 mb-1 rounded"></div>
            <div className="w-3/4 h-[20%] bg-gray-200 rounded"></div>
          </div>
          {/* Safe area */}
          {settings.showSafeArea && (
            <div
              className="absolute border border-dashed"
              style={{
                borderColor: "#2563eb",
                left: safeInset,
                top: safeInset,
                width: displayWidth - safeInset*2,
                height: displayHeight - safeInset*2,
                zIndex: 3,
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      </div>
      {/* Tag - bottom right */}
      <div
        className="absolute bg-white/95 text-[0.93em] px-4 py-[6px] border border-gray-200 rounded shadow-sm"
        style={{
          right: 24,
          bottom: 24,
          fontWeight: 500,
          color: "#333",
          fontSize: "clamp(0.85rem,0.98vw,1.05rem)",
          zIndex: 15
        }}
      >
        {tagText}
      </div>
    </div>
  );
};

export default PaperPreview;
