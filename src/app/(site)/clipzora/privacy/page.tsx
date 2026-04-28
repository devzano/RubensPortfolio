// app/(site)/clipzora/privacy/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Privacy from "@/components/Projects/Clipzora/Privacy";

export default function PrivacyStandalone() {
  const router = useRouter();
  const close = () => router.push("/clipzora", { scroll: false });
  return (
    <Modal
      isOpen
      onClose={close}
      title="Clipzora"
      contentClassName="glassy-effect"
    >
      <Privacy />
    </Modal>
  );
}