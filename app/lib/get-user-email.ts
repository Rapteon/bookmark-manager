import { auth } from "../auth";

export default async function getUserEmail() {
  const session = await auth();
  return session?.user?.email || "";
}
