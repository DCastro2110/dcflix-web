const categories = [
  {
    title: 'Séries',
    slug: 'tv',
  },
  {
    title: 'Ação',
    slug: 'action',
  },
  {
    title: 'Terror',
    slug: 'horror',
  },
  {
    title: 'Drama',
    slug: 'drama',
  },
  {
    title: 'Suspense',
    slug: 'mistery',
  },
  {
    title: 'Romance',
    slug: 'romance',
  },
  {
    title: 'Comédia',
    slug: 'comedy',
  },
  {
    title: 'Documentário',
    slug: 'documentary',
  },
];

export function getTitleBySlug(slug: string) {
  const [selectedCategory] = categories.filter(
    (categorie) => categorie.slug === slug
  );

  return selectedCategory.title;
}
