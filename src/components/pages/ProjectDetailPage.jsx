"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, CheckCircle, Expand, Github } from "lucide-react";
import dynamic from "next/dynamic";
import OptimizedImage from "@/components/ui/OptimizedImage";
import AnimatedGrid from "@/components/ui/AnimatedGrid";

const ImageLightbox = dynamic(() => import("@/components/ui/ImageLightbox"), {
  ssr: false,
});

import { useMemo, useState, Suspense } from "react";

const ProjectDetail = ({ project }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const allImages = useMemo(() => {
    const images = [];
    if (project?.image) images.push(project.image);
    if (project?.gallery && Array.isArray(project.gallery)) {
      images.push(...project.gallery);
    }
    return images;
  }, [project]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Project Not Found
          </h2>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl"
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const colors = [
    "from-blue-500 to-indigo-600",
    "from-green-500 to-emerald-600",
    "from-purple-500 to-violet-600",
    "from-orange-500 to-red-600",
    "from-cyan-500 to-blue-600",
    "from-pink-500 to-rose-600",
  ];

  const parsedColorIndex = project._id ? parseInt(project._id.slice(-1), 16) : 0;
  const colorIndex = Number.isFinite(parsedColorIndex) ? parsedColorIndex % colors.length : 0;
  const color = colors[colorIndex];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="relative pt-32 pb-20 overflow-hidden">
        <AnimatedGrid />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-400/20 dark:bg-primary-600/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Portfolio</span>
          </Link>

          <div className="max-w-4xl animate-fade-in-up">
            <span className="text-sm font-medium text-primary-600 bg-primary-50 dark:bg-primary-900/30 px-3 py-1 rounded-full">
              {project.category}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mt-6 mb-6">
              {project.title || "Project"}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {project.description || ""}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
              {project.client && (
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    Client
                  </span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {project.client}
                  </p>
                </div>
              )}
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  Year
                </span>
                <p className="font-medium text-gray-900 dark:text-white">
                  {project.createdAt
                    ? new Date(project.createdAt).getFullYear()
                    : "N/A"}
                </p>
              </div>
              {project.duration && (
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    Duration
                  </span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {project.duration}
                  </p>
                </div>
              )}

              {/* Live & GitHub links */}
              <div className="flex items-center gap-3 ml-auto">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-all shadow-md shadow-primary-600/20 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <ExternalLink size={16} />
                    Live Preview
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-6 lg:px-8">
          <div
            className={`h-[400px] lg:h-[500px] ${project.image ? "bg-gray-100 dark:bg-gray-800" : `bg-gradient-to-br ${color}`} rounded-2xl overflow-hidden flex items-center justify-center relative group cursor-pointer animate-fade-in`}
            onClick={() => project.image && openLightbox(0)}
          >
            {project.image ? (
              <>
                <OptimizedImage
                  src={project.image}
                  alt={project.title || "Project"}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                  quality="auto"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Expand size={32} className="text-white" />
                  </div>
                </div>
              </>
            ) : (
              <span className="text-white/30 text-9xl font-bold">
                {project.title ? project.title.charAt(0) : "P"}
              </span>
            )}
          </div>
        </div>
      </section>

      {project.gallery && project.gallery.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Project Gallery
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((imageUrl, index) => (
                <div
                  key={index}
                  className="h-64 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative group cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() =>
                    openLightbox(project.image ? index + 1 : index)
                  }
                >
                  <OptimizedImage
                    src={imageUrl}
                    alt={`${project.title} - Image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300"
                    loading="lazy"
                    quality="auto"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Expand size={24} className="text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {lightboxOpen && (
        <ImageLightbox
          images={allImages}
          initialIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      {project.features && project.features.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {project.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl"
                >
                  <CheckCircle
                    className="text-primary-500 flex-shrink-0"
                    size={20}
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.technologies && project.technologies.length > 0 && (
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Technologies Used
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.results && project.results.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Results
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {project.results.map((result, index) => (
                <div
                  key={index}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 mb-2">
                    {result.metric}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {result.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-primary-600">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Have a Similar Project?
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help bring your vision to life.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
