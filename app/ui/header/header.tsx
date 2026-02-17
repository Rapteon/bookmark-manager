import { SignOutButton } from "../sign-out-button";
import UserGreeting from "./user-greeting";

export default function Header() {
    return (
        <header>
            <h1>Bookmark Manager</h1>
            <UserGreeting/>
            <SignOutButton/>
        </header>
    )
}