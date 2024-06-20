import Map from "@/components/common/map";
import { H1, H2, Large } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";
import { QrCode, X } from "lucide-react";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactModal from "react-modal";
import QrScanner from "qr-scanner";
import { User } from "@/entities/user";
import { Order } from "@/entities/order";
import { Restaurant } from "@/entities/restaurant";
import { OrderStatus, OrderStatusEnum } from "@/enums/orderStatus";

export const Route = createFileRoute("/_delivery/delivery")({
  component: Delivery,
});

interface IDeliveriesContext {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const DeliveriesContext = createContext<IDeliveriesContext>({
  modalIsOpen: false,
  setIsOpen: () => {},
});

function Delivery() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(
    null
  ) as MutableRefObject<MediaStream | null>;
  const qrScannerRef = useRef<QrScanner | null>(null);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    async function getVideo() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          qrScannerRef.current = new QrScanner(
            videoRef.current,
            (result) => {
              setQrCodeData(result.data);
            },
            {
              highlightScanRegion: true,
              highlightCodeOutline: true,
            }
          );
          qrScannerRef.current.start();
        }
        streamRef.current = stream;
      } catch (err) {
        console.error(err);
      }
    }

    if (modalIsOpen) {
      getVideo();
    } else if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
        qrScannerRef.current.destroy();
        qrScannerRef.current = null;
      }
      streamRef.current = null;
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
        if (qrScannerRef.current) {
          qrScannerRef.current.stop();
          qrScannerRef.current.destroy();
          qrScannerRef.current = null;
        }
        streamRef.current = null;
      }
    };
  }, [modalIsOpen]);

  const userData: User = {
    first_name: "Jean",
    last_name: "Dupont",
  };

  const restaurantData: Restaurant = {
    name: "KFC",
    address: "Rue de la Paix",
    city: "Strasbourg",
    postal_code: "67000",
    banner_url: "",
    business_hours: "",
    email: "",
    food_type: "",
    id_restaurant: "1",
    price_range: "",
    rating: 0,
  };

  const orderData: Order = {
    address: "Rue de la Paix",
    city: "Paris",
    postal_code: "75001",
    price: 10,
    status: OrderStatusEnum.ON_THE_WAY,
    id_order: "1",
    id_user: "1",
    id_restaurant: "1",
    menus: [],
    notes: "",
    order_date: new Date(),
    products: [],
    delivery_accepted_datetime: new Date(),
    received_datetime: new Date(),
    restaurant_accepted_datetime: new Date(),
    restaurant_to_delivery_datetime: new Date(),
  };

  const delivery = {
    order_id: Math.random().toString(36).substring(2),
    status: orderData?.status,
    price: orderData?.price,
    restaurant_name: restaurantData?.name,
    restaurant_address: restaurantData?.address,
    restaurant_city: restaurantData?.city,
    restaurant_postal_code: restaurantData?.postal_code,
    user_last_name: userData?.last_name,
    user_first_name: userData?.first_name,
  };

  return (
    <DeliveriesContext.Provider
      value={{ modalIsOpen, setIsOpen: setModalIsOpen }}
    >
      <div className="flex flex-col mx-auto h-full pb-0 gap-2">
        {delivery ? (
          <>
            <div className="flex flex-col justify-center min-h-[40vh] w-full">
              <H1 className="mb-2">Detail livraison</H1>
              <Map x={48.560679} y={7.694228} className="z-0" />
            </div>
            <Separator className="w-full" />
            <div className="w-full flex justify-between items-center">
              <H2>{OrderStatus[delivery?.status]}</H2>
              <Large>
                {delivery?.price} {delivery?.price ? "€" : ""}
              </Large>
            </div>
            <div className="flex flex-col items-stretch h-full pb-32">
              <div className="flex-1">
                <Large>{delivery?.restaurant_name}</Large>
                <p>{delivery?.restaurant_address}</p>
                <p>
                  {delivery?.restaurant_postal_code} {delivery?.restaurant_city}
                </p>
              </div>
              <div className="flex-1">
                <Large>
                  {delivery?.user_last_name} {delivery?.user_first_name}
                </Large>
                <p>rue de la Paix</p>
                <p>67000 Strasbourg</p>
              </div>
              <Button className="flex gap-1 items-center" onClick={openModal}>
                <QrCode />
                Scanner le QR Code
              </Button>
              <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="QR code scanner"
                ariaHideApp={false}
              >
                <div className="flex w-full justify-end">
                  <X className="flex" onClick={closeModal} />
                </div>
                <Large>Scanner le QR Code du client</Large>
                <div className="w-full h-[400px]">
                  <video
                    ref={videoRef}
                    muted
                    autoPlay
                    className="w-full h-full"
                  />
                </div>
                <p>{qrCodeData}</p>
              </ReactModal>
            </div>
          </>
        ) : (
          <Large>Pas de commande en cours....</Large>
        )}
      </div>
    </DeliveriesContext.Provider>
  );
}
