<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  media: {
    type: Object,
    default: null,
  },
  genres: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['close', 'save'])

const form = reactive({
  title: '',
  type: 'Película',
  genre: '',
  year: new Date().getFullYear(),
  rating: 0,
  status: 'pendiente',
})

watch(
  () => [props.open, props.media],
  ([isOpen, media]) => {
    if (!isOpen) return
    Object.assign(form, media ? {
      title: media.title,
      type: media.type,
      genre: media.genre,
      year: media.year,
      rating: media.rating,
      status: media.status,
    } : {
      title: '',
      type: 'Película',
      genre: '',
      year: new Date().getFullYear(),
      rating: 0,
      status: 'pendiente',
    })
  },
  { immediate: true },
)

function submitForm() {
  emit('save', {
    title: form.title.trim(),
    type: form.type,
    genre: form.genre.trim(),
    year: Number(form.year),
    rating: Number(form.rating),
    status: form.status,
  })
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="dialog-backdrop" @click.self="emit('close')" @keydown.esc="emit('close')">
      <section
        class="dialog-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        @click.stop
      >
        <header class="dialog-header">
          <h2 id="dialog-title">{{ media ? 'Editar título' : 'Agregar título' }}</h2>
          <button class="dialog-close" type="button" aria-label="Cerrar" @click="emit('close')">
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" /></svg>
          </button>
        </header>

        <form class="media-form" @submit.prevent="submitForm">
          <label class="form-field form-field-wide">
            <span>Título</span>
            <input v-model="form.title" autofocus required maxlength="70" autocomplete="off" />
          </label>

          <label class="form-field">
            <span>Tipo</span>
            <select v-model="form.type">
              <option>Película</option>
              <option>Serie</option>
            </select>
          </label>

          <label class="form-field">
            <span>Género</span>
            <input v-model="form.genre" list="genre-options" required maxlength="30" placeholder="Ej. Drama" />
            <datalist id="genre-options">
              <option v-for="genre in genres" :key="genre" :value="genre" />
            </datalist>
          </label>

          <label class="form-field">
            <span>Año</span>
            <input v-model.number="form.year" type="number" min="1888" :max="new Date().getFullYear() + 5" required />
          </label>

          <label class="form-field">
            <span>Calificación <small>(0 a 5)</small></span>
            <input v-model.number="form.rating" type="number" min="0" max="5" step="0.1" required />
          </label>

          <label class="form-field form-field-wide">
            <span>Estado</span>
            <select v-model="form.status">
              <option value="pendiente">Pendiente</option>
              <option value="vista">Vista</option>
            </select>
          </label>

          <footer class="dialog-actions">
            <button class="button button-quiet" type="button" @click="emit('close')">Cancelar</button>
            <button class="button button-primary" type="submit">{{ media ? 'Guardar cambios' : 'Guardar título' }}</button>
          </footer>
        </form>
      </section>
    </div>
  </Teleport>
</template>
