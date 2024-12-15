import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

type DestructiveActionDialogProps = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  action: () => Promise<boolean>;
};

const DestructiveActionDialog = ({
  children,
  isOpen,
  setIsOpen,
  action,
}: DestructiveActionDialogProps) => {
  const onAction = async () => {
    const success = await action();

    if (success) {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem a certeza absoluta?</DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita. Isto irá eliminar permanentemente
            os seus dados.
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full items-center justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onAction}>
            Continuar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DestructiveActionDialog;
