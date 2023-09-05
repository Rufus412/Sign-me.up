
export function initAppleSdk() {
    AppleID.auth.init({
        clientId: import.meta.env.VITE_APPLE_IDENTIFIER,
        scope: 'email name',
        redirectURI: `https://www.sannes.se/npk/member/m4/`,
        state: "ejOFDOWAPLWldaow203kdoadw",
        usePopup: true,
    });
    console.log("apple initiated")
        
}
