import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../config/api';
import { BlogPost, User } from '../../types';
import {
  LayoutDashboard,
  FileText,
  Settings,
  MessageSquare,
  LogOut,
  PlusCircle,
  ChevronRight,
} from 'lucide-react';

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) setUser(JSON.parse(userStr));

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/blog?page=1&limit=10');
        const posts: BlogPost[] = response.data.posts || [];

        setStats({
          totalPosts: posts.length,
          publishedPosts: posts.filter((p: BlogPost) => p.published).length,
          draftPosts: posts.filter((p: BlogPost) => !p.published).length
        });
      } catch (error) {
        console.error('Veriler yüklenemedi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/admin/login');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc', // Daha yumuşak bir gri arka plan
      fontFamily: '"Inter", system-ui, sans-serif',
      color: '#1e293b'
    }}>
      {/* Modern Header */}
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ backgroundColor: '#4f46e5', padding: '0.5rem', borderRadius: '8px' }}>
              <LayoutDashboard size={24} color="white" />
            </div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0, color: '#0f172a' }}>
              Yönetim Paneli
            </h1>
          </div>

          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ textAlign: 'right', display: 'none', md: 'block' } as any}>
                <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{user.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Yönetici</div>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
              >
                <LogOut size={18} />
                <span>Çıkış</span>
              </button>
            </div>
          )}
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 2rem' }}>

        {/* Karşılama Alanı */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
            Hoş geldin, {user?.name.split(' ')[0]} 👋
          </h2>
          <p style={{ color: '#64748b', margin: 0 }}>İşte sitendeki son durum ve hızlı işlemler.</p>
        </div>

        {/* İstatistik Kartları - Temiz ve Modern */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {[
            { label: 'Toplam Yazı', value: stats.totalPosts, color: '#4f46e5', icon: <FileText size={20} /> },
            { label: 'Yayınlananlar', value: stats.publishedPosts, color: '#10b981', icon: <PlusCircle size={20} /> },
            { label: 'Taslaklar', value: stats.draftPosts, color: '#f59e0b', icon: <Settings size={20} /> }
          ].map((item, index) => (
            <div key={index} style={{
              backgroundColor: '#ffffff',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: '500' }}>{item.label}</div>
                <div style={{ color: item.color, backgroundColor: `${item.color}15`, padding: '0.5rem', borderRadius: '8px' }}>
                  {item.icon}
                </div>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a' }}>
                {loading ? '...' : item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Hızlı Menü - Sade Kart Tasarımı */}
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.25rem' }}>Hızlı Menü</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem'
          }}>
            {[
              { title: 'Blog Yönetimi', path: '/admin/blog', icon: <FileText size={20} />, desc: 'Yazıları düzenle ve ekle' },
              { title: 'Hizmetler', path: '/admin/hizmetler', icon: <Settings size={20} />, desc: 'Verilen hizmetleri yönet' },
              { title: 'Yorumlar', path: '/admin/yorumlar', icon: <MessageSquare size={20} />, desc: 'Geri bildirimleri incele' },
              { title: 'Sık Sorulan Sorular', path: '/admin/sss', icon: <FileText size={20} />, desc: 'SSS ekle ve düzenle' },
            ].map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1.25rem',
                  backgroundColor: '#ffffff',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  transition: 'transform 0.2s, border-color 0.2s',
                  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#4f46e5';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  backgroundColor: '#f1f5f9',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  marginRight: '1rem',
                  color: '#4f46e5'
                }}>
                  {link.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '1rem' }}>{link.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{link.desc}</div>
                </div>
                <ChevronRight size={18} color="#cbd5e1" />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;