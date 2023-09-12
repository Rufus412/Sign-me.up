import axios from 'axios'

const queueURL = 'https://nprtestmpn01membersignup.queue.core.windows.net/updatemembermessage/messages?visibilitytimeout=1&messagettl=3600&sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-11-30T15:36:56Z&st=2023-09-05T06:36:56Z&spr=https&sig=rv7Tn8u0IFm7qklhcY0ng2v5TpgGVqKi90ufIx4wodA%3D',

  queueHeader = {
    headers: {
      Accept: 'application/xml',
      'Content-Type': 'application/xml'
    }
  }
const imageHeader = {
  headers: {
    'x-ms-blob-type': 'BlockBlob',
    'Content-Type': 'text/plain; charset=utf-8'
  }
};

function postToQueue(xml) {
  return axios.post(queueURL, xml, queueHeader)
}

function postImageToQueue(b64, RowKey) {
  const imageUploadURL = `https://nprtestmpn01membersignup.blob.core.windows.net/images/${RowKey}?si=AddNewToBlob&spr=https&sv=2022-11-02&sr=c&sig=p2QU8AyfGsDgBSnWlFDDJcYjVGLB39gx8ksXNTxFNCw%3D`
  return axios.put(imageUploadURL, b64, imageHeader)
}

async function getGoogleProfileInfo(access_token) {
  const googleHeader = {
    headers: {
      Authorization: "Bearer" + access_token
    }
  }
  let googleApiUri = 'https://www.googleapis.com/oauth2/v2/userinfo'
  return axios.get(googleApiUri, googleHeader)
}



export const axiosService = {
  postToQueue,
  postImageToQueue,
  getGoogleProfileInfo,
}