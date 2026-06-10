import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import MangaCard from './MangaCard';

export default function PopularSlider({ mangas }) {
  return (
    <Swiper
      modules={[Navigation, FreeMode]}
      navigation
      freeMode
      slidesPerView={4}
      spaceBetween={12}
      breakpoints={{
        640: { slidesPerView: 4 },
        768: { slidesPerView: 5 },
        1024: { slidesPerView: 6 },
      }}
      style={{ '--swiper-navigation-color': '#366ad3', '--swiper-navigation-size': '18px' }}
    >
      {mangas.map(manga => (
        <SwiperSlide key={manga.id}>
          <MangaCard manga={manga} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
