var Config = () => {
    let data = {}

    data.apiHost = process.env["REACT_APP_BACKEND"] || 'http://localhost:8080'

    return data;
}

export default Config();