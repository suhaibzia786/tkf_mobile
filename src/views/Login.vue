<template>

    <!-- loader strat -->
    <div class="loader" v-if="loading">
        <span></span>
        <span></span>
    </div>
    <!-- loader end -->
    <!-- login section start -->
    <section class="form-section px-15 top-space section-b-space">
        <div class="d-flex justify-content-around align-items-center gap-3 mb-5">
            <img :src="EPILogo2()" class="shadow" alt="epi-logo" style="height: 100px; width: 100px; border: 1px solid #757575; border-radius: 10px; padding: 5px">
            <img :src="GovtLogo" class="shadow" alt="govt-logo" style="height: 100px; width: 100px; border: 1px solid #757575; border-radius: 10px; padding: 5px">
            <img :src="TKFLogo2()" class="shadow" alt="tkf-logo" style="height: 100px; width: 100px; border: 1px solid #757575; border-radius: 10px; padding: 5px">
        </div>
        <div class="mb-4">
            <h1>Issue Tracker</h1>
            <h2 class="fw-bold">Third Party Field Monitoring (TPFM) for routine immunization activities</h2>
        </div>
        <form @submit.prevent="handleSubmit">
            <div class="alert alert-danger" v-if="message" role="alert">
                {{ message }}
            </div>
            <div class="form-floating mb-4">
                <input type="text" class="form-control" id="phone" v-model="form.phone" name="phone"
                       placeholder="Registered Phone Number">
                <label for="phone">Phone Number</label>
            </div>
            <div class="form-floating mb-2">
                <input type="password" class="form-control" id="password" v-model="form.password" name="password"
                       placeholder="password">
                <label for="password">Password</label>
            </div>
            <div class="text-end mb-4">
                <a href="forgot-password.html" class="theme-color">Forgot Password ?</a>
            </div>
            <button type="submit" class="btn btn-primary w-100">Sign in</button>
        </form>
    </section>
    <!-- login section end -->
</template>

<script>
import {EPILogo, EPILogo2, GovtLogo, Logo, TKFLogo2} from "@/images/index.js";
import API from "@/config/api.config";

export default {
    name: 'LoginPage',
    setup() {
    },
    components: {},
    props: {},
    data() {
        return {
            GovtLogo: GovtLogo,
            Logo: Logo,
            EPILogo: EPILogo,
            errors: null,
            loading: false,
            message: '',
            form: {
                phone: '',
                password: ''
            }
        }
    },
    mounted() {
        if (localStorage.getItem('user')) {
            this.$router.push({path: '/dashboard'})
        }
    },
    methods: {
        TKFLogo2() {
            return TKFLogo2
        },
        EPILogo2() {
            return EPILogo2
        },
        async handleSubmit() {
            this.loading = true
            const response = await API.post('login', this.form)
            const result = response.data
            if (result.status === 'success') {
                this.loading = false
                localStorage.setItem('user', JSON.stringify(result.data))
                this.message = result.message
                this.loading = false
                console.log(result)
                this.$router.push({path: '/user/attendance'})
            } else {
                this.loading = false
                this.message = result.message
            }
        },
    }
}

</script>
