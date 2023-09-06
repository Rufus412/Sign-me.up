import { useStore } from "../stores/counter";

export const apiService = {
    getLogginData,
    getName
}

function getLogginData() {
    return FB.getLoginStatus(function (response) {
        return statusChangeCallback(response);
    });
}
function statusChangeCallback(response) {
    const store = useStore()
    return response.authResponse
}

function getName(accessToken) {
    return FB.api(
        '/me',
        'GET',
        {
            "fields": "first_name,last_name,middle_name,email",
            "access_token": accessToken
        },

        function (response) {

            const store = useStore()
            let responseVals = Object.values(response)
            if (!store.devMode) {
                store.modifyMember({
                    firstName: responseVals[0],
                    lastName: responseVals[1],
                    eMail: responseVals[2],
                })
            }
            store.logInMethod = 'facebook'
        }
    );

}














