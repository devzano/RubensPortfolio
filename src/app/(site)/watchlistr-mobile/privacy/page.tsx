// app/(site)/watchlistr-mobile/privacy/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Privacy from "@/components/Projects/Watchlistr-Mobile/Privacy";

export default function PrivacyStandalone() {
  const router = useRouter();
  const close = () => router.push("/watchlistr-mobile", { scroll: false });
  return (
    <Modal
      isOpen
      onClose={close}
      title="Privacy Policy"
      contentClassName="glassy-effect"
    >
      <Privacy />
    </Modal>
  );
}