import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input, Button, Textarea } from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import useFormOrders from "@/utils/formOrders";
import axios from "axios";
import config from "@/config";
import errorCode from "@/utils/translateErrorCode";


export default function EditOrder() {
    const router = useRouter();
    const { translate } = errorCode();
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

    const updateData = async () => {
        try {
            console.log(value);
            if (typeof(value.car_id) == "number") {
                value.car_id = value.car_id.toString();
            }

            // check difference between changed data or not 
            const res = await axios.put(`${config.apiHost}/api/v1/orders/${id}`, {
                car_id: value.car_id,
                order_date: value.order_date,
                pickup_date: value.pickup_date,
                dropoff_date: value.dropoff_date,
                pickup_location: updateItem.pickup_location == value.pickup_location ? "" : value.pickup_location,
                dropoff_location:  updateItem.dropoff_location == value.dropoff_location ? "" : value.dropoff_location
            });
            console.log(res.data);
            router.push('/orders');
        } catch (error) {
            console.log(error.response.data);
            alert(translate(error.response.data.message ? error.response.data.message : "Terjadi kesalahan silahkan coba kembali"));
        }
    }

    const { value, error, handleChange, handleSubmit, handleChangeSelect } = useFormOrders(updateData, updateItem);

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
                        value={value.order_date}
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
                        value={value.pickup_date}
                        onChange={handleChange}
                    />
                    <div className="pb-3">Tanggal Antar</div>
                    <Input
                        variant="bordered"
                        type="date"
                        className="pb-8"
                        value={value.dropoff_date}
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
                        value={value.pickup_location}
                        onChange={handleChange}
                    />
                    <div className="pb-3">Alamat Antar</div>
                    <Textarea
                        placeholder="Masukkan alamat Antar"
                        className="pb-8"
                        variant="bordered"
                        value={value.dropoff_location}
                        name="dropoff_location"
                        isInvalid={error.dropoff_location != undefined ? error.dropoff_location.length > 0 : false}
                        errorMessage={error.dropoff_location ? error.dropoff_location : ""}
                        onChange={handleChange}
                    />
                    <div className="flex flex-row justify-end">
                            <Button color="default" onClick={() => router.back()}>
                                Kembali
                            </Button>
                            <Button color="warning" className="ml-5" type="submit">
                                Ubah
                            </Button>
                    </div>
                </form>
            </div>
        </>
    );
}