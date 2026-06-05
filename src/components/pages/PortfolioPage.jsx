"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Expand } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import ImageLightbox from "@/components/ui/ImageLightbox";

const PortfolioPage = ({ projects = [] }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = useMemo(() => {
    return ["All", ...new Set(projects.map((p) => p.category).filter(Boolean))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);
  }, [activeFilter, projects]);

  const openImageLightbox = (e, project) => {
    e.preventDefault();
    e.stopPropagation();
    const images = [];
    if (project.image) images.push(project.image);
    if (project.gallery && Array.isArray(project.gallery)) {
      images.push(...project.gallery);
    }
    if (images.length > 0) {
      setLightboxImages(images);
      setLightboxIndex(0);
      setLightboxOpen(true);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45 },
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageHeader
        badge="Our Portfolio"
        title="Projects That"
        titleHighlight="Speak for Themselves"
        description="Explore our collection of successful projects. Each one represents our commitment to excellence and our clients' trust in our capabilities."
      />

      <section className="py-8 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 sticky top-18 z-30 backdrop-blur-md bg-white/90 dark:bg-gray-950/90">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all ${
                  activeFilter === filter
                    ? "bg-primary-600 text-white shadow-lg shadow-primary-600/25"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No projects found. Add some from the admin panel!
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => {
                  const colors = [
                    "from-blue-500 to-indigo-600",
                    "from-green-500 to-emerald-600",
                    "from-purple-500 to-violet-600",
                    "from-orange-500 to-red-600",
                    "from-cyan-500 to-blue-600",
                    "from-pink-500 to-rose-600",
                  ];
                  const color = colors[index % colors.length];
                  const year = project.createdAt
                    ? new Date(project.createdAt).getFullYear()
                    : "N/A";

                  return (
                    <motion.div
                      key={project.id}
                      variants={itemVariants}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-large transition-all h-full">
                        <div
                          className={`h-56 ${project.image ? "bg-gray-100 dark:bg-gray-800" : `bg-gradient-to-br ${color}`} relative overflow-hidden flex items-center justify-center`}
                        >
                          {project.image ? (
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-contain"
                            />
                          ) : (
                            <>
                              <div className="absolute inset-0 bg-black/10" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white/20 text-8xl font-bold">
                                  {project.title.charAt(0)}
                                </span>
                              </div>
                            </>
                          )}

                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <Link href={`/portfolio/${project.slug}`}>
                              <motion.div
                                initial={{ scale: 0 }}
                                whileHover={{ scale: 1.1 }}
                                className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
                              >
                                <ArrowUpRight className="w-5 h-5 text-gray-900" />
                              </motion.div>
                            </Link>
                            {project.image && (
                              <motion.button
                                onClick={(e) => openImageLightbox(e, project)}
                                initial={{ scale: 0 }}
                                whileHover={{ scale: 1.1 }}
                                className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
                              >
                                <Expand className="w-5 h-5 text-gray-900" />
                              </motion.button>
                            )}
                          </div>

                          <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                            {year}
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
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
                                    className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              {project.technologies.length > 3 && (
                                <span className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg">
                                  +{project.technologies.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <ImageLightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      <section className="py-20 lg:py-28 bg-primary-600">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Have a Project in Mind?
            </h2>
            <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">
              Let&apos;s create something amazing together. Share your vision
              and we&apos;ll bring it to life.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-600 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <span>Start Your Project</span>
                <ExternalLink className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
