// app/(site)/reciperealm/terms/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Terms from "@/components/Projects/RecipeRealm/Terms";

export default function TermsStandalone() {
  const router = useRouter();
  const close = () => router.push("/reciperealm", { scroll: false });
  return (
    <Modal
      isOpen
      onClose={close}
      title="RecipeRealm"
      contentClassName="modal-content glassy-effect"
    >
      <Terms />
    </Modal>
  );
}