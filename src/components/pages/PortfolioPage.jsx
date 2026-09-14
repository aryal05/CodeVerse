"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Expand,
  ExternalLink,
  Layers3,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import OptimizedImage from "@/components/ui/OptimizedImage";
import PremiumPageCTA from "@/components/ui/PremiumPageCTA";

const ImageLightbox = dynamic(() => import("@/components/ui/ImageLightbox"), {
  ssr: false,
  loading: () => null,
});

const PROJECT_ACCENTS = [
  "96, 165, 250",
  "167, 139, 250",
  "244, 114, 182",
  "251, 146, 60",
  "45, 212, 191",
];

const ProjectFeature = ({ project, index, onExpand }) => {
  const year = project.createdAt
    ? new Date(project.createdAt).getFullYear()
    : "";
  const accent = PROJECT_ACCENTS[index % PROJECT_ACCENTS.length];
  const projectNumber = String(index + 1).padStart(2, "0");

  return (
    <article
      className="portfolio-case-study"
      style={{ "--project-accent": accent }}
    >
      <div className="portfolio-case-study__media">
        {project.image ? (
          <OptimizedImage
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 800px) 100vw, 64vw"
            className="portfolio-case-study__image"
            loading={index < 2 ? "eager" : "lazy"}
            priority={false}
            quality="auto"
          />
        ) : (
          <div className="portfolio-case-study__placeholder">
            <span>{project.title?.charAt(0)}</span>
          </div>
        )}

        <div className="portfolio-case-study__shade" aria-hidden="true" />
        <Link
          href={`/portfolio/${project.slug}`}
          className="portfolio-case-study__media-link"
          aria-label={`View ${project.title} case study`}
        />

        <div className="portfolio-case-study__badges">
          <span>{project.category || "Featured work"}</span>
          {year && <span>{year}</span>}
        </div>

        {project.image && (
          <button
            type="button"
            onClick={() => onExpand(project)}
            className="portfolio-case-study__expand"
            aria-label={`Expand ${project.title} images`}
          >
            <Expand aria-hidden="true" />
          </button>
        )}

        <span className="portfolio-case-study__number" aria-hidden="true">
          {projectNumber}
        </span>
      </div>

      <div className="portfolio-case-study__content">
        <div>
          <div className="portfolio-case-study__eyebrow">
            <span>Selected project</span>
            <span>{projectNumber}</span>
          </div>

          <h2>{project.title}</h2>
          <p className="portfolio-case-study__description">
            {project.description}
          </p>

          {project.client && (
            <div className="portfolio-case-study__client">
              <span>Built for</span>
              <strong>{project.client}</strong>
            </div>
          )}

          {project.technologies?.length > 0 && (
            <div className="portfolio-case-study__technologies">
              {project.technologies.slice(0, 5).map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          )}
        </div>

        <div className="portfolio-case-study__actions">
          <Link
            href={`/portfolio/${project.slug}`}
            className="portfolio-case-study__primary"
          >
            View case study
            <ArrowRight aria-hidden="true" />
          </Link>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-case-study__secondary"
            >
              Live site
              <ExternalLink aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

const PortfolioPage = ({ projects = [], loadError = null }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxImages, setLightboxImages] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = useMemo(
    () => ["All", ...new Set(projects.map((project) => project.category).filter(Boolean))],
    [projects],
  );

  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((project) => project.category === activeFilter),
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
      <PageHeader
        badge="Our Portfolio"
        title="Projects That"
        titleHighlight="Speak for Themselves"
        description="Explore our collection of successful projects built for ambitious companies."
      />

      {categories.length > 1 && (
        <section className="portfolio-filter" aria-label="Project filters">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="portfolio-filter__inner">
              <div className="portfolio-filter__label">
                <Layers3 aria-hidden="true" />
                <span>Filter work</span>
              </div>
              <div className="portfolio-filter__options">
                {categories.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={activeFilter === filter ? "active" : ""}
                    aria-pressed={activeFilter === filter}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="portfolio-gallery">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="portfolio-gallery__intro">
            <div>
              <span>Featured case studies</span>
              <h2>Selected work, built to make an impact.</h2>
            </div>
            <p>
              {String(filteredProjects.length).padStart(2, "0")} projects
              <ArrowUpRight aria-hidden="true" />
            </p>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="portfolio-gallery__empty">
              <Layers3 aria-hidden="true" />
              <p>
                {loadError ||
                  (projects.length === 0
                    ? "No projects yet. Add some from the admin panel!"
                    : "No projects in this category.")}
              </p>
            </div>
          ) : (
            <div className="portfolio-case-study-list">
              {filteredProjects.map((project, index) => (
                <ProjectFeature
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

      {lightboxImages && (
        <ImageLightbox
          images={lightboxImages}
          initialIndex={lightboxIndex}
          isOpen={true}
          onClose={() => setLightboxImages(null)}
        />
      )}

      <PremiumPageCTA
        eyebrow="Your project could be next"
        title="Have an idea worth"
        highlight="bringing to life?"
        description="Let's turn your ambition into a digital experience that looks distinctive, works beautifully, and creates measurable value."
        primaryLabel="Start your project"
        secondaryLabel="Explore our services"
        secondaryHref="/services"
        accent="244, 114, 182"
      />
    </div>
  );
};

export default PortfolioPage;
