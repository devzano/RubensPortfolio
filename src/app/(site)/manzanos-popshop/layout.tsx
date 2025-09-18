// app/(site)/manzanos-popshop/layout.tsx
export const metadata = { title: "Manzanos PopShop" };

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