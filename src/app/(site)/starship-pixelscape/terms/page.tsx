// app/(site)/starship-pixelscape/terms/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Terms from "@/components/Projects/StarshipPixelscape/Terms";

export default function TermsStandalone() {
  const router = useRouter();
  const close = () => router.push("/starship-pixelscape", { scroll: false });
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