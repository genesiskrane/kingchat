<template>
  <v-responsive class="border rounded" max-height="300">
    <v-app>
      <v-navigation-drawer>
        <v-list>
          <v-list-item title="Navigation drawer"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar title="App bar"></v-app-bar>

      <v-main>
        <v-container>
          <h1>Main Content</h1>
        </v-container>
        <router-view></router-view>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script>
export default {}
</script>

<style></style>
