import { MessageCircle } from "lucide-react";
import { useBranchContact } from "@/components/BranchContactProvider";

const WhatsAppButton = () => {
  const { openContact } = useBranchContact();

  return (
    <button
      type="button"
      onClick={() => openContact("whatsapp")}
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 h-14 pl-4 pr-5 rounded-full bg-[hsl(142,70%,45%)] flex items-center gap-2.5 shadow-lg hover:scale-105 transition-transform duration-200"
    >
      <MessageCircle size={24} className="text-primary-foreground shrink-0" />
      <span className="text-primary-foreground font-body font-semibold text-sm whitespace-nowrap">
        Chat with us
      </span>
    </button>
  );
};

export default WhatsAppButton;
