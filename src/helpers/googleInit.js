// Replace YOUR_CLIENT_ID with your actual Google Sign-In client ID

export function initGoogleSdk() {
    return new Promise(resolve => {

        return

        const clientID = '886736602258-smn2otlk08g3bfo60c3930bufmqs7k9a.apps.googleusercontent.com';

        // Create a meta tag for the Google Sign-In client ID
        const metaTag = document.createElement('meta');
        metaTag.setAttribute('name', 'google-signin-client_id');
        metaTag.setAttribute('content', clientID);

        // Create a script tag for the Google API platform.js
        const scriptTag = document.createElement('script');
        scriptTag.src = 'https://apis.google.com/js/platform.js';
        scriptTag.async = true;
        scriptTag.defer = true;

        // Append the meta tag and script tag to the HTML head
        document.head.appendChild(metaTag);
        document.head.appendChild(scriptTag);


        gapi.load('auth2', function() {
            gapi.auth2.init()
        })
    })
}