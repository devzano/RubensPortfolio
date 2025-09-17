// app/(site)/watchlistr-web/terms/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Terms from "@/components/Projects/Watchlistr-Web/Terms";

export default function TermsStandalone() {
  const router = useRouter();
  const close = () => router.push("/watchlistr-web", { scroll: false });
  return (
    <Modal
      isOpen
      onClose={close}
      title="Watchlistr Web"
      contentClassName="modal-content glassy-effect"
    >
      <Terms />
    </Modal>
  );
}