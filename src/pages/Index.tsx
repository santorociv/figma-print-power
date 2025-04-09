
import { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageSettings from "@/components/PageSettings";
import PrintMarks from "@/components/PrintMarks";
import ColorSettings from "@/components/ColorSettings";
import ExportOptions from "@/components/ExportOptions";
import PreviewPanel from "@/components/PreviewPanel";
import { PrintSettingsProvider } from "@/context/PrintSettingsContext";
import { Layers, Download, UserCircle2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAccount from "@/components/UserAccount";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [showUserAccount, setShowUserAccount] = useState(false);
  const [panelHeight, setPanelHeight] = useState(0);
  const previewPanelRef = useRef<HTMLDivElement>(null);

  // Update panel height based on the preview panel
  useEffect(() => {
    const updateHeight = () => {
      if (previewPanelRef.current) {
        // Get the height of the preview panel and apply it to the left panel
        const height = previewPanelRef.current.offsetHeight;
        setPanelHeight(height);
      }
    };

    // Set initial height
    updateHeight();
    
    // Update height when window resizes
    window.addEventListener('resize', updateHeight);
    
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <PrintSettingsProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="bg-white border-b px-6 py-4">
          <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
            <div className="flex items-center">
              <div className="mr-3">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="14" cy="14" r="12" fill="white" stroke="#333" strokeWidth="1"/>
                  <circle cx="14" cy="14" r="6" fill="#00C4CC" fillOpacity="0.7"/>
                  <circle cx="9" cy="14" r="6" fill="#FF5F56" fillOpacity="0.7"/>
                  <circle cx="14" cy="9" r="6" fill="#FFDB00" fillOpacity="0.7"/>
                  <circle cx="19" cy="14" r="6" fill="#9747FF" fillOpacity="0.7"/>
                  <path d="M10 19L18 19" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M14 15V23" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  Figma to Print
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Layout design tool to manage your printable edits from Figma
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => setShowUserAccount(true)}
            >
              <UserCircle2 className="h-4 w-4" />
              <span>Account</span>
            </Button>
          </div>
        </header>

        <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full p-6 gap-6">
          <div className="md:w-1/3 flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="create" className="flex items-center justify-center">
                  <Layers className="h-4 w-4 mr-2" />
                  <span>Create</span>
                </TabsTrigger>
                <TabsTrigger value="export" className="flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  <span>Export</span>
                </TabsTrigger>
              </TabsList>

              <div 
                className="bg-white rounded-md border flex-grow overflow-hidden flex flex-col"
                style={{ height: panelHeight > 0 ? `${panelHeight}px` : 'auto' }}
              >
                <ScrollArea className="flex-grow p-4 h-full">
                  <TabsContent value="create" className="mt-0 h-full space-y-8">
                    <PageSettings />
                    <div className="border-t pt-6">
                      <PrintMarks />
                    </div>
                  </TabsContent>
                  <TabsContent value="export" className="mt-0 h-full space-y-8">
                    <ColorSettings />
                    <div className="border-t pt-6">
                      <ExportOptions />
                    </div>
                  </TabsContent>
                </ScrollArea>
              </div>
            </Tabs>
          </div>
          
          <div 
            ref={previewPanelRef} 
            className="md:w-2/3 bg-white p-6 rounded-md border"
          >
            <h2 className="text-lg font-medium mb-4">Preview</h2>
            <PreviewPanel />
          </div>
        </div>

        {showUserAccount && <UserAccount onClose={() => setShowUserAccount(false)} />}
      </div>
    </PrintSettingsProvider>
  );
};

export default Index;
