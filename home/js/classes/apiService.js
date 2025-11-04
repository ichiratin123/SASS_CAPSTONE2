class ApiServices{ 
    fetchData() { 
        const promise = axios({
            method: "get",
            url: "https://68fb24ad94ec96066024c4d9.mockapi.io/api/v1/Product",
        });
        
        return promise;
    }
}

export default ApiServices;