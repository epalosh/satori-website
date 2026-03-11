"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function LogoStrip() {
  return (
    <section style={{ backgroundColor: "transparent", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a" }} className="py-8 px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-8"
      >
        <p className="font-label font-medium uppercase" style={{ color: "#444444" }}>
          Trusted by manufacturing teams
        </p>
        <div className="flex items-center gap-10">
          <Image src="/snowflake-logo.svg" alt="Snowflake" width={100} height={24} style={{ opacity: 0.4, filter: "brightness(2)" }} />
          <Image src="/databricks-logo.svg" alt="Databricks" width={100} height={24} style={{ opacity: 0.4, filter: "brightness(2)" }} />
        </div>
      </motion.div>
    </section>
  );
}
