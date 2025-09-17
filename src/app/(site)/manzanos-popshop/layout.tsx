// app/(site)/manzanos-popshop/layout.tsx
export const metadata = { title: "Manzanos PopShop — Ruben Manzano" };

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