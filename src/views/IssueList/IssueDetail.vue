<style></style>
<template>
    <PageHeader title="Submitting Issue Detail" backLink="/issue/list"/>
    <section class="alert-classic top-space section-b-space p-3 my-5">
        <div class="d-flex flex-column justify-content-center align-items-center mb-5 gap-3">
            <h3 class="fw-bolder">{{ this.$route.params.issue_title.replace('_', ' ') }}</h3>
            <strong>
                Area: <span class="fw-light">{{
                    issueBasics && (issueBasics.area_site + ' ' + issueBasics.town_taluqa + ', ' +
                        issueBasics.uc + ', ' + issueBasics.district)
                }}</span>
            </strong>
        </div>
        <form @submit.prevent="handleSubmit">

            <div class="form-group mb-4" v-if="timeline.length===0">
              <label for="since_when">Since When</label>
                <input type="date" class="form-control" v-model="form.since_when" name="since_when" id="since_when"
                       placeholder="Since When">
                <small class="text-info" style="font-size: 10px;">Since when the issue happend</small>
            </div>

            <div class="form-group mb-4">
                <label for="description">{{timeline.length!==0 ? 'Next ' : ''}}Action Required</label>
                <textarea class="form-control" name="description" v-model="form.description" id="description" rows="3"
                          style="padding-top: 10px !important;" placeholder="Action Required"></textarea>
                <small class="text-info" style="font-size: 10px;">Detail description of actions to be taken</small>
            </div>

            <div class="form-group mb-4" v-if="timeline.length===0">
                <label for="issue_assigned_to">Responsible Person</label>
                <input type="text" class="form-control" v-model="form.issue_assigned_to" name="issue_assigned_to"
                       id="issue_assigned_to" placeholder="Name of responsible persion who will the resolve issue">
                <small class="text-info" style="font-size: 10px;">Name of responsible persion who will the resolve
                    issue</small>
            </div>
            <div class="form-group mb-4" v-if="timeline.length===0">
                <label for="issue_assignee_contact">Cell Number</label>
                <input type="number" class="form-control" v-model="form.issue_assignee_contact"
                       name="issue_assignee_contact" id="issue_assignee_contact" placeholder="Cell Number">
                <small class="text-info" style="font-size: 10px;">Cell of responsible persion who will the resolve
                    issue</small>
            </div>
            <div class="form-group mb-4">
                <label for="issue_update_date">{{timeline.length!==0 ? 'Next ' : ''}}Agreed Date on Issue will be resolved</label>
                <input type="date" class="form-control" v-model="form.issue_update_date" name="issue_update_date"
                       id="issue_update_date" placeholder="Follow up date">
                <small class="text-info" style="font-size: 10px;">Date at which the issue is expected to be
                    resolve</small>
            </div>

            <div class="form-group mb-4" v-if="timeline.length===0">
                <label for="next_level_manager_contact">Next Level Manager Contact</label>
                <input type="number" class="form-control" v-model="form.next_level_manager_contact"
                       name="next_level_manager_contact" id="next_level_manager_contact"
                       placeholder="Next Level Manager Contact">
                <small class="text-info" style="font-size: 10px;">Contact number of your next level manager</small>
            </div>

            <div class="checkbox_animated d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center mb-2">
                    <input type="checkbox" name="status" id="status" value="closed" v-model="form.status" checked="">
                    <label for="status">Is Resolved</label>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
        <div class="d-flex w-100 my-4" v-if="timeline.length!==0">
            <button type="button" @click="navigateToDestination" class="btn btn-secondary w-100">Tracking Timeline
            </button>
        </div>
    </section>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import API from '@/config/api.config'
export default {
    name: 'IssueDetailPage',
    setup() {
    },
    components: {PageHeader},
    props: ['data_id', 'session_id', 'user_id', 'data_type'],
    data() {
        return {
            loading: false,
            message: '',
            id: 0,
            type: '',
            issueDetail: null,
            issueBasics: null,
            timeline: [],
            issueType: '',
            user: localStorage.getItem('user'),
            form: {
                since_when: '',
                issue_assigned_to: '',
                issue_assignee_contact: '',
                issue_update_date: '',
                next_level_manager_contact: '',
                description: '',
                status: ''
            }
        }
    },
    mounted() {
        this.getIssueDetail()
        console.log(this.issueDetail);
    },
    methods: {
        async handleSubmit() {
            this.loading = true
            const token = this.user ? JSON.parse(this.user).token : ''
            const formData = {
                district: this.issueBasics.district,
                town_taluqa: this.issueBasics.town_taluqa,
                uc: this.issueBasics.uc,
                area_site_name: this.issueBasics.area_site,
                user_id: this.issueBasics.user_id,
                data_id: this.issueBasics.id,
                data_type: this.$route.params.data_type,
                session_id: this.$route.params.session_id,
                issue_priority: 'high',
                issue_type: this.$route.params.issue_type,
                issue_title: this.$route.params.issue_title.replace('_', ' '),
                // follow_up: this.timeline.length === 0 ? this.timeline.length === 1 ? this.timeline.length : this.timeline.length + 1 : 0,
                ...this.form
            }
            console.log(formData)
            const response = await API.post('storeIssueDetails', formData)
            const result = response.data
            if (result.status) {
                this.loading = false
                this.message = result.message
                this.$router.push({
                    name: 'issue-list',
                    // params: {message: this.message},
                })
            } else {
                this.loading = false
                this.message = result.message
            }
        },
        async getIssueDetail() {
            const token = this.user ? JSON.parse(this.user).token : ''
            const response = await API.post(`getIssueDetails`, {
                session_id: this.$route.params.session_id,
                user_id: this.$route.params.user_id,
                type: this.$route.params.data_type,
                issue_type: this.$route.params.issue_type
              })
            if (response.data) {
                this.issueDetail = response.data.detail
                this.issueBasics = response.data.basic
                this.timeline = response.data.timeline
            }
        },
        navigateToDestination() {
            this.$router.push({
                name: "issue-tracking",
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
