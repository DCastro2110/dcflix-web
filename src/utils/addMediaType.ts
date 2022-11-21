import { MediaType } from "../types/MediaType"

export const addMediaType = (items: MediaType[], type: 'tv'| 'movie') => {
  items.forEach(media => {
    media.media_type = type;
  })
}