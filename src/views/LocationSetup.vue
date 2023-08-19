<style>

.vs__dropdown-toggle {
  padding: 5px 0;
}

.form-floating > .form-select, .form-floating > .form-control {
  padding: 0px 15px !important;
  height: 50px;
}

#map {
  height: 400px;
}
</style>
<template>
  <!-- loader strat -->
  <!--    <div class="loader" v-if="loading">-->
  <!--        <span></span>-->
  <!--        <span></span>-->
  <!--    </div>-->
  <!-- loader end -->
  <!-- login section start -->
  <section class="form-section px-15 top-space section-b-space">
    <div class="d-flex justify-content-around align-items-center gap-3 mb-5">
      <img :src="EPILogo2()" class="shadow" alt="epi-logo"
           style="height: 100px; width: 100px; border: 1px solid #757575; border-radius: 10px; padding: 5px">
      <img :src="GovtLogo" class="shadow" alt="govt-logo"
           style="height: 100px; width: 100px; border: 1px solid #757575; border-radius: 10px; padding: 5px">
      <img :src="TKFLogo2()" class="shadow" alt="tkf-logo"
           style="height: 100px; width: 100px; border: 1px solid #757575; border-radius: 10px; padding: 5px">
    </div>
    <div class="mb-4">
      <h1>Attendance</h1>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="alert {{response.status ? 'alert-success' : 'alert-danger'}}" v-if="response.message"
           role="alert">
        {{ response.message }}
      </div>
      <div class="form-floating mb-3">
        <select class="form-select" style="padding-top: 10px !important;" id="site_type"
                :disabled="attendance.length>0"
                @change="getDistricts()" v-model="form.site_type" name="site_type">
          <option value="">Select Site Type</option>
          <option value="OS">Outreach Site</option>
          <option value="FS">Fixed Site</option>
        </select>
        <label for="district_id">Site Type</label>
      </div>
      <div class="form-floating mb-3">
        <select class="form-select" style="padding-top: 10px !important;" id="district_id" @change="getTowns()"
                :disabled="attendance.length>0"
                v-model="form.district" name="district_id">
          <option value="">Select District</option>
          <option v-for="(district, key) in districts" :key="key" :value="district.district">
            {{ district.district }}
          </option>
        </select>
        <label for="district_id">District</label>
      </div>
      <div class="form-floating mb-3">
        <select class="form-select" style="padding-top: 10px !important;" id="town_taluqa" @change="getUCs()"
                :disabled="attendance.length>0"
                v-model="form.town_taluqa" name="town_taluqa">
          <option value="">Select Town/Taluqa</option>
          <option v-for="(town, key) in towns" :key="key" :value="town.town_taluqa">{{ town.town_taluqa }}
          </option>
        </select>
        <label for="uc">Town/Taluqa</label>
      </div>
      <div class="form-floating mb-3">
        <select class="form-select" style="padding-top: 10px !important;" id="uc" @change="getAreaSite()"
                :disabled="attendance.length>0"
                v-model="form.uc" name="uc">
          <option value="">Select UC</option>
          <option v-for="(uc, key) in ucs" :key="key" :value="uc.uc">{{ uc.uc }}</option>
        </select>
        <label for="uc">UC</label>
      </div>
      <div class="form-floating mb-3">
        <v-select v-model="form.area_site" :options="areas"></v-select>
        <label for="uc">Area/Site</label>
      </div>
      <button type="submit" class="btn btn-primary w-100">Update Location</button>
    </form>
    <!--        <div>-->
    <!--            <div id="map"></div>-->
    <!--        </div>-->
  </section>
  <!-- login section end -->
</template>

<script>
import {EPILogo, EPILogo2, GovtLogo, Logo, TKFLogo2} from "@/images/index.js";
import {getAttendance as userAttendance} from "@/utils/getAttendance.js";
import API from '@/config/api.config'

