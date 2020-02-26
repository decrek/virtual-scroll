<template>
  <main class="container">
    <h2>Detail page for {{ $route.params.id }}</h2>
    <button @click="$router.go(-1)">Go back</button>
  </main>
</template>
