// app/(site)/starship-pixelscape/@modal/(.)terms/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Terms from "@/components/Projects/StarshipPixelscape/Terms";

export default function TermsModalOverlay() {
  const router = useRouter();
  const close = () => router.back();
  return (
    <Modal
      isOpen
      onClose={close}
      title="Starship Pixelscape"
      contentClassName="modal-content glassy-effect"
    >
      <Terms />
    </Modal>
  );
}