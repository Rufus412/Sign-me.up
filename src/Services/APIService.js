import { useStore } from "../stores/counter";

export const apiService = {
    getLogginData,
    getName
}

function getLogginData() {  
    return FB.getLoginStatus(function(response) {
       return statusChangeCallback(response);
    });
}
function statusChangeCallback(response) {
    const store = useStore()
    console.log(response.authResponse)
    return response.authResponse
}

function getName(accessToken) {
    FB.api(
        '/me',
        'GET',
        {"fields":"first_name,last_name,middle_name,email",
        "access_token": accessToken },
        
        function(response) {
            
            const store = useStore()
            console.log('FB-api:' + JSON.stringify(response))
            console.log('FB-api raw: ' + response)
            console.log(Object.values(response))
            let responseVals = Object.values(response)
            if (store.devMode !== true) {
                console.log("Adding values from FB api call")
                store.addMember({
                    firstName: responseVals[0],
                    lastName: responseVals[1],
                    eMail: responseVals[2],
                })
            }
            store.logInMethod = 'facebook'
        }
    );

}














