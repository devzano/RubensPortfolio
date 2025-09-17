// app/(site)/autoarchive/privacy/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Privacy from "@/components/Projects/AutoArchive/Privacy";

export default function PrivacyStandalone() {
  const router = useRouter();
  const close = () => router.push("/autoarchive", { scroll: false });
  return (
    <Modal
      isOpen
      onClose={close}
      title="AutoArchive"
      contentClassName="modal-content glassy-effect"
    >
      <Privacy />
    </Modal>
  );
}