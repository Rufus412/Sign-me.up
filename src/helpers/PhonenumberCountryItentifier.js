let phonenumberCountryCode = {
    "1": "US",
    "2": {
      "20": "EG",
      "27": "ZA"
    },
    "3": {
      "30": "GR",
      "31": "NL",
      "32": "BE",
      "33": "FR",
      "34": "ES",
      "36": "HU",
      "39": "IT"
    },
    "4": {
      "40": "RO",
      "41": "CH",
      "42": {
        "420": "CZ",
        "421": "SK",
        "423": "LI"
      },
      "43": "AT",
      "44": "GB",
      "45": "DK",
      "46": "SE",
      "47": {
        "47": "NO"
      },
      "48": "PL",
      "49": "DE"
    },
    "5": "GR",
    "6": {
      "60": "MY",
      "61": "AU",
      "62": "ID"
    },
    "7": {
      "70": "RU",
      "71": "KZ",
      "72": "TM",
      "73": "TJ",
      "74": "KG",
      "75": "UZ",
      "76": "TJ",
      "77": "KG"
    },
    "8": {
      "81": "JP",
      "82": "KR",
      "84": "VN",
      "86": "CN",
      "90": "TR",
      "91": "IN"
    },
    "9": {
      "90": "TR",
      "91": "IN",
      "92": "PK",
      "93": "AF",
      "94": "LK",
      "95": "MM",
      "98": "IR",
      "99": {
        "992": "TJ",
        "993": "TM",
        "994": "AZ",
        "995": "GE",
        "996": "KG",
        "998": "UZ"
      }
    }
  }




export function findCountryCode(phoneNumber) {
    const phoneNumberDigits = phoneNumber.split("")
    if (phoneNumberDigits[0] !== "+") {
        return null
    }
    let myVar = eval("phonenumberCountryCode"+"[phoneNumberDigits['1']]")
    console.log(myVar)
    if (typeof myVar === 'string' && myVar !== null) {
        console.log(myVar)
        return myVar
    }
    else {
        let phoneNumberStart = phoneNumberDigits[1].concat(phoneNumberDigits[2])
        console.log(phoneNumberStart)
        console.log(typeof phoneNumberStart)
        myVar = eval("phonenumberCountryCode"+"[phoneNumberDigits[1]][phoneNumberStart]")
        console.log(myVar)
        if (typeof myVar === 'string' && myVar !== null) {
            console.log(myVar)
            return myVar
        }
        else {
            let phoneNumberStart2 = phoneNumberStart.concat(phoneNumberDigits[3])
            myVar = eval("phonenumberCountryCode"+"[phoneNumberDigits[1]][phoneNumberStart][phoneNumberStart2]")
            if (typeof myVar === 'string' && myVar !== null) {
                console.log(myVar)
                return myVar
            }
            return null
        }
    }
}