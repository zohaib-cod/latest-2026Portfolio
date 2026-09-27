"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    secondaryTitle: '',
    location: '',
    bio: '',
    email: '',
    github: '',
    linkedin: '',
    twitter: '',
    profileImage: '',
    coverImage: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingProfileImg, setUploadingProfileImg] = useState(false);
  const [uploadingCoverImg, setUploadingCoverImg] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/profile`);
        if (res.data) setProfile(res.data);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/profile`, profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem('adminToken');
    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      if (type === 'profile') setUploadingProfileImg(true);
      if (type === 'cover') setUploadingCoverImg(true);

      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/upload`, uploadData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (type === 'profile') setProfile(prev => ({...prev, profileImage: res.data.url}));
      if (type === 'cover') setProfile(prev => ({...prev, coverImage: res.data.url}));

    } catch (error) {
      console.error('Image upload failed', error);
      alert(`Failed to upload image: ${error.response?.data?.error || error.response?.data?.message || error.message}`);
    } finally {
      if (type === 'profile') setUploadingProfileImg(false);
      if (type === 'cover') setUploadingCoverImg(false);
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-white uppercase tracking-wider mb-8">Profile Settings</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-black border border-white/10 p-8 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Full Name</label>
            <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-white" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Primary Title</label>
            <input type="text" value={profile.title} onChange={e => setProfile({...profile, title: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-white" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Secondary Title</label>
            <input type="text" value={profile.secondaryTitle} onChange={e => setProfile({...profile, secondaryTitle: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-white" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Location</label>
            <input type="text" value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Profile Image URL or Upload</label>
            <div className="flex gap-2">
              <input type="text" placeholder="Paste image link here" value={profile.profileImage || ''} onChange={e => setProfile({...profile, profileImage: e.target.value})} className="flex-1 bg-[#111] border border-white/10 rounded px-4 py-3 text-white" />
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'profile')} className="hidden" id="profileImageUpload" />
              <label htmlFor="profileImageUpload" className="px-4 py-2 bg-gray-800 text-white rounded cursor-pointer hover:bg-gray-700 flex items-center justify-center">
                {uploadingProfileImg ? 'Uploading...' : 'Upload from File/Gallery'}
              </label>
            </div>
            {profile.profileImage && (
              <div className="mt-2">
                <img src={profile.profileImage} alt="Profile" className="h-20 w-auto rounded border border-white/10" />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Cover Image URL or Upload</label>
            <div className="flex gap-2">
              <input type="text" placeholder="Paste image link here" value={profile.coverImage || ''} onChange={e => setProfile({...profile, coverImage: e.target.value})} className="flex-1 bg-[#111] border border-white/10 rounded px-4 py-3 text-white" />
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'cover')} className="hidden" id="coverImageUpload" />
              <label htmlFor="coverImageUpload" className="px-4 py-2 bg-gray-800 text-white rounded cursor-pointer hover:bg-gray-700 flex items-center justify-center">
                {uploadingCoverImg ? 'Uploading...' : 'Upload from File/Gallery'}
              </label>
            </div>
            {profile.coverImage && (
              <div className="mt-2">
                <img src={profile.coverImage} alt="Cover" className="h-20 w-auto rounded border border-white/10" />
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Bio</label>
          <textarea rows={5} value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-white"></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Contact Email</label>
            <input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-white" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">GitHub URL</label>
            <input type="text" value={profile.github} onChange={e => setProfile({...profile, github: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-white" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">LinkedIn URL</label>
            <input type="text" value={profile.linkedin} onChange={e => setProfile({...profile, linkedin: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-white" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Twitter URL</label>
            <input type="text" value={profile.twitter} onChange={e => setProfile({...profile, twitter: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-white" />
          </div>
        </div>

        <div className="pt-6">
          <button type="submit" disabled={saving} className="px-8 py-3 bg-[#D32F2F] text-white font-bold rounded uppercase tracking-wider hover:bg-red-700 transition-colors">
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}
