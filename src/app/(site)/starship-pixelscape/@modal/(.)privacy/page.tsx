// app/(site)/starship-pixelscape/@modal/(.)privacy/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Privacy from "@/components/Projects/StarshipPixelscape/Privacy";

export default function PrivacyModalOverlay() {
  const router = useRouter();
  const close = () => router.back();
  return (
    <Modal
      isOpen
      onClose={close}
      title="Starship Pixelscape"
      contentClassName="modal-content glassy-effect"
    >
      <Privacy />
    </Modal>
  );
}