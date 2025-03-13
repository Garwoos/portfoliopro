import React from "react";
import { User, MapPin, Globe, Linkedin, Github, Mail } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6"
import { FileText } from "lucide-react";

interface UserProfileProps {
  user: {
    name: string;
    title: string;
    email: string;
    number: string;
    location?: string;
    languages?: string;
    avatar?: string;
    linkedin?: string;
    github?: string;
    resume?: string;
    bio?: string;
  };
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="min-h-screen bg-[#1e39e5]/10 pt-20 flex justify-center items-center">
      <div className="max-w-3xl w-full px-6 py-8 bg-[#7083A3] rounded-2xl shadow-lg">
        {/* Avatar Section */}
        <div className="relative mx-auto mb-6 h-32 w-32">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-full w-full rounded-full object-cover"
              style={{ pointerEvents: "none" , cursor: "default" }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#1e39e5]/20">
              <User className="h-16 w-16 text-[#1e39e5]" />
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#fffdf5]">{user.name}</h1>
          <p className="text-[#fffdf5]">{user.title}</p>
        </div>

        {/* Biography Section */}
        {user.bio && (
          <div className="mt-4 text-center text-[#fffdf5]">
            <p>{user.bio}</p>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-4 space-y-2 text-[#fffdf5]">
          {user.location && (
            <p className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#fffdf5]" /> {user.location}
            </p>
          )}
          {user.languages && (
            <p className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-[#fffdf5]" /> {user.languages}
            </p>
          )}
        </div>

        {/* Social Links */}
        <div className="mt-6 flex justify-center gap-4">
          {user.linkedin && (
            <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#1e39e5] hover:opacity-80">
              <Linkedin className="h-6 w-6" />
            </a>
          )}
          {user.github && (
            <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-[#04070D] hover:opacity-80">
              <Github className="h-6 w-6" />
            </a>
          )}
          {user.twitter && (
            <a href={user.twitter} target="_blank" rel="noopener noreferrer" className="text-[#04070D] hover:opacity-80">
              <FaXTwitter className="h-6 w-6" />
            </a>
          )}
          {user.email && (
            <a href={`mailto:${user.email}`} className="text-[#04070D] hover:opacity-80">
              <Mail className="h-6 w-6" />
            </a>
          )}
          {user.resume && (
            <a href={user.resume} target="_blank" rel="noopener noreferrer" className="text-[#FF0010] hover:opacity-80">
              <FileText className="h-6 w-6" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}