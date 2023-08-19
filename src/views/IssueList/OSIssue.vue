<style>
.listItem li {
    width: 100%;
    padding: 4px 6px;
    border: none;
}

.form-floating {
    width: 100%;
    padding: 4px 6px;
}

.loading {
    border: 5px solid #f3f3f3; /* Light grey */
    border-top: 5px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
<template>
    <div class="tab-section mt-2">
        <div class="d-flex">
<!--            <div class="form-floating w-100 d-flex mt-4">-->
<!--                <input type="text" class="form-control" v-model="searchedKeyword" @input="handleSearch" name="keyword"-->
<!--                       id="keyword"-->
<!--                       placeholder="Search by issue title or area">-->
<!--                <label for="keyword">Search (Title or Area)</label>-->
<!--            </div>-->
            <div class="form-floating w-100 d-flex mt-4">
                <select name="" id="" class="form-select" v-model="filterCategory" @change="handleFilter">
                    <option value="all">All</option>
                    <option value="Vaccine Stockout">Vaccine Stockout</option>
                    <option value="ILR Functioning">ILR Functioning</option>
                    <option value="Syringes Stockout">Syringes Stockout</option>
                    <option value="Site Status">Site Status</option>
                    <option value="Vaccine Stockout">Vaccine Stockout</option>
                    <option value="Vaccine Stability">Vaccine Stability</option>
                    <option value="AEFI Kit Availability">AEFI Kit Availability</option>
                    <option value="Vaccinator Availibility">Vaccinator Availibility</option>
                    <option value="Vaccines Expired">Vaccines Expired</option>
                </select>
                <label for="keyword">Filter</label>
            </div>
        </div>
        <div class="sidebar-content">
            <ul class="listItem" style="padding: 0">
                <template v-if="loading">
                    <li>
                        <div class="loading m-auto"></div>
                    </li>
                </template>
                <template v-else>
                    <template
                        v-for="(value, key) in filterCategory==='all' ? issues : filteredList">
                        <ListItem :data="value"/>
                    </template>
                </template>
            </ul>
        </div>
    </div>
</template>

<script setup>
import moment from "moment";
import ListItem from "@/components/ListItem.vue";
</script>

<script>
import API from '@/config/api.config'

export default {
    name: 'OSIssue',
    setup() {
    },
    components: {},
    props: {},
    data() {
        return {
            activeTab: 'vaccinator',
            loading: false,
            issues: [],
            filteredList: [],
            user: localStorage.getItem('user'),
            filterCategory: 'all',
            searchedKeyword: ''
        }
    },
    mounted() {
        this.getOSIssues()
    },
    methods: {
        handleSearch(e) {
            if (e.target.value !== '') {
                this.filteredList = this.issues.filter(item => {
                    let location = item.base_data.site_name + ' ' + item.base_data.town_taluqa + ', ' + item.base_data.uc + ', ' + item.base_data.district
                    console.log(location.toLowerCase().includes(e.target.value.toLowerCase()))
                    return location.toLowerCase().includes(e.target.value.toLowerCase())
                })
            }
        },
        handleFilter(e) {
            if (e.target.value !== 'all') {
                this.filteredList = this.issues.filter(item => {
                    return item.issue.title.toLowerCase().includes(e.target.value.toLowerCase())
                })
            }
        },
        async getOSIssues() {
            this.loading = true
            const token = this.user ? JSON.parse(this.user).token : ''
            const response = await API.post('getIssueList', {type: 'os'})
            console.log(response.data)
            if (response.data) {
                this.loading = false
                this.issues = response.data
            } else {
                this.loading = false
            }
        }
    }
}
</script>
