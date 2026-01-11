import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, Activity, Search, ChevronRight } from 'lucide-react';
import api from '../config/api';
import { Service } from '../types';

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services');
        setServices(response.data);
      } catch (error) {
        console.error('Hizmetler yüklenemedi:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Arama Filtrelemesi
  const filteredServices = useMemo(() => {
    return services.filter(s =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [services, searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          >
            <Activity className="text-indigo-600 w-8 h-8" />
          </motion.div>
          <span className="text-slate-400 font-medium tracking-widest uppercase text-xs">Yükleniyor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* --- COMPACT HERO --- */}
      <section className="pt-20 pb-10 bg-stone-50 border-b border-stone-100">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-12 h-px bg-indigo-600"></span>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                    Uzmanlık Alanları
                    </span>
                    </div>
                      <h1 className="text-4xl md:text-7xl font-light tracking-tight mb-6 md:mb-8">
                      Klinik <span className="font-semibold italic">Hizmetlerimiz</span>
                      </h1>
                  <p className="text-xl text-slate-500 leading-relaxed">
                  Çocuk cerrahisinde güncel tıbbi yöntemler ve minimal invaziv (kapalı) cerrahi yaklaşımlarla,
                  minik hastalarımıza en konforlu tedavi sürecini sunuyoruz.
                  </p>
                </motion.div>
              </div>

            {/* ARAMA ÇUBUĞU */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Hizmet ara..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all text-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-12">
        <div className="container-custom">
          {filteredServices.length === 0 ? (
            <div className="text-center py-20 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-100">
              <p className="text-slate-400 text-sm">Aradığınız kriterlere uygun hizmet bulunamadı.</p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <AnimatePresence>
                {filteredServices.map((service) => (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -4 }}
                    className="group bg-white rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="block p-5 w-full h-full">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                          <Stethoscope size={20} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors leading-snug mb-1 pr-6">
                            {service.title}
                          </h3>
                          {/* Açıklama çok uzunsa 1 satırla sınırla, az yer kaplasın */}
                          <p className="text-xs text-slate-500 line-clamp-1 group-hover:line-clamp-none transition-all">
                            {service.description}
                          </p>
                        </div>
                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Services;