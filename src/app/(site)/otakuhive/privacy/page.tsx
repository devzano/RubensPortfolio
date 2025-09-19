// app/(site)/otakuhive/privacy/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Privacy from "@/components/Projects/OtakuHive/Privacy";

export default function PrivacyStandalone() {
  const router = useRouter();
  const close = () => router.push("/otakuhive", { scroll: false });
  return (
    <Modal
      isOpen
      onClose={close}
      title="OtakuHive"
      contentClassName="glassy-effect"
    >
      <Privacy />
    </Modal>
  );
}