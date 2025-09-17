// app/(site)/sunshinekeywestchallenge/layout.tsx
export const metadata = { title: "Sunshine Key West Challenge — Ruben Manzano" };

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