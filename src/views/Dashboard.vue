<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two columns with equal width */
  grid-template-rows: repeat(2, 1fr); /* Two rows with equal height */
  gap: 10px; /* Gutter between grid items */
}
</style>
<template>
  <!-- home slider start -->
  <section class="pt-0" style="margin-top: 70px">
    <!--        <div class="d-flex flex-wrap justify-content-center gap-2 mb-3 shadow p-3">-->
    <!--            <div class="form-floating w-100">-->
    <!--                <input type="date" name="from" id="from" class="form-control">-->
    <!--                <label for="from">From</label>-->
    <!--            </div>-->
    <!--            <div class="form-floating w-100">-->
    <!--                <input type="date" name="to" id="to" class="form-control">-->
    <!--                <label for="to">To</label>-->
    <!--            </div>-->
    <!--            <button type="submit" class="btn btn-primary">Filter</button>-->
    <!--            <button type="submit" class="btn btn-secondary">Clear</button>-->
    <!--        </div>-->
    <div class="grid-container p-3">
      <div class="grid-item card shadow">
        <div class="card-body d-flex justify-content-center align-items-center flex-column gap-3">
          <h1 class="fw-bolder">{{ statistics.overall.total }}</h1>
          <!--                    <h5 class="fw-bold">Fixed Site: {{ statistics.fs.total }}, Outreach Site: {{-->
          <!--                            statistics.os.total-->
          <!--                        }}</h5>-->
          <h3 class="fw-bold">Total</h3>
        </div>
      </div>
      <div class="grid-item card shadow">
        <div class="card-body d-flex justify-content-center align-items-center flex-column gap-3">
          <h1 class="fw-bolder">{{ statistics.overall.resolved }}</h1>
          <!--                    <h5 class="fw-bold">-->
          <!--                        FS: {{ statistics.fs.resolved }} <br> -->
          <!--                        OS: {{ statistics.os.resolved }}-->
          <!--                    </h5>-->
          <h3 class="fw-bold">Resolved</h3>
        </div>
      </div>
      <div class="grid-item card shadow">
        <div class="card-body d-flex justify-content-center align-items-center flex-column gap-3">
          <h1 class="fw-bolder">{{ statistics.overall.remaining }}</h1>
          <!--                    <h5 class="fw-bold">Fixed Site: {{ statistics.fs.remaining }}, Outreach Site:-->
          <!--                        {{ statistics.os.remaining }}</h5>-->
          <h3 class="fw-bold">Remaining</h3>
        </div>
      </div>
      <router-link to="/issue/list" class="grid-item btn btn-primary shadow">
        <div class="card-body d-flex justify-content-center align-items-center flex-column gap-3">
          <i class="iconly-Arrow-Right-Square icli fs-2"></i>
          <h1 class="text-white m-0">More</h1>
        </div>
      </router-link>
    </div>
    <!--        <div class="divider t-12 b-20"></div>-->
    <!--        <div class="p-3" style="margin-bottom: 50px">-->
    <!--            <div id="chart">-->
    <!--                <apexchart type="line" height="350" :options="chartOptions" :series="chartSeries"></apexchart>-->
    <!--            </div>-->
    <!--        </div>-->
  </section>
  <!-- home slider end -->
</template>

<script>
import API from '@/config/api.config'

export default {
  name: 'DashboardPage',
  setup() {
  },
  components: {},
  props: {},
  data() {
    return {
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
      statistics: {
        fs: {
          total: 0,
          resolved: 0,
          remaining: 0
        },
        os: {
          total: 0,
          resolved: 0,
          remaining: 0
        },
        overall: {
          total: 0,
          resolved: 0,
          remaining: 0
        }
      },
      chartOptions: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
        }
      },
      chartSeries: [
        {
          name: 'Total',
          data: [30, 40, 25, 50, 49, 60, 70]
        },
        {
          name: 'Resolved',
          data: [30, 40, 25, 50, 49, 60, 70]
        }
      ]
    }
  },
  mounted() {
    this.getStatistics()
  },
  methods: {
    async getStatistics() {
      const response = await API.get('user/dashboard')
      this.statistics = response.data
    }
  }
};
</script>
