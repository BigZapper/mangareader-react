export const featuredMangas = [
  {
    id: 1,
    title: "Solo Leveling",
    slug: "solo-leveling",
    cover: "https://picsum.photos/seed/solo/285/425",
    banner: "https://picsum.photos/seed/solo-bg/1920/600",
    chapterCount: 179,
    latestChapter: "Chapter 179",
    description: "10 years ago, after 'the Gate' that connected the real world with the monster world opened, some of the ordinary, everyday people received the power to hunt monsters within the Gate. They are known as 'Hunters'.",
    genres: ["Action", "Adventure", "Fantasy", "Manhwa"],
    rating: 9.8,
    status: "Completed",
    type: "Manhwa",
  },
  {
    id: 2,
    title: "Jujutsu Kaisen",
    slug: "jujutsu-kaisen",
    cover: "https://picsum.photos/seed/jjk/285/425",
    banner: "https://picsum.photos/seed/jjk-bg/1920/600",
    chapterCount: 265,
    latestChapter: "Chapter 265",
    description: "Yuji Itadori is a boy with tremendous physical strength, though he lives a normal high school life. One day, to save a classmate, he eats a finger of Ryomen Sukuna, a cursed spirit.",
    genres: ["Action", "School Life", "Supernatural", "Manga"],
    rating: 9.4,
    status: "Ongoing",
    type: "Manga",
  },
  {
    id: 3,
    title: "One Piece",
    slug: "one-piece",
    cover: "https://picsum.photos/seed/op/285/425",
    banner: "https://picsum.photos/seed/op-bg/1920/600",
    chapterCount: 1100,
    latestChapter: "Chapter 1100",
    description: "Gol D. Roger was known as the Pirate King, the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world.",
    genres: ["Action", "Adventure", "Comedy", "Manga"],
    rating: 9.6,
    status: "Ongoing",
    type: "Manga",
  },
];

export const popularMangas = [
  { id: 1, title: "Solo Leveling", slug: "solo-leveling", cover: "https://picsum.photos/seed/solo/285/425", latestChapter: "Chapter 179", rating: 9.8, type: "Manhwa", isHot: true },
  { id: 2, title: "Jujutsu Kaisen", slug: "jujutsu-kaisen", cover: "https://picsum.photos/seed/jjk/285/425", latestChapter: "Chapter 265", rating: 9.4, type: "Manga", isHot: false },
  { id: 3, title: "Chainsaw Man", slug: "chainsaw-man", cover: "https://picsum.photos/seed/csm/285/425", latestChapter: "Chapter 178", rating: 9.2, type: "Manga", isHot: true },
  { id: 4, title: "Black Clover", slug: "black-clover", cover: "https://picsum.photos/seed/bc/285/425", latestChapter: "Chapter 370", rating: 8.8, type: "Manga", isHot: false },
  { id: 5, title: "Martial Peak", slug: "martial-peak", cover: "https://picsum.photos/seed/mp/285/425", latestChapter: "Chapter 3456", rating: 8.5, type: "Manhua", isHot: false },
  { id: 6, title: "Tower of God", slug: "tower-of-god", cover: "https://picsum.photos/seed/tog/285/425", latestChapter: "Chapter 590", rating: 9.0, type: "Manhwa", isHot: false },
  { id: 7, title: "Vinland Saga", slug: "vinland-saga", cover: "https://picsum.photos/seed/vs/285/425", latestChapter: "Chapter 210", rating: 9.5, type: "Manga", isHot: false },
  { id: 8, title: "Berserk", slug: "berserk", cover: "https://picsum.photos/seed/bsk/285/425", latestChapter: "Chapter 374", rating: 9.7, type: "Manga", isHot: false },
];

