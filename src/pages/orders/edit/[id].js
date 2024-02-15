import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input, Button, Textarea } from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import axios from "axios";
import config from "@/config";


export default function EditOrder() {
    const router = useRouter();
    let [idParam, setIdParam] = useState("");
    let [updateItem, setUpdateItem] = useState({
        car_id: 0,
        order_date: "",
        pickup_date: "",
        dropoff_date: "",
        pickup_location: "",
        dropoff_location: ""
    });
    let [listCars, setListCars] = useState([]);


    // destruct
    const { id } = router.query;

    useEffect(() => {
        if (!id) return 
        console.log(id);
        setIdParam(id);
        getCarsData();
        getData(id);
    }, [router.query])

    const getCarsData = async () => {
        try {
            const res = await axios.get(`${config.apiHost}/api/v1/cars`);
            console.log(res.data);
            setListCars(res.data.items);
        } catch (error) {
            console.log(error);
            alert('Tidak dapat memuat data, coba sesaat lagi');
        }
    }

    const getData = async (id = "") => {
        try {
            const res = await axios.get(`${config.apiHost}/api/v1/orders/${id}`);
            console.log(res.data.item);
            if (!res.data.item) return
            setUpdateItem({
                car_id: res.data.item.car_id,
                order_date: res.data.item.order_date,
                pickup_date: res.data.item.pickup_date,
                dropoff_date: res.data.item.dropoff_date,
                pickup_location: res.data.item.pickup_location,
                dropoff_location: res.data.item.dropoff_location
            });
        } catch (error) {
            console.log(error);
            alert('Tidak dapat memuat data, coba sesaat lagi');
        }
    }

    const updateData = async (payload) => {
        try {
            console.log(payload);
            const res = await axios.put(`${config.apiHost}/api/v1/orders/${id}`, payload);
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
                        Ubah Data Pesanan
                    </h1>
                </div>
            </header>
            <div className="grid grid-cols-1">
                <div className="pb-3">Id Pesanan</div>
                <Input
                    isDisabled
                    placeholder="Id"
                    variant="bordered"
                    className="pb-8"
                    value={idParam}
                />
                <div className="pb-3">Mobil</div>
                <Select 
                    placeholder="Pilih Mobil" 
                    className="pb-8" 
                    variant="bordered"
                    onSelectionChange={(e) => setUpdateItem(prevState => ({
                        ...prevState,
                        car_id: e
                    }))}
                >
                    {listCars.map((val) => (
                        <SelectItem key={val.id} value={val.id}>
                            {val.car_name}
                        </SelectItem>
                    ))}
                </Select>
                <div className="pb-3">Tanggal Pesan</div>
                <Input
                    variant="bordered"
                    type="date"
                    className="pb-8"
                    value={updateItem.order_date}
                    onChange={(e) => setUpdateItem(prevState => ({
                        ...prevState,
                        order_date: e.target.value
                    }))}
                />
                <div className="pb-3">Tanggal Jemput</div>
                <Input
                    variant="bordered"
                    type="date"
                    className="pb-8"
                    value={updateItem.pickup_date}
                    onChange={(e) => setUpdateItem(prevState => ({
                        ...prevState,
                        pickup_date: e.target.value
                    }))}
                />
                <div className="pb-3">Tanggal Antar</div>
                <Input
                    variant="bordered"
                    type="date"
                    className="pb-8"
                    value={updateItem.dropoff_date}
                    onChange={(e) => setUpdateItem(prevState => ({
                        ...prevState,
                        dropoff_date: e.target.value
                    }))}
                />
                <div className="pb-3">Alamat Jemput</div>
                <Textarea
                    placeholder="Masukkan alamat jemput"
                    className="pb-8"
                    variant="bordered"
                    value={updateItem.pickup_location}
                    onChange={(e) => setUpdateItem(prevState => ({
                        ...prevState,
                        pickup_location: e.target.value
                    }))}
                />
                <div className="pb-3">Alamat Antar</div>
                <Textarea
                    placeholder="Masukkan alamat Antar"
                    className="pb-8"
                    variant="bordered"
                    value={updateItem.dropoff_location}
                    onChange={(e) => setUpdateItem(prevState => ({
                        ...prevState,
                        dropoff_location: e.target.value
                    }))}
                />
                <div className="flex flex-row justify-end">
                        <Button color="default" onClick={() => router.push('/orders')}>
                            Kembali
                        </Button>
                        <Button color="warning" className="ml-5" onClick={() => updateData({
                            car_id: updateItem.car_id.currentKey,
                            order_date: updateItem.order_date,
                            pickup_date: updateItem.pickup_date,
                            dropoff_date: updateItem.dropoff_date,
                            pickup_location: updateItem.pickup_location,
                            dropoff_location: updateItem.dropoff_location
                        })}>
                            Ubah
                        </Button>
                </div>
            </div>
        </>
    );
}