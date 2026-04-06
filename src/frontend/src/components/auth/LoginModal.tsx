import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, KeyRound, Lock, Phone, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdminLogin: (username: string, password: string) => boolean;
  onUserLogin: (mobile: string, accessCode: string) => boolean;
  onSignupClick: () => void;
}

export function LoginModal({
  isOpen,
  onClose,
  onAdminLogin,
  onUserLogin,
  onSignupClick,
}: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [adminForm, setAdminForm] = useState({ username: "", password: "" });
  const [userForm, setUserForm] = useState({ mobile: "", accessCode: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const success = onAdminLogin(adminForm.username, adminForm.password);
    if (success) {
      toast.success("Admin login successful!");
      onClose();
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
    setIsLoading(false);
  };

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const success = onUserLogin(userForm.mobile, userForm.accessCode);
    if (success) {
      toast.success("Login successful! Welcome back.");
      onClose();
    } else {
      toast.error(
        "Invalid mobile or access code. Please check your credentials.",
      );
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" data-ocid="login.dialog">
        <DialogHeader>
          <DialogTitle className="text-center text-green-800 text-xl">
            Login to Your Account
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="user" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user" data-ocid="login.user.tab">
              Member Login
            </TabsTrigger>
            <TabsTrigger value="admin" data-ocid="login.admin.tab">
              Admin Login
            </TabsTrigger>
          </TabsList>

          <TabsContent value="user" className="space-y-4 pt-4">
            <form onSubmit={handleUserLogin} className="space-y-4">
              <div>
                <Label htmlFor="login-mobile">Mobile Number</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="login-mobile"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={userForm.mobile}
                    onChange={(e) =>
                      setUserForm((p) => ({ ...p, mobile: e.target.value }))
                    }
                    data-ocid="login.mobile.input"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="login-access-code">Access Code</Label>
                <div className="relative mt-1">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="login-access-code"
                    type="password"
                    placeholder="6-digit access code"
                    value={userForm.accessCode}
                    onChange={(e) =>
                      setUserForm((p) => ({ ...p, accessCode: e.target.value }))
                    }
                    data-ocid="login.access_code.input"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                data-ocid="login.user.submit_button"
                className="w-full"
                style={{ backgroundColor: "#166534" }}
              >
                {isLoading ? "Logging in..." : "Login as Member"}
              </Button>
            </form>
            <p className="text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSignupClick();
                }}
                className="text-green-700 font-medium hover:underline"
                data-ocid="login.signup.link"
              >
                Register Now
              </button>
            </p>
          </TabsContent>

          <TabsContent value="admin" className="space-y-4 pt-4">
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <Label htmlFor="admin-username">Username</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="admin-username"
                    placeholder="Admin username"
                    value={adminForm.username}
                    onChange={(e) =>
                      setAdminForm((p) => ({ ...p, username: e.target.value }))
                    }
                    data-ocid="login.admin_username.input"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="admin-password">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Admin password"
                    value={adminForm.password}
                    onChange={(e) =>
                      setAdminForm((p) => ({ ...p, password: e.target.value }))
                    }
                    data-ocid="login.admin_password.input"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                data-ocid="login.admin.submit_button"
                className="w-full"
                style={{ backgroundColor: "#166534" }}
              >
                {isLoading ? "Logging in..." : "Login as Admin"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
