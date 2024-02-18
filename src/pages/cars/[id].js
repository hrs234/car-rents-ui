import { Button, CardFooter, Divider, Image } from "@nextui-org/react"
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import config from "@/config";
import {Card, CardBody} from "@nextui-org/react";
 
export default function CarsDetail() {
    const route = useRouter();
    // destruct
    const { id } = route.query;
    const [detailData, setDetailData] = useState({
        message: "",
        item: {
            id: "",
            car_name: "",
            day_rate: 0,
            month_rate: 0,
            image: ""
        }
    })


    const getData = async (id = "") => {
        try {
            const data = await axios.get(`${config.apiHost}/api/v1/cars/${id}`);
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
    }, [route.query])

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
                        src={detailData.item.image}
                    />
                </div>
                <Card>
                    <CardBody>
                        <div className="grid grid-rows p-10">
                        <div className="pb-6">
                                <div className="pb-3 text-zinc-400 text-lg">ID Mobil</div>
                                <div>{detailData.item.id}</div>
                            </div>
                            <div className="pb-6">
                                <div className="pb-3 text-zinc-400 text-lg">Nama Mobil</div>
                                <div>{detailData.item.car_name}</div>
                            </div>
                            <div className="pb-6">
                                <div className="pb-3 text-zinc-400 text-lg">Biaya Harian</div>
                                <div>Rp. {detailData.item.day_rate}</div>
                            </div>
                            <div className="pb-6">
                                <div className="pb-3 text-zinc-400 text-lg">Biaya Bulanan</div>
                                <div>Rp. {detailData.item.month_rate}</div>
                            </div>
                        </div>      
                    </CardBody>
                    <Divider/>
                    <CardFooter>
                        <div className="flex flex-row">
                            <div className="justify-items-end">
                                <Button onClick={() => route.back()}>
                                    Kembali
                                </Button>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
                
            </div>
        </>
    );
}