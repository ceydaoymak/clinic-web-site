import AdminAyarlar from './pages/admin/AdminSettings';
        <Route
          path="/admin/ayarlar"
          element={
            <ProtectedRoute>
              <AdminAyarlar />
            </ProtectedRoute>
          }
        />
import AdminServiceNew from './pages/admin/AdminServiceNew';
import AdminServices from './pages/admin/AdminServices';
import AdminMedia from './pages/admin/AdminMedia';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBlog from './pages/admin/AdminBlog';
import AdminBlogEdit from './pages/admin/AdminBlogEdit';
import ProtectedRoute from './components/ProtectedRoute';
import AdminComments from './pages/admin/AdminComments';
import AdminFAQ from './pages/admin/AdminFAQ';
import FAQPage from './pages/FAQ';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="hakkinda" element={<About />} />
        <Route path="hizmetler" element={<Services />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogDetail />} />
        <Route path="iletisim" element={<Contact />} />
        <Route path="sss" element={<FAQPage />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/blog"
        element={
          <ProtectedRoute>
            <AdminBlog />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/blog/yeni"
        element={
          <ProtectedRoute>
            <AdminBlogEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/blog/:id"
        element={
          <ProtectedRoute>
            <AdminBlogEdit />
          </ProtectedRoute>
        }
      />
        <Route
          path="/admin/yorumlar"
          element={
            <ProtectedRoute>
              <AdminComments/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/hizmetler"
          element={
            <ProtectedRoute>
              <AdminServices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/hizmetler/yeni"
          element={
            <ProtectedRoute>
              <AdminServiceNew />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/medya"
          element={
            <ProtectedRoute>
              <AdminMedia />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/sss"
          element={
            <ProtectedRoute>
              <AdminFAQ />
            </ProtectedRoute>
          }
        />
    </Routes>
  );
}

export default App;

