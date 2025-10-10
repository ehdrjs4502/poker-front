import { Button } from "@/_components/ui/button";
import UserProfile from "@/_components/user-profile";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <UserProfile userName="John Doe" />
      <Button>Click me</Button>
    </div>
  );
}
