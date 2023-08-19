<template>
    <PageHeader title="Issue Tracking" backLink="/user/issue-list" />
    <section class="alert-classic top-space section-b-space pt-0">
        <div class="container py-4">
            <div class="mb-3">
                <h2 class="font-weight-light text-center text-muted py-3">{{issueDetail && issueDetail.issue_title}}</h2>
                <strong>Site: {{issueDetail && issueDetail.data_type==='FS' ? 'Fixed' : 'Outreach'}}</strong> <br>
                <strong>Area:
                    <span class="fw-light">{{ issueBasics && (issueBasics.area_site + ' ' + issueBasics.town_taluqa + ', ' + issueBasics.uc + ', ' + issueBasics.district) }}</span>
                </strong>
            </div>

            <div class="row" v-for="(value, key) in timeline">
                <div class="col-auto text-center flex-column d-none d-sm-flex">
                    <div class="row h-50">
                        <div class="col border-end">&nbsp;</div>
                        <div class="col">&nbsp;</div>
                    </div>
                    <h5 class="m-2">
                        <span class="badge rounded-pill bg-success">&nbsp;</span>
                    </h5>
                    <div class="row h-50">
                        <div class="col border-end">&nbsp;</div>
                        <div class="col">&nbsp;</div>
                    </div>
                </div>
                <div class="col py-2">
                    <div class="card border-success shadow">
                        <div class="card-body">
                            <div class="float-end text-success">{{formattedTimestamp(value.created_at)}}</div>
                            <h4 class="card-title text-success">{{value.follow_up===1 ? '1st' : value.follow_up===2 ? '2nd' : value.follow_up===3 ? '3rd' : '4th'}} Follow up</h4>
                            <p class="card-text">{{value.description}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <!--/row-->
        </div>
        <!--container-->
        <div class="d-flex justify-content-center my-4 px-3">
            <button class="btn btn-secondary w-100" @click="navigateToDestination">Add Detail</button>
        </div>
    </section>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import API from '@/config/api.config'
export default {
    name: 'IssueTrackingPage',
    setup() {},
    components: {PageHeader},
    props: {},
    data() {
        return {
            issueDetail: null,
            issueBasics: null,
            timeline: [],
        }
    },
    mounted() {
        this.getIssueDetail()
    },
    methods: {
        async getIssueDetail() {
            const token = this.user ? JSON.parse(this.user).token : ''
            const response = await API.post(`getIssueDetails`, {
                session_id: this.$route.params.session_id,
                user_id: this.$route.params.user_id,
                type: this.$route.params.data_type,
                issue_type: this.$route.params.issue_type
            })
            console.log(response.data)
            if (response.data) {
                this.issueDetail = response.data.detail
                this.issueBasics = response.data.basic
                this.timeline = response.data.timeline
            }
        },
        formattedTimestamp(timestamp) {
            const options = {
                weekday: 'short', // Short weekday name (e.g., Tue)
                month: 'short',   // Short month name (e.g., Jan)
                day: 'numeric',   // Numeric day of the month
                year: 'numeric',  // Full year (e.g., 2021)
                hour: 'numeric',  // Numeric hour (12-hour clock)
                minute: 'numeric', // Numeric minute
                hour12: true      // Use 12-hour clock with AM/PM
            };

            const date = new Date(timestamp);
            const formattedDate = date.toLocaleString('en-US', options);

            const day = date.getDate();
            const daySuffix = this.getDaySuffix(day);

            return formattedDate.replace(`${day}`, `${day}${daySuffix}`);
        },
        getDaySuffix(day) {
            if (day >= 11 && day <= 13) {
                return 'th';
            }
            switch (day % 10) {
                case 1:
                    return 'st';
                case 2:
                    return 'nd';
                case 3:
                    return 'rd';
                default:
                    return 'th';
            }
        },
        navigateToDestination() {
            this.$router.push({
                name: "issue-detailing",
                params: {
                    data_id: this.issueDetail.data_id,
                    session_id: this.issueDetail.session_id,
                    user_id: this.issueDetail.user_id,
                    data_type: this.issueDetail.data_type,
                    issue_type: this.issueDetail.issue_type,
                    issue_title: this.issueDetail.issue_title.replace(/ /g, '_')
                },
            })
        }
    }
}
</script>

<style scoped>

</style>
