import { useEffect, useState } from 'react';
import api from '../../config/api';
import { Service } from '../../types';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Settings, 
  Trash2, 
  ArrowLeft, 
  LayoutDashboard, 
  Loader2, 
  Search,
  Briefcase 
} from 'lucide-react';

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get('/services');
      setServices(res.data);
    } catch (error) {
      console.error('Hizmetler yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bu hizmeti silmek istediğinize emin misiniz?')) return;
    
    try {
      await api.delete(`/services/${id}`);
      fetchServices();
    } catch (error) {
      alert('Hizmet silinirken bir hata oluştu');
    }
  };

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <h1 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Hizmet Yönetimi
              </h1>
            </div>
            <Link
              to="/admin"
              className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={16} />
              Panele Dön
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Başlık ve Buton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Verilen Hizmetler</h2>
            <p className="text-slate-500 text-sm mt-1">Sitenizde sergilenen aktif hizmetleri buradan yönetebilirsiniz.</p>
          </div>
          <Link
            to="/admin/hizmetler/yeni"
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm shadow-indigo-200 active:scale-95"
          >
            <Plus size={18} />
            Yeni Hizmet Ekle
          </Link>
        </div>

        {/* Arama ve Filtre */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Hizmetlerde ara..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Hizmet Listesi */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-20 text-center">
              <Loader2 className="animate-spin w-8 h-8 text-indigo-600 mx-auto mb-4" />
              <p className="text-slate-500">Hizmetler listeleniyor...</p>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="py-20 text-center">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="text-slate-300" size={32} />
              </div>
              <p className="text-slate-500 mb-6">Henüz bir hizmet eklemediniz.</p>
              <Link to="/admin/hizmetler/yeni" className="text-indigo-600 font-semibold hover:underline">
                İlk hizmetinizi hemen oluşturun →
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Hizmet Detayı</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Açıklama</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredServices.map((service) => (
                    <tr key={service.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                            <Briefcase size={18} />
                          </div>
                          <span className="font-semibold text-slate-700">
                            {service.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-500 max-w-xs md:max-w-md truncate">
                          {service.description}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/hizmetler/${service.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-all"
                          >
                            <Settings size={14} />
                            Düzenle
                          </Link>
                          <button
                            onClick={() => handleDelete(service.id)}
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

        {/* Alt Bilgi */}
        {!loading && filteredServices.length > 0 && (
          <div className="mt-6 flex items-center justify-between text-sm text-slate-500 px-2">
            <p>Toplam <strong>{filteredServices.length}</strong> hizmet listeleniyor.</p>
            <div className="flex items-center gap-1 text-xs uppercase font-bold tracking-tighter">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Sistem Aktif
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminServices;