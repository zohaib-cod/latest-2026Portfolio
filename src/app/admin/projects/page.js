"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    imageUrl: '',
    githubUrl: '',
    liveUrl: '',
    featured: false
  });

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/projects`);
      setProjects(res.data);
    } catch (error) {
      console.error('Failed to fetch projects', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingId(project._id);
      setFormData({
        title: project.title,
        description: project.description,
        technologies: project.technologies.join(', '),
        imageUrl: project.imageUrl || '',
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
        featured: project.featured || false
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        technologies: '',
        imageUrl: '',
        githubUrl: '',
        liveUrl: '',
        featured: false
      });
    }
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProjects();
    } catch (error) {
      alert('Failed to delete project');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const payload = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim())
      };

      if (editingId) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/projects/${editingId}`, payload, config);
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/projects`, payload, config);
      }
      
      setShowModal(false);
      fetchProjects();
    } catch (error) {
      alert('Failed to save project');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem('adminToken');
    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      setUploadingImage(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/upload`, uploadData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setFormData(prev => ({...prev, imageUrl: res.data.url}));
    } catch (error) {
      console.error('Image upload failed', error);
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white uppercase tracking-wider">Manage Projects</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-[#D32F2F] text-white rounded-lg hover:bg-red-700 transition-colors font-bold uppercase text-sm"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(project => (
            <div key={project._id} className="bg-black border border-white/10 p-6 rounded-xl relative group">
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map(tech => (
                  <span key={tech} className="text-xs bg-white/5 text-gray-300 px-2 py-1 rounded">{tech}</span>
                ))}
              </div>
              
              <div className="flex gap-2">
                <button onClick={() => handleOpenModal(project)} className="p-2 bg-white/10 text-white rounded hover:bg-white/20">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(project._id)} className="p-2 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] border border-white/10 p-8 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6 uppercase">{editingId ? 'Edit Project' : 'New Project'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white"></textarea>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Technologies (comma separated)</label>
                <input required type="text" value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Github URL</label>
                  <input type="text" value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Live URL</label>
                  <input type="text" value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Image URL or Upload File</label>
                <div className="flex gap-2">
                  <input type="text" placeholder="Paste image link here" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="flex-1 bg-black border border-white/10 rounded px-4 py-2 text-white" />
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="imageUpload" />
                  <label htmlFor="imageUpload" className="px-4 py-2 bg-gray-800 text-white rounded cursor-pointer hover:bg-gray-700 flex items-center justify-center">
                    {uploadingImage ? 'Uploading...' : 'Upload File'}
                  </label>
                </div>
                {formData.imageUrl && (
                  <div className="mt-2">
                    <img src={formData.imageUrl} alt="Preview" className="h-20 w-auto rounded border border-white/10" />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="featured" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} />
                <label htmlFor="featured" className="text-sm text-gray-400">Featured Project</label>
              </div>
              
              <div className="flex justify-end gap-4 mt-8">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-[#D32F2F] text-white font-bold rounded">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
