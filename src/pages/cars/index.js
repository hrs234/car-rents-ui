import { React, useEffect, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Image as Img, Pagination, Button, Tooltip, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { GoTrash, GoEye, GoPencil, GoPlus, GoSearch } from "react-icons/go";
import { useRouter } from "next/router";
import config from "@/config";
import Link from "next/link";
import axios from 'axios';

const useDebouncedValue = (inputValue, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(inputValue);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(inputValue);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [inputValue, delay]);
  
    return debouncedValue;
  };

export default function Cars() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        page: 0,
        limit: 0,
        total: 0,
        order: "",
        items: [],
        message: ""
    });
    const [search, setSearch] = useState('');
    const [selectedId, setSelectedId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const debouncedSearch = useDebouncedValue(search, 500);

    useEffect(() => {
        getCarsData({ 
            Page: currentPage,
            Limit: 5,
            Search: search
         });

    }, [debouncedSearch])

    let confirmationModal = ({isOpen, onOpenChange}) => {
        return(
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Konfirmasi</ModalHeader>
                  <ModalBody>
                    <p> 
                      Apakah anda ingin menghapus data mobil dengan Id {selectedId} ?
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="default" variant="light" onPress={onClose}>
                      Batal
                    </Button>
                    <Button color="danger" onPress={() => {
                        deleteData(selectedId);
                        setSelectedId('');
                        onClose();
                    }}>
                      Hapus
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        )
    }
    
    let getCarsData = async (payload = { Page: 1, Limit: 5, Search: "", Order: "ASC" }) => {
        let url = `${config.apiHost}/api/v1/cars`;
        let query = [];
        
        setIsLoading(true);
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
        const res = await axios.get(url);
        setData(res.data);
        setIsLoading(false);
    }

    let deleteData = async (id = "") => {
        try {
            const data = await axios.delete(`${config.apiHost}/api/v1/cars/${id}`);
            console.log(data);
            getCarsData();
        } catch (error) {
            console.log(error);
            alert("tidak dapat menghapus data, silahkan coba lagi");
        }
    }

    const renderTableData = () => {
        return data.items.map((val, idx) => {
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
                                    <Button isIconOnly color="primary" variant="bordered" aria-label="view" onClick={() => router.push(`/cars/${val.id}`)}>
                                        <GoEye />
                                    </Button>
                                </Tooltip>
                                <Tooltip content="Ubah Data">
                                    <Button isIconOnly color="warning" variant="bordered" aria-label="update" onClick={() => router.push(`/cars/edit/${val.id}`)}>
                                        <GoPencil />
                                    </Button>
                                </Tooltip>
                                <Tooltip content="Hapus Data">
                                    <Button isIconOnly color="danger" variant="bordered" aria-label="delete" onPress={onOpen} onClick={() => {
                                        setSelectedId(val.id);
                                        onOpen();
                                    }}>
                                        <GoTrash />
                                    </Button>
                                </Tooltip>
                            </div>
                        </TableCell>
                    </TableRow>
            )
        })
    }

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
                    placeholder="Ketik untuk mencari nama mobil..."
                    startContent={<GoSearch/>}
                    onChange={(e) => setSearch(e.target.value)}
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
                <TableBody emptyContent={"Data tidak tersedia atau tidak ditemukan"} isLoading={isLoading}>
                    {renderTableData()}
                </TableBody>
            </Table>

            { data.items.length > 0 ? <div className="flex justify-center p-8">
                <Pagination isCompact total={Math.ceil(data.total/data.limit)} initialPage={1} onChange={(p) => getCarsData({ 
                    Page: p,
                    Limit: 5,
                    Search: search
                })} />
            </div> : null}
        </>
    )
}