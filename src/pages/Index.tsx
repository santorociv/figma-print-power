
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageSettings from "@/components/PageSettings";
import PrintMarks from "@/components/PrintMarks";
import ColorSettings from "@/components/ColorSettings";
import ExportOptions from "@/components/ExportOptions";
import PreviewPanel from "@/components/PreviewPanel";
import { PrintSettingsProvider } from "@/context/PrintSettingsContext";
import { Printer, Layers, Palette, Download, UserCircle2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAccount from "@/components/UserAccount";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [activeTab, setActiveTab] = useState("page-settings");
  const [showUserAccount, setShowUserAccount] = useState(false);

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

              <div className="bg-white rounded-md border flex-grow overflow-hidden flex flex-col h-full">
                <ScrollArea className="flex-grow p-4 h-full">
                  <TabsContent value="page-settings" className="mt-0 h-full">
                    <PageSettings />
                  </TabsContent>
                  <TabsContent value="print-marks" className="mt-0 h-full">
                    <PrintMarks />
                  </TabsContent>
                  <TabsContent value="color-settings" className="mt-0 h-full">
                    <ColorSettings />
                  </TabsContent>
                  <TabsContent value="export-options" className="mt-0 h-full">
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

        {showUserAccount && <UserAccount onClose={() => setShowUserAccount(false)} />}
      </div>
    </PrintSettingsProvider>
  );
};

export default Index;
