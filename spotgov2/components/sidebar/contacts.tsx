"use client";

import {
  Calendar,
  Check,
  Copy,
  Info,
  LucideIcon,
  Mail,
  Phone,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";
import { UserButtonContactsSchema } from "@/lib/i18n/types";

type InfoDetail = {
  key: string;
  icon: LucideIcon;
  title: string;
  description: string;
  details: string;
};

type ContactsProps = {
  contacts: z.infer<typeof UserButtonContactsSchema>["contacts"];
};

const Contacts = ({ contacts }: ContactsProps) => {
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);
  const [copiedAction, setCopiedAction] = useState<string | null>(null);

  const infoDetails: InfoDetail[] = [
    {
      key: "call",
      icon: Phone,
      title: contacts.call.title,
      description: contacts.call.subtitle,
      details: "+351 929 052 364",
    },
    {
      key: "email",
      icon: Mail,
      title: contacts.email.title,
      description: contacts.email.subtitle,
      details: "info@spotgov.com",
    },
    {
      key: "book",
      icon: Calendar,
      title: contacts.meeting.title,
      description: contacts.meeting.subtitle,
      details: "cal.com/spotgov",
    },
  ];

  const handleCopy = (e: React.MouseEvent, action: string, content: string) => {
    e.stopPropagation();

    navigator.clipboard.writeText(content).then(() => {
      setCopiedAction(action);
      toast.success(contacts.toasts.success.copied);
      setTimeout(() => setCopiedAction(null), 2000);
    });
  };

  const handleAction = (action: string, detail: string) => {
    switch (action) {
      case "call":
        window.location.href = `tel:+351929052364`;
        break;
      case "email":
        window.location.href = `mailto:${detail}`;
        break;
      case "book":
        window.open("https://cal.com/spotgov", "_blank");
        break;
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2 text-sm hover:text-primary">
        <Info size={16} />
        <span>Contactos</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contactos</DialogTitle>
          <DialogDescription>
            Tem alguma dúvida? Entre em contacto connosco.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="grid cursor-pointer grid-cols-3 gap-3 py-4">
            {infoDetails.map((info) => (
              <div key={info.key} className="h-[200px]">
                <motion.div
                  className="flex h-full flex-col"
                  onHoverStart={() => setHoveredAction(info.key)}
                  onHoverEnd={() => setHoveredAction(null)}
                  onClick={() => handleAction(info.key, info.details)}
                >
                  <motion.div
                    className="bg-primary/5 hover:bg-primary/10 flex flex-col items-center justify-center space-y-2 rounded-lg border border-primary p-4 text-center transition-colors"
                    animate={{
                      height: hoveredAction === info.key ? "150px" : "200px",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="rounded-full p-3">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">{info.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {info.description}
                    </p>
                  </motion.div>
                  <AnimatePresence>
                    {hoveredAction === info.key && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "40px" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-[10px]"
                      >
                        <div
                          onClick={(e) => handleCopy(e, info.key, info.details)}
                          className="bg-primary/5 hover:bg-primary/10 flex h-full w-full items-center justify-between rounded-lg border border-primary px-2 text-sm transition-colors"
                        >
                          <span className="text-xs">{info.details}</span>
                          {copiedAction === info.key ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4 text-primary" />
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default Contacts;
