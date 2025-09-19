// app/(site)/manzanos-popshop/terms/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Terms from "@/components/Projects/ManzanosPopShop/Terms";

export default function TermsStandalone() {
  const router = useRouter();
  const close = () => router.push("/manzanos-popshop", { scroll: false });
  return (
    <Modal
      isOpen
      onClose={close}
      title="Manzanos PopShop"
      contentClassName="glassy-effect"
    >
      <Terms />
    </Modal>
  );
}