export const latestUpdates = [
  {
    id: 1,
    title: "Solo Leveling",
    slug: "solo-leveling",
    cover: "https://picsum.photos/seed/solo/225/345",
    type: "Manhwa",
    status: "Completed",
    isHot: true,
    chapters: [
      { title: "Chapter 179", slug: "chapter-179", timeAgo: "2 hours ago" },
      { title: "Chapter 178", slug: "chapter-178", timeAgo: "1 day ago" },
      { title: "Chapter 177", slug: "chapter-177", timeAgo: "3 days ago" },
    ],
  },
  {
    id: 2,
    title: "Jujutsu Kaisen",
    slug: "jujutsu-kaisen",
    cover: "https://picsum.photos/seed/jjk/225/345",
    type: "Manga",
    status: "Ongoing",
    isHot: false,
    chapters: [
      { title: "Chapter 265", slug: "chapter-265", timeAgo: "5 hours ago" },
      { title: "Chapter 264", slug: "chapter-264", timeAgo: "2 days ago" },
      { title: "Chapter 263", slug: "chapter-263", timeAgo: "5 days ago" },
    ],
  },
  {
    id: 3,
    title: "Chainsaw Man",
    slug: "chainsaw-man",
    cover: "https://picsum.photos/seed/csm/225/345",
    type: "Manga",
    status: "Ongoing",
    isHot: true,
    chapters: [
      { title: "Chapter 178", slug: "chapter-178", timeAgo: "1 day ago" },
      { title: "Chapter 177", slug: "chapter-177", timeAgo: "4 days ago" },
      { title: "Chapter 176", slug: "chapter-176", timeAgo: "1 week ago" },
    ],
  },
  {
    id: 4,
    title: "One Piece",
    slug: "one-piece",
    cover: "https://picsum.photos/seed/op/225/345",
    type: "Manga",
    status: "Ongoing",
    isHot: false,
    chapters: [
      { title: "Chapter 1100", slug: "chapter-1100", timeAgo: "3 days ago" },
      { title: "Chapter 1099", slug: "chapter-1099", timeAgo: "1 week ago" },
      { title: "Chapter 1098", slug: "chapter-1098", timeAgo: "2 weeks ago" },
    ],
  },
  {
    id: 5,
    title: "My Hero Academia",
    slug: "my-hero-academia",
    cover: "https://picsum.photos/seed/mha/225/345",
    type: "Manga",
    status: "Completed",
    isHot: false,
    chapters: [
      { title: "Chapter 430", slug: "chapter-430", timeAgo: "1 week ago" },
      { title: "Chapter 429", slug: "chapter-429", timeAgo: "2 weeks ago" },
      { title: "Chapter 428", slug: "chapter-428", timeAgo: "3 weeks ago" },
    ],
  },
  {
    id: 6,
    title: "Berserk",
    slug: "berserk",
    cover: "https://picsum.photos/seed/bsk/225/345",
    type: "Manga",
    status: "Ongoing",
    isHot: false,
    chapters: [
      { title: "Chapter 374", slug: "chapter-374", timeAgo: "2 weeks ago" },
      { title: "Chapter 373", slug: "chapter-373", timeAgo: "1 month ago" },
      { title: "Chapter 372", slug: "chapter-372", timeAgo: "2 months ago" },
    ],
  },
];

export const genres = [
  "Action", "Adult", "Adventure", "Comedy", "Drama", "Ecchi",
  "Fantasy", "Harem", "Historical", "Horror", "Josei",
  "Martial Arts", "Mature", "Mystery", "Romance", "School Life",
  "Sci-fi", "Seinen", "Shounen", "Slice of Life", "Supernatural", "Tragedy",
];

