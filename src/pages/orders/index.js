import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button, Tooltip, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { GoTrash, GoEye, GoPencil, GoPlus, GoSearch } from "react-icons/go";

let confirmationModal = ({isOpen, onOpenChange}) => {
    

    return(
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Konfirmasi</ModalHeader>
              <ModalBody>
                <p> 
                  Apakah anda ingin menghapus data pemesanan ini ?
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

export default function Orders() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return(
        <>
            {confirmationModal({isOpen, onOpenChange})}
            <header>
                <div className="flex justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Daftar Pemesanan
                    </h1>
                    <div>
                        <Button size="lg" color="primary" startContent={<GoPlus/>}>
                            Tambah Data
                        </Button>
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
                    <TableColumn>CAR ID</TableColumn>
                    <TableColumn>ORDER DATE</TableColumn>
                    <TableColumn>TGL. JEMPUT</TableColumn>
                    <TableColumn>TGL. ANTAR</TableColumn>
                    <TableColumn>LOKASI JEMPUT</TableColumn>
                    <TableColumn>LOKASI ANTAR</TableColumn>
                    <TableColumn>OPSI</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell>1</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>2024-01-10</TableCell>
                        <TableCell>2024-01-10</TableCell>
                        <TableCell>2024-02-10</TableCell>
                        <TableCell>Jl, kemanggisan no.10 rt.11</TableCell>
                        <TableCell>Jl, tumenggul no.200</TableCell>
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
                </TableBody>
            </Table>
            <div className="flex justify-center p-8">
                <Pagination isCompact showControls total={10} initialPage={1} />
            </div>
        </>
    )
}