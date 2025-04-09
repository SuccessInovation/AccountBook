<template>
  <div id="containers">
    <TheHeader />
    <div class="main-content">
      <TheSidebar />
      <div class="container_router_view">
        <router-view />
      </div>
    </div>
  </div>
  <TheFooter />
</template>

<script>
import TheHeader from './layout/TheHeader.vue'
import TheSidebar from './layout/TheSidebar.vue'
import TheFooter from './layout/TheFooter.vue'

export default {
  components: {
    TheHeader,
    TheSidebar,
    TheFooter,
  },
}
</script>
