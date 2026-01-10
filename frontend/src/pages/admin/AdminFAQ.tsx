import React, { useEffect, useState } from 'react';
import { api } from '../../config/api';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const AdminFAQ: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchFaqs = () => {
    api.get('/faqs').then(res => setFaqs(res.data));
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/faqs/${editingId}`, { question, answer });
    } else {
      await api.post('/faqs', { question, answer });
    }
    setQuestion('');
    setAnswer('');
    setEditingId(null);
    fetchFaqs();
  };

  const handleEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setQuestion(faq.question);
    setAnswer(faq.answer);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Silmek istediğinize emin misiniz?')) {
      await api.delete(`/faqs/${id}`);
      fetchFaqs();
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">SSS Yönetimi</h1>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          type="text"
          className="w-full border px-4 py-2 rounded"
          placeholder="Soru"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          required
        />
        <textarea
          className="w-full border px-4 py-2 rounded"
          placeholder="Cevap"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          required
        />
        <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded">
          {editingId ? 'Güncelle' : 'Ekle'}
        </button>
        {editingId && (
          <button type="button" className="ml-2 px-6 py-2 bg-gray-400 text-white rounded" onClick={() => { setEditingId(null); setQuestion(''); setAnswer(''); }}>
            İptal
          </button>
        )}
      </form>
      <ul className="space-y-4">
        {faqs.map(faq => (
          <li key={faq.id} className="border rounded p-4 flex justify-between items-start">
            <div>
              <div className="font-semibold">{faq.question}</div>
              <div className="text-gray-600 mt-1">{faq.answer}</div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-yellow-400 text-white rounded" onClick={() => handleEdit(faq)}>Düzenle</button>
              <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(faq.id)}>Sil</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminFAQ;
