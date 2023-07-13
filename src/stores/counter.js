import { createPinia, defineStore } from 'pinia'
import { toRaw } from 'vue'
import qrcode from 'qrcode-generator-es6'


export const useStore = defineStore('storeId', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      Member: {
        membership: {
          itemNumber: 0,
          memberDetails: [{
            firstName: '1',
            lastName:'2',
            eMail: '3',
            country: '4',
            city: '5',
            adress: '6',
            postalCode: '7',
            phoneNumber: '8',
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
      this.Member.membership.memberDetails[0] = (member)
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