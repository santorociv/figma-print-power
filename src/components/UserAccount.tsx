
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePrintSettings } from "@/context/PrintSettingsContext";
import { useToast } from "@/hooks/use-toast";

interface UserAccountProps {
  onClose: () => void;
}

type SavedSetting = {
  id: string;
  name: string;
  type: "page" | "color" | "marks" | "export";
  settings: Record<string, any>;
  createdAt: string;
};

const UserAccount = ({ onClose }: UserAccountProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "register" | "saved-settings">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [settingName, setSettingName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedSettings, setSavedSettings] = useState<SavedSetting[]>([]);
  const { settings, updateSettings } = usePrintSettings();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would connect to a backend auth service
    if (email && password) {
      setIsLoggedIn(true);
      // Mock data for saved settings
      setSavedSettings([
        {
          id: "1",
          name: "Magazine A4",
          type: "page",
          settings: { pageSize: "a4", orientation: "portrait" },
          createdAt: new Date().toISOString()
        },
        {
          id: "2", 
          name: "Brochure FOGRA39",
          type: "color",
          settings: { colorProfile: "FOGRA39", dpi: 300 },
          createdAt: new Date().toISOString()
        }
      ]);
      toast({
        title: "Success",
        description: "You have successfully logged in",
      });
    } else {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would connect to a backend auth service
    if (email && password) {
      setIsLoggedIn(true);
      toast({
        title: "Success",
        description: "Your account has been created",
      });
    } else {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
    }
  };

  const handleSaveSetting = () => {
    if (!settingName) {
      toast({
        title: "Error",
        description: "Please enter a name for your setting",
        variant: "destructive",
      });
      return;
    }

    const newSetting: SavedSetting = {
      id: Date.now().toString(),
      name: settingName,
      type: "page", // Default to page settings, you could add UI to choose type
      settings: { ...settings },
      createdAt: new Date().toISOString()
    };

    setSavedSettings([newSetting, ...savedSettings]);
    setSettingName("");
    toast({
      title: "Success",
      description: "Your settings have been saved",
    });
  };

  const handleLoadSetting = (setting: SavedSetting) => {
    updateSettings(setting.settings);
    toast({
      title: "Settings Loaded",
      description: `${setting.name} has been applied`,
    });
    onClose();
  };

  const handleDeleteSetting = (id: string) => {
    setSavedSettings(savedSettings.filter(setting => setting.id !== id));
    toast({
      title: "Deleted",
      description: "Setting has been removed",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Your Account</h2>
          
          {!isLoggedIn ? (
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Log In</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter your password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">Log In</Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input 
                      id="register-email" 
                      type="email" 
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input 
                      id="register-password" 
                      type="password" 
                      placeholder="Create a password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">Create Account</Button>
                </form>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Save Current Settings</h3>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Name your settings preset" 
                    value={settingName}
                    onChange={(e) => setSettingName(e.target.value)}
                  />
                  <Button onClick={handleSaveSetting}>Save</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Your Saved Settings</h3>
                {savedSettings.length > 0 ? (
                  <ul className="space-y-2 max-h-[300px] overflow-y-auto">
                    {savedSettings.map((setting) => (
                      <li key={setting.id} className="border rounded-md p-3 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{setting.name}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(setting.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleLoadSetting(setting)}
                          >
                            Load
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteSetting(setting.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No saved settings yet.</p>
                )}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setIsLoggedIn(false);
                  setEmail("");
                  setPassword("");
                }}
              >
                Log Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
