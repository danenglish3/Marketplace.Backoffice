async function refreshToken(cb) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        xhrFields: {
            withCredentials: true,
        },
    };

    await fetch(generateURL('refresh'), requestOptions)
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

async function generateToken(tokenState, email, pwd, cb) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        xhrFields: {
            withCredentials: true,
        },
        body: JSON.stringify({ email: email, password: pwd })
    };

    await fetch(generateURL('generate'), requestOptions)
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
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_VERSION}/token/${type}`;
}

let tokenService = {
    refresh: refreshToken,
    generate: generateToken
}

export default tokenService;