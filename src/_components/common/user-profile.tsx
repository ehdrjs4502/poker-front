import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UserProfileProps {
  userName: string;
  userAvatar?: string;
}

export default function UserProfile({
  userName,
  userAvatar,
}: UserProfileProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage
          src={userAvatar || "/images/default-avatar.jpg"}
          alt={userName}
        />
        <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
      </Avatar>
      <p className="text-sm font-medium text-white">{userName}</p>
    </div>
  );
}

