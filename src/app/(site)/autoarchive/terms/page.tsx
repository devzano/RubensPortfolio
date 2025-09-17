// app/(site)/autoarchive/terms/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Terms from "@/components/Projects/AutoArchive/Terms";

export default function TermsStandalone() {
  const router = useRouter();
  const close = () => router.push("/autoarchive", { scroll: false });
  return (
    <Modal
      isOpen
      onClose={close}
      title="AutoArchive"
      contentClassName="modal-content glassy-effect"
    >
      <Terms />
    </Modal>
  );
}