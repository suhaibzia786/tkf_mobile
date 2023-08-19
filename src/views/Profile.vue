<template>
    <section class="alert-classic section-b-space pt-0" style="margin-top: 90px;">
        <div class="d-flex flex-column gap-3 justify-content-center align-items-center">
            <img :src="DefaultAvatar()" alt="avatar"
                 style="max-width: 100px; border: 1px solid #868686; border-radius: 10px; padding: 5px">
            <h1>{{ user.name }}</h1>
            <h2>{{ user.user_role.role }}</h2>
            <h2>{{ user.phone }}</h2>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Reset
                Password
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Reset Password</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form @submit="handlePasswordReset">
                                <div class="form-group mb-3">
                                    <label for="currentPassword" class="form-label">Current Password</label>
                                    <input type="text" v-model="form.currentPassword" name="currentPassword"
                                           id="currentPassword" class="form-control">
                                </div>
                                <div class="form-group mb-3">
                                    <label for="newPassword" class="form-label">New Password</label>
                                    <input type="text" v-model="form.newPassword" name="newPassword" id="newPassword"
                                           class="form-control">
                                </div>
                                <button type="submit" class="btn btn-primary">Reset Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {DefaultAvatar} from "@/images/index.js";
import API from '@/config/api.config'

export default {
    name: 'ProfilePage',
    setup() {
    },
    components: {},
    props: {},
    data() {
        return {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
            form: {
                currentPassword: '',
                newPassword: ''
            }
        }
    },
    mounted() {
    },
    methods: {
        DefaultAvatar() {
            return DefaultAvatar
        },
        async handlePasswordReset(e) {
            e.preventDefault()
            const response = await API.post('updatePassword/' + this.user.id, this.form)
            if (response.data && response.data.status) {
                const modal = document.getElementById("exampleModal")
                const modalBackdrop = document.getElementsByClassName("modal-backdrop")
                modal.classList.remove('show')
                modalBackdrop[0].classList.remove('show')
                localStorage.clear()
                this.$router.push({path: '/login'})
            }
        }
    }
}
</script>
