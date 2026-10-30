export const posterOptions = [
  { src: '/posters/parasite.webp', label: 'Casa en el jardín' },
  { src: '/posters/mood-for-love.webp', label: 'Encuentro bajo la lluvia' },
  { src: '/posters/la-la-land.webp', label: 'Noche en la ciudad' },
  { src: '/posters/spirited-away.webp', label: 'Viaje de fantasía' },
]

export const seedTitles = [
  {
    id: 'parasite',
    title: 'Parasite',
    type: 'Película',
    genre: 'Suspenso',
    year: 2019,
    rating: 4.5,
    status: 'vista',
    poster: posterOptions[0].src,
  },
  {
    id: 'mood-for-love',
    title: 'In the Mood for Love',
    type: 'Película',
    genre: 'Drama',
    year: 2000,
    rating: 4.7,
    status: 'pendiente',
    poster: posterOptions[1].src,
  },
  {
    id: 'la-la-land',
    title: 'La La Land',
    type: 'Película',
    genre: 'Musical',
    year: 2016,
    rating: 4.5,
    status: 'pendiente',
    poster: posterOptions[2].src,
  },
  {
    id: 'spirited-away',
    title: 'Spirited Away',
    type: 'Película',
    genre: 'Animación',
    year: 2001,
    rating: 5,
    status: 'vista',
    poster: posterOptions[3].src,
  },
]

export const posterByGenre = {
  suspenso: posterOptions[0].src,
  drama: posterOptions[1].src,
  romance: posterOptions[1].src,
  musical: posterOptions[2].src,
  animación: posterOptions[3].src,
  fantasia: posterOptions[3].src,
  fantasía: posterOptions[3].src,
  ciencia: posterOptions[0].src,
  comedia: posterOptions[2].src,
}

export function choosePoster(genre, position = 0) {
  const normalizedGenre = genre.trim().toLocaleLowerCase('es')
  const match = Object.entries(posterByGenre).find(([keyword]) => normalizedGenre.includes(keyword))
  return match?.[1] ?? posterOptions[position % posterOptions.length].src
}
