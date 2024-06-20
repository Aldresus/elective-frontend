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
import DeliveryEntity from "@/entities/delivery";
import { User } from "@/entities/user";
import { Order } from "@/entities/order";

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

interface IDelivery extends DeliveryEntity, Order, User {
  order_id: string;
  status?: string;
  price?: string;
  restaurant_name?: string;
  restaurant_address?: string;
  restaurant_city?: string;
  restaurant_postal_code?: string;
  user_last_name?: string;
  user_first_name?: string;
  user_address?: string;
  user_city?: string;
  user_postal_code?: string;
}

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

  const restaurantData: RestaurantEntity = {
    name: "KFC",
    address: "Rue de la Paix",
    city: "Strasbourg",
    postal_code: "67000",
  };

  const orderData: OrderEntity = {
    status: "Terminée",
    price: "100",
  };

  const delivery: IDelivery | null = {
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
              <H2>{delivery?.status}</H2>
              <Large>
                {delivery?.price} {delivery?.price ? "€" : ""}
              </Large>
            </div>
            <div className="flex flex-col items-stretch h-full pb-32">
              <div className="flex-1">
                <Large>{delivery?.restaurant_name}</Large>
                <p>{delivery?.restaurant_address}</p>
                <p>
                  {delivery?.restaurant_city} {delivery?.restaurant_postal_code}
                </p>
              </div>
              <div className="flex-1">
                <Large>
                  {delivery?.user_last_name} {delivery?.user_first_name}
                </Large>
                <p>{delivery?.user_address}</p>
                <p>
                  {delivery?.user_city} {delivery?.user_postal_code}
                </p>
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
