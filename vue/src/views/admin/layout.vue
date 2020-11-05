<template>
  <a-layout id="components-layout-demo-top-side" style="min-height: 100%;">
    <a-layout-header class="header">
      <div class="logo" />
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item href="">
          <a-icon type="home" />
        </a-breadcrumb-item>
        <a-breadcrumb-item v-for="(item, key) in menus" :key="key">
          <template v-for="(el, i) in item.children">
            <span v-if="el.url == current[0]" :key="i">{{item.actionName}}</span>
          </template>
        </a-breadcrumb-item>
        <a-breadcrumb-item>{{$route.name}}</a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout style="padding: 24px 0; background: #fff">
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
            v-model="current"
            :open-keys.sync="openKeys"
            mode="inline"
            @click="handleClick"
            style="height: 100%;"
          >
            <a-sub-menu v-for="(item, key) in menus" :key="item.id || key">
              <span slot="title">{{item.actionName}}</span>
              <a-menu-item v-for="(el, i) in item.children" :key="el.url || i">
                <span>{{el.actionName}}</span>
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', overflow: 'hidden' }">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      current: [],
      openKeys: [],
      menus: [],
    }
  },
  methods: {
    // 菜单选择
    handleClick(e) {
      const path = `/admin/${e.key}`
      this.$router.push({ path })
    },
  },
  created() {
    this.$post('/api/user/findMenus').then((res) => {
      if (res && res.data) {
        const { menus } = res.data
        this.menus = menus
        // this.openKeys = menus.map((item) => item.id)
        this.current = [this.$route.path.replace('/admin/', '')]
      }
    })
  },
}
</script>

<style lang="scss" scoped>
#components-layout-demo-top-side .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>
