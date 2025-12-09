// app/(site)/creaturerealm/@modal/(.)privacy/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Privacy from "@/components/Projects/CreatureRealm/Privacy";

export default function PrivacyModalOverlay() {
  const router = useRouter();
  const close = () => router.back();
  return (
    <Modal
      isOpen
      onClose={close}
      title="CreatureRealm"
      contentClassName="modal-content glassy-effect"
    >
      <Privacy />
    </Modal>
  );
}