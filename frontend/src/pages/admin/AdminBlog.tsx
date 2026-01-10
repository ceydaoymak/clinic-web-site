import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../config/api';
import { BlogPost } from '../../types';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale'; // Türkçe tarih için
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  LayoutDashboard
} from 'lucide-react';

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/blog?page=${currentPage}&limit=10`);
      setPosts(response.data.posts);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return;
    try {
      await api.delete(`/blog/${id}`);
      fetchPosts();
    } catch (error) {
      alert('Silme işlemi başarısız oldu.');
    }
  };

  // Basit arama filtresi (Frontend tarafında)
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900">
      {/* Üst Navigasyon - Dashboard ile Uyumlu */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4">
              <Link to="/admin" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <LayoutDashboard size={20} className="text-slate-600" />
              </Link>
              <div className="h-6 w-[1px] bg-slate-200"></div>
              <h1 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Blog Yönetimi
              </h1>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/admin/login');
              }}
              className="text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Başlık ve Aksiyon Alanı */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Yazı Listesi</h2>
            <p className="text-slate-500 text-sm mt-1">Toplam {posts.length} içerik yönetiliyor.</p>
          </div>
          <Link
            to="/admin/blog/new"
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm shadow-indigo-200 active:scale-95"
          >
            <Plus size={18} />
            Yeni Yazı Ekle
          </Link>
        </div>

        {/* Filtreleme ve Arama Barı */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Yazı başlığı ile ara..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Sıralama:</span>
            <select className="bg-transparent font-semibold text-slate-900 focus:outline-none cursor-pointer">
              <option>En Yeni</option>
              <option>En Eski</option>
            </select>
          </div>
        </div>

        {/* Tablo Konteyneri */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-20 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-slate-500 animate-pulse">İçerikler yükleniyor...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="py-20 text-center">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-slate-300" size={32} />
              </div>
              <p className="text-slate-500">Henüz yazı bulunamadı.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">İçerik Başlığı</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Durum</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Tarih</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                            <FileText size={18} />
                          </div>
                          <span className="font-medium text-slate-700 truncate max-w-[300px] block">
                            {post.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          post.published 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                            : 'bg-amber-50 text-amber-700 border border-amber-100'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${post.published ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                          {post.published ? 'Yayında' : 'Taslak'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                        {format(new Date(post.createdAt), 'd MMM yyyy', { locale: tr })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/blog/${post.id}`}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                            title="Düzenle"
                          >
                            <Edit3 size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Sil"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modern Pagigination */}
        {!loading && totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-sm text-slate-500">
              Sayfa <span className="font-semibold text-slate-900">{currentPage}</span> / {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                      currentPage === i + 1 
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlog;