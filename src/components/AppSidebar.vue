<script setup>
defineProps({
  activeFilter: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['navigate'])

const links = [
  { id: 'todos', label: 'Mi colección', icon: 'collection' },
  { id: 'pendiente', label: 'Pendientes', icon: 'bookmark' },
  { id: 'vista', label: 'Vistas', icon: 'eye' },
]
</script>

<template>
  <aside class="sidebar" aria-label="Navegación de la colección">
    <a class="brand" href="#inicio" @click.prevent="emit('navigate', 'todos')">
      <span class="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" fill="none">
          <circle cx="18" cy="18" r="15" fill="currentColor" />
          <circle cx="13" cy="12" r="2.4" fill="white" />
          <circle cx="22.5" cy="12" r="2.4" fill="white" />
          <circle cx="13" cy="22" r="2.4" fill="white" />
          <circle cx="22.5" cy="22" r="2.4" fill="white" />
          <path d="M18 32h13.5" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
        </svg>
      </span>
      <span>Entre escenas</span>
    </a>

    <nav class="sidebar-nav">
      <button
        v-for="link in links"
        :key="link.id"
        class="nav-link"
        :class="{ 'is-active': activeFilter === link.id }"
        :aria-current="activeFilter === link.id ? 'page' : undefined"
        type="button"
        @click="emit('navigate', link.id)"
      >
        <svg v-if="link.icon === 'collection'" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 4.5h5.5v15H5zM13.5 4.5H19v15h-5.5zM3 19.5h18" />
        </svg>
        <svg v-else-if="link.icon === 'bookmark'" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 4.75h12a1 1 0 0 1 1 1V21l-7-4.3L5 21V5.75a1 1 0 0 1 1-1Z" />
        </svg>
        <svg v-else viewBox="0 0 24 24" aria-hidden="true">
          <path d="M2 12s3.4-6.5 10-6.5S22 12 22 12s-3.4 6.5-10 6.5S2 12 2 12Z" />
          <circle cx="12" cy="12" r="2.7" />
        </svg>
        <span>{{ link.label }}</span>
      </button>
    </nav>
  </aside>
</template>
