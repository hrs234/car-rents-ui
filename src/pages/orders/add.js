import { useState } from "react";
import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Textarea } from "@nextui-org/react";

export default function AddOrder() {
    let [req, setReq] = useState({
        id: "",
        car_id: "",
        order_date: "",
        pickup_date: "",
        dropoff_date: "",
        pickup_location: "",
        dropoff_location: ""
    });

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
            <Dropdown backdrop="blur">
                    <DropdownTrigger>
                        <Input
                            autoFocus
                            isReadOnly
                            label="Pilih Mobil"
                            variant="bordered"
                            className="pb-8"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="1">1 - limau</DropdownItem>
                        <DropdownItem key="2">2 - panaham</DropdownItem>
                        <DropdownItem key="3">3 - jura</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Input
                    variant="bordered"
                    type="date"
                    className="pb-8"
                    endContent={
                        <p>Tanggal Jemput</p>
                    }
                />
                <Input
                    variant="bordered"
                    type="date"
                    className="pb-8"
                    endContent={
                        <p>Tanggal Antar</p>
                    }
                />
                <Textarea
                    label="Alamat Jemput"
                    placeholder="Masukkan alamat jemput"
                    className="pb-8"
                    variant="bordered"
                />
                <Textarea
                    label="Alamat Antar"
                    placeholder="Masukkan alamat Antar"
                    className="pb-8"
                    variant="bordered"
                />
                <div className="flex flex-row justify-end">
                        <Button color="default">
                            Kembali
                        </Button>
                        <Button color="success" className="ml-5">
                            Tambahkan
                        </Button>
                </div>
            </div>
        </>
    );
}