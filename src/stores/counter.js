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
          members: []
        }
      },
      SvgTag: ''
    }
  },
  actions: {
    addMember(member) {
      this.Member.membership.members.push(member)
      console.log("this is a member " + JSON.stringify(this.Member))
      
      const qr = new qrcode(0, 'H');
      console.log("STORE ->" + JSON.stringify(this.Member))
      qr.addData(JSON.stringify(this.Member));
      qr.make();

      this.SvgTag = qr.createSvgTag({})
      console.log(this.SvgTag)
      this.Member.membership.members = []
      
    }
  }
})