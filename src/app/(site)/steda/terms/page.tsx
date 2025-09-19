// app/(site)/steda/terms/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Terms from "@/components/Projects/Steda/Terms";

export default function TermsStandalone() {
  const router = useRouter();
  const close = () => router.push("/steda", { scroll: false });
  return (
    <Modal
      isOpen
      onClose={close}
      title="Steda"
      contentClassName="glassy-effect"
    >
      <Terms />
    </Modal>
  );
}