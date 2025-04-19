
import { useEffect, useState } from "react";
import PaperPreview from "./preview/PaperPreview";
import ExportPreview from "./preview/ExportPreview";

interface PreviewPanelProps {
  activeTab: string;
}

const PreviewPanel = ({ activeTab }: PreviewPanelProps) => {
  const [scale, setScale] = useState(0.15);
  const [isLoading, setIsLoading] = useState(true);
  const [figmaFrames, setFigmaFrames] = useState<any[]>([]);
  
  useEffect(() => {
    if (activeTab === "export") {
      // Simulate fetching Figma frames
      setTimeout(() => {
        setFigmaFrames([
          { id: 1, name: "Frame 1", width: 300, height: 200 },
          { id: 2, name: "Frame 2", width: 400, height: 300 }
        ]);
      }, 800);
    }
  }, [activeTab]);
  
  // Auto-adjust scale based on container size
  useEffect(() => {
    setIsLoading(true);
    
    const handleResize = () => {
      const container = document.querySelector('.preview-container');
      if (!container) return;
      
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      // Use a smaller scale to ensure the page fits completely
      const newScale = Math.min((containerWidth - 40) / 297, (containerHeight - 40) / 420, 0.3);
      setScale(newScale);
      setIsLoading(false);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  return (
    <div className="bg-gray-100 rounded-md overflow-hidden h-full">
      {activeTab === "export" ? (
        <ExportPreview figmaFrames={figmaFrames} isLoading={isLoading} />
      ) : (
        <PaperPreview scale={scale} isLoading={isLoading} />
      )}
    </div>
  );
};

export default PreviewPanel;
