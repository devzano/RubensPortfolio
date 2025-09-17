// app/(site)/autoarchive/layout.tsx
export const metadata = { title: "AutoArchive — Ruben Manzano" };

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}