import { useEffect, useState } from 'react';
import api from '../../config/api';
import { uploadMedia } from '../../services/media.service';

const AdminSettings = () => {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [heroPhoto, setHeroPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/ayarlar');
      setProfilePhoto(res.data.profilePhotoUrl || null);
      setHeroPhoto(res.data.heroPhotoUrl || null);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'hero') => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const url = await uploadMedia(file);
    if (type === 'profile') setProfilePhoto(url);
    else setHeroPhoto(url);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/ayarlar', {
        profilePhotoUrl: profilePhoto,
        heroPhotoUrl: heroPhoto,
      });
      alert('Ayarlar kaydedildi!');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Site Ayarları</h1>
      <div className="mb-6">
        <label className="block font-semibold mb-2">Profil Fotoğrafı</label>
        {profilePhoto && <img src={profilePhoto} alt="Profil" className="w-32 h-32 object-cover rounded-full mb-2" />}
        <input type="file" accept="image/*" onChange={e => handlePhotoChange(e, 'profile')} />
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-2">Hero Fotoğrafı</label>
        {heroPhoto && <img src={heroPhoto} alt="Hero" className="w-full max-w-md h-40 object-cover rounded mb-2" />}
        <input type="file" accept="image/*" onChange={e => handlePhotoChange(e, 'hero')} />
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className="px-6 py-2 bg-indigo-600 text-white rounded font-semibold disabled:opacity-50"
      >
        {saving ? 'Kaydediliyor...' : 'Kaydet'}
      </button>
    </div>
  );
};

export default AdminSettings;
