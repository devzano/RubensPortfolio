// app/(site)/reciperealm/privacy/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Privacy from "@/components/Projects/RecipeRealm/Privacy";

export default function PrivacyStandalone() {
  const router = useRouter();
  const close = () => router.push("/reciperealm", { scroll: false });
  return (
    <Modal
      isOpen
      onClose={close}
      title="RecipeRealm"
      contentClassName="glassy-effect"
    >
      <Privacy />
    </Modal>
  );
}