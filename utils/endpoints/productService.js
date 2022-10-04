async function add(product, photos, cb, token) {
    const requestOptions = generateRequestOptions(requestType.post, token, {'product': product, 'photos': photos});
    request(requestOptions, '', cb);
}

async function list(cb, options, token) {
    const requestOptions = generateRequestOptions(requestType.post, token, options);
    request(requestOptions, 'list', cb);
}

async function getListLength(cb, options, token) {
    const requestOptions = generateRequestOptions(requestType.post, token, options);
    request(requestOptions, 'list-length', cb);
}

async function request(requestOptions, pathSegment, cb, params) {
    await fetch(generateURL(pathSegment, params), requestOptions)
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

function generateURL(type, params) {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_VERSION}/marketplace/product/${type}${params == null ? '' : params}`;
}

function generateRequestOptions(type, accessToken, bodyObj) {
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
        body: JSON.stringify(bodyObj)
    };
}

const requestType = {
    get: 'GET',
    post: 'POST',
    delete: 'DELETE',
    put: 'PUT'
}

let productService = {
    add: add,
    list: list,
    getListLength: getListLength
}

export default productService;