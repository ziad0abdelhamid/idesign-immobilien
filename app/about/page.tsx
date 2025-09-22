"use client";

import { useEffect, useState } from "react";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  photo: string;
  linkedin?: string;
  email?: string;
}

export default function MeetOurTeam() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data: TeamMember[] = [
      {
        id: "1",
        name: "John Doe",
        position: "CEO",
        bio: "John leads the company with 20 years of experience in real estate.",
        photo: "/team-1.jpg",
        linkedin: "https://linkedin.com/in/johndoe",
        email: "john@example.com",
      },
      {
        id: "2",
        name: "Jane Smith",
        position: "COO",
        bio: "Jane manages operations and ensures smooth workflow across teams.",
        photo: "/team-1.jpg",
        linkedin: "https://linkedin.com/in/janesmith",
        email: "jane@example.com",
      },
      {
        id: "3",
        name: "Mark Wilson",
        position: "Head of Marketing",
        bio: "Mark drives marketing strategy and brand growth for the company.",
        photo: "/team-1.jpg",
        email: "mark@example.com",
      },
      {
        id: "4",
        name: "Emily Brown",
        position: "Lead Designer",
        bio: "Emily creates beautiful and user-friendly designs for our projects.",
        photo: "/team-1.jpg",
      },
    ];

    setTeam(data);
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  const cardVariant: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
    },
  };

  return (
    <div className="w-full flex flex-col">
      {/* Full-width Intro Section */}
      <section className="relative w-full h-[50vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-700 opacity-90"></div>
        <Image
          src="/team-bg.jpg"
          alt="Team Background"
          fill
          className="object-cover mix-blend-overlay opacity-40"
        />
        <div className="relative z-10 max-w-4xl px-6 text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Meet Our Team
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed drop-shadow-md">
            Our team is composed of dedicated professionals with extensive expertise in real estate.
            We combine knowledge, creativity, and strategy to deliver exceptional results for buyers, 
            sellers, and investors alike. Each member is committed to excellence, innovation, and 
            providing a premium client experience.
          </p>
        </div>
      </section>

      {/* Team Member Cards */}
      {team.map((member, idx) => (
        <motion.div
          key={member.id}
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full h-[90vh] flex flex-col md:flex-row overflow-hidden mb-20 rounded-2xl border-2 border-gray-200 shadow-lg"
        >
          {/* Image Half */}
          <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-gray-200 group">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover transform transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>

            {/* Floating social icons */}
            <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-3xl hover:text-blue-400 transition-colors duration-300"
                >
                  <FaLinkedin />
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="text-white text-3xl hover:text-yellow-400 transition-colors duration-300"
                >
                  <FaEnvelope />
                </a>
              )}
            </div>
          </div>

          {/* Info Half */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center p-12 bg-white border-t-2 md:border-t-0 md:border-l-2 border-gray-200">
            <h2 className="text-5xl font-bold mb-4">{member.name}</h2>
            <p className="text-2xl text-blue-600 font-medium mb-6">{member.position}</p>
            <p className="text-gray-700 text-xl leading-relaxed">{member.bio}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
