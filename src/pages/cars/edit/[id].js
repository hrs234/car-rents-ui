import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input, Button } from "@nextui-org/react";
import useFormCars from "@/utils/formCars";
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

    const updateData = async () => {
        try {
            if (typeof(value.day_rate) == "number") {
                value.day_rate = value.day_rate.toString();
            }

            if (typeof(value.month_rate) == "number") {
                value.month_rate = value.month_rate.toString();
            }

            const res = await axios.put(`${config.apiHost}/api/v1/cars/${id}`, value);
            console.log(res.data);
            router.push('/cars');
        } catch (error) {
            alert("Tidak dapat mengubah data, silahkan coba kembali");
            console.log(error);
        }
    }

    const { value, error, handleChange, handleSubmit } = useFormCars(updateData, updateItem);

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
                <div className="pb-3">Id</div>
                <Input
                    isDisabled
                    placeholder="Id"
                    variant="bordered"
                    className="pb-8"
                    type="number"
                    value={idParam}
                />
                <form onSubmit={handleSubmit}>
                    <div className="pb-3">Nama Mobil</div>
                    <Input
                        autoFocus
                        placeholder="mohon isi nama mobil"
                        variant="bordered"
                        className="pb-8"
                        name="car_name"
                        isInvalid={error.car_name != undefined ? error.car_name.length > 0 : false}
                        errorMessage={error.car_name ? error.car_name : ""}
                        value={value.car_name}
                        onChange={handleChange}
                    />
                    <div className="pb-3">Harga Harian</div>
                    <Input
                        placeholder="mohon isi harga harian"
                        variant="bordered"
                        type="number"
                        className="pb-8"
                        name="day_rate"
                        isInvalid={error.day_rate != undefined ? error.day_rate.length > 0 : false}
                        errorMessage={error.day_rate ? error.day_rate : ""}
                        value={value.day_rate}
                        onChange={handleChange}
                    />
                    <div className="pb-3">Harga Bulanan</div>
                    <Input
                        placeholder="mohon isi harga bulanan"
                        variant="bordered"
                        type="number"
                        className="pb-8"
                        name="month_rate"
                        isInvalid={error.month_rate != undefined ? error.month_rate.length > 0 : false}
                        errorMessage={error.month_rate ? error.month_rate : ""}
                        value={value.month_rate}
                        onChange={handleChange}
                    />
                    <div className="pb-3">Link Gambar</div>
                    <Input
                        placeholder="contoh: https://local.sh/gamabr.jpg"
                        variant="bordered"
                        className="pb-8"
                        name="image"
                        isInvalid={error.image != undefined ? error.image.length > 0 : false}
                        errorMessage={error.image ? error.image : ""}
                        value={value.image}
                        onChange={handleChange}
                    />
                    <div className="flex flex-row justify-end">
                            <Button color="default" onClick={() => router.push('/cars')}>
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