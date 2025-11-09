class ApiServices{ 
    fetchData() { 
        const promise = axios({
            method: "get",
            url: "https://68fb24ad94ec96066024c4d9.mockapi.io/api/v1/Product",
        });
        
        return promise;
    }

     deleteData(id) { 
        const promise = axios({
            method: "delete",
            url: `https://68fb24ad94ec96066024c4d9.mockapi.io/api/v1/Product/${id}`,
        });

        return promise;
    }

    addData(product) { 
        const promise = axios({
            method: "post",
            url: `https://68fb24ad94ec96066024c4d9.mockapi.io/api/v1/Product`,
            data: product,
        });

        return promise;
    }

    fetchDataById(id) { 
        const promise = axios({
            method: "get",
            url: `https://68fb24ad94ec96066024c4d9.mockapi.io/api/v1/Product/${id}`,
        });
        
        return promise;
    }

    updateData(product) { 
        const promise = axios({
            method: "put",
            url: `https://68fb24ad94ec96066024c4d9.mockapi.io/api/v1/Product/${product.id}`,
            data: product,
        });

        return promise;
    }
}

export default ApiServices;