import { defineStore } from 'pinia'
import qrcode from 'qrcode-generator-es6'

export const useStore = defineStore('storeId', {
  state: () => {
    return {
      Member: {
        createMembership: {
          itemNumber: 0,
          members: [{
            firstName: '',
            lastName:'',
            eMail: '',
            city: '',
            countryCode: '',
            adress: '',
            postalCode: '',
            phoneNumber: '',
            newsLetter: true,
            tos: false
          }]
        }
      },
      SvgTag: '',
      devMode : false,
      logInMethod: '',
      memberID: 0,
      lvl3: false,
      PartitionKey: '',
      RowKey: '',
      xmlPayload: '',
    }
  },
  actions: {
    addMember(member) {
      
      this.Member.createMembership.members[0] = (member) 
      return    
    },
    makeQR(input) {
      const qr = new qrcode(0, 'L')
      if (!this.lvl3) {
        console.log("notlvl3")
        const payLoad = {
          createMembership: {
            in: this.Member.createMembership.itemNumber,
            m: [{
              fn: this.Member.createMembership.members[0].firstName,
              ln: this.Member.createMembership.members[0].lastName,
              em: this.Member.createMembership.members[0].eMail,
              cc: this.Member.createMembership.members[0].countryCode,
              ct: this.Member.createMembership.members[0].city,
              ad: this.Member.createMembership.members[0].adress,
              pc: this.Member.createMembership.members[0].postalCode,
              pn: this.Member.createMembership.members[0].phoneNumber,
              nl: this.Member.createMembership.members[0].newsLetter,
              ts: this.Member.createMembership.members[0].tos,
              su: {
                pv: this.logInMethod,
                tn: this.memberID
              }
            }]
          }
        }
        if (!this.devMode) {
          const thisData = JSON.stringify(payLoad.createMembership)
          const QRpayLoad = {
            createMembership: {
              data: (btoa(thisData)) 
            }
          }  
          qr.addData(JSON.stringify(QRpayLoad));
          qr.make();
        }
        else {
          qr.addData(JSON.stringify(payLoad));
          qr.make();
        }
      }
      else {
        console.log("Lvl3")
        if (!this.devMode) {
          let axiosFailQRCode = {
            updateMembership: {
              data: btoa(JSON.stringify(this.xmlPayload))
            }
          }
          qr.addData(axiosFailQRCode)
          qr.make();
        }
        else {
          let axiosFailQRCode = {
            updateMembership: this.xmlPayload
          }
          console.log(JSON.stringify(axiosFailQRCode) + "This is the QR payload")
          qr.addData(JSON.stringify(axiosFailQRCode))
          qr.make();
          
        }
       
      }
      
      this.SvgTag = qr.createSvgTag({})
      
      console.log(this.SvgTag)
    },
    makeXML() {
      let InnerXml = {
        PartitionKey: this.PartitionKey,
        RowKey: this.RowKey,
        m: {
          fn: this.Member.createMembership.members[0].firstName,
          ln: this.Member.createMembership.members[0].lastName,
          em: this.Member.createMembership.members[0].eMail,
          cc: this.Member.createMembership.members[0].countryCode,
          ct: this.Member.createMembership.members[0].city,
          ad: this.Member.createMembership.members[0].adress,
          pc: this.Member.createMembership.members[0].postalCode,
          pn: this.Member.createMembership.members[0].phoneNumber,
          nl: this.Member.createMembership.members[0].newsLetter,
          ts: this.Member.createMembership.members[0].tos,
          su: {
            pv: this.logInMethod ||  'email',
            tn: this.memberID
          }
        }
      }
      this.xmlPayload = InnerXml
      console.log(JSON.stringify(InnerXml))
      let base64XML = btoa(JSON.stringify(InnerXml))
      return `<QueueMessage>  
                <MessageText>${base64XML}</MessageText>  
              </QueueMessage>>`

    }
  }
})