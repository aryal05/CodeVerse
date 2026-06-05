"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Expand, ExternalLink } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

// Loaded only when user clicks expand - skips SSR entirely
const ImageLightbox = dynamic(() => import("@/components/ui/ImageLightbox"), {
  ssr: false,
});

const COLORS = [
  "from-blue-500 to-indigo-600",
  "from-green-500 to-emerald-600",
  "from-purple-500 to-violet-600",
  "from-orange-500 to-red-600",
  "from-cyan-500 to-blue-600",
  "from-pink-500 to-rose-600",
];

const ProjectCard = ({ project, index, onExpand }) => {
  const color = COLORS[index % COLORS.length];
  const year = project.createdAt
    ? new Date(project.createdAt).getFullYear()
    : "";

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-xl transition-all duration-200 h-full">
      {/* Image */}
      <div
        className={`h-52 relative overflow-hidden ${project.image ? "bg-gray-100 dark:bg-gray-700" : `bg-gradient-to-br ${color}`}`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
            loading={index < 6 ? "eager" : "lazy"}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/20 text-7xl font-bold select-none">
              {project.title?.charAt(0)}
            </span>
          </div>
        )}

        {/* Hover overlay - pure CSS, no framer-motion */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
          <Link
            href={`/portfolio/${project.slug}`}
            className="w-11 h-11 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
          >
            <ArrowUpRight className="w-5 h-5 text-gray-900" />
          </Link>
          {project.image && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onExpand(project);
              }}
              className="w-11 h-11 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Expand className="w-5 h-5 text-gray-900" />
            </button>
          )}
        </div>

        {year && (
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/30 backdrop-blur-sm rounded-full text-white text-xs font-medium">
            {year}
          </div>
        )}
      </div>

      {/* Content */}
      <Link href={`/portfolio/${project.slug}`} className="block p-5">
        <div className="flex items-center justify-between mb-2">
          {project.category && (
            <span className="text-xs font-medium text-primary-600 bg-primary-50 dark:bg-primary-900/30 px-2.5 py-1 rounded-full">
              {project.category}
            </span>
          )}
          {project.client && (
            <span className="text-xs text-gray-400 dark:text-gray-500 truncate ml-2">
              {project.client}
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1.5 group-hover:text-primary-600 transition-colors line-clamp-1">
          {project.title}
        </h3>

        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-3">
          {project.description}
        </p>

        {project.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
              >
                {tag}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 rounded">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        )}
      </Link>
    </div>
  );
};

const PortfolioPage = ({ projects = [] }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxImages, setLightboxImages] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = useMemo(
    () => ["All", ...new Set(projects.map((p) => p.category).filter(Boolean))],
    [projects],
  );

  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((p) => p.category === activeFilter),
    [activeFilter, projects],
  );

  const handleExpand = (project) => {
    const images = [project.image, ...(project.gallery || [])].filter(Boolean);
    if (images.length) {
      setLightboxImages(images);
      setLightboxIndex(0);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header - no framer-motion blocking paint */}
      <PageHeader
        badge="Our Portfolio"
        title="Projects That"
        titleHighlight="Speak for Themselves"
        description="Explore our collection of successful projects built for ambitious companies."
      />

      {/* Sticky filter bar */}
      {categories.length > 1 && (
        <section className="py-5 bg-white/90 dark:bg-gray-950/90 border-b border-gray-100 dark:border-gray-800 sticky top-16 z-20 backdrop-blur-md">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    activeFilter === filter
                      ? "bg-primary-600 text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Grid - no stagger, instant render */}
      <section className="py-12 lg:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {projects.length === 0
                  ? "No projects yet. Add some from the admin panel!"
                  : "No projects in this category."}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onExpand={handleExpand}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox - only mounted when needed */}
      {lightboxImages && (
        <ImageLightbox
          images={lightboxImages}
          initialIndex={lightboxIndex}
          isOpen={true}
          onClose={() => setLightboxImages(null)}
        />
      )}

      {/* CTA */}
      <section className="py-20 bg-primary-600">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">
            Let&apos;s create something amazing together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            Start Your Project
            <ExternalLink className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
