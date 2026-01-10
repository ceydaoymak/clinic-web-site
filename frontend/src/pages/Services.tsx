import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Stethoscope, Activity } from 'lucide-react';
import api from '../config/api';
import { Service } from '../types';

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Animasyon Ayarları
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <motion.div 
          animate={{ opacity: [0.4, 1, 0.4] }} 
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-slate-400 font-medium tracking-widest uppercase text-sm"
        >
          İçerik Yükleniyor...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-white text-slate-900">
      
      {/* --- MODERN HERO SECTION --- */}
      <section className="pt-32 pb-20 bg-stone-50 border-b border-stone-100">
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
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
              Klinik <span className="font-semibold italic">Hizmetlerimiz</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed">
              Çocuk cerrahisinde güncel tıbbi yöntemler ve minimal invaziv (kapalı) cerrahi yaklaşımlarla, 
              minik hastalarımıza en konforlu tedavi sürecini sunuyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- SERVICES LIST (VERTICAL) --- */}
      <section className="py-12 md:py-24">
        <div className="container-custom max-w-5xl">
          {services.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-3xl">
              <Stethoscope className="w-10 h-10 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">Henüz bir hizmet listelenmemiş.</p>
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col"
            >
              {services.map((service, index) => (
                <motion.div 
                  key={service.id} 
                  variants={itemVariants}
                  className="group"
                >
                  <Link 
                    to={`/services/${service.slug}`} 
                    className="flex flex-col md:flex-row items-start md:items-center py-10 md:py-14 border-b border-slate-100 transition-all duration-300 group-hover:px-4"
                  >
                    {/* Index & Icon Area */}
                    <div className="flex items-center gap-6 mb-4 md:mb-0 md:w-1/4">
                      <span className="text-4xl md:text-5xl font-extralight text-slate-200 group-hover:text-indigo-100 transition-colors">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                      <div className="p-3 bg-stone-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                        <Activity size={24} />
                      </div>
                    </div>

                    {/* Text Area */}
                    <div className="md:w-2/4">
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 text-slate-800 group-hover:text-indigo-600 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-slate-500 text-base md:text-lg leading-relaxed font-light line-clamp-2 md:line-clamp-none">
                        {service.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

    </div>
  );
};

export default Services;