// app/(site)/watchlistr-mobile/@modal/(.)terms/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Terms from "@/components/Projects/Watchlistr-Mobile/Terms";

export default function TermsModalOverlay() {
  const router = useRouter();
  const close = () => router.back();
  return (
    <Modal
      isOpen
      onClose={close}
      title="Terms of Use"
      contentClassName="modal-content glassy-effect"
    >
      <Terms />
    </Modal>
  );
}