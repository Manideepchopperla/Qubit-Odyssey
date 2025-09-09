import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Atom, Zap, Users } from 'lucide-react';

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

  const MemberCard = ({ member, index }) => (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-gray-900/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 sm:p-8 shadow-xl shadow-purple-500/10 hover:shadow-purple-500/30 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/50"
    >
      {/* Quantum Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Quantum Grid Overlay */}
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500" style={{
        backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }}></div>
      
      <div className="relative z-10">
        {/* Profile Section */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-purple-500/40 shadow-xl shadow-purple-500/30 group-hover:border-cyan-400/60 transition-all duration-500 group-hover:shadow-cyan-400/40">
              <img
                src={member.profilePic}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=a855f7&color=fff&size=200`;
                }}
              />
            </div>
            
            {/* Quantum Status Indicator */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
              <Atom className="w-3 h-3 text-white animate-spin" style={{animationDuration: '4s'}} />
            </div>
          </div>
        </div>

        {/* Name and Role */}
        <div className="text-center mb-6">
          <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-cyan-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 mb-2">
            {member.name}
          </h3>
          <p className={`font-rajdhani text-sm sm:text-base font-semibold tracking-wide ${
            member.isProjectLead 
              ? 'text-yellow-400' 
              : member.role.includes('Backend') 
                ? 'text-purple-400' 
                : member.role.includes('Frontend') 
                  ? 'text-cyan-400' 
                  : 'text-pink-400'
          }`}>
            {member.role}
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-3 text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/40 transition-all duration-300">
              <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>
            <span className="font-rajdhani text-center truncate max-w-[200px]">{member.email}</span>
          </div>
          
          {member.phone && (
            <div className="flex items-center justify-center gap-3 text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/40 transition-all duration-300">
                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
              </div>
              <span className="font-rajdhani text-center">{member.phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Floating Quantum Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-80 ${
              i % 3 === 0 ? 'bg-purple-400' : 
              i % 3 === 1 ? 'bg-cyan-400' : 'bg-pink-400'
            }`}
            style={{
              left: `${15 + i * 25}%`,
              top: `${15 + i * 20}%`,
              animation: `quantumParticleFloat ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Quantum Formulas */}
      <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
        <div className="font-mono text-purple-400 text-xs">|ψ⟩</div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Quantum Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Quantum Grid */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Quantum Gradients */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-cyan-900/10"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-pink-900/10 via-transparent to-purple-900/10"></div>
        
        {/* Floating Quantum Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full opacity-40 ${
              i % 4 === 0 ? 'bg-purple-400' : 
              i % 4 === 1 ? 'bg-cyan-400' : 
              i % 4 === 2 ? 'bg-pink-400' : 'bg-blue-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `quantumFloat ${4 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6 mt-10">
            {/* <Atom className="w-8 h-8 text-purple-400 animate-spin" style={{animationDuration: '8s'}} /> */}
            <h1 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wide">
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
                TEAM SHERBROOKE
              </span>
            </h1>
            {/* <Zap className="w-8 h-8 text-cyan-400 animate-pulse" /> */}
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="font-rajdhani text-lg sm:text-xl text-gray-300 leading-relaxed">
              The brilliant minds behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-semibold">Qubit Odyssey</span> - 
              a passionate team of quantum computing pioneers, developers, and innovators.
            </p>
            
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-purple-500"></div>
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
              <div className="w-16 h-px bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500"></div>
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-pink-500"></div>
            </div>
          </div>
        </motion.div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <MemberCard key={member.id} member={member} index={index} />
          ))}
        </div>

        {/* Quantum Team Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 lg:mt-20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="font-orbitron text-3xl lg:text-4xl font-bold text-purple-400 mb-2">6</div>
              <div className="font-rajdhani text-gray-400">Quantum Developers</div>
            </div>
            <div className="text-center">
              <div className="font-orbitron text-3xl lg:text-4xl font-bold text-cyan-400 mb-2">∞</div>
              <div className="font-rajdhani text-gray-400">Innovation Potential</div>
            </div>
            <div className="text-center">
              <div className="font-orbitron text-3xl lg:text-4xl font-bold text-pink-400 mb-2">Q</div>
              <div className="font-rajdhani text-gray-400">Quantum Excellence</div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes quantumParticleFloat {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
            opacity: 0.8;
          }
          33% {
            transform: translateY(-15px) translateX(10px) scale(1.3) rotate(120deg);
            opacity: 1;
          }
          66% {
            transform: translateY(5px) translateX(-8px) scale(0.8) rotate(240deg);
            opacity: 0.6;
          }
        }

        @keyframes quantumFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
            opacity: 0.6;
          }
          25% { 
            transform: translateY(-25px) translateX(15px) scale(1.3) rotate(90deg);
            opacity: 1;
          }
          50% { 
            transform: translateY(10px) translateX(-20px) scale(0.7) rotate(180deg);
            opacity: 0.4;
          }
          75% { 
            transform: translateY(-15px) translateX(10px) scale(1.1) rotate(270deg);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default Teams;