import React, { useEffect, useState } from 'react';
import { api } from '../../config/api';
import {
  MessageSquare,
  Star,
  Trash2,
  CheckCircle2,
  XCircle,
  Plus,
  LayoutDashboard,
  ArrowLeft,
  Loader2,
  Send
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Comment {
  id: string;
  initials: string;
  rating: number;
  content: string;
  isActive: boolean;
  createdAt: string;
}

const AdminComments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ initials: '', rating: 5, content: '' });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending'>('all');

  const pendingCount = comments.filter(c => !c.isActive).length;
  const filteredComments = comments.filter(c => filter === 'all' ? true : !c.isActive);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await api.get('/comments');
      setComments(res.data);
    } catch (error) {
      console.error('Yorumlar yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.initials.length > 2) return alert('Baş harfler en fazla 2 karakter olmalı');

    try {
      setSubmitting(true);
      await api.post('/comments', newComment);
      setNewComment({ initials: '', rating: 5, content: '' });
      fetchComments();
    } catch (error) {
      alert('Yorum eklenemedi');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bu yorumu silmek istediğinize emin misiniz?')) return;
    await api.delete(`/comments/${id}`);
    fetchComments();
  };

  const handleUpdate = async (id: string, data: Partial<Comment>) => {
    await api.put(`/comments/${id}`, data);
    fetchComments();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      {/* Navigasyon */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4">
              <Link to="/admin" className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500">
                <LayoutDashboard size={20} />
              </Link>
              <div className="h-6 w-[1px] bg-slate-200"></div>
              <h1 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Yorum Yönetimi
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Sol Kolon: Yeni Yorum Ekleme */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-24">
              <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2 uppercase tracking-wider">
                <Plus size={18} className="text-indigo-500" />
                Yorum Ekle
              </h3>

              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Kullanıcı (Baş Harfler)</label>
                  <input
                    type="text"
                    placeholder="Örn: AB"
                    value={newComment.initials}
                    onChange={e => setNewComment({ ...newComment, initials: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold"
                    maxLength={2}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Puanlama (1-5)</label>
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
                    <Star size={16} className="text-amber-400 fill-amber-400" />
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={newComment.rating}
                      onChange={e => setNewComment({ ...newComment, rating: Number(e.target.value) })}
                      className="bg-transparent border-none focus:ring-0 w-full font-semibold text-slate-700"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Yorum İçeriği</label>
                  <textarea
                    placeholder="Müşteri deneyimini yazın..."
                    value={newComment.content}
                    onChange={e => setNewComment({ ...newComment, content: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none h-32 text-sm"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold shadow-sm shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  Yorumu Kaydet
                </button>
              </form>
            </div>
          </div>

          {/* Sağ Kolon: Yorum Listesi */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <MessageSquare size={20} className="text-indigo-600" />
                  Müşteri Geri Bildirimleri
                </h2>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${filter === 'all' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Tümü ({comments.length})
                  </button>
                  <button
                    onClick={() => setFilter('pending')}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-2 ${filter === 'pending' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Onay Bekleyen
                    {pendingCount > 0 && <span className="w-5 h-5 flex items-center justify-center bg-amber-100 text-amber-600 rounded-full text-[10px]">{pendingCount}</span>}
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="py-20 text-center bg-white rounded-2xl border border-slate-200">
                <Loader2 className="animate-spin w-8 h-8 text-indigo-600 mx-auto mb-4" />
                <p className="text-slate-500">Yorumlar yükleniyor...</p>
              </div>
            ) : filteredComments.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 border-dashed">
                <p className="text-slate-400 italic">
                  {filter === 'pending' ? 'Onay bekleyen yorum bulunmuyor.' : 'Henüz yorum eklenmemiş.'}
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredComments.map(comment => (
                  <div
                    key={comment.id}
                    className={`bg-white rounded-2xl border transition-all p-5 flex flex-col gap-4 ${!comment.isActive ? 'border-amber-200 bg-amber-50/30 ring-1 ring-amber-100' : 'border-slate-200 shadow-sm'
                      }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full border flex items-center justify-center font-bold text-lg shadow-sm ${!comment.isActive ? 'bg-amber-100 text-amber-600 border-amber-200' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
                          {comment.initials}
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < comment.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase mt-1 block">
                            {new Date(comment.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                      </div>

                      <div className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest flex items-center gap-1 ${comment.isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-100 text-amber-700 border border-amber-200'
                        }`}>
                        {comment.isActive ? 'YAYINDA' : 'ONAY BEKLİYOR'}
                      </div>
                    </div>

                    <p className={`text-sm leading-relaxed italic ${!comment.isActive ? 'text-slate-700 font-medium' : 'text-slate-600'}`}>
                      "{comment.content}"
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-50/50">
                      <button
                        onClick={() => handleUpdate(comment.id, { isActive: !comment.isActive })}
                        className={`flex items-center gap-2 text-xs font-bold transition-all px-4 py-2 rounded-lg ${comment.isActive
                            ? 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200'
                          }`}
                      >
                        {comment.isActive ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
                        {comment.isActive ? 'Yayından Kaldır' : 'Onayla ve Yayınla'}
                      </button>

                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                        Sil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminComments;