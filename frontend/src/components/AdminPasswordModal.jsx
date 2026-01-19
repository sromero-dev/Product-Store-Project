import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const AdminPasswordModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}) => {
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (password.trim()) {
      onConfirm(password);
      setPassword("");
    }
  };

  const handleClose = () => {
    setPassword("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Admin Password Required</DialogTitle>
          <DialogDescription>
            Enter the admin password to create or delete products
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
            disabled={isLoading}
          />
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !password.trim()}
            >
              {isLoading ? "Verifying..." : "Confirm"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
