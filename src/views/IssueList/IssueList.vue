<template>
    <section class="alert-classic section-b-space pt-0" style="margin-top: 90px;">
        <div class="d-flex just-content-center align-items-center gap-1 px-2">
            <button class="btn w-100" :class="tabActive==='os' ? 'btn-primary' : 'btn-secondary'"
                    @click="changeTab('os')">Outreach
            </button>
            <button class="btn w-100" :class="tabActive==='fs' ? 'btn-primary' : 'btn-secondary'"
                    @click="changeTab('fs')">Fixed Site
            </button>
        </div>
        <!--        <div class="bg-red-600 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded relative" role="alert">-->
        <!--            <strong class="font-bold">Holy smokes!</strong>-->
        <!--            <span class="block sm:inline">Something seriously bad happened.</span>-->
        <!--        </div>-->
        <FSIssue v-if="tabActive==='fs'"/>
        <OSIssue v-if="tabActive==='os'"/>
    </section>
</template>

<script>
import FSIssue from "@/views/IssueList/FSIssue.vue";
import OSIssue from "@/views/IssueList/OSIssue.vue";

export default {
    name: 'IssueListPage',
    setup() {
    },
    components: {FSIssue, OSIssue},
    props: {},
    data() {
        return {
            tabActive: 'os',
            message: ''
        }
    },
    mounted() {
        this.tabActive = 'os'
        this.message = this.$route.params.message
    },
    methods: {
        changeTab(tab) {
            this.tabActive = tab
        }
    }
}
</script>
