



var xhr = new XMLHttpRequest()
xhr.open('GET',
    'https://www.googleapis.com/drive/v3/about?fields=user&' +
    'access_token=' + params['access_token']);
xhr.onreadystatechange = function (e) {
    console.log(xhr.response);
    };
    xhr.send(null);