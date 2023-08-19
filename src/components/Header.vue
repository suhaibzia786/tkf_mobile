<template>
    <header class="shadow-sm">
        <div class="nav-bar p-2" style="cursor: pointer" @click="toggleSideBar">
            <img :src="BarSVG" class="img-fluid" alt="">
        </div>

        <div class="header-option">
            <router-link to="/user/dashboard" class="brand-logo d-flex justify-content-end gap-1">
                <img :src="EPILogo2()" class="img-fluid" alt="" style="max-height: 30px; max-width: 30px; border: 1px solid #757575; border-radius: 5px; padding: 5px">
                <img :src="GovtLogo" class="img-fluid" alt="" style="max-height: 30px; max-width: 30px; border: 1px solid #757575; border-radius: 5px; padding: 5px">
                <img :src="TKFLogo2()" class="img-fluid" alt="" style="max-height: 30px; max-width: 30px; border: 1px solid #757575; border-radius: 5px; padding: 5px">
            </router-link>
<!--            <ul>-->
<!--                <li>-->
<!--                    <a href="search.html"><i class="iconly-Search icli"></i></a>-->
<!--                </li>-->
<!--                <li>-->
<!--                    <a href="notification.html"><i class="iconly-Notification icli"></i></a>-->
<!--                </li>-->
<!--                <li>-->
<!--                    <a href="wishlist.html"><i class="iconly-Heart icli"></i></a>-->
<!--                </li>-->
<!--                <li>-->
<!--                    <a href="cart.html"><i class="iconly-Buy icli"></i></a>-->
<!--                </li>-->
<!--            </ul>-->
        </div>
    </header>
    <SideBar :show="show" />
</template>

<script>
import {EPILogo, GovtLogo, Logo, BarSVG, TKFLogo2, EPILogo2} from "@/images/index.js";
import SideBar from "@/components/Sidebar.vue";
export default {
    name: 'Header',
    setup() {},
    components: {SideBar},
    props: {},
    data() {
        return {
            Logo,
            GovtLogo,
            EPILogo,
            BarSVG,
            show: false
        }
    },
    methods: {
        EPILogo2() {
            return EPILogo2
        },
        TKFLogo2() {
            return TKFLogo2
        },
        toggleSideBar() {
            this.show = !this.show;
        },
        // handleClickOutside(event) {
        //
        //     // if (!this.$el.contains(event.target) || event.target.id==='sidebartoggler') {
        //         this.show = false;
        //     // }
        // }
    },
    mounted() {
        // document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
        // document.removeEventListener('click', this.handleClickOutside);
    },
}
</script>
