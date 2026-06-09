const BASE_URL = '/api/api';
const CDN_BASE = '/cdn-api';

function formatTimeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} phút trước`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  return `${days} ngày trước`;
}

function detectType(categories) {
  const names = (categories ?? []).map((c) => c.name);
  if (names.includes('Manhwa')) return 'Manhwa';
  if (names.includes('Manhua')) return 'Manhua';
  if (names.includes('Manga')) return 'Manga';
  return 'Manga';
}

function mapStatus(status) {
  const map = { ongoing: 'Ongoing', completed: 'Completed', coming_soon: 'Coming Soon' };
  return map[status] ?? status;
}

function transformManga(item, cdnDomain) {
  return {
    id: item._id,
    title: item.name,
    slug: item.slug,
    cover: `${cdnDomain}/uploads/comics/${item.thumb_url}`,
    type: detectType(item.category),
    status: mapStatus(item.status),
    genres: (item.category ?? []).map((c) => c.name),
    genreCategories: (item.category ?? []).map((c) => ({ name: c.name, slug: c.slug })),
    updatedAt: item.updatedAt,
    isHot: false,
    latestChapter: (item.chaptersLatest ?? [])[0]
      ? `Chapter ${item.chaptersLatest[0].chapter_name}`
      : '',
    chapters: (item.chaptersLatest ?? []).map((ch) => ({
      title: `Chapter ${ch.chapter_name}`,
      slug: `chapter-${ch.chapter_name}`,
      timeAgo: formatTimeAgo(item.updatedAt),
    })),
  };
}

export async function fetchHomeMangas() {
  const res = await fetch(`${BASE_URL}/home`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const json = await res.json();
  const { items, APP_DOMAIN_CDN_IMAGE } = json.data;
  return items.map((item) => transformManga(item, APP_DOMAIN_CDN_IMAGE));
}

export async function fetchMangaList(type = 'truyen-moi', page = 1) {
  const res = await fetch(`${BASE_URL}/danh-sach/${type}?page=${page}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const json = await res.json();
  const { items = [], APP_DOMAIN_CDN_IMAGE = '', params = {}, titlePage = '' } = json.data ?? {};
  const { totalItems = 0, totalItemsPerPage = 24 } = params?.pagination ?? {};
  return {
    mangas: items.map((item) => transformManga(item, APP_DOMAIN_CDN_IMAGE)),
    totalPages: Math.ceil(totalItems / totalItemsPerPage) || 1,
    totalItems,
    titlePage,
  };
}

export async function fetchSearchResults(keyword, page = 1) {
  const res = await fetch(`${BASE_URL}/tim-kiem?keyword=${encodeURIComponent(keyword)}&page=${page}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const json = await res.json();
  const { items = [], APP_DOMAIN_CDN_IMAGE = '', titlePage = '', params = {} } = json.data ?? {};
  const { totalItems = 0, totalItemsPerPage = 24 } = params?.pagination ?? {};
  return {
    mangas: items.map((item) => transformManga(item, APP_DOMAIN_CDN_IMAGE)),
    titlePage,
    totalPages: Math.ceil(totalItems / totalItemsPerPage) || 1,
    totalItems,
  };
}

export async function fetchMangaDetail(slug) {
  const res = await fetch(`${BASE_URL}/truyen-tranh/${slug}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const json = await res.json();
  const { item, APP_DOMAIN_CDN_IMAGE } = json.data;
  // Deduplicate chapters across servers, keeping first server's API URL
  const seenNames = new Set();
  const allChapters = item.chapters
    .flatMap((server) => server.server_data)
    .filter((ch) => {
      if (seenNames.has(ch.chapter_name)) return false;
      seenNames.add(ch.chapter_name);
      return true;
    });
  return {
    id: item._id,
    title: item.name,
    slug: item.slug,
    originName: item.origin_name.filter(Boolean),
    cover: `${APP_DOMAIN_CDN_IMAGE}/uploads/comics/${item.thumb_url}`,
    type: detectType(item.category),
    status: mapStatus(item.status),
    author: item.author,
    description: item.content,
    genres: item.category.map((c) => c.name),
    genreCategories: item.category.map((c) => ({ name: c.name, slug: c.slug })),
    updatedAt: item.updatedAt,
    chapters: allChapters.map((ch) => ({
      title: `Chapter ${ch.chapter_name}${ch.chapter_title ? ': ' + ch.chapter_title : ''}`,
      slug: `chapter-${ch.chapter_name}`,
      chapterName: ch.chapter_name,
      chapterId: ch.chapter_api_data?.split('/').pop() ?? '',
    })),
  };
}

export async function fetchChapterImages(chapterId) {
  const res = await fetch(`${CDN_BASE}/chapter/${chapterId}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const json = await res.json();
  const { domain_cdn = '', item = {} } = json.data ?? {};
  return {
    chapterName: item.chapter_name ?? '',
    comicName: item.comic_name ?? '',
    images: (item.chapter_image ?? []).map((img) => ({
      page: img.image_page,
      url: `${domain_cdn}/${item.chapter_path}/${img.image_file}`,
    })),
  };
}

export async function fetchGenres() {
  const res = await fetch(`${BASE_URL}/the-loai`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const json = await res.json();
  return json.data.items;
}

export async function fetchMangaByGenre(slug, page = 1) {
  const res = await fetch(`${BASE_URL}/the-loai/${slug}?page=${page}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const json = await res.json();
  const { items = [], APP_DOMAIN_CDN_IMAGE = '', params = {}, titlePage = '' } = json.data ?? {};
  const { totalItems = 0, totalItemsPerPage = 24, currentPage = 1 } = params?.pagination ?? {};
  return {
    mangas: items.map((item) => transformManga(item, APP_DOMAIN_CDN_IMAGE)),
    totalPages: Math.ceil(totalItems / totalItemsPerPage) || 1,
    totalItems,
    currentPage,
    titlePage,
  };
}
