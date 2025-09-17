// app/(site)/echoexpense/terms/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Terms from "@/components/Projects/EchoExpense/Terms";

export default function TermsStandalone() {
  const router = useRouter();
  const close = () => router.push("/echoexpense", { scroll: false });
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