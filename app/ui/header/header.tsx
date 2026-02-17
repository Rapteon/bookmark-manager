import { SignOutButton } from "../sign-out-button";
import UserGreeting from "./user-greeting";

/* Theme: Next.js–inspired (dark bar, neutral borders, white/muted text). Tokens in app/globals.css :root. */
export default function Header() {
    return (
        <header className="w-full flex flex-row justify-between items-start gap-4 bg-black border-b border-neutral-800 px-6 py-4 font-sans antialiased">
            <div className="flex flex-col gap-0.5">
                <h1 className="text-lg font-semibold tracking-tight text-white">
                    Bookmark Manager
                </h1>
                <UserGreeting/>
            </div>
            <SignOutButton className="shrink-0 rounded-md border border-neutral-600 bg-transparent px-3 py-1.5 text-sm font-medium text-neutral-300 transition-colors hover:border-neutral-500 hover:bg-neutral-800/80 hover:text-white" />
        </header>
    )
}