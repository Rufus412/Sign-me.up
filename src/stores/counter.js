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
      SvgTag: '',
      devMode : false
    }
  },
  actions: {
    addMember(member) {
      this.Member.createMembership.members[0] = (member)
      console.log("this is a member " + JSON.stringify(this.Member))  
      return    
    },
    makeQR() {
      const qr = new qrcode(0, 'L');
      let tempMember = this.Member
      if (!this.devMode) {
        const thisData = JSON.stringify(this.Member.createMembership)
        tempMember  = { data: (btoa(thisData)) }
      }
      else {
        tempMember.createMembership.members[0] = {
            fn: this.Member.createMembership.members[0].firstName,
            ln: this.Member.createMembership.members[0].lastName,
            em: this.Member.createMembership.members[0].eMail,
            cy: this.Member.createMembership.members[0].country,
            ct: this.Member.createMembership.members[0].city,
            ad: this.Member.createMembership.members[0].adress,
            pc: this.Member.createMembership.members[0].postalCode,
            pn: this.Member.createMembership.members[0].phoneNumber,
            nl: this.Member.createMembership.members[0].newsLetter,
            ts: this.Member.createMembership.members[0].tos,
        }
      }

      qr.addData(JSON.stringify(tempMember));
      qr.make();
      
      console.log("STORE ->" + JSON.stringify(tempMember))
      this.SvgTag = qr.createSvgTag({})
      console.log(this.SvgTag)
    }
  }
})