import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { ChevronRight, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import api, { getBackendUrl } from '../config/api';
import { BlogPost } from '../types';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `/blog?page=${currentPage}&limit=6&published=true`
        );
        setPosts(response.data.posts);
        setTotalPages(response.data.pages);
      } catch (error) {
        console.error('Blog yazıları yüklenemedi:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
    window.scrollTo(0, 0); // Sayfa değiştiğinde en üste çık
  }, [currentPage]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-white min-h-screen">

      {/* --- HEADER SECTION --- */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-stone-50 border-b border-stone-100">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 text-indigo-600 font-bold tracking-widest uppercase text-xs mb-4">
              <BookOpen className="w-4 h-4" />
              <span>Sağlık Rehberi</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-light tracking-tight text-slate-900 mb-4 md:mb-6">
              Blog Yazıları
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed">
              Çocuk cerrahisi, ebeveynlik süreci ve çocuk sağlığı üzerine güncel tıbbi makaleler ve öneriler.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom max-w-5xl">
          {loading ? (
            <div className="flex flex-col items-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full"
              />
              <p className="mt-4 text-slate-400 font-medium">Makaleler Hazırlanıyor...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 bg-stone-50 rounded-3xl border border-dashed border-stone-200">
              <p className="text-slate-500">Henüz bir yazı yayınlanmadı.</p>
            </div>
          ) : (
            <div className="space-y-24">
              {posts.map((post) => (
                <motion.article
                  key={post.id}
                  {...fadeInUp}
                  className="group"
                >
                  <Link to={`/blog/${post.slug}`} className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">

                    {/* Görsel Alanı - Desktop'ta 5/12 genişlik */}
                    <div className="md:col-span-5 relative overflow-hidden rounded-2xl bg-stone-100 aspect-[4/3] md:aspect-square">
                      {post.coverImage ? (
                        <img
                          src={getBackendUrl(post.coverImage)}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-stone-200" />
                        </div>
                      )}
                      {/* Tarih Etiketi */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-slate-900 rounded">
                        {post.publishedAt && format(new Date(post.publishedAt), 'dd MMM yyyy', { locale: tr })}
                      </div>
                    </div>

                    {/* Metin Alanı - Desktop'ta 7/12 genişlik */}
                    <div className="md:col-span-7">
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5 group-hover:text-indigo-600 transition-colors duration-300 leading-tight">
                        {post.title}
                      </h2>

                      <div className="text-slate-500 text-lg leading-relaxed mb-6 line-clamp-3 md:line-clamp-4">
                        {post.excerpt ? (
                          <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                        ) : (
                          <div dangerouslySetInnerHTML={{ __html: post.content?.substring(0, 200) + '...' }} />
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-900 group-hover:gap-4 transition-all duration-300">
                        Makaleyi Oku
                        <ChevronRight className="w-5 h-5 text-indigo-600" />
                      </div>
                    </div>
                  </Link>
                  {/* Ayırıcı Çizgi */}
                  <div className="mt-20 h-px bg-stone-100 w-full group-last:hidden" />
                </motion.article>
              ))}
            </div>
          )}

          {/* --- PAGINATION --- */}
          {totalPages > 1 && (
            <div className="mt-24 pt-12 border-t border-stone-100 flex justify-between items-center">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest text-slate-400 hover:text-indigo-600 disabled:opacity-0 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Önceki
              </button>

              <div className="text-slate-400 font-medium text-sm">
                Sayfa <span className="text-slate-900">{currentPage}</span> / {totalPages}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest text-slate-400 hover:text-indigo-600 disabled:opacity-0 transition-all"
              >
                Sonraki
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;