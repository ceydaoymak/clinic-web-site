import { getBackendUrl } from '../config/api';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../config/api';
import { Service } from '../types';

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await api.get(`/services/${slug}`);
        setService(response.data);
      } catch (error) {
        console.error('Failed to fetch service:', error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchService();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="section-padding">
        <div className="container-custom text-center">
          <p className="text-gray-600">Hizmet detayları yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="section-padding">
        <div className="container-custom text-center">
          <h1 className="text-2xl font-bold mb-4">Hizmet Bulunamadı</h1>
          <Link to="/hizmetler" className="text-primary-600 hover:underline">
            Hizmetlere Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom">
          <Link
            to="/hizmetler"
            className="text-primary-100 hover:text-white mb-4 inline-block"
          >
            ← Hizmetlere Geri Dön
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          {service.image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={getBackendUrl(service.image)}
                alt={service.title}
                className="w-full h-auto"
              />
            </div>
          )}
          <div className="prose prose-lg max-w-none">
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: service.content }}
            />
          </div>
          <div className="mt-8">
            <Link to="/iletisim" className="btn-primary">
              Randevu Al
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;

