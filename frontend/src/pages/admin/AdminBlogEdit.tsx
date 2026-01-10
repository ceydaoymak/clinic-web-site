import { getBackendUrl } from '../../config/api';
import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import api from '../../config/api';
import { uploadImageAndGetUrl } from '../../services/firebaseImage';
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  Image as ImageIcon, 
  X, 
  Eye, 
  CheckCircle,
  Loader2
} from 'lucide-react';

const AdminBlogEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/blog/id/${id}`);
      const post = response.data;
      if (post) {
        setTitle(post.title);
        setExcerpt(post.excerpt || '');
        setContent(post.content);
        setCoverImage(post.coverImage || '');
        setPublished(post.published);
      }
    } catch (error) {
      console.error('Failed to fetch post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setSaving(true);
      // Firebase Storage'a yükle
      const url = await uploadImageAndGetUrl(file);
      setCoverImage(url);
    } catch (error) {
      alert('Görsel yüklenemedi.');
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (publish: boolean) => {
    if (!title.trim() || !content.trim()) {
      alert('Başlık ve içerik gereklidir.');
      return;
    }

    try {
      setSaving(true);
      const data = {
        title,
        excerpt,
        content,
        coverImage: coverImage || undefined,
        published: publish,
      };

      if (isNew) {
        await api.post('/blog', data);
      } else {
        await api.put(`/blog/${id}`, data);
      }

      navigate('/admin/blog');
    } catch (error: any) {
      alert(error.response?.data?.error || 'Kayıt başarısız.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
        <p className="text-slate-500 font-medium">İçerik yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans pb-20">
      {/* Üst Navigasyon */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4">
              <Link to="/admin/blog" className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500">
                <ArrowLeft size={20} />
              </Link>
              <div className="h-6 w-[1px] bg-slate-200"></div>
              <h1 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                {isNew ? 'YENİ YAZI' : 'YAZI DÜZENLE'}
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
              >
                <Save size={18} />
                Taslak
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-all shadow-sm shadow-indigo-200"
              >
                {saving ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle size={18} />}
                {isNew ? 'Yayınla' : 'Güncelle'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sol Kolon: Ana İçerik */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Başlık</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-0 py-2 text-3xl font-bold bg-transparent border-none focus:ring-0 placeholder:text-slate-300"
                  placeholder="Yazı başlığını buraya yazın..."
                />
                <div className="h-[1px] w-full bg-slate-100 mt-2"></div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Kısa Özet</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none text-slate-600 italic"
                  placeholder="Okuyucuları meraklandıracak kısa bir özet..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">İçerik</label>
                <div className="modern-editor">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link', 'image', 'blockquote'],
                        ['clean'],
                      ],
                    }}
                    style={{ height: '500px', marginBottom: '50px' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Ayarlar & Görsel */}
          <div className="space-y-6">
            
            {/* Yayınlama Durumu Kartı */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Eye size={18} className="text-indigo-500" />
                Yayınlama Ayarları
              </h3>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-sm font-medium text-slate-600">Durum:</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-md ${published ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {published ? 'YAYINDA' : 'TASLAK'}
                </span>
              </div>
              <label className="mt-4 flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-10 h-6 rounded-full transition-colors ${published ? 'bg-indigo-600' : 'bg-slate-300'}`}></div>
                  <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${published ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
                <span className="text-sm font-semibold text-slate-700">Yayınla</span>
              </label>
            </div>

            {/* Kapak Görseli Kartı */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ImageIcon size={18} className="text-indigo-500" />
                Kapak Görseli
              </h3>
              
              <div className="relative group">
                {coverImage ? (
                  <div className="relative rounded-xl overflow-hidden border border-slate-200">
                    <img
                      src={getBackendUrl(coverImage)}
                      alt="Cover"
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 bg-white rounded-full text-slate-900 hover:bg-indigo-50 transition-colors"
                      >
                        <Upload size={18} />
                      </button>
                      <button 
                        onClick={() => setCoverImage('')}
                        className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-48 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all text-slate-400"
                  >
                    <div className="p-3 bg-slate-50 rounded-full">
                      <Upload size={24} />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider">Görsel Yükle</span>
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-3 text-center uppercase tracking-tight">
                Önerilen boyut: 1200x630px (PNG, JPG)
              </p>
            </div>

          </div>
        </div>
      </main>

      {/* Quill Editör İçin Özel CSS */}
      <style>{`
        .modern-editor .ql-toolbar.ql-snow {
          border: none;
          border-bottom: 1px solid #f1f5f9;
          padding: 8px 0;
        }
        .modern-editor .ql-container.ql-snow {
          border: none;
          font-family: 'Inter', sans-serif;
          font-size: 16px;
        }
        .modern-editor .ql-editor {
          padding: 20px 0;
          color: #334155;
        }
        .modern-editor .ql-editor.ql-blank::before {
          left: 0;
          color: #cbd5e1;
          font-style: normal;
        }
      `}</style>
    </div>
  );
};

export default AdminBlogEdit;