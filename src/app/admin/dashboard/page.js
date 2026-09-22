"use client";

export default function DashboardOverview() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white uppercase tracking-wider mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { title: 'Total Projects', value: '12' },
          { title: 'Skills Listed', value: '24' },
          { title: 'Experience Nodes', value: '5' },
          { title: 'Profile Views', value: '0' },
        ].map((stat) => (
          <div key={stat.title} className="bg-black border border-white/10 p-6 rounded-xl">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">{stat.title}</h3>
            <p className="text-4xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-black border border-white/10 p-8 rounded-xl">
        <h2 className="text-xl font-bold text-white mb-4">Welcome to your Control Panel</h2>
        <p className="text-gray-400 mb-4">
          From here, you can manage all the content displayed on your 3D portfolio. Use the sidebar to navigate to different sections.
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-2">
          <li><strong>Projects:</strong> Add, edit, or delete the projects shown in the interactive gallery.</li>
          <li><strong>Experience:</strong> Manage your timeline of jobs and education.</li>
          <li><strong>Skills:</strong> Update your technical toolkit and proficiency levels.</li>
          <li><strong>Profile:</strong> Change your name, bio, email, and social links.</li>
        </ul>
      </div>
    </div>
  );
}
