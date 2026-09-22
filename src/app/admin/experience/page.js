"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminExperience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });

  const fetchExperiences = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/experience');
      setExperiences(res.data);
    } catch (error) {
      console.error('Failed to fetch experiences', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:5000/api/experience/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchExperiences();
    } catch (error) {
      alert('Failed to delete experience');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post('http://localhost:5000/api/experience', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({
        title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: ''
      });
      fetchExperiences();
    } catch (error) {
      alert('Failed to add experience');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white uppercase tracking-wider mb-8">Manage Experience</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Add Experience Form */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-black border border-white/10 p-6 rounded-xl space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Add Timeline Item</h3>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Job Title / Degree</label>
              <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Company / Institution</label>
              <input required type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded px-4 py-2 text-white" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Start Date</label>
                <input type="text" placeholder="e.g. 2021" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">End Date</label>
                <input type="text" placeholder="e.g. 2023 or Present" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} disabled={formData.current} className="w-full bg-[#111] border border-white/10 rounded px-4 py-2 text-white disabled:opacity-50" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="current" checked={formData.current} onChange={e => setFormData({...formData, current: e.target.checked})} />
              <label htmlFor="current" className="text-sm text-gray-400">I currently work here</label>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded px-4 py-2 text-white"></textarea>
            </div>
            <button type="submit" className="w-full py-2 mt-4 bg-[#D32F2F] text-white font-bold rounded uppercase flex justify-center items-center gap-2">
              <Plus size={16} /> Add Item
            </button>
          </form>
        </div>

        {/* Experience List */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? <p className="text-white">Loading...</p> : (
            experiences.length === 0 ? <p className="text-gray-500">No experience items added yet.</p> :
            experiences.map(exp => (
              <div key={exp._id} className="bg-black border border-white/10 p-6 rounded-xl flex justify-between items-start group">
                <div>
                  <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                  <p className="text-[#D32F2F] font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-400 mt-1">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  <p className="text-gray-300 mt-4 text-sm">{exp.description}</p>
                </div>
                <button onClick={() => handleDelete(exp._id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
