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

export default function AboutUs() {
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
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/team-bg.jpg"
          alt="About Us Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-700/80"></div>
        <div className="relative z-10 max-w-4xl px-4 sm:px-6 text-white">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            About Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-md">
            We are a team of passionate professionals redefining real estate
            through creativity, innovation, and client-focused solutions.
          </p>
        </div>
      </section>

      {/* Company Story / Mission */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          Our Mission
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
          Our mission is to deliver outstanding real estate services by combining
          market expertise, creative marketing, and a personalized approach.
          We believe in building long-term relationships with clients through
          trust, transparency, and exceptional results.
        </p>
      </section>
{/* Team Section */}
<section className="px-4 sm:px-6 py-12 sm:py-20 bg-gray-50">
  <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-12 text-gray-900">
    Meet Our Team
  </h2>
  <div className="flex flex-col gap-16">
    {team.map((member) => (
      <motion.div
        key={member.id}
        variants={cardVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col md:flex-row w-full overflow-hidden rounded-2xl border border-gray-200 shadow-lg"
      >
        {/* Image */}
        <div className="relative w-full md:w-1/2 bg-black flex items-center justify-center p-4">
          <Image
            src={member.photo}
            alt={member.name}
            width={600}
            height={800}
            className="max-h-[90vh] w-auto object-contain rounded-lg"
          />
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 sm:p-14 bg-white">
          <h3 className="text-3xl sm:text-4xl font-bold mb-3">
            {member.name}
          </h3>
          <p className="text-xl sm:text-2xl text-blue-600 font-medium mb-6">
            {member.position}
          </p>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed">
            {member.bio}
          </p>
        </div>
      </motion.div>
    ))}
  </div>
</section>

    </div>
  );
}
