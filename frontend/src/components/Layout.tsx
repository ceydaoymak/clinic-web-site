import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, MapPin, Instagram, Facebook, ChevronRight } from 'lucide-react';

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Sayfa kaydırıldığında navbar arka planını değiştir
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sayfa değiştiğinde mobil menüyü kapat ve yukarı çık
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Anasayfa' },
    { path: '/hakkinda', label: 'Hakkımda' },
    { path: '/hizmetler', label: 'Uzmanlık Alanları' },
    { path: '/blog', label: 'Blog' },
    { path: '/sss', label: 'Sık Sorulan Sorular' },
    { path: '/iletisim', label: 'İletişim' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* --- NAVBAR --- */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-lg shadow-lg py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo Area */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img 
                  src="/img/foto.jpeg" 
                  alt="Op. Dr. Bülent Azman" 
                  className="h-12 w-12 rounded-full object-cover border-2 border-indigo-600 group-hover:scale-105 transition-transform" 
                />
              </div>
              <div className="flex flex-col">
                <span className={`text-lg font-bold leading-none transition-colors ${scrolled || location.pathname !== '/' ? 'text-slate-900' : 'text-white md:text-white'}`}>
                  Op. Dr. Bülent Azman
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-indigo-500">
                  Çocuk Cerrahisi Uzmanı
                </span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    isActive(link.path)
                      ? 'bg-indigo-600 text-white'
                      : scrolled || location.pathname !== '/' 
                        ? 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
          
            </div>

            {/* Mobile Toggle */}
            <button
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled || location.pathname !== '/' ? 'text-slate-900' : 'text-white'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="container-custom py-8 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-xl font-bold py-2 ${
                      isActive(link.path) ? 'text-indigo-600' : 'text-slate-500'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="border-slate-100" />
                <div className="flex gap-4 pt-2">
                   <a href="tel:05326653309" className="p-3 bg-indigo-50 text-indigo-600 rounded-full"><Phone size={20} /></a>
                   <a href="https://instagram.com/opdrbulentazman" className="p-3 bg-indigo-50 text-indigo-600 rounded-full"><Instagram size={20} /></a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <img src="/img/foto.jpeg" alt="Logo" className="h-10 w-10 rounded-full grayscale-[50%]" />
                <span className="text-white font-bold text-xl">Dr. Bülent Azman</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                Çocuk cerrahisinde 20 yılı aşkın klinik tecrübe ile minik kalplere güven ve şefkatle dokunuyoruz.
              </p>
              <div className="flex space-x-4">
                <a href="https://instagram.com/opdrbulentazman" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
                  <Instagram size={20} />
                </a>
                <a href="https://facebook.com/bulent.azman" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
                  <Facebook size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Kurumsal</h4>
              <ul className="space-y-4">
                {navLinks.map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="flex items-center gap-2 hover:text-indigo-400 transition-colors group">
                      <ChevronRight size={14} className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">İletişim Bilgileri</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-600/10 flex items-center justify-center text-indigo-500 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <p className="text-sm leading-relaxed text-slate-400">
                    Mimar Sinan Mah. Yörük Ali Efe Bulvarı <br />
                    No:50/4, Efeler / Aydın
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-600/10 flex items-center justify-center text-indigo-500 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <a href="tel:05326653309" className="block text-white font-bold hover:text-indigo-400 transition-colors">
                      0 532 665 33 09
                    </a>
                    <p className="text-xs text-slate-500 mt-1">Pzt - Cmt: 09:00 - 18:00</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-600/10 flex items-center justify-center text-indigo-500 shrink-0">
                    <Mail size={20} />
                  </div>
                  <a href="mailto:info@bulentazman.com" className="text-sm hover:text-white transition-colors">
                    info@bulentazman.com
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Op. Dr. Bülent Azman. Tüm Hakları Saklıdır.</p>
            <div className="flex gap-6">
              <Link to="/kvkk" className="hover:text-slate-300">KVKK Aydınlatma Metni</Link>
              <Link to="/privacy" className="hover:text-slate-300">Gizlilik Politikası</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;