// app/(site)/otakuhive/terms/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Terms from "@/components/Projects/OtakuHive/Terms";

export default function TermsStandalone() {
  const router = useRouter();
  const close = () => router.push("/otakuhive", { scroll: false });
  return (
    <Modal
      isOpen
      onClose={close}
      title="OtakuHive"
      contentClassName="glassy-effect"
    >
      <Terms />
    </Modal>
  );
}