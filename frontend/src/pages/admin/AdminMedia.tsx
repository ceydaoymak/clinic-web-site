import { useEffect, useState, useRef } from 'react';
import api, { getBackendUrl } from '../../config/api';
import { Media } from '../../types';
import { Link } from 'react-router-dom';
import { 
  Upload, 
  Trash2, 
  ExternalLink, 
  Image as ImageIcon, 
  File, 
  LayoutDashboard, 
  ArrowLeft, 
  Loader2,
  FileIcon,
  Search,
  CheckCircle2
} from 'lucide-react';

const AdminMedia = () => {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await api.get('/media');
      setMedia(res.data);
    } catch (error) {
      console.error('Medya yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bu medyayı kalıcı olarak silmek istediğinize emin misiniz?')) return;
    try {
      await api.delete(`/media/${id}`);
      fetchMedia();
    } catch (error) {
      alert('Silme işlemi başarısız oldu.');
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      await api.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchMedia();
    } catch (error) {
      alert('Dosya yüklenirken bir hata oluştu.');
    } finally {
      setUploading(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredMedia = media.filter(m => 
    m.originalName.toLowerCase().includes(searchTerm.toLowerCase())
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
                Medya Kütüphanesi
              </h1>
            </div>
            <Link to="/admin" className="text-sm font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors">
              <ArrowLeft size={16} />
              Panele Dön
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sol Kolon: Dosya Yükleme Paneli */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-24">
              <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-wider">
                <Upload size={18} className="text-indigo-500" />
                Yeni Dosya
              </h3>
              
              <form onSubmit={handleUpload} className="space-y-4">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer flex flex-col items-center text-center gap-3 ${
                    file ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50'
                  }`}
                >
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    className="hidden" 
                    onChange={e => setFile(e.target.files?.[0] || null)} 
                  />
                  {file ? (
                    <>
                      <CheckCircle2 size={32} className="text-emerald-500" />
                      <span className="text-xs font-semibold text-emerald-700 truncate w-full">
                        {file.name}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="p-3 bg-white rounded-full shadow-sm">
                        <ImageIcon size={24} className="text-slate-400" />
                      </div>
                      <span className="text-xs font-medium text-slate-500">Dosya seçmek için tıklayın</span>
                    </>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!file || uploading}
                  className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-semibold shadow-sm shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center gap-2"
                >
                  {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                  {uploading ? 'Yükleniyor...' : 'Yüklemeyi Başlat'}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 leading-relaxed uppercase font-bold tracking-tighter text-center">
                  PNG, JPG, GIF veya PDF<br/>Max 10MB dosya boyutu
                </p>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Medya Listesi */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Arama Barı */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Dosya adıyla ara..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="text-sm font-medium text-slate-500 whitespace-nowrap hidden sm:block">
                {filteredMedia.length} Dosya
              </div>
            </div>

            {/* Liste/Tablo */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {loading ? (
                <div className="py-20 text-center">
                  <Loader2 className="animate-spin w-8 h-8 text-indigo-600 mx-auto mb-4" />
                  <p className="text-slate-500">Kütüphane taranıyor...</p>
                </div>
              ) : filteredMedia.length === 0 ? (
                <div className="py-20 text-center">
                  <FileIcon className="text-slate-200 mx-auto mb-4" size={48} />
                  <p className="text-slate-500 italic">Aranan dosya bulunamadı.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-200">
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Dosya</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Boyut</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Aksiyon</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredMedia.map((m) => {
                        const isImage = /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(m.originalName);
                        return (
                          <tr key={m.id} className="hover:bg-slate-50/80 transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                                  {isImage ? (
                                    <img 
                                      src={getBackendUrl(m.url)} 
                                      alt={m.originalName} 
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <File size={20} className="text-slate-400" />
                                  )}
                                </div>
                                <div className="flex flex-col min-w-0">
                                  <span className="font-semibold text-slate-700 truncate max-w-[200px] sm:max-w-xs">
                                    {m.originalName}
                                  </span>
                                  <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-tight">
                                    {m.originalName.split('.').pop()}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-500 font-medium whitespace-nowrap">
                              {formatSize(m.size)}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <a
                                  href={getBackendUrl(m.url)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                  title="Görüntüle"
                                >
                                  <ExternalLink size={18} />
                                </a>
                                <button
                                  onClick={() => handleDelete(m.id)}
                                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                  title="Sil"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminMedia;