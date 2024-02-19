import { useState, useEffect } from "react";
import { Input, Button, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useRouter } from "next/router";
import useFormOrders from "@/utils/formOrders";
import config from "@/config";
import axios from "axios";

export default function AddOrder() {
    const router = useRouter();
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

    let addOrders = async () => {
        console.log(value);
        try {
            const res = await axios.post(`${config.apiHost}/api/v1/orders`, value);
            console.log(res.data);
            router.push('/orders');
        } catch (error) {
            alert("Terjadi kesalahan, silahkan coba kembali");
            console.log(error);
        }
    }

    const { value, error, handleChange, handleSubmit, handleChangeSelect } = useFormOrders(addOrders)

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
                <form onSubmit={handleSubmit}>
                    <div className="pb-3">Mobil</div>
                    <Select 
                        placeholder="Pilih Mobil" 
                        className="pb-8" 
                        variant="bordered"
                        name="car_id"
                        onSelectionChange={handleChangeSelect}
                        errorMessage={error.car_id ? error.car_id : ""}
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
                        name="order_date"
                        isInvalid={error.order_date != undefined ? error.order_date.length > 0 : false}
                        errorMessage={error.order_date ? error.order_date : ""}
                        onChange={handleChange}
                    />
                    <div className="pb-3">Tanggal Jemput</div>
                    <Input
                        variant="bordered"
                        type="date"
                        className="pb-8"
                        name="pickup_date"
                        isInvalid={error.pickup_date != undefined ? error.pickup_date.length > 0 : false}
                        errorMessage={error.pickup_date ? error.pickup_date : ""}
                        onChange={handleChange}
                    />
                    <div className="pb-3">Tanggal Antar</div>
                    <Input
                        variant="bordered"
                        type="date"
                        className="pb-8"
                        name="dropoff_date"
                        isInvalid={error.dropoff_date != undefined ? error.dropoff_date.length > 0 : false}
                        errorMessage={error.dropoff_date ? error.dropoff_date : ""}
                        onChange={handleChange}
                    />
                    <div className="pb-3">Alamat Jemput</div>
                    <Textarea
                        placeholder="Masukkan alamat jemput"
                        className="pb-8"
                        variant="bordered"
                        name="pickup_location"
                        isInvalid={error.pickup_location != undefined ? error.pickup_location.length > 0 : false}
                        errorMessage={error.pickup_location ? error.pickup_location : ""}
                        onChange={handleChange}
                    />
                    <div className="pb-3">Alamat Antar</div>
                    <Textarea
                        placeholder="Masukkan alamat Antar"
                        className="pb-8"
                        variant="bordered"
                        name="dropoff_location"
                        isInvalid={error.dropoff_location != undefined ? error.dropoff_location.length > 0 : false}
                        errorMessage={error.dropoff_location ? error.dropoff_location : ""}
                        onChange={handleChange}
                    />
                    <div className="flex flex-row justify-end">
                            <Button color="default" onClick={() => router.back()}>
                                Kembali
                            </Button>
                            <Button color="success" className="ml-5" type="submit">
                                Tambahkan
                            </Button>
                    </div>
                </form>
            </div>
        </>
    );
}