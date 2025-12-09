// app/(site)/creaturerealm/privacy/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Privacy from "@/components/Projects/CreatureRealm/Privacy";

export default function PrivacyStandalone() {
  const router = useRouter();
  const close = () => router.push("/creaturerealm", { scroll: false });
  return (
    <Modal
      isOpen
      onClose={close}
      title="CreatureRealm"
      contentClassName="glassy-effect"
    >
      <Privacy />
    </Modal>
  );
}