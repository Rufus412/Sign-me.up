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
            lastName: '',
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
      devMode: false,
      logInMethod: '',
      memberID: 0,
      SignUpFlow: 1,
      PartitionKey: '',
      RowKey: '',
      xmlPayload: '',
      fullCountryName: '',
      tosLink: '',
      phoneInQuery: false,
      profilePicAsBase64: '',
      profilePicAsURL: '',
      createApiError: false,
      locale: '',
      logoID: 'https://www.navipartner.dk/wp-content/uploads/2022/11/NaviPartner_rgb-1.svg',
      couponDescription: 'Coupon code',

    }
  },
  actions: {
    modifyMember(member) {
      let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

      const newMember = {
        firstName: member.firstName ?? this.Member.createMembership.members[0].firstName,
        lastName: member.lastName ?? this.Member.createMembership.members[0].lastName,
        eMail: member.eMail ?? this.Member.createMembership.members[0].eMail,
        city: member.city ?? this.Member.createMembership.members[0].city,
        countryCode: member.countryCode ?? this.Member.createMembership.members[0].countryCode,
        adress: member.adress ?? this.Member.createMembership.members[0].adress,
        postalCode: member.postalCode ?? this.Member.createMembership.members[0].postalCode,
        phoneNumber: member.phoneNumber ?? this.Member.createMembership.members[0].phoneNumber,
        newsLetter: member.newsLetter ?? this.Member.createMembership.members[0].newsLetter,
        tos: member.tos ?? this.Member.createMembership.members[0].tos,
      }

      this.Member.createMembership.members[0] = newMember

      this.fullCountryName = regionNames.of(this.Member.createMembership.members[0].countryCode)
    },
    makeQR(type, data) {
      const qr = new qrcode(0, 'L')
      if (type === 'coupon') {
        qr.addData(data)
        qr.make()
      }
      else {
        if (this.SignUpFlow === 0) {
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
                  pv: this.logInMethod || 'email',
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
          if (!this.devMode) {
            const axiosFailQRPayload = {
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
                  pv: this.logInMethod || 'email',
                  tn: this.memberID
                }
              }
            }
            let axiosFailQRCode = {
              updateMembership: {
                data: btoa(JSON.stringify(axiosFailQRPayload))
              }
            }
            console.log(JSON.stringify(axiosFailQRCode) + " QR code content")
            qr.addData(JSON.stringify(axiosFailQRCode))
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
      }

      this.SvgTag = qr.createSvgTag({})

      console.log(this.SvgTag)
    },
    makeXML() {

      let membershipData = {
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
            pv: this.logInMethod || 'email',
            tn: this.memberID
          }
        }
      }
      console.log(JSON.stringify(membershipData))

      let InnerXml = {
        PartitionKey: this.PartitionKey,
        RowKey: this.RowKey,
        Data: btoa(JSON.stringify(membershipData)),
        Image: '',
      }

      this.xmlPayload = InnerXml
      console.log(JSON.stringify(InnerXml))
      let completeXmlContent = JSON.stringify(InnerXml)

      return `<QueueMessage>  
                <MessageText>${completeXmlContent}</MessageText>  
              </QueueMessage>`

    }
  }
})