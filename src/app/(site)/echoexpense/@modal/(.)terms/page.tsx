// app/(site)/echoexpense/@modal/(.)terms/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Terms from "@/components/Projects/EchoExpense/Terms";

export default function TermsModalOverlay() {
  const router = useRouter();
  const close = () => router.back();
  return (
    <Modal
      isOpen
      onClose={close}
      title="EchoExpense"
      contentClassName="modal-content glassy-effect"
    >
      <Terms />
    </Modal>
  );
}