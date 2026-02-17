import { auth } from "@/app/auth";

export default async function UserGreeting() {
  const session = await auth();

  if (!session?.user) {
    return (
      <h2 className="text-sm font-normal text-neutral-400">
        Hello, Unknown User?
      </h2>
    );
  } else {
    return (
      <h2 className="text-sm font-normal text-neutral-400">
        Hello, {session.user.name}
      </h2>
    );
  }
}
