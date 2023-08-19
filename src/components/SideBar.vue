<template>
  <div class="loader" v-if="loading">
    <span></span>
    <span></span>
  </div>
  <a href="javascript:void(0)" class="overlay-sidebar" :class="showSideBar ? 'show' : ''"></a>
  <div :class="showSideBar ? 'show' : ''" class="header-sidebar">
    <div class="d-flex justify-center align-items-center gap-3" style="background-color: rgba(237, 239, 244, 0.25);">
      <router-link to="/user/profile" class="user-panel">
        <img :src="DefaultAvatar" class="img-fluid user-img" alt="">
        <span>{{ user.name }}</span>
        <i class="iconly-Arrow-Right-2 icli"></i>
      </router-link>
      <a href="javascript:void(0)" class="d-flex justify-center align-items-center" @click="toggleSideBar">
        <i class="iconly-Close-Square icli mx-3" style="font-size: 30px"></i>
      </a>
    </div>
    <div class="sidebar-content">
      <ul class="link-section">
        <li>
          <router-link to="/user/profile">
            <i class="iconly-Profile icli"></i>
            <div class="content">
              <h4>Profile</h4>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/user/attendance">
            <i class="iconly-Edit icli"></i>
            <div class="content">
              <h4>Attendance</h4>
            </div>
          </router-link>
        </li>
      </ul>
      <div class="divider"></div>
      <ul class="link-section">
        <li>
          <a href="javascript:void(0)" @click="logout($event)">
            <i class="iconly-Logout icli"></i>
            <div class="content">
              <h4>Logout</h4>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {DefaultAvatar} from "@/images/index.js";
import API from '@/config/api.config'

export default {
  name: 'SideBar',
  setup() {
  },
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      DefaultAvatar,
      user: {},
      token: '',
      showSideBar: false,
      loading: false
    }
  },
  mounted() {
    this.showSideBar = this.show
    this.user = JSON.parse(localStorage.getItem('user'));
    this.token = this.user.token

  },
  methods: {
    toggleSideBar() {
      this.showSideBar = false;
      if (this.showSideBar) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    },
    toggleDarkMode(e) {
      console.log(e.target.checked)
      if (e.target.checked) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    },
    async logout(e) {
      e.preventDefault()
      this.loading = true
      const response = await API.get('logout')
      const result = response.data
      if (result && result.status) {
        localStorage.removeItem('user')
        window.location.reload()
      }
      this.loading = false
    }
  },
  watch: {
    show(newValue, oldValue) {
      this.showSideBar = newValue;
      if (this.showSideBar) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    },
  }
}
</script>
