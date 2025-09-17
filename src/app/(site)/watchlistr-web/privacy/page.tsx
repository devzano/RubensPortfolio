// app/(site)/watchlistr-web/privacy/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Privacy from "@/components/Projects/Watchlistr-Web/Privacy";

export default function PrivacyStandalone() {
  const router = useRouter();
  const close = () => router.push("/watchlistr-web", { scroll: false });
  return (
    <Modal
      isOpen
      onClose={close}
      title="Privacy Policy"
      contentClassName="modal-content glassy-effect"
    >
      <Privacy />
    </Modal>
  );
}