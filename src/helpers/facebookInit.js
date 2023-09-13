//import { accountService } from '@/_services';

export function initFacebookSdk(id) {
    return new Promise(resolve => {
        // wait for facebook sdk to initialize before starting the vue app
        window.fbAsyncInit =  () => {
            FB.init({
                appId: id,
                cookie: true,
                xfbml: true,
                version: 'v17.0'
            });
            FB.AppEvents.logPageView();
            console.log("Facebook initiated")
        };

        // load facebook sdk script
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    })
}