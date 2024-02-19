const errorCode = () => {
    let translate = (errorCode = "") => {
        let result = ""
        switch (errorCode) {
            case "car-already-occupied":
                result = "Mobil sudah dipesan, silahkan ubah mobil atau ganti tanggal jemput"
            break;
            default:
                result = "Terjadi kesalahan silahkan coba beberapa saat lagi"
            break;
        }

        return result;
    }

    return {
        translate
    }
}

export default errorCode;