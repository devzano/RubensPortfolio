"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Terms from "@/components/Projects/YieldLens/Terms";

export default function TermsStandalone() {
  const router = useRouter();
  const close = () => router.push("/yieldlens", { scroll: false });

  return (
    <Modal
      isOpen
      onClose={close}
      title="YieldLens"
      contentClassName="glassy-effect"
    >
      <Terms />
    </Modal>
  );
}
