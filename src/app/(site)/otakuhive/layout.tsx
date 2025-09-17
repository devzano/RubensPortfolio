// app/(site)/otakuhive/layout.tsx
export const metadata = { title: "OtakuHive — Ruben Manzano" };

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