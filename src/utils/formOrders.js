import { useEffect, useState } from "react";

const useFormOrders = (callback, defaultValue) => {
    const [value, setValue] = useState({
        car_id: 0,
        order_date: "",
        pickup_date: "",
        dropoff_date: "",
        pickup_location: "",
        dropoff_location: ""
    });
    const [error, setError] = useState({
        car_id: "",
        order_date: "",
        pickup_date: "",
        dropoff_date: "",
        pickup_location: "",
        dropoff_location: ""
    });

    useEffect(() => {
        if (!defaultValue) return
        setValue(defaultValue);
    }, [defaultValue]);

    const handleChange = (e) => {
        e.persist();

        let name = e.target.name;
        let val = e.target.value;

        validate(e, name, val);

        setValue({
            ...value,
            [name]:val
        });
    }   

    const handleChangeSelect = (e) => {
        validate(e, "car_id", e.currentKey);
        
        setValue({
            ...value,
            car_id:e.currentKey
        });
    }

    const validate = (e, name, value) => {
        switch (name) {
            case "car_id":
                if (value < 1) {
                    setError({
                        ...error,
                        car_id: "Mobil wajib dipilih"
                    });
                } else {
                    // remove the error
                    setError({
                        ...error,
                        car_id: ""
                    });
                }
            break;
            case "order_date":
                if (value.length < 1) {
                    setError({
                        ...error,
                        order_date: "Tanggal pemesanan wajib diisi"
                    });
                } else {
                    // remove the error
                    setError({
                        ...error,
                        order_date: ""
                    });
                }
            break;
            case "pickup_date":
                if (value.length < 1) {
                    setError({
                        ...error,
                        pickup_date: "Tanggal jemput wajib diisi"
                    });
                } else {
                    // remove the error
                    setError({
                        ...error,
                        pickup_date: ""
                    });
                }
            break;
            case "dropoff_date":
                if (value.length < 1) {
                    setError({
                        ...error,
                        dropoff_date: "Tanggal antar wajib diisi"
                    });
                } else {
                    // remove the error
                    setError({
                        ...error,
                        dropoff_date: ""
                    });
                }
            break;
            case "pickup_location":
                if (value.length < 5) {
                    setError({
                        ...error,
                        pickup_location: "Alamat jemput minimal 5 karakter"
                    });
                } else if (value.length > 50) {
                    setError({
                        ...error,
                        pickup_location: "Alamat jemput maksimal 50 karakter"
                    });
                } else {
                    // remove the error
                    setError({
                        ...error,
                        pickup_location: ""
                    });
                }
            break;
            case "dropoff_location":
                if (value.length < 5) {
                    setError({
                        ...error,
                        dropoff_location: "Alamat antar minimal 5 karakter"
                    });
                } else if (value.length > 50) {
                    setError({
                        ...error,
                        dropoff_location: "Alamat antar maksimal 50 karakter"
                    });
                } else {
                    // remove the error
                    setError({
                        ...error,
                        dropoff_location: ""
                    });
                }
            break;
            default:
            break;
        }
    }

    const handleSubmit = (e) => {
        if(e) e.preventDefault();

        let blankCount = 0;
        let errorCount = 0;
        // check is there any blank field ?
        Object.keys(value).forEach(val => {
            if (value[val] === "") {
                blankCount += 1;
            }
        });
        Object.keys(error).forEach(val => {
            if (error[val] !== "") {
                errorCount += 1;
            }
        });
        if (blankCount > 0 || errorCount > 0) {
            setError({
                car_id: value.car_id <= 0 ? "Mobil wajib dipilih" : error.car_id,
                order_date: value.order_date.length <= 0  ? "Tanggal pemesanan wajib diisi" : error.order_date,
                pickup_date: value.pickup_date.length <= 0 ? "Tanggal jemput wajib diisi" : error.pickup_date,
                dropoff_date: value.dropoff_date.length <= 0 ? "Tanggal antar wajib diisi" : error.dropoff_date,
                pickup_location: value.pickup_location.length <= 0 ? "Alamat jemput wajib diisi" : error.pickup_location,
                dropoff_location: value.dropoff_location.length <= 0 ? "Alamat tujuan wajib diisi" : error.dropoff_location
            });
            return;
        }


        callback();
    }

    return {
        value,
        error,
        handleChange,
        handleSubmit,
        handleChangeSelect
    }
}

export default useFormOrders;