// app/(site)/yieldlens/privacy/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Privacy from "@/components/Projects/YieldLens/Privacy";

export default function PrivacyStandalone() {
  const router = useRouter();
  const close = () => router.push("/projects", { scroll: false });

  return (
    <Modal
      isOpen
      onClose={close}
      title="YieldLens"
      contentClassName="glassy-effect"
    >
      <Privacy />
    </Modal>
  );
}
