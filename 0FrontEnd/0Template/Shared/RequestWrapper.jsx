import axios from 'axios';

const client = axios.create({
    baseURL: "/"
});

const request = function(options) {

    console.log("asdf");

    const onSuccess = function(response) {
        console.debug('Request Successful!', response);
        return response;
    }

    const onError = function(error) {
        console.error('Request Failed:', error.config);

        // THIS IS FROM INTERNET
        if (error.response) {
            // Request was made but server responded with something
            // other than 2xx
            console.error('Status:',  error.response.status);
            console.error('Data:',    error.response.data);
            console.error('Headers:', error.response.headers);

        } else {
            // Something else happened while setting up the request
            // triggered the error
            console.error('Error Message:', error.message);
        }

        // THIS IS RANDY
        switch (error.response.status) {
            case 500:
                break
            case 401:
                break
            case 402:
                break
            case 422:
                var resultError = "";
                var keys = Object.keys(error.response.data.errors);
                for (let i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    var arrayError = error.response.data.errors[key];
                    for (let j = 0; j < arrayError.length; j++) {
                        var theError = arrayError[j];
                        resultError = resultError + " " + key + " (" + theError + ")\n";
                    }
                }
                alert(resultError);
                break
            default:
                alert(error.response.data.message)
                break
        }

        return Promise.reject(error.response || error.message);
    }

    return client(options)
        .then(onSuccess)
        .catch(onError);
}

export default request;