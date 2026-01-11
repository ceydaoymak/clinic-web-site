import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../config/api';
import {
  Loader2,
  ArrowLeft,
  Briefcase,
  Type,
  AlignLeft,
  CheckCircle2,
  AlertCircle,
  LayoutDashboard
} from 'lucide-react';

const AdminServiceNew = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/services', {
        title,
        description: description || "",
        content: content || ""
      });
      // Önceki sayfada '/admin/service' kullanılmış olabilir, 
      // projenizdeki path'e göre burayı '/admin/services' olarak güncelledim.
      navigate('/admin/hizmetler');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Hizmet kaydedilirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      {/* Üst Navigasyon */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4">
              <Link to="/admin" className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500">
                <LayoutDashboard size={20} />
              </Link>
              <div className="h-6 w-[1px] bg-slate-200"></div>
              <h1 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                HİZMET YÖNETİMİ
              </h1>
            </div>
            <button
              onClick={() => navigate('/admin/services')}
              className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={16} />
              Geri Dön
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* Form Kartı */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Kart Başlığı */}
          <div className="bg-slate-50/50 border-b border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-md shadow-indigo-100">
                <Briefcase size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Yeni Hizmet Oluştur</h2>
                <p className="text-sm text-slate-500">Müşterilerinize sunduğunuz çözümleri detaylandırın.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Hata Mesajı */}
            {error && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl animate-shake">
                <AlertCircle size={20} />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Hizmet Başlığı */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase ml-1">
                <Type size={14} />
                Hizmet Başlığı
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-300 font-medium"
                placeholder="Hizmetinizin adını girin..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>


            {/* Hizmet Açıklaması */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase ml-1">
                <AlignLeft size={14} />
                Kısa Açıklama
              </label>
              <textarea
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-300 min-h-[80px] resize-none leading-relaxed"
                placeholder="Hizmetinizin kısa açıklamasını girin..."
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            {/* Hizmet İçeriği */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase ml-1">
                <AlignLeft size={14} />
                Detaylı İçerik
              </label>
              <textarea
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-300 min-h-[120px] resize-none leading-relaxed"
                placeholder="Hizmetinizin detaylı içeriğini girin..."
                value={content}
                onChange={e => setContent(e.target.value)}
              />
            </div>

            {/* Bilgilendirme Notu */}
            <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
              <p className="text-xs text-indigo-700 leading-relaxed">
                <strong>İpucu:</strong> Hizmet başlığınızın kısa ve etkileyici olmasına dikkat edin. Açıklama kısmında sunduğunuz değer önerisini net bir şekilde belirtmeniz dönüşümleri artıracaktır.
              </p>
            </div>

            {/* Aksiyon Butonları */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/admin/hizmetler')}
                className="flex-1 py-3 px-4 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] py-3 px-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 size={20} className="group-hover:scale-110 transition-transform" />
                    Hizmeti Kaydet
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminServiceNew;