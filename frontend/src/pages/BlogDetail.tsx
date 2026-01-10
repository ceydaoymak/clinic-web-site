import { getBackendUrl } from '../config/api';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../config/api';
import { BlogPost } from '../types';
import { format } from 'date-fns';

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/blog/${slug}`);
        setPost(response.data);
      } catch (error) {
        console.error('Failed to fetch blog post:', error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="section-padding">
        <div className="container-custom text-center">
          <p className="text-gray-600">Yazı yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="section-padding">
        <div className="container-custom text-center">
          <h1 className="text-2xl font-bold mb-4">Yazı Bulunamadı</h1>
          <Link to="/blog" className="text-primary-600 hover:underline">
            Bloga Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <article className="section-padding">
        <div className="container-custom max-w-4xl">
          <Link
            to="/blog"
            className="text-primary-600 hover:text-primary-700 mb-6 inline-block"
          >
            ← Bloga Geri Dön
          </Link>

          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            {post.excerpt && (
              <p className="text-xl text-gray-600 mb-4">{post.excerpt}</p>
            )}
            <div className="flex items-center text-gray-500 text-sm">
              {post.publishedAt && (
                <time dateTime={post.publishedAt}>
                  {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                </time>
              )}
              {post.author && (
                <>
                  <span className="mx-2">•</span>
                  <span>By {post.author.name}</span>
                </>
              )}
            </div>
          </header>

          {post.coverImage && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={getBackendUrl(post.coverImage)}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          <div
            className="prose prose-base md:prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;

