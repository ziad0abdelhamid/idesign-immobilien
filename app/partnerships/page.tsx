"use client";

import { useEffect, useState } from "react";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

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
        photo: "/team/john.jpg",
        linkedin: "https://linkedin.com/in/johndoe",
        email: "john@example.com",
      },
      {
        id: "2",
        name: "Jane Smith",
        position: "COO",
        bio: "Jane manages operations and ensures smooth workflow across teams.",
        photo: "/team/jane.jpg",
        linkedin: "https://linkedin.com/in/janesmith",
        email: "jane@example.com",
      },
      {
        id: "3",
        name: "Mark Wilson",
        position: "Head of Marketing",
        bio: "Mark drives marketing strategy and brand growth for the company.",
        photo: "/team/mark.jpg",
        email: "mark@example.com",
      },
      {
        id: "4",
        name: "Emily Brown",
        position: "Lead Designer",
        bio: "Emily creates beautiful and user-friendly designs for our projects.",
        photo: "/team/emily.jpg",
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

  return (
    <div className="pt-24 pb-16 max-w-6xl mx-auto px-4">
      <h1 className="text-5xl font-bold text-center mb-4">Meet Our Team</h1>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Our team of dedicated professionals is committed to delivering excellence in every project.
      </p>

      <div className="flex flex-col gap-16">
        {team.map((member, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={member.id}
              className={`flex flex-col md:flex-row ${
                !isEven ? "md:flex-row-reverse" : ""
              } items-center bg-white rounded-xl shadow-lg overflow-hidden transition hover:shadow-2xl cursor-pointer group`}
            >
              {/* Image container with overlay */}
              <div className="relative w-full md:w-1/2 h-80 overflow-hidden">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Floating social icons */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-2xl hover:text-blue-400 transition-colors duration-300"
                    >
                      <FaLinkedin />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-white text-2xl hover:text-yellow-400 transition-colors duration-300"
                    >
                      <FaEnvelope />
                    </a>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="p-6 md:w-1/2 flex flex-col justify-center">
                <h2 className="text-3xl font-semibold mb-2 opacity-80 group-hover:opacity-100 transition-opacity duration-500">{member.name}</h2>
                <p className="text-blue-600 font-medium mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-500">{member.position}</p>
                <p className="text-gray-600 mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-500">{member.bio}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
