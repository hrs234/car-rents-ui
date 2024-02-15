import { useState, useEffect } from "react";
import { Input, Button, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useRouter } from "next/router";
import config from "@/config";
import axios from "axios";

export default function AddOrder() {
    const router = useRouter();
    let [req, setReq] = useState({
        car_id: 0,
        order_date: "",
        pickup_date: "",
        dropoff_date: "",
        pickup_location: "",
        dropoff_location: ""
    });
    let [carsListData, setCarsListData] = useState([]);

    useEffect(() => {
        carLists();
    }, []);

    let carLists = async () => {
        try {
            const res = await axios.get(`${config.apiHost}/api/v1/cars?Limit=1000`)
            if (!res.data.items) return;
            console.log(res.data.items);
            setCarsListData(res.data.items);
        } catch (error) {
            console.log(error);
        }
    }

    let addOrders = async (payload) => {
        console.log(payload);
        try {
            const res = await axios.post(`${config.apiHost}/api/v1/orders`, payload);
            console.log(res.data);
            router.push('/orders');
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            <header>
                <div className="flex justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Tambah Data Pesanan
                    </h1>
                </div>
            </header>
            <div className="grid grid-cols-1">
            <div className="pb-3">Mobil</div>
                <Select 
                    placeholder="Pilih Mobil" 
                    className="pb-8" 
                    variant="bordered"
                    onSelectionChange={(e) => setReq(prevState => ({
                        ...prevState,
                        car_id: e
                    }))}
                >
                    {carsListData.map((val) => (
                        <SelectItem key={val.id} value={val.id}>
                            {val.car_name } 
                        </SelectItem>
                    ))}
                </Select>
                <div className="pb-3">Tanggal Pesan</div>
                <Input
                    variant="bordered"
                    type="date"
                    className="pb-8"
                    onChange={(e) => setReq(prevState => ({
                        ...prevState,
                        order_date: e.target.value
                    }))}
                />
                <div className="pb-3">Tanggal Jemput</div>
                <Input
                    variant="bordered"
                    type="date"
                    className="pb-8"
                    onChange={(e) => setReq(prevState => ({
                        ...prevState,
                        pickup_date: e.target.value
                    }))}
                />
                <div className="pb-3">Tanggal Antar</div>
                <Input
                    variant="bordered"
                    type="date"
                    className="pb-8"
                    onChange={(e) => setReq(prevState => ({
                        ...prevState,
                        dropoff_date: e.target.value
                    }))}
                />
                <div className="pb-3">Alamat Jemput</div>
                <Textarea
                    placeholder="Masukkan alamat jemput"
                    className="pb-8"
                    variant="bordered"
                    onChange={(e) => setReq(prevState => ({
                        ...prevState,
                        pickup_location: e.target.value
                    }))}
                />
                <div className="pb-3">Alamat Antar</div>
                <Textarea
                    placeholder="Masukkan alamat Antar"
                    className="pb-8"
                    variant="bordered"
                    onChange={(e) => setReq(prevState => ({
                        ...prevState,
                        dropoff_location: e.target.value
                    }))}
                />
                <div className="flex flex-row justify-end">
                        <Button color="default" onClick={() => router.push('/orders')}>
                            Kembali
                        </Button>
                        <Button color="success" className="ml-5" onClick={() => {
                            
                            addOrders({
                                car_id: req.car_id.currentKey,
                                order_date: req.order_date,
                                pickup_date: req.pickup_date,
                                dropoff_date: req.dropoff_date,
                                pickup_location: req.pickup_location,
                                dropoff_location: req.dropoff_location
                            });
                        }}>
                            Tambahkan
                        </Button>
                </div>
            </div>
        </>
    );
}