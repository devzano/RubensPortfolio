// app/(site)/echoexpense/security/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Security from "@/components/Projects/EchoExpense/Security";

export default function SecurityStandalone() {
  const router = useRouter();
  const close = () => router.push("/echoexpense", { scroll: false });
  return (
    <Modal
      isOpen
      onClose={close}
      title="EchoExpense"
      contentClassName="glassy-effect"
    >
      <Security />
    </Modal>
  );
}