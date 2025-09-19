// app/(site)/starship-pixelscape/privacy/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Privacy from "@/components/Projects/StarshipPixelscape/Privacy";

export default function PrivacyStandalone() {
  const router = useRouter();
  const close = () => router.push("/starship-pixelscape", { scroll: false });
  return (
    <Modal
      isOpen
      onClose={close}
      title="Starship Pixelscape"
      contentClassName="glassy-effect"
    >
      <Privacy />
    </Modal>
  );
}