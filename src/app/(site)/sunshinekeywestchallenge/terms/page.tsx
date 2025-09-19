// app/(site)/sunshinekeywestchallenge/terms/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Terms from "@/components/Projects/SunshineKeyWestChallenge/Terms";

export default function TermsStandalone() {
  const router = useRouter();
  const close = () => router.push("/sunshinekeywestchallenge", { scroll: false });
  return (
    <Modal
      isOpen
      onClose={close}
      title="Sunshine Key West Challenge"
      contentClassName="glassy-effect"
    >
      <Terms />
    </Modal>
  );
}