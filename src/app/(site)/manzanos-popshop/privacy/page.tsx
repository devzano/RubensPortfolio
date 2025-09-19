// app/(site)/manzanos-popshop/privacy/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Privacy from "@/components/Projects/ManzanosPopShop/Privacy";

export default function PrivacyStandalone() {
  const router = useRouter();
  const close = () => router.push("/manzanos-popshop", { scroll: false });
  return (
    <Modal
      isOpen
      onClose={close}
      title="Manzanos PopShop"
      contentClassName="glassy-effect"
    >
      <Privacy />
    </Modal>
  );
}