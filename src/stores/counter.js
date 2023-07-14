import { createPinia, defineStore } from 'pinia'
import qrcode from 'qrcode-generator-es6'

export const useStore = defineStore('storeId', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      Member: {
        createMembership: {
          itemNumber: 0,
          members: [{
            firstName: '',
            lastName:'',
            eMail: '',
            country: '',
            city: '',
            adress: '',
            postalCode: '',
            phoneNumber: '',
            newsLetter: true,
            tos: false
          }]
        }
      },
      SvgTag: ''
    }
  },
  actions: {
    addMember(member) {
      this.Member.createMembership.members[0] = (member)
      console.log("this is a member " + JSON.stringify(this.Member))      
    },
    makeQR() {
      const qr = new qrcode(0, 'H');
      console.log("STORE ->" + JSON.stringify(this.Member))
      qr.addData(JSON.stringify(this.Member));
      qr.make();

      this.SvgTag = qr.createSvgTag({})
      console.log(this.SvgTag)
    }
  }
})