<script>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <div class="flex items-center">
        <img src="./../public/note-512.png" class="h-8 mr-3"/>
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ePost-It</span>
      </div>
      <div class="items-center justify-between w-full md:flex md:w-auto md:order-1 menu-container" id="navbar-search">
        <ul
          class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 menu-links"
        >
          <li>
            <RouterLink to="/" exact>Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/about">About</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <RouterView />
</template>
