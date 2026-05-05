import React from 'react';

interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  impact?: string;
}

const projects: Project[] = [
  {
    title: "High-Availability Cloud Platform",
    category: "Architecture & Reliability",
    description: "Architected a decoupled AWS infrastructure for mission-critical institutional services.",
    impact: "Achieved 99.9% reliability and 30% latency reduction.",
    tags: ["AWS Lambda", "SQS", "SNS", "Terraform"]
  },
  {
    title: "AI-Augmented OCR Engine",
    category: "AI Engineering",
    description: "Built an intelligent document extraction system using AWS Bedrock and Lambda for high-velocity workloads.",
    impact: "99.5% processing accuracy, saving 60+ manual hours monthly.",
    tags: ["AWS Bedrock", "Python", "Serverless"]
  },
  {
    title: "Government Integrity System",
    category: "Security & Scale",
    description: "Owned end-to-end development of a high-availability government infrastructure with Zero-Trust security.",
    impact: "Improved core service uptime from 95% to 99.9%.",
    tags: ["Zero-Trust", "Python", "CI/CD", "PostgreSQL"]
  },
  {
    title: "CITCS Data Model",
    category: "Data Strategy",
    description: "Designed a strategic data model for the Ghana Revenue Authority to unify national transit data.",
    impact: "Unified multi-source transit data for national monitoring.",
    tags: ["Data Modeling", "SQL", "Monitoring"]
  }
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-badge">Selected Impact</span>
          <h2 className="section-title">Architecture & Systems</h2>
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-info">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                {project.impact && (
                  <div className="project-impact">
                    <strong>Result:</strong> {project.impact}
                  </div>
                )}
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="project-cta">
                <a href="#" className="project-link">
                  Detailed Case Study
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
