import config from "@/config";
import { Button, CardFooter } from "@nextui-org/react"
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {Card, CardBody, Divider, Link} from "@nextui-org/react";
 
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
                <Card>
                    <CardBody>
                        <div className="grid grid-rows p-10">
                            <div className="pb-6">
                                <div className="pb-3 text-zinc-400 text-lg">ID Pesanan</div>
                                <div>{detailData.item.id}</div>
                            </div>
                            <div className="pb-6">
                                <div className="pb-3 text-zinc-400 text-lg">Nama Mobil</div>
                                <div>
                                    <Link isBlock showAnchorIcon onClick={() => route.push(`/cars/${detailData.item.car_id}`)}>
                                        {detailData.item.car_name}
                                    </Link>
                                </div>
                            </div>
                            <div className="pb-6">
                                <div className="pb-3 text-zinc-400 text-lg">Tanggal Jemput</div>
                                <div>{detailData.item.pickup_date}</div>
                            </div>
                            <div className="pb-6">
                                <div className="pb-3 text-zinc-400 text-lg">Tanggal Antar</div>
                                <div>{detailData.item.dropoff_date}</div>
                            </div>
                            <div className="pb-6">
                                <div className="pb-3 text-zinc-400 text-lg">Lokasi Jemput</div>
                                <div>{detailData.item.pickup_location}</div>
                            </div>
                            <div className="pb-6">
                                <div className="pb-3 text-zinc-400 text-lg">Lokasi Antar</div>
                                <div>{detailData.item.dropoff_location}</div>
                            </div>
                        </div>
                    </CardBody>
                    <Divider/>
                    <CardFooter>
                        <Button onClick={() => route.back()}>
                            Kembali
                        </Button>
                    </CardFooter>
                </Card>
                
        </>
    );
}