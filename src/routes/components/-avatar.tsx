import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AvatarExample() {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-accent">Les avatars</div>
      <div className="flex gap-3">
        <Avatar>
          <AvatarFallback className="bg-red-100">AB</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-blue-100">CD</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-green-100">EF</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
