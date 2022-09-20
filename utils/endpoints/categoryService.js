async function get(cb, id) {

}

async function add(category, cb, token) {
    const requestOptions = generateRequestOptions(requestType.post, token, category);
    request(requestOptions, '', cb);
}

async function list(cb, token) {
    const requestOptions = generateRequestOptions(requestType.get, token);
    request(requestOptions, 'list', cb);
}

async function remove(id, cb, token) {
    const requestOptions = generateRequestOptions(requestType.delete, token);
    request(requestOptions, '', cb, '?id=' + id);
}

async function update(category, cb, token) {
    const requestOptions = generateRequestOptions(requestType.put, token, category);
    request(requestOptions, '', cb);
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
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_VERSION}/marketplace/category/${type}${params == null ? '' : params}`;
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

let categoryService = {
    get: get,
    list: list,
    add: add,
    remove: remove,
    update: update
}

export default categoryService;