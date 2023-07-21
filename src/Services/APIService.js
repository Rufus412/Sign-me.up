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
    console.log(response.authResponse)

    let x = {
        firstName: response.first_name
    }
    console.log("First name from response: " + JSON.stringify(x))
    return response.authResponse
}

async function getName(accessToken) {
    let response = await FB.api(
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
            store.addMember({
                firstName: responseVals[0],
                lastName: responseVals[1],
                eMail: responseVals[2],
                countryCode: '',
                city: '',
                adress:'',
                postalCode: '',
                phoneNumber: '',
                newsLetter: '',
                tos: '',
            })
            return response
        }
    );

}














