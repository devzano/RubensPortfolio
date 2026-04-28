// app/(site)/clipzora/terms/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Terms from "@/components/Projects/Clipzora/Terms";

export default function TermsStandalone() {
  const router = useRouter();
  const close = () => router.push("/clipzora", { scroll: false });
  return (
    <Modal
      isOpen
      onClose={close}
      title="Clipzora"
      contentClassName="glassy-effect"
    >
      <Terms />
    </Modal>
  );
}