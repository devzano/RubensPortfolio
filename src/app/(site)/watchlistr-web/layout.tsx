// app/(site)/watchlistr-web/layout.tsx
export const metadata = { title: "Watchlistr Web — Ruben Manzano" };

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