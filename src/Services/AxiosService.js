import axios from 'axios'


let baseURL = 'https://nprtestmpn01membersignup.queue.core.windows.net/updatemembermessage/messages?visibilitytimeout=1&messagettl=3600&sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-08-31T15:09:57Z&st=2023-07-24T07:09:57Z&spr=https&sig=3BJZPBBEmvqHOnavxar8jbD4oQ4FdW%2FZA1DptUOH73Y%3D',

config = {
    Accept: 'application/xml',
    'Content-Type': 'application/xml'
}


function postToQueue(xml) {
    return axios.post(baseURL, xml, config)
  }



export const axiosService = {
  postToQueue,
} 