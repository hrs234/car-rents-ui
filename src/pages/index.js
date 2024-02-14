import {Card, CardBody, CardFooter, Image as Img} from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        <Link href="/cars">
          <Card shadow="sm" key="car-list-btn" isPressable>
            <CardBody className="overflow-visible p-0">
              <Img
                shadow="sm"
                radius="lg"
                width="100%"
                alt="car-lists"
                className="w-full object-cover h-[240px]"
                src="/images/logo/car-logo.svg"
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>Daftar Mobil</b>
            </CardFooter>
          </Card>
        </Link>
        <Link href="/orders">
          <Card shadow="sm" key="order-lists-btn" isPressable>
            <CardBody className="overflow-visible p-0">
              <Img
                shadow="sm"
                radius="lg"
                width="100%"
                alt="order-lists"
                className="w-full object-cover h-[240px]"
                src="/images/logo/file-logo.svg"
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>Daftar Pesanan</b>
            </CardFooter>
          </Card>
        </Link>
      </div>
    </main>
  );
}
