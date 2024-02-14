import { Image } from "@nextui-org/react"
 
export default function OrderDetail() {
    return(
        <>
            <header>
                <div className="flex justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Detail Pesanan
                    </h1>
                </div>
            </header>
                <div className="grid grid-rows">
                    <div className="grid grid-cols-3">
                        <div>ID Pesanan</div>
                        <div>:</div>
                        <div>1</div>
                    </div>
                    <div className="grid grid-cols-3">
                        <div>ID Mobil</div>
                        <div>:</div>
                        <div>1</div>
                    </div>
                    <div className="grid grid-cols-3">
                        <div>Tanggal Jemput</div>
                        <div>:</div>
                        <div>2024-01-10</div>
                    </div>
                    <div className="grid grid-cols-3">
                        <div>Tanggal Antar</div>
                        <div>:</div>
                        <div>2024-01-11</div>
                    </div>
                    <div className="grid grid-cols-3">
                        <div>Lokasi Jemput</div>
                        <div>:</div>
                        <div>Jl. pengangsaan no. 100</div>
                    </div>
                    <div className="grid grid-cols-3">
                        <div>Lokasi Antar</div>
                        <div>:</div>
                        <div>Jl. perumusan no.20</div>
                    </div>
                </div>
        </>
    );
}