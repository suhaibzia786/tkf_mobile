<template>
    <!-- header start -->
    <header>
        <div class="back-links">
            <router-link :to="backLink">
                <i class="iconly-Arrow-Left icli"></i>
                <div class="content">
                    <h2>{{title}}</h2>
                </div>
            </router-link>
        </div>
    </header>
    <!-- header end -->
</template>

<script>
export default {
    name: 'PageHeader',
    setup() {},
    components: {},
    props: {
        title: {
            type: String,
            default: 'Issue Tracking',
            required: true
        },
        backLink: {
            type: String,
            default: '/user/dashboard',
            required: true
        }
    },
    data() {
        return {}
    },
    mounted() {},
    methods: {}
}
</script>
