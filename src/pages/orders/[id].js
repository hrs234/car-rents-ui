import config from "@/config";
import { Button } from "@nextui-org/react"
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
 
export default function OrderDetail() {

    const route = useRouter();

    const { id } = route.query;
    const [detailData, setDetailData] = useState({
        message: "",
        item: {
            id: "",
            car_id: "",
            car_name: "",
            order_date: "",
            pickup_date: "",
            dropoff_date: "",
            pickup_location: "",
            dropoff_location: ""
        }
    })

    const getData = async (id = "") => {
        try {
            const data = await axios.get(`${config.apiHost}/api/v1/orders/${id}`);
            console.log(data.data);
            setDetailData(data.data);
        } catch (error) {
            console.log(error);
            alert('Tidak dapat menarik data, silahkan coba kembali');
        }
    }

    useEffect(() => {
        if (!id) return
        console.log(id);
        getData(id);
    }, [route.query]);

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
                        <div>{detailData.item.id}</div>
                    </div>
                    <div className="grid grid-cols-3">
                        <div>Nama Mobil</div>
                        <div>:</div>
                        <div>{detailData.item.car_name}</div>
                    </div>
                    <div className="grid grid-cols-3">
                        <div>Tanggal Jemput</div>
                        <div>:</div>
                        <div>{detailData.item.pickup_date}</div>
                    </div>
                    <div className="grid grid-cols-3">
                        <div>Tanggal Antar</div>
                        <div>:</div>
                        <div>{detailData.item.dropoff_date}</div>
                    </div>
                    <div className="grid grid-cols-3">
                        <div>Lokasi Jemput</div>
                        <div>:</div>
                        <div>{detailData.item.pickup_location}</div>
                    </div>
                    <div className="grid grid-cols-3">
                        <div>Lokasi Antar</div>
                        <div>:</div>
                        <div>{detailData.item.dropoff_location}</div>
                    </div>
                    <div>
                        <Button onClick={() => route.push('/orders')}>
                            Kembali
                        </Button>
                    </div>
                </div>
        </>
    );
}