export const popularRanked = {
  weekly: [
    { rank: 1, id: 1, title: "Solo Leveling", slug: "solo-leveling", cover: "https://picsum.photos/seed/solo/60/80", latestChapter: "Chapter 179", rating: 9.8 },
    { rank: 2, id: 3, title: "Chainsaw Man", slug: "chainsaw-man", cover: "https://picsum.photos/seed/csm/60/80", latestChapter: "Chapter 178", rating: 9.2 },
    { rank: 3, id: 2, title: "Jujutsu Kaisen", slug: "jujutsu-kaisen", cover: "https://picsum.photos/seed/jjk/60/80", latestChapter: "Chapter 265", rating: 9.4 },
    { rank: 4, id: 8, title: "Berserk", slug: "berserk", cover: "https://picsum.photos/seed/bsk/60/80", latestChapter: "Chapter 374", rating: 9.7 },
    { rank: 5, id: 7, title: "Vinland Saga", slug: "vinland-saga", cover: "https://picsum.photos/seed/vs/60/80", latestChapter: "Chapter 210", rating: 9.5 },
  ],
  monthly: [
    { rank: 1, id: 8, title: "Berserk", slug: "berserk", cover: "https://picsum.photos/seed/bsk/60/80", latestChapter: "Chapter 374", rating: 9.7 },
    { rank: 2, id: 1, title: "Solo Leveling", slug: "solo-leveling", cover: "https://picsum.photos/seed/solo/60/80", latestChapter: "Chapter 179", rating: 9.8 },
    { rank: 3, id: 3, title: "One Piece", slug: "one-piece", cover: "https://picsum.photos/seed/op/60/80", latestChapter: "Chapter 1100", rating: 9.6 },
    { rank: 4, id: 7, title: "Vinland Saga", slug: "vinland-saga", cover: "https://picsum.photos/seed/vs/60/80", latestChapter: "Chapter 210", rating: 9.5 },
    { rank: 5, id: 2, title: "Jujutsu Kaisen", slug: "jujutsu-kaisen", cover: "https://picsum.photos/seed/jjk/60/80", latestChapter: "Chapter 265", rating: 9.4 },
  ],
  alltime: [
    { rank: 1, id: 3, title: "One Piece", slug: "one-piece", cover: "https://picsum.photos/seed/op/60/80", latestChapter: "Chapter 1100", rating: 9.6 },
    { rank: 2, id: 8, title: "Berserk", slug: "berserk", cover: "https://picsum.photos/seed/bsk/60/80", latestChapter: "Chapter 374", rating: 9.7 },
    { rank: 3, id: 1, title: "Solo Leveling", slug: "solo-leveling", cover: "https://picsum.photos/seed/solo/60/80", latestChapter: "Chapter 179", rating: 9.8 },
    { rank: 4, id: 7, title: "Vinland Saga", slug: "vinland-saga", cover: "https://picsum.photos/seed/vs/60/80", latestChapter: "Chapter 210", rating: 9.5 },
    { rank: 5, id: 2, title: "Jujutsu Kaisen", slug: "jujutsu-kaisen", cover: "https://picsum.photos/seed/jjk/60/80", latestChapter: "Chapter 265", rating: 9.4 },
  ],
};

export const newSeries = [
  { id: 10, title: "Dungeon Reset", slug: "dungeon-reset", cover: "https://picsum.photos/seed/dr/60/80", chapters: [{ title: "Chapter 1", slug: "ch-1" }] },
  { id: 11, title: "Return of the Mount Hua Sect", slug: "return-mount-hua", cover: "https://picsum.photos/seed/rmh/60/80", chapters: [{ title: "Chapter 1", slug: "ch-1" }] },
  { id: 12, title: "Nano Machine", slug: "nano-machine", cover: "https://picsum.photos/seed/nm/60/80", chapters: [{ title: "Chapter 1", slug: "ch-1" }] },
  { id: 13, title: "Magic Emperor", slug: "magic-emperor", cover: "https://picsum.photos/seed/me/60/80", chapters: [{ title: "Chapter 1", slug: "ch-1" }] },
];

export const allMangaList = [
  ...popularMangas,
  { id: 9, title: "Naruto", slug: "naruto", cover: "https://picsum.photos/seed/nrt/285/425", latestChapter: "Chapter 700", rating: 9.0, type: "Manga", isHot: false },
  { id: 10, title: "Attack on Titan", slug: "attack-on-titan", cover: "https://picsum.photos/seed/aot/285/425", latestChapter: "Chapter 139", rating: 9.5, type: "Manga", isHot: false },
  { id: 11, title: "Demon Slayer", slug: "demon-slayer", cover: "https://picsum.photos/seed/ds/285/425", latestChapter: "Chapter 205", rating: 9.1, type: "Manga", isHot: false },
  { id: 12, title: "Bleach", slug: "bleach", cover: "https://picsum.photos/seed/blch/285/425", latestChapter: "Chapter 686", rating: 8.9, type: "Manga", isHot: false },
];
