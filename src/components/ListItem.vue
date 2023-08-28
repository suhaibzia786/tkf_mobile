<style>

.legend {
    height: 10px;
    width: 15px;
    border-radius: 5px;
}

.legend-1 {
    background-color: #f47e7e;
}

.legend-2 {
    background-color: #fc3b3b;
}

.legend-3 {
    background-color: #f80000;
}

.legend-4 {
    background-color: #8d0000;
}
</style>
<template>
    <li>
        <div class="w-100 rounded p-2 d-flex flex-column bg-white shadow border gap-2">
            <div class=" d-flex justify-content-between align-items-center ">
                <div class="content d-flex flex-column gap-1"
                     @click="navigateToDestination(data.base_data.issueDetail ? 'issue-tracking' : 'issue-detailing', data)"
                     style="cursor: pointer">
                    <h4 class="fw-bold text-uppercase">{{ data.issue.title }}</h4>
                    <h6>
                        <strong>Location:</strong> {{
                            data.base_data.site_name + ' ' + data.base_data.town_taluqa + ', ' + data.base_data.uc + ', ' + data.base_data.district
                        }}
                    </h6>
                    <h6>
                        <strong>Reported On:</strong>
                        {{ formatDate(data.base_data.created_date) }}
                    </h6>
                    <h6>
                        <strong>Reported By:</strong> {{ data.base_data.user }}
                    </h6>
                </div>
                <div class="d-flex flex-column gap-1">
                    <div class="btn btn-info shadow btn-sm"
                         @click="navigateToDestination('issue-tracking', data)"
                         style="cursor: pointer" v-if="data.base_data.issueDetail">
                        <i class="iconly-Search icli" style="font-size: 20px"
                           title="Tracking"></i>
                    </div>
                    <div class="btn btn-primary shadow btn-sm"
                         @click="navigateToDestination('issue-detailing', data)"
                         style="cursor: pointer">
                        <i class="iconly-Edit icli" style="font-size: 20px"
                           title="Add Details"></i>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-start align-items-center" v-if="data.base_data.issueDetail && data.base_data.issueDetail.issue_timeline">
                <div v-for="(value, key) in data.base_data.issueDetail.issue_timeline" :class="'legend ' + 'legend-'+value.follow_up" :key="key"></div>
<!--                <div class="legend second"></div>-->
<!--                <div class="legend third"></div>-->
<!--                <div class="legend fourth"></div>-->
            </div>
        </div>
    </li>
</template>

<script>
export default {
    name: 'ListItem',
    setup(props) {
        // console.log(props.data)
    },
    components: {},
    props: ['data', 'key'],
    data() {
        return {
            issueItem: []
        }
    },
    mounted() {
    },
    methods: {
        navigateToDestination(name, data) {
            console.log(data)
            this.$router.push({
                name: name,
                params: {
                    data_id: data.base_data.data_id,
                    session_id: data.base_data.session_id,
                    user_id: data.base_data.user_id,
                    data_type: data.base_data.site_type,
                    issue_type: data.issue.issue_type,
                    issue_title: data.issue.title.replace(/ /g, '_')
                },
            })
        }
    }
}
</script>
<script setup>
</script>
