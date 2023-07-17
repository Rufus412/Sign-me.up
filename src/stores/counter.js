import { createPinia, defineStore } from 'pinia'
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
    }
  },
  actions: {
    addMember(member) {
      this.Member.createMembership.members[0] = (member) 
      return    
    },
    makeQR() {
      const qr = new qrcode(0, 'L')
      if (!this.devMode) {
        const thisData = JSON.stringify(this.Member.createMembership)
        const payLoad = {
          createMembership: {
            data: (btoa(thisData)) 
          }
        }  
        qr.addData(JSON.stringify(payLoad));
        qr.make();
        
        console.log("QRCode Payload ->" + JSON.stringify(payLoad))
        this.SvgTag = qr.createSvgTag({})
        console.log(this.SvgTag)
      }
      else {
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
            }]
          }
        }
        qr.addData(JSON.stringify(payLoad));
        qr.make();
        
        console.log("QRCode Payload ->" + JSON.stringify(payLoad))
        this.SvgTag = qr.createSvgTag({})
        console.log(this.SvgTag)
      }
    }
  }
})