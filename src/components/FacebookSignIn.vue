<script setup>
import { apiService } from '../Services/APIService';
import { useStore } from '../stores/counter';

</script>



<script>

export default {
    methods: {
        checkLoginState() {
            FB.login((response) => {
            
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                //console.log(response); // dump complete info
                console.log(response.authResponse)
                const store = useStore()
                
                console.log("This is the UID " + response.authResponse.userID)
                store.memberID = response.authResponse.userID

                
                apiService.getName()
                this.$router.push( {name: 'formCheck' })
            } else {
                //user hit cancel button
                console.log('User cancelled login or dd not fully authorize.');

            }
            }, { scope: 'public_profile,email'});
        },
    }
}
</script>





<template>

    <button type="button" @click="checkLoginState" class="loginBtn loginBtn--facebook flex border-0 w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-[#458FEF] ">
        <span class="text-white" id="fbText">{{ $t('frontPage.facebookButton') }}</span>
    </button>

</template>




<style scoped>


#navButton {
    position: absolute;
    top: 20%;
    right: 50%;
    transform: translate(50%);
}


.loginBtn {
  box-sizing: border-box;
  position: relative;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}


/* Facebook */
.loginBtn--facebook {
  background-color: #1877F2;
  background-image: linear-gradient(#4C69BA, #3B55A0);
  /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
  text-shadow: 0 -1px 0 #354C8C;
}
.loginBtn--facebook:before {
  border-right: #364e92 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
}
.loginBtn--facebook:hover,
.loginBtn--facebook:focus {
  background-color: #5B7BD5;
  background-image: linear-gradient(#5B7BD5, #4864B1);
}
#fbText {
  transform: translate(-10%);
}


.loginBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
}
.loginBtn--google:before {
  border-right: #D3D3D3 1px solid;
  background: url('../assets/Google_G.png') 6px 6px no-repeat;
}

</style>