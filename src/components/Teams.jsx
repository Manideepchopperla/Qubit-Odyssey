import React from 'react';

const Teams = () => {
  const teamMembers = [
    {
      id: 1,
      name: "G Bhanu Chandhar",
      role: "Project Lead",
      email: "rs200527@rguktsklm.ac.in",
      phone: "+91 9573619315",
      profilePic: "https://res.cloudinary.com/dyvplq8wl/image/upload/v1753540617/default_photo_v9vclk.jpg",
      isProjectLead: true
    },
    {
      id: 2,
      name: "K Karishma",
      role: "Backend Developer",
      email: "rs200545@rguktsklm.ac.in",
      profilePic: "https://res.cloudinary.com/dyvplq8wl/image/upload/v1753540617/default_photo_v9vclk.jpg",
      isGirl: true
    },
    {
      id: 3,
      name: "R Madhu Simhanadh",
      role: "Backend Developer",
      email: "rs200168@rguktsklm.ac.in",
      profilePic: "https://res.cloudinary.com/dyvplq8wl/image/upload/v1753540617/default_photo_v9vclk.jpg"
    },
    {
      id: 4,
      name: "Ch Manideep",
      role: "Frontend Developer",
      email: "rs200456@rguktsklm.ac.in",
      profilePic: "https://res.cloudinary.com/dyvplq8wl/image/upload/v1753540617/default_photo_v9vclk.jpg",
    },
    {
      id: 5,
      name: "S Shyam",
      role: "Frontend Developer",
      email: "rs200102@rguktsklm.ac.in",
      profilePic: "https://res.cloudinary.com/dyvplq8wl/image/upload/v1753540617/default_photo_v9vclk.jpg",
    },
    {
      id: 6,
      name: "R Siddhi Vinayaka",
      role: "Frontend Developer",
      email: "rs200551@rguktsklm.ac.in",
      profilePic: "https://res.cloudinary.com/dyvplq8wl/image/upload/v1753540617/default_photo_v9vclk.jpg",
    }
  ];

  const MemberCard = ({ member }) => (
    <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 shadow-xl shadow-cyan-500/5 hover:shadow-cyan-500/20 transition-all duration-500 hover:-translate-y-2">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-xl shadow-cyan-500/20 group-hover:border-cyan-400/50 transition-all duration-300">
              <img
                src={member.profilePic}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0891b2&color=fff&size=200`;
                }}
              />
            </div>
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-800 animate-pulse"></div>
          </div>
        </div>

        {/* Name and Role */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
            {member.name}
          </h3>
          <p className={`text-sm font-medium mt-1 ${
            member.isProjectLead 
              ? 'text-yellow-400' 
              : member.role.includes('Backend') 
                ? 'text-emerald-400' 
                : member.role.includes('Frontend') 
                  ? 'text-blue-400' 
                  : 'text-purple-400'
          }`}>
            {member.role}
          </p>
        </div>

        {/* Contact Info - Now Center Aligned */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
            <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
            <span className="truncate text-center">{member.email}</span>
          </div>
          
          {member.phone && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
              <span className="text-center">{member.phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              i % 2 === 0 ? 'bg-cyan-400' : 'bg-blue-400'
            } opacity-0 group-hover:opacity-60`}
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
              animation: `cardParticleFloat ${2 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23059669%22%20fill-opacity=%220.05%22%3E%3Ccircle%20cx=%227%22%20cy=%227%22%20r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-[length:60px_60px] bg-repeat"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400">
               TEAM SHERBROOKE
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The brilliant minds behind <span className="text-cyan-400 font-semibold">Qubit Odyssey</span> - 
            a passionate team of developers, designers, and innovators working together to push the boundaries of quantum computing.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {teamMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>

        {/* Call to Action */}
        {/* <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to explore the quantum realm with us?
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              Join our journey into the fascinating world of quantum computing and discover the future of technology.
            </p>
            <button 
              onClick={() => window.open('https://github.com/Manideepchopperla/Qubit-Odyssey', '_blank')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
            >
              View Our Project on GitHub
            </button>
          </div>
        </div> */}
      </div>

      <style jsx>{`
        @keyframes cardParticleFloat {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-10px) translateX(5px) scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Teams;