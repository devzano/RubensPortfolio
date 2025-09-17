// app/(site)/logiqo/terms/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Terms from "@/components/Projects/Logiqo/Terms";

export default function TermsStandalone() {
  const router = useRouter();
  const close = () => router.push("/logiqo", { scroll: false });
  return (
    <Modal
      isOpen
      onClose={close}
      title="Logiqo"
      contentClassName="modal-content glassy-effect"
    >
      <Terms />
    </Modal>
  );
}