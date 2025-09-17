// app/(site)/watchlistr-web/@modal/(.)privacy/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Privacy from "@/components/Projects/Watchlistr-Web/Privacy";

export default function PrivacyModalOverlay() {
  const router = useRouter();
  const close = () => router.back();
  return (
    <Modal
      isOpen
      onClose={close}
      title="Privacy Policy"
      contentClassName="glassy-effect"
    >
      <Privacy />
    </Modal>
  );
}