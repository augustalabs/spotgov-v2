import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const DestructiveActionDialog = ({ children }: { children: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem a certeza absoluta?</DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita. Isto irá eliminar permanentemente
            os dados.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DestructiveActionDialog;
