
import { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageSettings from "@/components/PageSettings";
import PrintMarks from "@/components/PrintMarks";
import ColorSettings from "@/components/ColorSettings";
import ExportOptions from "@/components/ExportOptions";
import PreviewPanel from "@/components/PreviewPanel";
import { PrintSettingsProvider } from "@/context/PrintSettingsContext";
import { Layers, Download, UserCircle2, ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAccount from "@/components/UserAccount";
import { Button } from "@/components/ui/button";
import DpiSelector from "@/components/DpiSelector";

const Index = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [containerHeight, setContainerHeight] = useState(window.innerHeight * 0.95);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      setContainerHeight(window.innerHeight * 0.95);
    };
    updateHeight();
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                Figma to Print
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Layout design tool to manage your printable edits from Figma
              </p>
            </div>
          </div>
        </header>

        <div 
          className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full p-6 gap-6"
          style={{ height: `${containerHeight}px`, minHeight: 0 }}
        >
          <div 
            className="md:w-1/3 flex flex-col"
            style={{ height: '100%', minHeight: 0 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="create" className="flex items-center justify-center">
                  <span className="flex items-center">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="M12 5v14m7-7H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    <span>Create</span>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="export" className="flex items-center justify-center">
                  <span className="flex items-center">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 12l5 5 5-5M12 17V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span>Export</span>
                  </span>
                </TabsTrigger>
              </TabsList>

              <div className="bg-white rounded-md border flex-grow overflow-hidden flex flex-col min-h-0">
                <ScrollArea className="flex-1 min-h-0">
                  <div className="p-4 pb-20">
                    <TabsContent value="create" className="mt-0 space-y-6 m-0">
                      <PageSettings />
                      <div className="border-t pt-4">
                        <PrintMarks />
                      </div>
                      <div className="border-t pt-4">
                        <h4 className="text-sm font-medium mb-2">DPI (Resolution)</h4>
                        <DpiSelector />
                      </div>
                    </TabsContent>
                    <TabsContent value="export" className="mt-0 space-y-6 m-0">
                      <ColorSettings />
                      <div className="border-t pt-4">
                        <ExportOptions />
                      </div>
                    </TabsContent>
                  </div>
                </ScrollArea>
                <div className="border-t p-4 bg-white sticky bottom-0">
                  {activeTab === "create" ? (
                    <Button className="w-full" size="lg">
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="M12 5v14m7-7H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                      <span>Create Frame in Figma</span>
                    </Button>
                  ) : (
                    <Button className="w-full" size="lg">
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 12l5 5 5-5M12 17V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span>Export Files</span>
                    </Button>
                  )}
                </div>
              </div>
            </Tabs>
          </div>
          
          <div 
            ref={previewContainerRef} 
            className="md:w-2/3 min-h-0 flex flex-col"
            style={{ height: '100%', minHeight: 0 }}
          >
            <div className="bg-white rounded-md border p-4 h-full flex flex-col min-h-0">
              <h2 className="text-lg font-medium mb-2">Preview</h2>
              <div className="flex-grow bg-gray-100 rounded-md overflow-hidden min-h-0">
                <PreviewPanel activeTab={activeTab} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PrintSettingsProvider>
  );
};

export default Index;
