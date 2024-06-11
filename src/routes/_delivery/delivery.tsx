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
  const [modalIsOpen, setIsOpen] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(
    null
  ) as MutableRefObject<MediaStream | null>;
  const qrScannerRef = useRef<QrScanner | null>(null);

  //const [data, setData] = useState("No Result");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
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

  return (
    <DeliveriesContext.Provider value={{ modalIsOpen, setIsOpen }}>
      <div className="flex flex-col mx-auto h-full pb-0 gap-2">
        <div className="flex flex-col justify-center min-h-[40vh] w-full">
          <H1 className="mb-2">Detail livraison</H1>
          <Map x={48.560679} y={7.694228} className="z-0" />
        </div>
        <Separator className="w-full" />
        <div className="w-full flex justify-between items-center">
          <H2>Livraison en cours</H2>
          <Large>30.52€</Large>
        </div>
        <div className="flex flex-col items-stretch h-full pb-32">
          <div className="flex-1">
            <Large>Nom du restaurant</Large>
            <p>Adresse restaurant</p>
            <p>Adresse restaurant</p>
          </div>
          <div className="flex-1">
            <Large>Nom du client</Large>
            <p>Adresse du client</p>
            <p>Adresse du client</p>
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
              <video ref={videoRef} muted autoPlay className="w-full h-full" />
            </div>
            <p>{qrCodeData}</p>
          </ReactModal>
        </div>
      </div>
    </DeliveriesContext.Provider>
  );
}
