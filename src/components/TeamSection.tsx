"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const founders = [
  {
    name: "Ethan Palosh",
    title: "Co-founder & CTO",
    image: "/ethan_pic.jpeg",
    linkedin: "https://linkedin.com/in/ethanpalosh",
  },
  {
    name: "Arnav Shah",
    title: "Co-founder & CEO",
    image: "/arnav_pic.jpeg",
    linkedin: "https://linkedin.com/in/arnav-ashah",
  },
];

export default function TeamSection() {
  return (
    <section className="py-24 px-6 md:px-10" style={{ backgroundColor: "transparent", }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-label font-medium uppercase mb-3" style={{ color: "#555555" }}>
            Connect with us
          </p>
          <h2 className="font-bold" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "#f2f2f2", letterSpacing: "-0.02em" }}>
            Meet the founding team.
          </h2>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center rounded-xl px-10 py-12 w-full sm:w-64"
              style={{ backgroundColor: "#141414", border: "1px solid #222222", position: "relative", zIndex: 1 }}
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mb-6 flex-shrink-0" style={{ border: "1px solid #2a2a2a" }}>
                <Image src={founder.image} alt={founder.name} width={96} height={96} className="object-cover w-full h-full" style={i === 1 ? { transform: "scale(1.005)" } : undefined} />
              </div>
              <p className="text-base font-bold leading-snug mb-1" style={{ color: "#f2f2f2" }}>{founder.name}</p>
              <p className="text-xs font-medium mb-6" style={{ color: "#555555" }}>{founder.title}</p>
              <div className="flex-1" />
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium rounded-md px-4 py-2 transition-colors"
                style={{ border: "1px solid #2a2a2a", color: "#888888" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.982 1.982 0 1 1 0-3.964 1.982 1.982 0 0 1 0 3.964zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
