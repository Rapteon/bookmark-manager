import { auth } from "@/app/auth";

export default async function UserGreeting() {
  const session = await auth();

  if (!session?.user) {
    return <h2>Hello, Unknown User?</h2>;
  } else {
    return <h2>Hello, {session.user.name}</h2>;
  }
}
