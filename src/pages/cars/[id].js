import { Image } from "@nextui-org/react"
 
export default function CarsDetail() {
    return(
        <>
            <header>
                <div className="flex justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Detail Mobil
                    </h1>
                </div>
            </header>
            <div className="grid grid-cols-2">
                <div>
                    <Image
                        radius="lg"
                        alt="car-lists"
                        className="h-[500px] w-[500px]"
                        src="/images/logo/car-logo.svg"
                    />
                </div>
                <div className="grid grid-rows">
                    <div className="grid grid-cols-3">
                        <div>Nama Mobil</div>
                        <div>:</div>
                        <div>Test</div>
                    </div>
                    <div className="grid grid-cols-3">
                        <div>Biaya Harian</div>
                        <div>:</div>
                        <div>Rp.35.000,00</div>
                    </div>
                    <div className="grid grid-cols-3">
                        <div>Biaya Bulanan</div>
                        <div>:</div>
                        <div>Rp.150.000,00</div>
                    </div>
                </div>
            </div>
        </>
    );
}