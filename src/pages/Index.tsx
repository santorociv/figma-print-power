
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageSettings from "@/components/PageSettings";
import PrintMarks from "@/components/PrintMarks";
import ColorSettings from "@/components/ColorSettings";
import ExportOptions from "@/components/ExportOptions";
import PreviewPanel from "@/components/PreviewPanel";
import { PrintSettingsProvider } from "@/context/PrintSettingsContext";
import { Printer, Layers, Palette, Download } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const [activeTab, setActiveTab] = useState("page-settings");

  return (
    <PrintSettingsProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="bg-white border-b px-6 py-4">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Printer className="w-6 h-6 mr-2 text-figma-blue" />
              Figma to Print
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Layout design tool to manage your printable edits from figma
            </p>
          </div>
        </header>

        <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full p-6 gap-6">
          <div className="md:w-1/3 flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="page-settings" className="flex items-center justify-center">
                  <Layers className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Page</span>
                </TabsTrigger>
                <TabsTrigger value="print-marks" className="flex items-center justify-center">
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3V6M3 3H6M3 3L8 8M3 21V18M3 21H6M3 21L8 16M21 3H18M21 3V6M21 3L16 8M21 21H18M21 21V18M21 21L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="hidden sm:inline">Marks</span>
                </TabsTrigger>
                <TabsTrigger value="color-settings" className="flex items-center justify-center">
                  <Palette className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Color</span>
                </TabsTrigger>
                <TabsTrigger value="export-options" className="flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Export</span>
                </TabsTrigger>
              </TabsList>

              <div className="bg-white rounded-md border flex-grow overflow-hidden flex flex-col">
                <ScrollArea className="flex-grow p-4 h-[calc(100vh-280px)]">
                  <TabsContent value="page-settings" className="mt-0">
                    <PageSettings />
                  </TabsContent>
                  <TabsContent value="print-marks" className="mt-0">
                    <PrintMarks />
                  </TabsContent>
                  <TabsContent value="color-settings" className="mt-0">
                    <ColorSettings />
                  </TabsContent>
                  <TabsContent value="export-options" className="mt-0">
                    <ExportOptions />
                  </TabsContent>
                </ScrollArea>
              </div>
            </Tabs>
          </div>
          
          <div className="md:w-2/3 bg-white p-6 rounded-md border">
            <h2 className="text-lg font-medium mb-4">Preview</h2>
            <PreviewPanel />
          </div>
        </div>
      </div>
    </PrintSettingsProvider>
  );
};

export default Index;
