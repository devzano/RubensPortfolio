// app/(site)/echoexpense/privacy/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Privacy from "@/components/Projects/EchoExpense/Privacy";

export default function PrivacyStandalone() {
  const router = useRouter();
  const close = () => router.push("/echoexpense", { scroll: false });
  return (
    <Modal
      isOpen
      onClose={close}
      title="EchoExpense"
      contentClassName="modal-content glassy-effect"
    >
      <Privacy />
    </Modal>
  );
}