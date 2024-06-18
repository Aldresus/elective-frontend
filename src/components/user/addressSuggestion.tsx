import { Feature } from "@/entities/featureCollection";
import { Button } from "../ui/button";

interface AddressSuggestionProps extends React.HTMLAttributes<HTMLDivElement> {
  feature: Feature;
  onSuggestionClick: (e: Feature) => void;
}

export function AddressSuggestion({
  feature,
  onSuggestionClick,
}: AddressSuggestionProps) {
  return (
    <Button
      variant="link"
      size="sm"
      className="justify-start p-0 decoration-hungry-yellow-600"
      onClick={() => onSuggestionClick(feature)}
    >
      <h3>{feature.properties.label}</h3>
    </Button>
  );
}
