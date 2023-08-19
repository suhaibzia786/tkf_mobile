<script>
import {RouterView} from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SideBar from "@/components/Sidebar.vue";
import Loader from "@/components/Loader.vue";
import {getAttendance} from "@/utils/getAttendance.js";
import API from '@/config/api.config'

export default {
  name: 'AppLayout',
  setup() {
  },
  components: {Header, Footer, SideBar, Loader},
  props: {},
  data() {
    return {}
  },
  mounted() {
    this.checkAttendance()
  },
  methods: {
    async checkAttendance() {
      const attendance = await getAttendance()
      console.log(attendance)
      if (attendance.length > 0) {
        const latestAttendance = attendance[0]

        const today = new Date();
        const dateFromTimestamp = new Date(latestAttendance.updated_at);
        const isCurrentDate = (
            dateFromTimestamp.getFullYear() === today.getFullYear() &&
            dateFromTimestamp.getMonth() === today.getMonth() &&
            dateFromTimestamp.getDate() === today.getDate()
        );
        if (!isCurrentDate) {
          this.$router.push({path: '/user/attendance'})
        }
      } else {
        this.$router.push({path: '/user/attendance'})
      }
    }
  }
}
</script>

<template>
  <!-- header start -->
  <Header
      v-if="this.$route.name==='dashboard' || this.$route.name==='issue-list' || this.$route.name==='user-attendance' || this.$route.name==='user-profile'"/>
  <!-- header end -->
  <!-- main start -->
  <RouterView/>
  <!-- main end -->
  <!-- footer start -->
  <Footer/>
  <!-- footer end -->
</template>

