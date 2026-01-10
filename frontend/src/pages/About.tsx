import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: "easeOut" as const }
  };

  const careerSteps = [
    {
      year: "2022 — Günümüz",
      title: "Çocuk Cerrahisi Uzmanı",
      place: "Op. Dr. Bülent Azman Muayenehanesi",
      desc: "Memleketim Nazilli'de çocuk cerrahisi alanında özel hizmet."
    },
    {
      year: "2009 — 2022",
      title: "Uzman Doktor",
      place: "Çankırı Devlet Hastanesi",
      desc: "13 yıl boyunca bölgenin tek hekimi olarak çevre il ve ilçelerden gelen binlerce hastaya cerrahi hizmet."
    },
    {
      year: "2008 — 2009",
      title: "Tabip Teğmen",
      place: "Ankara GATA Çocuk Cerrahisi Kliniği",
      desc: "Vatani görev kapsamında askeri hastanede cerrahi klinik çalışmaları."
    },
    {
      year: "2002 — 2007",
      title: "Uzmanlık Eğitimi",
      place: "Kocaeli Üniversitesi Tıp Fakültesi",
      desc: "Çocuk Cerrahisi Anabilim Dalı uzmanlık süreci ve ihtisas."
    },
    {
      year: "2000 — 2002",
      title: "Pratisyen Hekim",
      place: "Gümüşhane",
      desc: "Mezuniyet sonrası ilk görev yeri ve mesleki başlangıç."
    }
  ];

  return (
    <div className="bg-white text-slate-900">

      {/* --- HERO SECTION --- */}
      <section className="pt-24 pb-16 bg-stone-50 border-b border-stone-100">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl"
          >
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8 uppercase tracking-widest">
              <Link to="/" className="hover:text-indigo-600 transition-colors">Anasayfa</Link>
              <span>/</span>
              <span className="text-slate-900 font-medium">Hakkımda</span>
            </nav>
            <h3 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
              Op. Dr. <span className="font-semibold text-indigo-600">Bülent Azman</span>
            </h3>
            <h5 className='text-4xl italic'>Biyografi</h5>

          </motion.div>
        </div>
      </section>

      {/* --- BIOGRAPHY & STORY --- */}
      <section className="py-24">
        <div className="container-custom grid grid-cols-2">
          <div className="grid md:grid-cols-2 gap-12 items-center justify-between">
            <motion.div {...fadeInUp} className="md:col-span-7">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="w-8 h-px bg-indigo-600"></span>
                Profesyonel Yolculuğum
              </h2>
              <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
                <p>
                  1976 yılında <strong>Nazilli</strong>'de doğdum. Eğitim hayatımın temel taşlarını Beşeylül İlköğretim Okulu ve Nazilli Anadolu Lisesi'nde attım. Hekimlik tutkum, 2000 yılında <strong>Osmangazi Üniversitesi Tıp Fakültesi</strong>'nden mezun olmamla profesyonel bir yolculuğa dönüştü.
                </p>
                <p>
                  İlk görev yerim olan Gümüşhane'deki pratisyen hekimlik sürecimin ardından, 2002 yılında mesleki vizyonumun merkezi olacak <strong>Kocaeli Üniversitesi Çocuk Cerrahisi</strong> bölümünü kazandım. 2007 yılında uzmanlığımı alarak Çankırı Devlet Hastanesi'nde çocuk cerrahı olarak çalışmaya başladım.
                </p>
                <p>
                  Kariyerimin en önemli dönemlerinden biri olan 2009-2022 yılları arasında Çankırı'da, bölgenin tek çocuk cerrahı olarak çevre il ve ilçelerden gelen binlerce minik kalbe dokundum. Uzun ve yorucu geçen bu hizmet döneminin ardından, tecrübelerimi kendi topraklarımda paylaşmak üzere memleketim Nazilli'ye dönerek kendi muayenehanemde hizmet vermeye başladım.
                </p>

              </div>
            </motion.div>
          </div>
          <div>
            <section className="py-24 bg-white">
              <div className="container-custom">
                <div className="grid md:grid-rows-2 gap-8">
                  <div className="bg-slate-50 p-8 rounded-2xl flex items-start gap-6 border border-slate-100">
                    <GraduationCap className="w-12 h-12 text-indigo-600 shrink-0" />
                    <div>
                      <h4 className="text-lg font-bold mb-2">Tıp Eğitimi</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        <strong>Eskişehir Osmangazi Üniversitesi</strong> <br />
                        Tıp Fakültesi Mezuniyeti (2000)
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-2xl flex items-start gap-6 border border-slate-100">
                    <Award className="w-12 h-12 text-indigo-600 shrink-0" />
                    <div>
                      <h4 className="text-lg font-bold mb-2">Uzmanlık Eğitimi</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        <strong>Kocaeli Üniversitesi Tıp Fakültesi</strong> <br />
                        Çocuk Cerrahisi Anabilim Dalı (2007)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* --- EDUCATION & CAREER TIMELINE --- */}
      <section className="py-24 bg-stone-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Eğitim & Deneyim</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto" />
          </div>

          <div className="max-w-4xl mx-auto">
            {careerSteps.map((step, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                className="relative pl-12 pb-12 last:pb-0 border-l border-slate-200 ml-4"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-sm" />
                <span className="text-sm font-bold text-indigo-600 mb-1 block uppercase tracking-wider">{step.year}</span>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-slate-600 font-semibold mb-3">{step.place}</p>
                <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="py-24 bg-white border-t border-stone-100">
        <div className="container-custom text-center">
          <Link to="/iletisim" className="inline-flex items-center px-12 py-5 bg-indigo-600 text-white font-bold rounded-xl shadow-2xl hover:bg-indigo-700 transition-all hover:-translate-y-1">
            Randevu ve İletişim
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;