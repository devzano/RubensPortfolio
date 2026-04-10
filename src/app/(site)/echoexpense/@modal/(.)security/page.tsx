// app/(site)/echoexpense/@modal/(.)security/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Security from "@/components/Projects/EchoExpense/Security";

export default function SecurityModalOverlay() {
  const router = useRouter();
  const close = () => router.back();
  return (
    <Modal
      isOpen
      onClose={close}
      title="EchoExpense"
      contentClassName="modal-content glassy-effect"
    >
      <Security />
    </Modal>
  );
}