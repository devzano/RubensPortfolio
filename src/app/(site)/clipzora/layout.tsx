// app/(site)/creaturerealm/layout.tsx
export const metadata = { title: "CreatureRealm" };

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