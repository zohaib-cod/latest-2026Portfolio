import Experience3D from '@/components/canvas/Experience3D';
import axios from 'axios';

export const revalidate = 60;

async function getPortfolioData() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  
  const fetchEndpoint = async (endpoint, defaultValue) => {
    try {
      const res = await axios.get(`${API_URL}${endpoint}`);
      return res.data;
    } catch (error) {
      return defaultValue;
    }
  };

  const [profile, skills, projects, experience] = await Promise.all([
    fetchEndpoint('/api/profile', {}),
    fetchEndpoint('/api/skills', []),
    fetchEndpoint('/api/projects', []),
    fetchEndpoint('/api/experience', [])
  ]);

  return { profile, skills, projects, experience };
}

export default async function Home() {
  const data = await getPortfolioData();
  
  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      <Experience3D data={data} />
    </div>
  );
}
