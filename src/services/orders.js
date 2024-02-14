import config from "@/config";

class Orders {
    listOrders = (payload = { Page: 1, Limit: 10, Search: "", Order: "ASC" }) => {
            return new Promise((resolve, reject) => {
                let url = `${config.apiHost}/api/v1/orders`;
                let query = [];
                
                if (payload.Limit != null) {
                    query.push(`Limit=${payload.Limit}`);
                }
        
                if (payload.Search != null) {
                    query.push(`Search=${payload.Search}`);
                }
        
                if (payload.Search != null) {
                    query.push(`Order=${payload.Search}`);
                }
    
                if (payload.Page != null) {
                    query.push(`Page=${payload.Page}`);
                }
        
                if (query.length > 0) {
                    url += `?${query.join("&")}`
                }
    
                fetch(url, { 
                    method: "GET", 
                    cache: 'no-store',
                    headers: {
                        "Content-Type": "application/json",
                    } 
                }).then(response => {
                    resolve(response);
                }).catch(err => {
                    console.log(err);
                    reject(err);
                });
            })
    }

    getOrderById = (id = "") => {
        return new Promise((resolve, reject) => {
            fetch(`${config.apiHost}/api/v1/orders/${id}`, { 
                cache: 'no-store',
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                } 
            }).then(response => {
                resolve(response);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        });
    }

    createOrder = (payload) => {
        return new Promise((resolve, reject) => {
            fetch(`${config.apiHost}/api/v1/orders`, { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify(payload)
            }).then(response => {
                resolve(response);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        });
    }

    updateOrder = (payload) => {
        return new Promise((resolve, reject) => {
            fetch(`${config.apiHost}/api/v1/orders/${id}`, { 
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify(payload)
            }).then(response => {
                resolve(response);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        });
    }

    deleteOrder = (id = "") => {
        return new Promise((resolve, reject) => {
            fetch(`${config.apiHost}/api/v1/orders/${id}`, { 
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }, 
            }).then(response => {
                resolve(response);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        });
    }
}

export default Orders;