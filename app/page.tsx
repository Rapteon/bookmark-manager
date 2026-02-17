import SignInButton from "./ui/sign-in-button";

export default function Home() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-8">
      <section className="flex items-center justify-center flex-col">
        <h1 className="text-5xl font-bold text-center">Bookmark Manager</h1>
        <h2 className="text-2xl text-center mt-4">A simple bookmark manager</h2>
      </section>
      <section className="flex items-center justify-center">
        <SignInButton />
      </section>
    </div>
  );
}
