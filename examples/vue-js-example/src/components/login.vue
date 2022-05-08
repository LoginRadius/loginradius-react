<template>
    <div id="login" >
        <div v-if="toggleLogin" class="lr-template" id="login_true">
            <hr />
            <h3>Login</h3>
            <div id='login-container'></div>
            <button v-on:click = "toggle">Back</button>
            <hr />
        </div>
        <div id="login_false" v-else>
            <button v-on:click="toggle">Login</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        methods: {
            toggle() {
                this.toggleLogin = !this.toggleLogin;
            }
        },
        data() {
            return {
                toggleLogin: false
            }
        },
        updated() {
            if (this.toggleLogin) {
                var login_options = {};
                login_options.container = 'login-container';
                login_options.onSuccess = (response) => {
                    console.log(response);
                    
                    alert("Authentication successful");
                    window.location.replace=commonOptions.returnURL;
                    this.$emit('update')
                };
                login_options.onError = function (errors) {
                    console.log(errors);
                    alert("Error while authenticating : "+errors[0].Message);
                };
                window.LRObject.init('login', login_options);
            }
        }
    }

</script>