// app/(site)/starship-pixelscape/layout.tsx
export const metadata = { title: "Starship Pixelscape" };

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