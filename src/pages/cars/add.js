import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import config from "@/config";
import axios from "axios";


export default function UpsertCars() {
    const router = useRouter();
    let [carName, setCarName] = useState('');
    let [dayRate, setDayRate] = useState('');
    let [monthRate, setMonthRate] = useState(0);
    let [imageLink, setImageLink] = useState('');

    let processData = async () => {
        try {
            const res = await axios.post(`${config.apiHost}/api/v1/cars`, {
                car_name: carName,
                day_rate: dayRate,
                month_rate: monthRate,
                image: imageLink
            });
            console.log(res.data)
            router.push('/cars');
        } catch (error) {
            console.log(error)
            alert("Tidak dapat menambah data");
        }
    }

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
                <Input
                    autoFocus
                    label="Nama Mobil"
                    placeholder="contoh: Mobilia"
                    variant="bordered"
                    className="pb-8"
                    onChange={(e) => setCarName(e.target.value)}
                />
                <Input
                    label="Harga Harian"
                    placeholder="contoh: 2000"
                    variant="bordered"
                    type="number"
                    className="pb-8"
                    onChange={(e) => setDayRate(e.target.value)}
                />
                <Input
                    label="Harga Bulanan"
                    placeholder="contoh: 2000"
                    variant="bordered"
                    type="number"
                    className="pb-8"
                    onChange={(e) => setMonthRate(e.target.value)}
                />
                <Input
                    label="Link Gambar"
                    placeholder="contoh: https://local.sh/gamabr.jpg"
                    variant="bordered"
                    className="pb-8"
                    onChange={(e) => setImageLink(e.target.value)}
                />
                <div className="flex flex-row justify-end">
                        <Button color="default" onClick={() => router.push('/cars')}>
                            Kembali
                        </Button>
                        <Button color="success" className="ml-5" onClick={() => processData()}>
                            Tambahkan
                        </Button>
                </div>
            </div>
        </>
    );
}