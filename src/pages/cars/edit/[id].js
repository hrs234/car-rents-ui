import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input, Button } from "@nextui-org/react";

export default function UpsertCars() {
    const router = useRouter();
    let [idParam, setIdParam] = useState("");
    let [updateItem, setUpdateItem] = useState({
        id: "",
        car_name: "",
        day_rate: 0,
        month_rate: 0,
        image: ""
    });


    // destruct
    const { id } = router.query;

    useEffect(() => {
        if (!id) return 
        console.log(id);
        setIdParam(id);
    }, [router.query])

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
                    value={idParam}
                />
                <Input
                    autoFocus
                    label="Nama Mobil"
                    placeholder="mohon isi nama mobil"
                    variant="bordered"
                    className="pb-8"
                />
                <Input
                    label="Harga Harian"
                    placeholder="mohon isi harga harian"
                    variant="bordered"
                    type="number"
                    className="pb-8"
                />
                <Input
                    label="Harga Bulanan"
                    placeholder="mohon isi harga bulanan"
                    variant="bordered"
                    type="number"
                    className="pb-8"
                />
                <Input
                    variant="bordered"
                    type="file"
                    className="pb-8"
                    endContent={
                        <p>Unggah Gambar</p>
                    }
                />
                <div className="flex flex-row justify-end">
                        <Button color="default">
                            Kembali
                        </Button>
                        <Button color="warning" className="ml-5">
                            Ubah
                        </Button>
                </div>
            </div>
        </>
    );
}