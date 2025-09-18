// app/(site)/watchlistr-mobile/layout.tsx
export const metadata = { title: "Watchlistr Mobile" };

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