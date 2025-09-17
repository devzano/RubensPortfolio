// app/(site)/logiqo/privacy/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Privacy from "@/components/Projects/Logiqo/Privacy";

export default function PrivacyStandalone() {
  const router = useRouter();
  const close = () => router.push("/logiqo", { scroll: false });
  return (
    <Modal
      isOpen
      onClose={close}
      title="Logiqo"
      contentClassName="modal-content glassy-effect"
    >
      <Privacy />
    </Modal>
  );
}