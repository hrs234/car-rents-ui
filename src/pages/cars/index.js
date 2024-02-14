import { React, useEffect, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Image as Img, Pagination, Button, Tooltip, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { GoTrash, GoEye, GoPencil, GoPlus, GoSearch } from "react-icons/go";
import config from "@/config";
import cars from "../../services/cars";
import Link from "next/link";

const carsT = new cars();

let confirmationModal = ({isOpen, onOpenChange}) => {
    return(
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Konfirmasi</ModalHeader>
              <ModalBody>
                <p> 
                  Apakah anda ingin menghapus data mobil ini ?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Batal
                </Button>
                <Button color="danger" onPress={onClose}>
                  Hapus
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    )
}



export default function Cars() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    let getCarsData = async (payload = { Page: 1, Limit: 10, Search: "", Order: "ASC" }) => {
        let url = `${config.apiHost}/api/v1/cars`;
        let query = [];
                
        if (payload.Limit != null) {
            query.push(`Limit=${payload.Limit}`);
        }
        
        if (payload.Search != "") {
            query.push(`Search=${payload.Search}`);
        }
    
        if (payload.Page != null) {
            query.push(`Page=${payload.Page}`);
        }

        if (payload.Order != "ASC") {
            query.push(`Order=${payload.Order}`);
        }
        
        if (query.length > 0) {
            url += `?${query.join("&")}`
        }
        const resp = await fetch(url,{ 
            method: "GET", 
        });
        const data = await resp.json();
        setData(data.items);
    }

    const renderTableData = () => {
        return data.map((val, idx) => {
            return(
                <TableRow key="1">
                        <TableCell>{val.id}</TableCell>
                        <TableCell>
                            <Img
                                radius="lg"
                                alt="car-lists"
                                className="h-[100px] w-[100px]"
                                src={val.image}
                            />
                        </TableCell>
                        <TableCell>{val.car_name}</TableCell>
                        <TableCell>Rp. {val.day_rate}</TableCell>
                        <TableCell>Rp. {val.month_rate}</TableCell>
                        <TableCell>
                            <div className="flex gap-4 items-center">
                                <Tooltip content="Lihat Detail">
                                    <Button isIconOnly color="primary" variant="bordered" aria-label="view">
                                        <GoEye />
                                    </Button>
                                </Tooltip>
                                <Tooltip content="Ubah Data">
                                    <Button isIconOnly color="warning" variant="bordered" aria-label="update">
                                        <GoPencil />
                                    </Button>
                                </Tooltip>
                                <Tooltip content="Hapus Data">
                                    <Button isIconOnly color="danger" variant="bordered" aria-label="delete" onPress={onOpen}>
                                        <GoTrash />
                                    </Button>
                                </Tooltip>
                            </div>
                        </TableCell>
                    </TableRow>
            )
        })
    }
    
    useEffect(() => {
        getCarsData();
    }, [])

    return(
        <>
            {confirmationModal({isOpen, onOpenChange})}
            <header>
                <div className="flex justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Daftar Mobil
                    </h1>
                    <div>
                        <Link href="/cars/add">
                            <Button size="lg" color="primary" startContent={<GoPlus/>}>
                                Tambah Data
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>
            <div className="flex justify-center p-8">
                <Input
                    isClearable
                    placeholder="Ketik untuk mencari..."
                    startContent={<GoSearch/>}
                />
            </div>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>GAMBAR</TableColumn>
                    <TableColumn>NAMA MOBIL</TableColumn>
                    <TableColumn>BIAYA HARIAN</TableColumn>
                    <TableColumn>BIAYA BULANAN</TableColumn>
                    <TableColumn>OPSI</TableColumn>
                </TableHeader>
                <TableBody>
                    {renderTableData()}
                </TableBody>
            </Table>
            <div className="flex justify-center p-8">
                <Pagination isCompact showControls total={10} initialPage={1} />
            </div>
        </>
    )
}