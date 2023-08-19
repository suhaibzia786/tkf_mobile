<script>
import {RouterLink} from 'vue-router'

export default {
  name: 'Footer',
  setup() {
  },
  components: {},
  props: {},
  data() {
    return {}
  },
  mounted() {
  },
  methods: {}
}
</script>

<template>
  <!-- bottom panel start -->
  <div class="bottom-panel">
    <ul>
      <li :class="this.$route.name==='dashboard' ? 'active' : ''">
        <RouterLink to="/dashboard">
          <div class="icon">
            <i class="iconly-Home icli"></i>
            <i class="iconly-Home icbo"></i>
          </div>
          <span>home</span>
        </RouterLink>
      </li>
      <li :class="this.$route.name==='issue-list' || this.$route.name==='issue-detailing' || this.$route.name==='issue-tracking' ? 'active' : ''">
        <RouterLink to="/issue/list">
          <div class="icon">
            <i class="iconly-Category icli"></i>
            <i class="iconly-Category icbo"></i>
          </div>
          <span>Issue List</span>
        </RouterLink>
      </li>
      <li :class="this.$route.name==='user-attendance' ? 'active' : ''">
        <RouterLink to="/user/attendance">
          <div class="icon">
            <i class="iconly-Edit icli"></i>
            <i class="iconly-Edit icbo"></i>
          </div>
          <span>Attendance</span>
        </RouterLink>
      </li>
      <li :class="this.$route.name==='user-profile' ? 'active' : ''">
        <RouterLink to="/user/profile">
          <div class="icon">
            <i class="iconly-Profile icli"></i>
            <i class="iconly-Profile icbo"></i>
          </div>
          <span>profile</span>
        </RouterLink>
      </li>
    </ul>
  </div>
  <!-- bottom panel end -->
</template>