export default {
  name: 'LocationSetupPage',
  setup() {
  },
  components: {
    // LMap,
    // LTileLayer,
    // LMarker
  },
  props: {},
  data() {
    return {
      GovtLogo: GovtLogo,
      Logo: Logo,
      EPILogo: EPILogo,
      errors: null,
      loading: false,
      response: {
        status: false,
        message: '',
      },
      user: localStorage.getItem('user'),
      districts: [],
      towns: [],
      ucs: [],
      areas: [],
      attendance: [],
      form: {
        site_type: '',
        district: '',
        town_taluqa: '',
        uc: '',
        area_site: '',
        latitude: null,
        longitude: null
      }
    }
  },
  mounted() {
    const userDetail = this.user ? JSON.parse(this.user) : {}
    this.getAttendance()
    // this.initializeMap();
    // if(userDetail.district!=='' && userDetail.town!=='' && userDetail.uc!=='') {
    //     this.$router.push({path: '/user/dashboard'})
    // }
  },
  methods: {
    TKFLogo2() {
      return TKFLogo2
    },
    EPILogo2() {
      return EPILogo2
    },
    async getAttendance() {
      const token = this.user ? JSON.parse(this.user).token : ''
      const user = this.user ? JSON.parse(this.user) : {}
      const response = await userAttendance()
      if (response.length > 0) {
        this.attendance = response
        this.form = {
          site_type: response[0].site_type,
          district: response[0].district,
          town_taluqa: response[0].town_taluqa,
          uc: response[0].uc,
          area_site: response[0].area_site
        }
        this.getDistricts()
        this.getTowns()
        this.getUCs()
        this.getAreaSite()
      }
    },
    async getDistricts() {
      const token = this.user ? JSON.parse(this.user).token : ''
      const response = await API.post('getDistricts', {site_type: this.form.site_type})
      if (response.data) {
        this.districts = response.data
        console.log(this.districts)
      }
    },
    async getTowns() {
      const token = this.user ? JSON.parse(this.user).token : ''
      const response = await API.post(`getTowns`, {
        district: this.form.district,
        site_type: this.form.site_type
      })
      console.log(response.data)
      if (response.data) {
        this.towns = response.data
      } else {
        this.towns = []
      }
    },
    async getUCs() {
      const token = this.user ? JSON.parse(this.user).token : ''
      const response = await API.post(`getUCs`, {
        district: this.form.district,
        site_type: this.form.site_type,
        town_taluqa: this.form.town_taluqa
      })
      if (response.data) {
        this.ucs = response.data
      } else {
        this.ucs = []
      }
    },
    async getAreaSite() {
      const token = this.user ? JSON.parse(this.user).token : ''
      const response = await API.post(`getAreaSite`, {
        district: this.form.district,
        site_type: this.form.site_type,
        town_taluqa: this.form.town_taluqa,
        uc: this.form.uc
      })
      if (response.data) {
        this.areas = response.data.map(item => item.site_area)
      } else {
        this.areas = []
      }
    },
    async handleSubmit() {
      const token = this.user ? JSON.parse(this.user).token : ''
      const user = this.user ? JSON.parse(this.user) : {}

      if (!this.form.town_taluqa || !this.form.district || !this.form.uc || !this.form.area_site || !this.form.site_type) {
        this.message = 'Please select all the option first'
      } else {
        this.message = ''
        this.loading = true
        const response = await API.post('storeAttendance', {
          user_id: user.id,
          province: 'Sindh',
          ...this.form
        })
        const result = response.data
        if (result.status) {
          this.loading = false
          this.response = {
            status: result.status,
            message: result.message
          }
          // localStorage.setItem('user', JSON.stringify(result.data))
          this.$router.push({path: '/dashboard'})
        } else {
          this.loading = false
          this.message = result.message
        }
      }
    },
    // getCoordinates() {
    //     const geocoder = new Geocoder();
    //
    //     geocoder.geocode(this.address)
    //         .then(result => {
    //             if (result.length > 0) {
    //                 const location = result[0].location;
    //                 this.form.latitude = location.lat;
    //                 this.form.longitude = location.lng;
    //                 // this.error = '';
    //             } else {
    //                 this.form.latitude = null;
    //                 this.form.longitude = null;
    //                 // this.error = 'Address not found';
    //             }
    //         })
    //         .catch(error => {
    //             this.form.latitude = null;
    //             this.form.longitude = null;
    //             // this.error = 'Error fetching coordinates';
    //             console.error('Error:', error);
    //         });
    // },
    // initializeMap() {
    //     const map = L.map('map').setView([this.latitude, this.longitude], 13);
    //
    //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //         attribution: '&copy; OpenStreetMap contributors'
    //     }).addTo(map);
    //
    //     L.marker([this.latitude, this.longitude]).addTo(map)
    //         .bindPopup('Latitude: ' + this.latitude + '<br>Longitude: ' + this.longitude)
    //         .openPopup();
    // }
  }
}
</script>
