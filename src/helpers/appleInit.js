
export function initAppleSdk(id) {
    AppleID.auth.init({
        clientId: id,
        scope: 'email name',
        redirectURI: `https://www.sannes.se/npk/member/m4/`,
        state: "ejOFDOWAPLWldaow203kdoadw",
        usePopup: true,
    });
    console.log("Apple initiated")

}
