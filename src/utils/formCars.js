import { useState } from "react";
import { omit } from "lodash";

const useFormCars = (callback) => {
    const [value, setValue] = useState({
        car_name: "",
        day_rate: 0,
        month_rate: 0,
        image: ""
    });
    const [error, setError] = useState({
        car_name: "",
        day_rate: "",
        month_rate: "",
        image: ""
    });

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

    const validate = (e, name, value) => {
        switch (name) {
            case "car_name":
                if (value.length < 4) {
                    setError({
                        ...error,
                        car_name: "Nama mobil minimal 4 karakter"
                    });
                } else if (value.length > 50) {
                    setError({
                        ...error,
                        car_name: "Nama mobil maksimal 50 karakter"
                    });
                } else {
                    // remove the error
                    let newObject = omit(error, "car_name");
                    setError(newObject);
                }    
            break;
            case "day_rate":
                if (value < 1000) {
                    setError({
                        ...error,
                        day_rate: "Harga harian minimal Rp.1000"
                    });
                } else {
                    // remove the error
                    let newObject = omit(error, "day_rate");
                    setError(newObject);
                } 
            break;
            case "month_rate":
                if (value < 1000) {
                    setError({
                        ...error,
                        month_rate: "Harga bulanan minimal Rp.1000"
                    });
                } else {
                    // remove the error
                    let newObject = omit(error, "month_rate");
                    setError(newObject);
                } 
            break;
            case "image":
                if (value.length < 5) {
                    setError({
                        ...error,
                        image: "Link gambar minimal 5 karakter"
                    });
                } else if (value.length > 250) {
                    setError({
                        ...error,
                        image: "Link gambar maksimal 250 karakter"
                    });
                } else {
                    // remove the error
                    let newObject = omit(error, "image");
                    setError(newObject);
                } 
            break;
            default:
            break;
        }
    }

    const handleSubmit = (e) => {
        if(e) e.preventDefault();

        let blankCount = 0;
        // check is there any blank field ?
        Object.keys(value).forEach(val => {
            if (value[val] === "") {
                blankCount += 1;
            }
        });
        if (blankCount > 0) {
            setError({
                car_name: value.car_name.length <= 0 ? "Nama mobil wajib diisi" : error.car_name,
                day_rate: value.day_rate <= 0  ? "harga harian wajib diisi" : error.day_rate,
                month_rate: value.month_rate <= 0 ? "harga bulanan wajib diisi" : error.month_rate,
                image: value.image.length <= 0 ? "link gambar wajib diisi" : error.image
            })
            return;
        }
        callback();
    }

    return {
        value,
        error,
        handleChange,
        handleSubmit
    }
}

export default useFormCars;