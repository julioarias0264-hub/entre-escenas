<script setup>
import { computed, ref, watch } from 'vue'
import AppSidebar from './components/AppSidebar.vue'
import MediaCard from './components/MediaCard.vue'
import MediaFormDialog from './components/MediaFormDialog.vue'
import { choosePoster, seedTitles } from './data/catalog.js'

const storageKey = 'entre-escenas-collection-v1'

function readSavedTitles() {
  try {
    const saved = localStorage.getItem(storageKey)
    const parsed = saved ? JSON.parse(saved) : null
    return Array.isArray(parsed) ? parsed : seedTitles
  } catch {
    return seedTitles
  }
}

// Aquí guardamos la colección, la búsqueda, los filtros y el estado del formulario.
const titles = ref(readSavedTitles())
const activeFilter = ref('todos')
const selectedGenre = ref('Todos')
const searchQuery = ref('')
const isDialogOpen = ref(false)
const editingId = ref(null)

const currentMedia = computed(() => titles.value.find((media) => media.id === editingId.value) ?? null)
const genreOptions = computed(() => [...new Set(titles.value.map((media) => media.genre).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es')))

// Esta lista cambia cuando escribes una búsqueda o eliges un filtro.
const visibleTitles = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase('es')

  return titles.value.filter((media) => {
    const matchesStatus = activeFilter.value === 'todos' || media.status === activeFilter.value
    const matchesGenre = selectedGenre.value === 'Todos' || media.genre === selectedGenre.value
    const matchesSearch = !query || media.title.toLocaleLowerCase('es').includes(query)
    return matchesStatus && matchesGenre && matchesSearch
  })
})

// Guarda la colección para que siga ahí cuando recargues la página.
watch(titles, (nextTitles) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(nextTitles))
  } catch {
    // Si no se puede guardar, la lista sigue funcionando mientras la página esté abierta.
  }
}, { deep: true })

function startAdding() {
  editingId.value = null
  isDialogOpen.value = true
}

function startEditing(id) {
  editingId.value = id
  isDialogOpen.value = true
}

function saveTitle(formValues) {
  const existing = currentMedia.value
  if (existing) {
    Object.assign(existing, formValues)
  } else {
    const id = globalThis.crypto?.randomUUID?.() ?? `title-${Date.now()}`
    titles.value.push({
      id,
      ...formValues,
      poster: choosePoster(formValues.genre, titles.value.length),
    })
  }
  isDialogOpen.value = false
}

function toggleStatus(id) {
  const media = titles.value.find((entry) => entry.id === id)
  if (media) media.status = media.status === 'vista' ? 'pendiente' : 'vista'
}

function removeTitle(id) {
  const media = titles.value.find((entry) => entry.id === id)
  if (!media || !window.confirm(`¿Borrar "${media.title}" de tu colección?`)) return
  titles.value = titles.value.filter((entry) => entry.id !== id)
}

function closeDialog() {
  isDialogOpen.value = false
  editingId.value = null
}
</script>

<template>
  <div class="app-shell" id="inicio">
    <AppSidebar :active-filter="activeFilter" @navigate="activeFilter = $event" />

    <main class="main-content">
      <div class="main-heading-row">
        <div>
          <h1>Mi colección</h1>
        </div>

        <div class="main-tools">
          <label class="search-field">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>
            <input v-model="searchQuery" type="search" placeholder="Buscar por título…" aria-label="Buscar por título" />
          </label>
          <button class="button button-primary add-button" type="button" @click="startAdding">
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3.5v13M3.5 10h13" /></svg>
            Agregar título
          </button>
        </div>
      </div>

      <div class="catalog-controls">
        <label class="genre-select">
          <span>Género</span>
          <select v-model="selectedGenre" aria-label="Filtrar por género">
            <option>Todos</option>
            <option v-for="genre in genreOptions" :key="genre">{{ genre }}</option>
          </select>
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 7.5 5 5 5-5" /></svg>
        </label>
      </div>

      <section class="catalog-grid" aria-label="Títulos de tu colección">
        <MediaCard
          v-for="media in visibleTitles"
          :key="media.id"
          :media="media"
          @toggle-status="toggleStatus"
          @edit="startEditing"
          @remove="removeTitle"
        />
      </section>

      <section v-if="visibleTitles.length === 0" class="empty-state" aria-live="polite">
        <div class="empty-mark" aria-hidden="true">
          <svg viewBox="0 0 44 44"><path d="M10 8h24v28H10zM15 14h14M15 20h14M15 26h8" /></svg>
        </div>
        <h2>{{ titles.length ? 'No hay títulos con esos filtros' : 'Todavía no hay títulos' }}</h2>
        <p>{{ titles.length ? 'Prueba con otra búsqueda o elige otro género.' : 'Agrega una película o serie para empezar.' }}</p>
        <button v-if="!titles.length" class="button button-primary" type="button" @click="startAdding">Agregar título</button>
        <button v-else class="text-button" type="button" @click="searchQuery = ''; selectedGenre = 'Todos'; activeFilter = 'todos'">Limpiar filtros</button>
      </section>
    </main>

    <MediaFormDialog
      :open="isDialogOpen"
      :media="currentMedia"
      :genres="genreOptions"
      @close="closeDialog"
      @save="saveTitle"
    />
  </div>
</template>
