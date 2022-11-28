import { getMediasByGenre } from '@/services/tmdbApi/getMediasByGenre';

import { TSlug } from '@/types/TSlug';

export function getRequestFunctionBySlug(slug: TSlug) {
  const requestFunction = {
    tv: getMediasByGenre.tvPopularRequest,
    action: getMediasByGenre.actionRequest,
    horror: getMediasByGenre.horrorRequest,
    drama: getMediasByGenre.dramaRequest,
    mistery: getMediasByGenre.misteryRequest,
    romance: getMediasByGenre.romanceRequest,
    comedy: getMediasByGenre.comedyRequest,
    documentary: getMediasByGenre.documentaryRequest,
  };

  return requestFunction[slug];
}
