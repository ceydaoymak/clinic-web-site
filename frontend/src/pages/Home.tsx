import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { ChevronRight, Award, Users, Stethoscope, Quote, Calendar } from 'lucide-react';
import api from '../config/api';
import { BlogPost, Comment } from '../types';

const Home = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);

  // Yorum Formu State
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [newComment, setNewComment] = useState({ initials: '', rating: 5, content: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

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

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.initials.length > 2) {
      // Simple client-side validation, though input maxLength should handle it
      return;
    }

    try {
      setSubmitStatus('submitting');
      await api.post('/comments', newComment);
      setSubmitStatus('success');
      setTimeout(() => {
        setIsCommentModalOpen(false);
        setSubmitStatus('idle');
        setNewComment({ initials: '', rating: 5, content: '' });
      }, 2000);
    } catch (error) {
      console.error('Yorum gönderme hatası:', error);
      setSubmitStatus('error');
    }
  };

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

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-4 md:mb-6 leading-[1.1] md:leading-[0.95]">
              Op. Dr. <br />
              <span className="font-bold text-white">Bülent Azman</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed mb-8 md:mb-10 max-w-lg font-light pr-4 md:pr-0">
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 px-4 md:px-0">
          <div className="flex flex-col items-center text-center group col-span-2 md:col-span-1">
            <div className="w-12 h-12 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-2xl mb-4">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-1">
              25+
            </div>
            <div className="text-xs md:text-sm uppercase tracking-widest text-slate-500 font-semibold">
              Yıllık Deneyim
            </div>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-12 h-12 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-2xl mb-4">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-1">
              10k+
            </div>
            <div className="text-xs md:text-sm uppercase tracking-widest text-slate-500 font-semibold">
              Başarılı Tedavi
            </div>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-12 h-12 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-2xl mb-4">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-1">
              60+
            </div>
            <div className="text-xs md:text-sm uppercase tracking-widest text-slate-500 font-semibold">
              Vaka Çeşitliliği
            </div>
          </div>
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
                <h3 className="font-bold text-lg md:text-xl mb-3 md:mb-4 text-slate-800 group-hover:text-indigo-600">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-4 md:mb-6 text-sm">{item.desc}</p>
                <div className="h-1 w-12 bg-indigo-100 group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section >

      {/* --- TESTIMONIALS --- */}
      {
        comments.length > 0 && (
          <section className="py-20 md:py-32 bg-slate-900 text-white overflow-hidden">
            <div className="container-custom">
              <div className="text-center mb-16 md:mb-24">
                <h2 className="text-3xl md:text-5xl font-light mb-4">Hasta <span className="font-bold text-indigo-400">Deneyimleri</span></h2>
                <p className="text-slate-400 max-w-md mx-auto">Ailelerimizin paylaştığı gerçek görüşler.</p>
              </div>
              <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory px-4 md:px-0 -mx-4 md:mx-0 scrollbar-hide">
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    variants={fadeInUp}
                    className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm relative flex flex-col justify-between min-w-[300px] md:min-w-[400px] snap-center"
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
        )
      }

      {/* --- YORUM YAP BUTONU VE MODAL --- */}
      <div className="flex justify-center pb-20 bg-slate-900 border-t border-slate-800/50">
        <button
          onClick={() => setIsCommentModalOpen(true)}
          className="group flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-lg shadow-indigo-900/20 transition-all hover:scale-105"
        >
          <Quote className="w-5 h-5 fill-current" />
          Siz de Değerlendirin
        </button>
      </div>

      {/* Modal Overlay */}
      {isCommentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative"
          >
            <button
              onClick={() => setIsCommentModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-2">Deneyiminizi Paylaşın</h3>
            <p className="text-sm text-slate-500 mb-6">Görüşleriniz hizmet kalitemizi artırmamız için çok değerli.</p>

            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">Teşekkürler!</h4>
                <p className="text-slate-500 text-sm">Yorumunuz yönetici onayından sonra yayınlanacaktır.</p>
              </div>
            ) : (
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Adınız Soyadınız (Baş Harfler)</label>
                  <input
                    type="text"
                    placeholder="Örn: AA"
                    maxLength={2}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none font-bold uppercase"
                    value={newComment.initials}
                    onChange={(e) => setNewComment({ ...newComment, initials: e.target.value.toUpperCase() })}
                    required
                  />
                  <p className="text-[10px] text-slate-400 mt-1">*Gizlilik gereği sadece baş harfleriniz görünecektir.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Puanınız</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewComment({ ...newComment, rating: star })}
                        className={`p-2 rounded-lg transition-colors ${newComment.rating >= star ? 'text-amber-400 bg-amber-50' : 'text-slate-200 bg-slate-50'}`}
                      >
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Görüşünüz</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none min-h-[100px] resize-none"
                    placeholder="Deneyiminizi buraya yazabilirsiniz..."
                    value={newComment.content}
                    onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === 'submitting'}
                  className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {submitStatus === 'submitting' ? 'Gönderiliyor...' : 'Yorumu Gönder'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}

      {/* --- BLOG SECTION --- */}
      {
        latestPosts.length > 0 && (
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
                            src={post.coverImage || undefined}
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
        )
      }
    </div >
  );
};

export default Home;