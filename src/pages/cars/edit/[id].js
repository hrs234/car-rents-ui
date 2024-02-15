import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input, Button } from "@nextui-org/react";
import config from "@/config";
import axios from "axios";

export default function UpsertCars() {
    const router = useRouter();
    let [idParam, setIdParam] = useState("");
    let [updateItem, setUpdateItem] = useState({
        id: 0,
        car_name: "",
        day_rate: 0,
        month_rate: 0,
        image: ""
    });

    // destruct
    const { id } = router.query;

    const getData = async (id = "") => {
        try {
            const res = await axios.get(`${config.apiHost}/api/v1/cars/${id}`);
            console.log(res.data);
            setUpdateItem({
                car_name: res.data.item.car_name,
                day_rate: res.data.item.day_rate,
                month_rate: res.data.item.month_rate,
                image: res.data.item.image
            });
        } catch (error) {
            console.log(error);
            alert('Tidak dapat menarik data, silahkan coba kembali');
        }
    }

    const updateData = async (payload) => {
        try {
            const res = await axios.put(`${config.apiHost}/api/v1/cars/${id}`, payload);
            console.log(res.data);
            router.push('/cars');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!id) return
        console.log(id);
        setIdParam(id);
        getData(id);
    }, [router.query]);

    return(
        <>
            <header>
                <div className="flex justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Ubah Data Mobil
                    </h1>
                </div>
            </header>
            <div className="grid grid-cols-1">
                <Input
                    isDisabled
                    label="Id"
                    placeholder="Id"
                    variant="bordered"
                    className="pb-8"
                    type="number"
                    value={idParam}
                />
                <Input
                    autoFocus
                    label="Nama Mobil"
                    placeholder="mohon isi nama mobil"
                    variant="bordered"
                    className="pb-8"
                    value={updateItem.car_name}
                    onChange={(e) => setUpdateItem(prevState => ({
                        ...prevState,
                        car_name: e.target.value
                    }))}
                />
                <Input
                    label="Harga Harian"
                    placeholder="mohon isi harga harian"
                    variant="bordered"
                    type="number"
                    className="pb-8"
                    value={updateItem.day_rate}
                    onChange={(e) => setUpdateItem(prevState => ({
                        ...prevState,
                        day_rate: e.target.value
                    }))}
                />
                <Input
                    label="Harga Bulanan"
                    placeholder="mohon isi harga bulanan"
                    variant="bordered"
                    type="number"
                    className="pb-8"
                    value={updateItem.month_rate}
                    onChange={(e) => setUpdateItem(prevState => ({
                        ...prevState,
                        month_rate: e.target.value
                    }))}
                />
                <Input
                    label="Link Gambar"
                    placeholder="contoh: https://local.sh/gamabr.jpg"
                    variant="bordered"
                    className="pb-8"
                    value={updateItem.image}
                    onChange={(e) => setUpdateItem(prevState => ({
                        ...prevState,
                        image: e.target.value
                    }))}
                />
                <div className="flex flex-row justify-end">
                        <Button color="default" onClick={() => router.push('/cars')}>
                            Kembali
                        </Button>
                        <Button color="warning" className="ml-5" onClick={() => updateData({
                            car_name: updateItem.car_name,
                            day_rate: parseFloat(updateItem.day_rate),
                            month_rate: parseFloat(updateItem.month_rate),
                            image: updateItem.image
                        })}>
                            Ubah
                        </Button>
                </div>
            </div>
        </>
    );
}