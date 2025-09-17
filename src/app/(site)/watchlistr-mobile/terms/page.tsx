// app/(site)/watchlistr-mobile/terms/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Terms from "@/components/Projects/Watchlistr-Mobile/Terms";

export default function TermsStandalone() {
  const router = useRouter();
  const close = () => router.push("/watchlistr-mobile", { scroll: false });
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