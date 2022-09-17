async function get(cb, id) {

}

async function list(cb, token) {
    const requestOptions = generateRequestOptions(requestType.get, token);
    request(requestOptions, cb);
}

async function request(requestOptions, cb) {
    await fetch(generateURL('list'), requestOptions)
    .then(response => response.json())
    .then((data) => {
        if (typeof(data.code) != 'undefined' && data.code != 200) {
            cb(false);
        } else {
            cb(true, data);
        }
    })
    .catch((err) => {console.log(err); cb(false)});  
}

function generateURL(type) {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_VERSION}/marketplace/category/${type}`;
}

function generateRequestOptions(type, accessToken) {
    return {
        method: type,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        },
        credentials: 'include',
        xhrFields: {
            withCredentials: true,
        },
    };
}

const requestType = {
    get: 'GET',
    post: 'POST'
}

let categoryService = {
    get: get,
    list: list
}

export default categoryService;