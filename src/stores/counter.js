import { createPinia, defineStore } from 'pinia'
import { toRaw } from 'vue'
import qrcode from 'qrcode-generator-es6'


export const useStore = defineStore('storeId', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      Member: '',
      SvgTag: ''
    }
  },
  actions: {
    addMember(member) {
      this.Member = JSON.stringify(toRaw(member))
      console.log("this is a member " + this.Member)
      
      const qr = new qrcode(0, 'H');
      console.log("STORE ->" + this.Member)
      qr.addData(this.Member);
      qr.make();

      this.SvgTag = qr.createSvgTag({
      cellSize:3, margin:100})
      console.log(this.SvgTag)
    }
  }
})