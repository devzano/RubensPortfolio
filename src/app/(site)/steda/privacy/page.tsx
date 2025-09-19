// app/(site)/steda/privacy/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Privacy from "@/components/Projects/Steda/Privacy";

export default function PrivacyStandalone() {
  const router = useRouter();
  const close = () => router.push("/steda", { scroll: false });
  return (
    <Modal
      isOpen
      onClose={close}
      title="Steda"
      contentClassName="glassy-effect"
    >
      <Privacy />
    </Modal>
  );
}