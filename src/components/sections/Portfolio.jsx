"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ExternalLink } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";

const Portfolio = ({ projects = [] }) => {
  const ref = useRef(null);
  const orbitRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isOrbitInView = useInView(orbitRef, { margin: "200px 0px" });
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = useMemo(() => {
    return ["All", ...new Set(projects.map((p) => p.category).filter(Boolean))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);
  }, [activeFilter, projects]);

  const orbitProjects = useMemo(
    () => filteredProjects.slice(0, 5),
    [filteredProjects],
  );

  useEffect(() => {
    const orbitStage = orbitRef.current;
    if (!orbitStage) return undefined;

    let resumeTimer;
    const pauseOrbitDuringScroll = () => {
      orbitStage.classList.add("is-scrolling");
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        orbitStage.classList.remove("is-scrolling");
      }, 220);
    };

    window.addEventListener("scroll", pauseOrbitDuringScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", pauseOrbitDuringScroll);
      window.clearTimeout(resumeTimer);
    };
  }, [projects.length]);

  const colors = [
    "from-blue-500 to-indigo-600",
    "from-green-500 to-emerald-600",
    "from-purple-500 to-violet-600",
    "from-orange-500 to-red-600",
    "from-cyan-500 to-blue-600",
    "from-pink-500 to-rose-600",
  ];

  const orbitColors = [
    "96, 165, 250",
    "167, 139, 250",
    "244, 114, 182",
    "251, 146, 60",
    "45, 212, 191",
    "129, 140, 248",
    "52, 211, 153",
    "250, 204, 21",
  ];

  return (
    <section ref={ref} className="premium-section premium-section--tint">
      <div className="container-custom">
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
          <>
            <motion.div
              ref={orbitRef}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2 }}
              className={`project-orbit-stage ${isOrbitInView ? "is-orbit-visible" : ""}`}
              aria-label="Selected projects showcase"
            >
              <div className="project-orbit-glow" aria-hidden="true" />
              <div
                className="project-orbit"
                style={{ "--quantity": orbitProjects.length }}
              >
                {orbitProjects.map((project, index) => (
                  <Link
                    href={`/portfolio/${project.slug}`}
                    key={`orbit-${project.id}`}
                    className="project-orbit-card"
                    style={{
                      "--index": index,
                      "--color-card": orbitColors[index % orbitColors.length],
                    }}
                    aria-label={`View ${project.title} project`}
                  >
                    {project.image ? (
                      <OptimizedImage
                        src={project.image}
                        alt=""
                        fill
                        sizes="(max-width: 767px) 72vw, 190px"
                        className="object-cover"
                        loading="lazy"
                        priority={false}
                        quality="auto"
                      />
                    ) : (
                      <div className={`project-orbit-placeholder bg-gradient-to-br ${colors[index % colors.length]}`}>
                        {project.title.charAt(0)}
                      </div>
                    )}
                    <span className="project-orbit-shade" />
                    <span className="project-orbit-meta">
                      <small>{project.category || "Project"}</small>
                      <strong>{project.title}</strong>
                      <span>View case study <ArrowUpRight /></span>
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>

            {categories.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-2 mb-8"
                aria-label="Filter projects"
              >
                {categories.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    aria-pressed={activeFilter === filter}
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

          <div className="home-project-grid">
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
                    className="home-project-card-wrap"
                    style={{ "--home-project-accent": orbitColors[index % orbitColors.length] }}
                  >
                    <article className="home-project-card">
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className={`home-project-card__media ${project.image ? "" : `bg-gradient-to-br ${color}`}`}
                        aria-label={`View ${project.title} case study`}
                      >
                        {project.image ? (
                          <OptimizedImage
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="home-project-card__image"
                            loading="lazy"
                            priority={false}
                            quality="auto"
                          />
                        ) : (
                          <span className="home-project-card__placeholder">
                            {project.title.charAt(0)}
                          </span>
                        )}

                        <span className="home-project-card__shade" aria-hidden="true" />
                        <span className="home-project-card__topline">
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          <span>{year}</span>
                        </span>
                        <span className="home-project-card__open">
                          <ArrowUpRight aria-hidden="true" />
                        </span>
                      </Link>

                      <div className="home-project-card__body">
                        <div className="home-project-card__meta">
                          <span>{project.category || "Featured project"}</span>
                          {project.client && <small>{project.client}</small>}
                        </div>

                        <Link href={`/portfolio/${project.slug}`}>
                          <h3>{project.title}</h3>
                          <p>{project.description}</p>
                        </Link>

                        <div className="home-project-card__footer">
                          <div className="home-project-card__tech">
                            {project.technologies?.slice(0, 3).map((tag) => (
                              <span key={tag}>{tag}</span>
                            ))}
                            {project.technologies?.length > 3 && (
                              <span>+{project.technologies.length - 3}</span>
                            )}
                          </div>

                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="home-project-card__live"
                            >
                              Live site
                              <ExternalLink aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          </>
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
