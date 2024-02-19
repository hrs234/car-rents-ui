import { Input, Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import useFormCars from "@/utils/formCars";
import config from "@/config";
import axios from "axios";


export default function UpsertCars() {
    const router = useRouter();

    let processData = async () => {
        try {
            console.log(value);
            const res = await axios.post(`${config.apiHost}/api/v1/cars`, value);
            console.log(res.data)
            router.push('/cars');
        } catch (error) {
            console.log(error)
            alert("Tidak dapat menambah data");
        }
    }

    const { value, error, handleChange, handleSubmit } = useFormCars(processData);

    return(
        <>
            <header>
                <div className="flex justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Tambah Data Mobil
                    </h1>
                </div>
            </header>
            <div className="grid grid-cols-1">
                <form onSubmit={handleSubmit}>
                    <div className="pb-3">Nama Mobil</div>
                    <Input
                        autoFocus
                        placeholder="contoh: Mobilia"
                        variant="bordered"
                        className="pb-8"
                        name="car_name"
                        isInvalid={error.car_name != undefined ? error.car_name.length > 0 : false}
                        errorMessage={error.car_name ? error.car_name : ""}
                        onChange={handleChange}
                    />
                    <div className="pb-3">Harga Harian</div>
                    <Input
                        placeholder="contoh: 2000"
                        variant="bordered"
                        type="number"
                        className="pb-8"
                        name="day_rate"
                        isInvalid={error.day_rate != undefined ? error.day_rate.length > 0 : false}
                        errorMessage={error.day_rate ? error.day_rate : ""}
                        onChange={handleChange}
                    />
                    <div className="pb-3">Harga Bulanan</div>
                    <Input
                        placeholder="contoh: 2000"
                        variant="bordered"
                        type="number"
                        className="pb-8"
                        name="month_rate"
                        isInvalid={error.month_rate != undefined ? error.month_rate.length > 0 : false}
                        errorMessage={error.month_rate ? error.month_rate : ""}
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
                        onChange={handleChange}
                    />
                    <div className="flex flex-row justify-end">
                            <Button color="default" onClick={() => router.push('/cars')}>
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