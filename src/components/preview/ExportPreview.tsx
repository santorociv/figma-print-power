
import { Skeleton } from "@/components/ui/skeleton";

interface ExportPreviewProps {
  figmaFrames: any[];
  isLoading: boolean;
}

const ExportPreview = ({ figmaFrames, isLoading }: ExportPreviewProps) => {
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Skeleton className="w-4/5 h-4/5" />
      </div>
    );
  }

  return (
    <div className="preview-container h-full flex flex-col items-center justify-center overflow-auto p-4">
      {figmaFrames.length > 0 ? (
        <div className="space-y-4 w-full">
          <p className="text-center text-sm text-gray-500 mb-2">Selected Figma Frames ({figmaFrames.length})</p>
          {figmaFrames.map(frame => (
            <div key={frame.id} className="border rounded p-3 bg-white flex items-center justify-between">
              <div>
                <h3 className="font-medium">{frame.name}</h3>
                <p className="text-xs text-gray-500">{frame.width} × {frame.height} px</p>
              </div>
              <div className="h-12 w-12 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-500 mb-2">No Figma frames selected</p>
          <p className="text-sm text-gray-400">Select frames in Figma to see them here</p>
        </div>
      )}
    </div>
  );
};

export default ExportPreview;
