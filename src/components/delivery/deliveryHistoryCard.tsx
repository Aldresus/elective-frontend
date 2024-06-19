// import { CircleDashed, CircleDot } from "lucide-react";
// import { Large } from "../typography";
// import { User } from "@/entities/user";
// import { Order } from "@/entities/order";

// interface IDeliveries extends Order, User {
//   price?: string;
//   order_name?: string;
//   status?: string;
//   user_first_name?: string;
//   user_last_name?: string;
//   received_datetime?: Date;
//   restaurant_to_delivery_datetime?: Date;
// }

// export default function DeliveryHistoryCard(props: IDeliveries) {
//   return (
//     <div className="flex items-center justify-around w-full h-1/8 bg-gray-200 rounded-lg py-2">
//       <div>
//         <Large>{props.order_name}</Large>
//         <Large>
//           {props.user_first_name} {props.user_last_name}
//         </Large>
//         <p>
//           {props.status === "Terminée"
//             ? props.received_datetime?.toLocaleDateString()
//             : props.restaurant_to_delivery_datetime?.toLocaleDateString()}
//         </p>
//       </div>
//       <div className="flex flex-col justify-around items-center gap-2">
//         <Large>{props.price} €</Large>
//         <div className="flex">
//           {props.status === "Terminée" ? (
//             <CircleDot className="text-red-500 mr-1" />
//           ) : (
//             <CircleDashed className="text-green-500 mr-1" />
//           )}
//           <p
//             className={
//               props.status === "Terminée" ? "text-red-500" : "text-green-500"
//             }
//           >
//             {props.status}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
