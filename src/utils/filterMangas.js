const STATUS_LABEL = {
  ongoing: 'Ongoing',
  completed: 'Completed',
  coming_soon: 'Coming Soon',
};

export const EMPTY_FILTERS = { status: '', type: '', genres: [], order: '' };

export function applyFilters(mangas, { status, type, genres, order }) {
  let result = mangas;

  if (status && STATUS_LABEL[status]) {
    result = result.filter((m) => m.status === STATUS_LABEL[status]);
  }

  if (type) {
    result = result.filter((m) => m.type?.toLowerCase() === type);
  }

  if (genres.length > 0) {
    result = result.filter((m) =>
      genres.some((slug) => m.genreCategories?.some((g) => g.slug === slug))
    );
  }

  if (order === 'az') return [...result].sort((a, b) => a.title.localeCompare(b.title));
  if (order === 'za') return [...result].sort((a, b) => b.title.localeCompare(a.title));
  if (order === 'update') {
    return [...result].sort(
      (a, b) =>
        (b.updatedAt ? new Date(b.updatedAt) : 0) -
        (a.updatedAt ? new Date(a.updatedAt) : 0)
    );
  }

  return result;
}
