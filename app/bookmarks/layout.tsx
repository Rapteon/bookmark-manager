import { SessionProvider } from "next-auth/react";
import Header from "../ui/header/header";

export default async function BookmarksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await auth()
  // if (!session) return <div>Not authenticated</div>
  return (
    <SessionProvider>
      <Header />
      {children}
    </SessionProvider>
  );
}
