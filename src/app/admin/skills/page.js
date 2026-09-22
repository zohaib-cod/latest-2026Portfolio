"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    level: '',
    icon: ''
  });

  const fetchSkills = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/skills`);
      setSkills(res.data);
    } catch (error) {
      console.error('Failed to fetch skills', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/skills/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSkills();
    } catch (error) {
      alert('Failed to delete skill');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/skills`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({ name: '', level: '', icon: '' });
      fetchSkills();
    } catch (error) {
      alert('Failed to add skill');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white uppercase tracking-wider mb-8">Manage Skills</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Add Skill Form */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-black border border-white/10 p-6 rounded-xl space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Add New Skill</h3>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Skill Name</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded px-4 py-2 text-white" placeholder="e.g. React.js" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Proficiency Level</label>
              <input required type="text" value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded px-4 py-2 text-white" placeholder="e.g. Expert" />
            </div>
            <button type="submit" className="w-full py-2 mt-4 bg-[#D32F2F] text-white font-bold rounded uppercase flex justify-center items-center gap-2">
              <Plus size={16} /> Add Skill
            </button>
          </form>
        </div>

        {/* Skills List */}
        <div className="lg:col-span-2">
          {loading ? <p className="text-white">Loading...</p> : (
            <div className="bg-black border border-white/10 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="p-4 text-gray-400 font-medium text-sm">Name</th>
                    <th className="p-4 text-gray-400 font-medium text-sm">Level</th>
                    <th className="p-4 text-gray-400 font-medium text-sm w-20">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {skills.map(skill => (
                    <tr key={skill._id} className="border-b border-white/5">
                      <td className="p-4 text-white font-bold">{skill.name}</td>
                      <td className="p-4 text-[#D32F2F]">{skill.level}</td>
                      <td className="p-4">
                        <button onClick={() => handleDelete(skill._id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {skills.length === 0 && (
                    <tr>
                      <td colSpan="3" className="p-8 text-center text-gray-500">No skills added yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
