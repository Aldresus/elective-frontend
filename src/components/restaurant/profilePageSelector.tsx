import { ChevronRight } from "lucide-react";
import { Large } from "../typography";

interface ProfilePageSelectorProps {
  text: string;
  pageLink: string;
}

export function ProfilePageSelector({
  text,
  pageLink,
}: ProfilePageSelectorProps) {
  return (
    <div className="w-full flex items-center justify-between bg-slate-100 p-2 rounded-[10px]">
      <Large>{text}</Large>
      <ChevronRight href={pageLink} />
    </div>
  );
}
