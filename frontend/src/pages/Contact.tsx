import React, { useState } from 'react';
import api from '../config/api';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/contact', formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 4000);
    } catch (err) {
      alert('Mesaj gönderilemedi!');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-white min-h-screen text-slate-900">

      {/* --- MODERN HERO SECTION --- */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-stone-50 border-b border-stone-100">
        <div className="container-custom text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-7xl font-light tracking-tight mb-4 md:mb-6 italic text-slate-900">
              İletişim <span className="font-semibold not-italic text-indigo-600">& Randevu</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl">
              Çocuğunuzun sağlığı ile ilgili her türlü sorunuz için profesyonel ekibimiz size yardımcı olmaya hazır.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* --- İLETİŞİM BİLGİLERİ (LEFT) --- */}
            <motion.div
              {...fadeInUp}
              className="lg:col-span-5 space-y-12"
            >
              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600 mb-8">Klinik Bilgileri</h2>

                <div className="space-y-10">
                  <div className="flex gap-6 group">
                    <div className="w-12 h-12 shrink-0 bg-stone-50 flex items-center justify-center rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-slate-900">Adres</h3>
                      <p className="text-slate-500 leading-relaxed">
                        Op. Dr. Bülent Azman Muayenehanesi<br />
                        Mimar Sinan Mahallesi Yörük Ali Efe Bulvarı No:50/4,<br />
                        Efeler, Aydın
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 group">
                    <div className="w-12 h-12 shrink-0 bg-stone-50 flex items-center justify-center rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-slate-900">Telefon</h3>
                      <a href="tel:+905326653309" className="text-slate-500 text-xl hover:text-indigo-600 transition-colors">
                        0 532 665 33 09
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-6 group">
                    <div className="w-12 h-12 shrink-0 bg-stone-50 flex items-center justify-center rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-slate-900">Çalışma Saatleri</h3>
                      <div className="text-slate-500 grid grid-cols-2 gap-x-4">
                        <span>Haftaiçi:</span> <span>09:00 - 17:00</span>
                        <span>Cumartesi:</span> <span>10:00 - 14:00</span>
                        <span>Pazar:</span> <span className="text-slate-300 italic">Kapalı</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* HARİTA AREA */}
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl grayscale group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093643!2d27.842751315316524!3d37.8488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDUwJzU1LjciTiAyN8KwNTAnNDEuOCJF!5e0!3m2!1str!2str!4v1620000000000!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="transition-all duration-700 group-hover:grayscale-0"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-slate-900/10 rounded-3xl" />
              </div>
            </motion.div>

            {/* --- FORM AREA (RIGHT) --- */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[2rem] border border-stone-100 shadow-xl"
            >
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Bize Ulaşın</h2>
                <p className="text-slate-400">Tüm başvurular tıbbi gizlilik çerçevesinde değerlendirilir.</p>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Mesajınız Gönderildi</h3>
                    <p className="text-slate-500">En kısa sürede sizinle iletişime geçeceğiz. İlginiz için teşekkürler.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Ad Soyad</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-0 py-3 bg-transparent border-b-2 border-stone-100 focus:border-indigo-600 outline-none transition-all placeholder:text-stone-300"
                          placeholder="Ahmet Yılmaz"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">E-Posta</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-0 py-3 bg-transparent border-b-2 border-stone-100 focus:border-indigo-600 outline-none transition-all placeholder:text-stone-300"
                          placeholder="ornek@mail.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Telefon</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-0 py-3 bg-transparent border-b-2 border-stone-100 focus:border-indigo-600 outline-none transition-all placeholder:text-stone-300"
                        placeholder="0 5xx xxx xx xx"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Mesajınız</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-0 py-3 bg-transparent border-b-2 border-stone-100 focus:border-indigo-600 outline-none transition-all resize-none placeholder:text-stone-300"
                        placeholder="Randevu talebiniz veya sorunuz..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="group flex items-center justify-center gap-3 w-full py-5 bg-slate-900 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200"
                    >
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      Mesajı Gönder
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- INFO FOOTER (DARK) --- */}
      <section className="py-12 bg-slate-900 text-slate-400 text-center text-sm">
        <div className="container-custom">
          Acil vakalar için lütfen doğrudan telefon numaramız üzerinden iletişime geçiniz.
        </div>
      </section>
    </div>
  );
};

export default Contact;