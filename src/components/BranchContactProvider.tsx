import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { MessageCircle, Phone, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { branches, type BranchContact } from "@/data/branches";

export type ContactMode = "call" | "whatsapp";

type BranchContactContextValue = {
  openContact: (mode: ContactMode) => void;
};

const BranchContactContext = createContext<BranchContactContextValue | null>(null);

export const useBranchContact = () => {
  const ctx = useContext(BranchContactContext);
  if (!ctx) {
    throw new Error("useBranchContact must be used within BranchContactProvider");
  }
  return ctx;
};

const contactCopy: Record<ContactMode, { title: string; description: string; actionLabel: string }> = {
  call: {
    title: "Call a Branch",
    description: "Choose which Pearls Opticians branch you’d like to call.",
    actionLabel: "Call",
  },
  whatsapp: {
    title: "WhatsApp a Branch",
    description: "Choose which branch you’d like to message on WhatsApp.",
    actionLabel: "WhatsApp",
  },
};

const BranchContactProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ContactMode>("call");

  const openContact = useCallback((nextMode: ContactMode) => {
    setMode(nextMode);
    setOpen(true);
  }, []);

  const handleSelect = (branch: BranchContact) => {
    setOpen(false);
    if (mode === "call") {
      window.location.href = branch.telHref;
      return;
    }
    window.open(branch.whatsappHref, "_blank", "noopener,noreferrer");
  };

  const value = useMemo(() => ({ openContact }), [openContact]);
  const copy = contactCopy[mode];

  return (
    <BranchContactContext.Provider value={value}>
      {children}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md rounded-2xl border-border p-0 gap-0 overflow-hidden sm:rounded-2xl">
          <DialogHeader className="px-6 pt-6 pb-4 text-left border-b border-border">
            <DialogTitle className="font-heading text-xl text-foreground">{copy.title}</DialogTitle>
            <DialogDescription className="text-muted-foreground font-body">
              {copy.description}
            </DialogDescription>
          </DialogHeader>

          <div className="p-3 sm:p-4 space-y-2 max-h-[70vh] overflow-y-auto">
            {branches.map((branch) => (
              <button
                key={branch.name}
                type="button"
                onClick={() => handleSelect(branch)}
                className="w-full text-left rounded-xl border border-border bg-card p-4 hover:border-primary/40 hover:bg-accent/60 transition-colors group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-heading font-semibold text-foreground mb-1">{branch.name}</p>
                    <p className="text-xs text-muted-foreground flex items-start gap-1.5 mb-2">
                      <MapPin size={12} className="mt-0.5 shrink-0 text-primary" />
                      <span className="leading-relaxed">{branch.address}</span>
                    </p>
                    <p className="text-sm font-medium text-primary">{branch.tel}</p>
                  </div>
                  <span
                    className={`shrink-0 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium ${
                      mode === "whatsapp"
                        ? "bg-[hsl(142,70%,45%)] text-primary-foreground"
                        : "gradient-teal text-primary-foreground"
                    }`}
                  >
                    {mode === "whatsapp" ? <MessageCircle size={14} /> : <Phone size={14} />}
                    {copy.actionLabel}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </BranchContactContext.Provider>
  );
};

export default BranchContactProvider;
