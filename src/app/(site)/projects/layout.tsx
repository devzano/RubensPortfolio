// app/(site)/projects/layout.tsx
export const metadata = { title: "All Projects" };

export default function Layout({
  children,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}