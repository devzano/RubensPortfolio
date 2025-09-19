// app/(site)/sunshinekeywestchallenge/privacy/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Privacy from "@/components/Projects/SunshineKeyWestChallenge/Privacy";

export default function PrivacyStandalone() {
  const router = useRouter();
  const close = () => router.push("/sunshinekeywestchallenge", { scroll: false });
  return (
    <Modal
      isOpen
      onClose={close}
      title="Sunshine Key West Challenge"
      contentClassName="glassy-effect"
    >
      <Privacy />
    </Modal>
  );
}