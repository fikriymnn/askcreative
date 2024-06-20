// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                "Beranda": "Home",
                "Kegiatan": "Events",
                "Layanan": "Services",
                "Artikel": "Articles",
                "Galeri": "Gallery",
                "Tentang": "About",
                "Essential Oil": "Essential Oil",
                "Health and Beauty": "Health and Beauty",
            },
        },
        id: {
            translation: {
                "Beranda": "Beranda",
                "Kegiatan": "Kegiatan",
                "Layanan": "Layanan",
                "Artikel": "Artikel",
                "Galeri": "Galeri",
                "Tentang": "Tentang",
                "Essential Oil": "Essential Oil",
                "Health and Beauty": "Health and Beauty",
            },
        },
    },
    lng: 'id', // default language
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false, // react already safes from xss
    },
});

export default i18n;
