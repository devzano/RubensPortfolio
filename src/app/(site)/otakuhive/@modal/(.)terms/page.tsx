// app/(site)/otakuhive/@modal/(.)terms/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Terms from "@/components/Projects/OtakuHive/Terms";

export default function TermsModalOverlay() {
  const router = useRouter();
  const close = () => router.back();
  return (
    <Modal
      isOpen
      onClose={close}
      title="OtakuHive"
      contentClassName="modal-content glassy-effect"
    >
      <Terms />
    </Modal>
  );
}