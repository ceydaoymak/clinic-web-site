import React, { useEffect, useState } from 'react';
import api from '../config/api';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

const FAQPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/faqs')
      .then(res => {
        setFaqs(res.data);
        setLoading(false);
      })
      .catch(() => {
        setFaqs([
          { id: '1', question: 'Çocuklarda sünnet için en ideal yaş nedir?', answer: 'Tıbbi bir zorunluluk yoksa, psikolojik gelişim açısından 2-6 yaş arası yerine, 2 yaş öncesi veya 6 yaş sonrası önerilmektedir.' },
          { id: '2', question: 'Kasık fıtığı kendiliğinden geçer mi?', answer: 'Çocuklarda kasık fıtığı kendiliğinden iyileşmez ve tanı konulduktan sonra uygun bir zamanda cerrahi olarak onarılması gerekir.' },
          { id: '3', question: 'Ameliyat sonrası iyileşme süreci ne kadar sürer?', answer: 'Çoğu çocuk cerrahisi işlemi günübirlik olup, çocuklar genellikle 2-3 gün içinde normal aktivitelerine dönebilirler.' },
        ]);
        setLoading(false);
      });
  }, []);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="bg-stone-50 min-h-screen">

      <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-white border-b border-stone-100">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest bg-indigo-50 text-indigo-600 rounded-full">
              Bilgi Merkezi
            </span>
            <h1 className="text-4xl md:text-6xl font-light text-slate-900 mb-6">
              Sık Sorulan <span className="font-bold">Sorular</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Ebeveynlerin en çok merak ettiği konuları ve çocuk cerrahisi süreçlerini sizler için yanıtladık.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom max-w-3xl">
          {loading ? (
            <div className="text-center py-10 text-slate-400">Yükleniyor...</div>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`bg-white rounded-2xl border transition-all duration-300 ${openIndex === idx
                    ? 'border-indigo-200 shadow-xl shadow-indigo-500/5'
                    : 'border-slate-200 hover:border-indigo-200 shadow-sm'
                    }`}
                >
                  <button
                    className="w-full text-left px-6 py-5 md:px-8 md:py-6 focus:outline-none flex justify-between items-center group"
                    onClick={() => toggleAccordion(idx)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === idx ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-500'
                        }`}>
                        <HelpCircle size={18} />
                      </div>
                      <span className={`font-bold md:text-lg transition-colors ${openIndex === idx ? 'text-indigo-600' : 'text-slate-700'
                        }`}>
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`}
                      size={20}
                    />
                  </button>

                  <AnimatePresence>
                    {openIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-slate-600 leading-relaxed border-t border-indigo-50/50">
                          <div className="mt-4 p-4 bg-slate-50 rounded-xl border-l-4 border-indigo-500">
                            {faq.answer}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FAQPage;