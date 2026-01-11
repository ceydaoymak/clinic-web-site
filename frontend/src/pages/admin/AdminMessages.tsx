import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Calendar, 
  Inbox, 
  Search, 
  Loader2
} from 'lucide-react';
import { api } from '../../config/api';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMessages = async () => {
    try {
      const res = await api.get<Message[]>('/contact');
      // En yeni mesaj üstte görünecek şekilde sırala
      const sortedMessages = res.data.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setMessages(sortedMessages);
    } catch (error) {
      console.error('Mesajlar yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);


  const filteredMessages = messages.filter(msg => 
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Inbox className="text-indigo-600" />
              Gelen Mesajlar
            </h1>
            <p className="text-slate-500 mt-1">İletişim formu üzerinden gönderilen tüm talepler.</p>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Mesajlarda ara..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* --- CONTENT --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="font-medium">Mesajlar yükleniyor...</p>
          </div>
        ) : filteredMessages.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200"
          >
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Inbox className="text-slate-300" size={40} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Mesaj bulunamadı</h3>
            <p className="text-slate-500">Arama kriterlerinizi değiştirebilir veya kutuyu yenileyebilirsiniz.</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filteredMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all group"
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-6">
                    
                    {/* User Info & Meta */}
                    <div className="flex-shrink-0 lg:w-1/3">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                          {msg.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h2 className="font-bold text-slate-900">{msg.name}</h2>
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                            <Calendar size={12} />
                            {format(new Date(msg.createdAt), 'dd MMMM yyyy, HH:mm', { locale: tr })}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <a 
                          href={`mailto:${msg.email}`}
                          className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors"
                        >
                          <Mail size={14} className="text-slate-400" />
                          {msg.email}
                        </a>
                        {msg.phone && (
                          <a 
                            href={`tel:${msg.phone}`}
                            className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors"
                          >
                            <Phone size={14} className="text-slate-400" />
                            {msg.phone}
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Message Body */}
                    <div className="flex-grow bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                        {msg.message}
                      </p>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <div className="mt-8 text-center text-slate-400 text-xs">
          Toplam {filteredMessages.length} mesaj listeleniyor.
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;