import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { ChevronRight, Award, Users, Stethoscope, Quote, Calendar } from 'lucide-react';
import api, { getBackendUrl } from '../config/api';
import { BlogPost, Comment } from '../types';

const Home = () => {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, commentsRes] = await Promise.all([
          api.get('/blog?page=1&limit=3&published=true'),
          api.get('/comments')
        ]);
        setLatestPosts(postsRes.data.posts);
        setComments(commentsRes.data.filter((c: Comment) => c.isActive !== false));
      } catch (error) {
        console.error('Data fetching error:', error);
      }
    };
    fetchData();
  }, []);

  // Animasyon Varyantları
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: "easeOut" }
  };

  return (
    <div className="bg-white text-slate-900 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[80vh] md:h-[550px] flex items-center bg-[#0a0f1a] overflow-hidden">
        {/* Arka Plan Görseli */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/img/foto2.jpeg"
            alt="Op. Dr. Bülent Azman"
            className="absolute right-0 top-0 w-full md:w-2/3 h-full object-cover object-top md:object-center grayscale-[20%]"
          />
          {/* Mobil için dikey, Masaüstü için yatay gradyan */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/80 via-[#0a0f1a]/90 to-[#0a0f1a] md:bg-gradient-to-r md:from-[#0a0f1a] md:via-[#0a0f1a] md:via-40% md:to-transparent" />
        </div>
        
        <div className="container-custom relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white md:pl-12 lg:pl-20"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-widest bg-indigo-600/30 text-indigo-200 border border-indigo-500/30 rounded-full backdrop-blur-md"
            >
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
              Çocuk Cerrahisi Uzmanı
            </motion.span>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 leading-[1.1] md:leading-[0.95]">
              Op. Dr. <br />
              <span className="font-bold text-white">Bülent Azman</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-lg font-light">
              20 yılı aşkın tecrübe ile çocuk cerrahisinde modern tıbbı, 
              <span className="text-white font-medium"> güven ve şefkatle</span> birleştiriyoruz.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link 
                to="/iletisim" 
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white hover:bg-indigo-700 transition-all rounded-lg shadow-xl font-bold"
              >
                <Calendar className="w-5 h-5" />
                Randevu Al
              </Link>
              <Link 
                to="/about" 
                className="flex items-center justify-center px-8 py-4 border border-white/30 text-white hover:bg-white/10 transition-all rounded-lg backdrop-blur-sm font-medium"
              >
                Deneyimimiz
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-12 md:py-20 border-b border-stone-100 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
  {[
    { label: "Yıllık Deneyim", value: "25+", icon: <Award className="w-6 h-6" /> },
    { label: "Başarılı Tedavi", value: "10,000+", icon: <Users className="w-6 h-6" /> },
    { label: "Vaka Çeşitliliği", value: "60+", icon: <Stethoscope className="w-6 h-6" /> },
  ].map((stat, i) => (
    <div key={i} className="flex flex-col items-center text-center group">
      <div className="w-12 h-12 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-2xl mb-4">
        {stat.icon}
      </div>
      <div className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-1">
        {stat.value}
      </div>
      <div className="text-xs md:text-sm uppercase tracking-widest text-slate-500 font-semibold">
        {stat.label}
      </div>
    </div>
  ))}
</div>

      </section>

      {/* --- SPECIALTIES --- */}
      <section className="py-20 md:py-32 bg-stone-50">
        <div className="container-custom">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Uzmanlık Alanları</h2>
            <div className="h-1.5 w-20 bg-indigo-600 mb-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: 'Kasık Fıtığı', desc: 'Sık görülen fıtık vakalarında minimal invaziv ve güvenli cerrahi.' },
              { title: 'Bağırsak Tıkanıklığı', desc: 'Doğumsal veya sonradan gelişen vakalarda hızlı müdahale.' },
              { title: 'Apandisit', desc: 'Akut durumlarda hızlı değerlendirme ve etkili tedavi süreci.' },
              { title: 'Hipospadias', desc: 'Fonksiyonel ve estetik açıdan hassas cerrahi çözümler.' },
              { title: 'Hidrosel (Su Fıtığı)', desc: 'Çocuklara özel, konforlu ve güvenli yaklaşımlar.' },
              { title: 'Sünnet', desc: 'Tıbbi kurallara tam uyumlu, modern cerrahi sünnet uygulamaları.' },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
              >
                <h3 className="font-bold text-xl mb-4 text-slate-800 group-hover:text-indigo-600">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-6 text-sm md:text-base">{item.desc}</p>
                <div className="h-1 w-12 bg-indigo-100 group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      {comments.length > 0 && (
        <section className="py-20 md:py-32 bg-slate-900 text-white overflow-hidden">
          <div className="container-custom">
            <div className="text-center mb-16 md:mb-24">
              <h2 className="text-3xl md:text-5xl font-light mb-4">Hasta <span className="font-bold text-indigo-400">Deneyimleri</span></h2>
              <p className="text-slate-400 max-w-md mx-auto">Ailelerimizin paylaştığı gerçek görüşler.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {comments.slice(0, 3).map((comment) => (
                <motion.div 
                  key={comment.id} 
                  variants={fadeInUp}
                  className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm relative flex flex-col justify-between"
                >
                  <Quote className="absolute top-8 right-8 w-12 h-12 text-indigo-500 opacity-20" />
                  <p className="text-slate-300 italic leading-relaxed mb-8 relative z-10">"{comment.content}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center font-bold text-lg shadow-lg">
                      {comment.initials}
                    </div>
                    <div>
                      <div className="flex text-yellow-500 text-xs mb-1">
                        {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                      </div>
                      <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Doğrulanmış Görüş</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- BLOG SECTION --- */}
      {latestPosts.length > 0 && (
        <section className="py-20 md:py-32 bg-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">Blog Yazıları</h2>
                <p className="text-slate-500 text-lg font-light">Ebeveynler için güncel çocuk sağlığı rehberi.</p>
              </div>
              <Link to="/blog" className="flex items-center gap-2 text-indigo-600 font-bold hover:gap-4 transition-all group">
                Tüm Makaleler <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {latestPosts.map((post) => (
                <motion.div key={post.id} variants={fadeInUp} className="group flex flex-col">
                  <Link to={`/blog/${post.slug}`} className="flex-1">
                    <div className="aspect-[16/10] overflow-hidden rounded-2xl mb-6 bg-stone-100 shadow-md">
                      {post.coverImage && (
                        <img
                          src={getBackendUrl(post.coverImage)}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      )}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-indigo-600 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 line-clamp-2 text-sm md:text-base mb-6 leading-relaxed">
                      {post.excerpt?.replace(/<[^>]*>?/gm, '') || post.content?.replace(/<[^>]*>?/gm, '').substring(0, 100)}...
                    </p>
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {post.publishedAt && format(new Date(post.publishedAt), 'dd MMMM yyyy')}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
 
export default Home;