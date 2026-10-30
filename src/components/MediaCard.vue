<script setup>
defineProps({
  media: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['toggle-status', 'edit', 'remove'])

const ratingFormatter = new Intl.NumberFormat('es', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

function formatRating(rating) {
  return ratingFormatter.format(Number(rating))
}
</script>

<template>
  <article class="media-card">
    <div class="poster-wrap">
      <img class="poster-image" :src="media.poster" :alt="`Ilustración de ${media.title}`" />
      <span
        class="poster-art-title"
        :class="{
          'poster-art-title--medium': media.title.length > 8 && media.title.length <= 12,
          'poster-art-title--long': media.title.length > 12,
        }"
        aria-hidden="true"
      >{{ media.title }}</span>
      <button
        class="status-toggle"
        :class="{ 'is-seen': media.status === 'vista' }"
        type="button"
        :aria-label="media.status === 'vista' ? `Marcar ${media.title} como pendiente` : `Marcar ${media.title} como vista`"
        @click="emit('toggle-status', media.id)"
      >
        <svg v-if="media.status === 'vista'" viewBox="0 0 20 20" aria-hidden="true">
          <path d="m4.5 10.2 3.4 3.3 7.6-7.4" />
        </svg>
        <svg v-else viewBox="0 0 20 20" aria-hidden="true">
          <path d="M5.5 3.75h9a1 1 0 0 1 1 1v12L10 13.3l-5.5 3.45v-12a1 1 0 0 1 1-1Z" />
        </svg>
        <span>{{ media.status === 'vista' ? 'Vista' : 'Pendiente' }}</span>
      </button>
    </div>

    <div class="media-info">
      <div class="media-title-line">
        <h2>{{ media.title }}</h2>
        <span class="media-rating" :aria-label="`Calificación ${formatRating(media.rating)} de 5`">
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="m10 2.5 2.2 4.6 5.1.7-3.7 3.6.9 5.1-4.5-2.4-4.5 2.4.9-5.1-3.7-3.6 5.1-.7L10 2.5Z" />
          </svg>
          {{ formatRating(media.rating) }}
        </span>
      </div>
      <p class="media-meta">{{ media.genre }} <span aria-hidden="true">·</span> {{ media.year }}</p>
      <div class="media-actions">
        <span class="media-type">{{ media.type }}</span>
        <div class="action-group">
          <button class="icon-button" type="button" :aria-label="`Editar ${media.title}`" @click="emit('edit', media.id)">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m12.9 3.8 3.3 3.3M4 16l3.2-.7 8.4-8.4a1.7 1.7 0 0 0-2.4-2.4L4.8 12.9 4 16Z" />
            </svg>
          </button>
          <button class="icon-button delete-button" type="button" :aria-label="`Eliminar ${media.title}`" @click="emit('remove', media.id)">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M4.5 6h11M8 6V4.2h4V6m-6.5 0 .6 9.4a1 1 0 0 0 1 .9h5.8a1 1 0 0 0 1-.9l.6-9.4M8.2 8.5v5.3m3.6-5.3v5.3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </article>
</template>
