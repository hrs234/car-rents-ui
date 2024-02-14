import {Card, CardBody, CardFooter, Image as Img} from "@nextui-org/react";


export default function Home() {
  return (
    <main>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        <Card shadow="sm" key="car-list-btn" isPressable onPress={() => console.log("item pressed")}>
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
        <Card shadow="sm" key="order-lists-btn" isPressable onPress={() => console.log("item pressed")}>
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
      </div>
    </main>
  );
}
