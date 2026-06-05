"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const Portfolio = ({ projects = [] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = useMemo(() => {
    return ["All", ...new Set(projects.map((p) => p.category).filter(Boolean))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);
  }, [activeFilter, projects]);

  const colors = [
    "from-blue-500 to-indigo-600",
    "from-green-500 to-emerald-600",
    "from-purple-500 to-violet-600",
    "from-orange-500 to-red-600",
    "from-cyan-500 to-blue-600",
    "from-pink-500 to-rose-600",
  ];

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 rounded-full mb-4"
            >
              <span className="text-sm font-medium text-primary-700">
                Our Work
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white"
            >
              Featured Projects
            </motion.h2>
          </div>

          {categories.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {categories.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    activeFilter === filter
                      ? "bg-primary-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              No featured projects yet. Add some from the admin panel!
            </p>
            <Link href="/portfolio">
              <button className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors">
                View All Projects
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <AnimatePresence mode="sync">
              {filteredProjects.map((project, index) => {
                const color = colors[index % colors.length];
                const year = project.createdAt
                  ? new Date(project.createdAt).getFullYear()
                  : new Date().getFullYear();

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.05 }}
                  >
                    <Link href={`/portfolio/${project.slug}`}>
                      <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-large transition-all duration-300">
                        <div
                          className={`h-64 ${project.image ? "bg-gray-100 dark:bg-gray-800" : `bg-gradient-to-br ${color}`} relative overflow-hidden flex items-center justify-center`}
                        >
                          {project.image ? (
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-contain"
                            />
                          ) : (
                            <>
                              <div className="absolute inset-0 bg-black/10" />
                              <span className="text-white/30 text-6xl font-bold relative z-10">
                                {project.title.charAt(0)}
                              </span>
                            </>
                          )}

                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                              <ArrowUpRight className="w-6 h-6 text-gray-900" />
                            </div>
                          </div>

                          <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                            {year}
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-medium text-primary-600 bg-primary-50 dark:bg-primary-900/30 px-2.5 py-1 rounded-full">
                              {project.category}
                            </span>
                            {project.client && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {project.client}
                              </span>
                            )}
                          </div>

                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                            {project.title}
                          </h3>

                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                            {project.description}
                          </p>

                          {project.technologies?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {project.technologies
                                .slice(0, 3)
                                .map((tag, i) => (
                                  <span
                                    key={i}
                                    className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              {project.technologies.length > 3 && (
                                <span className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                                  +{project.technologies.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link href="/portfolio">
              <button className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-primary-600 text-white font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-primary-700 transition-all">
                View All Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
