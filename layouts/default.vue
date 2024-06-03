<template>
  <div class="wrapper">
    <LayoutsHeader>
      <template #default>
        <slot name="title"></slot>
      </template>
    </LayoutsHeader>
    <main class="main">
      <slot />
    </main>
  </div>
</template>
