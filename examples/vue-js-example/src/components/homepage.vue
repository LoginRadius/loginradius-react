<template>
    <div id="homepage">
        <h2>Home Page</h2>
        <Login v-on:update="onLoggedIn"></Login>
        <ResendEmailVerification></ResendEmailVerification>
        <SocialLogin></SocialLogin>
        <Register></Register>
    </div>
</template>

<script>
    import Login from './login.vue'
    import ResendEmailVerification from './resend-email.vue'
    import SocialLogin from './sociallogin.vue'
    import Register from './register.vue'
    export default {
        name: 'homepage',
        data() {
            return {

            }
        },
        methods: {
            onLoggedIn() {
                this.$emit('update',"loggedin")
            }
        },
        components: {
            Login,
            ResendEmailVerification,
            SocialLogin,
            Register
        }
    }



</script>