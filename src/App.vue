<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav class="bg-gray-700">
      <div class="container mx-auto py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-50">ePost-It</h1>
        <div class="flex space-x-10">
          <div class="flex items-center space-x-2">
            <span class="text-gray-50"><RouterLink to="/" exact>Home</RouterLink></span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-gray-50"><RouterLink to="/about">Sobre</RouterLink></span>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <RouterView/>
</template>

<style>
.router-link-exact-active {
  text-decoration: 3px underline;
  font-weight: bold;
}
</style>
