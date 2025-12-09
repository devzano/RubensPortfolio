// app/(site)/creaturerealm/terms/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Terms from "@/components/Projects/CreatureRealm/Terms";

export default function TermsStandalone() {
  const router = useRouter();
  const close = () => router.push("/creaturerealm", { scroll: false });
  return (
    <Modal
      isOpen
      onClose={close}
      title="CreatureRealm"
      contentClassName="glassy-effect"
    >
      <Terms />
    </Modal>
  );
}