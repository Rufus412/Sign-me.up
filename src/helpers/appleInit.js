
export function initAppleSdk(keys) {
    AppleID.auth.init({
        clientId: keys.clientID,
        scope: 'email name',
        redirectURI: keys.redirectURI,
        state: "ejOFDOWAPLWldaow203kdoadw",
        usePopup: true,
    });
    console.log("Apple initiated")

}
