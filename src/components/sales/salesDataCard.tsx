import { Large } from "../typography";
import { Card } from "../ui/card";

// not the best practice, but conditional type doesn't work in this case
// and do 4 same components just to have better variable name is not optimized in React philosophy
// so this interface will do the job
interface SalesDataCardProps {
  type: "passation" | "acquittement" | "acceptCom" | "acceptLiv";
  // if type == "passation" or "acceptCom" : value1 = Nom du restaurant
  // if type == "acquittement" or "acceptCom": value 1 = Nom du livreur
  value1: string;
  // if type == "passation" value2 = Nom du livreur
  // if type == "acquittement" or "acceptCom" or "acceptLiv": value 2 = Nom du client
  value2: string;

  orderId: string;
  date: string;
}

export default function SalesDataCard({
  type,
  value1,
  value2,
  orderId,
  date,
}: SalesDataCardProps) {
  return (
    <Card className="w-full flex flex-col gap-2 px-6 py-4">
      <div>
        <Large>ID commande :</Large>
        <p>{orderId}</p>
      </div>
      <div>
        {type === "passation" || type === "acceptCom" ? (
          <Large>Nom du restaurant :</Large>
        ) : (
          <Large>Nom du livreur :</Large>
        )}
        <p>{value1}</p>
      </div>
      <div>
        {type === "passation" ? (
          <Large>Nom du livreur :</Large>
        ) : (
          <Large>Nom du client :</Large>
        )}
        <p>{value2}</p>
      </div>
      <div>
        <Large>Date :</Large>
        <p>{date}</p>
      </div>
    </Card>
  );
}
