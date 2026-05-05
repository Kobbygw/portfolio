import React from 'react';

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  achievements: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: "PURPLE PENNYTECH",
    role: "Software Lead (Cloud Platform & Reliability)",
    period: "Jan 2026 – Present",
    achievements: [
      "Architected a high-availability Cloud Platform on AWS using Lambda, SQS, and SNS for 99.9% reliability.",
      "Implemented end-to-end LGTM observability stack, significantly reducing MTTR for distributed functions.",
      "Engineered an AI-augmented OCR engine with AWS Bedrock, achieving 99.5% processing accuracy.",
      "Established Zero-Trust security frameworks and Cybersecurity policies for institutional services."
    ]
  },
  {
    company: "Nexlink Technologies",
    role: "Partner & Lead Software Engineer",
    period: "Jan 2025 – Present",
    achievements: [
      "Owned end-to-end development of high-availability government systems, improving uptime from 95% to 99.9%.",
      "Built secure data pipelines and automated security audits in Python, reducing manual checks by 60%.",
      "Managed a team of 3 developers, implementing peer code reviews that increased quality compliance by 40%.",
      "Aligned technical roadmaps with business goals to ensure seamless project delivery."
    ]
  },
  {
    company: "Blossom Academy Limited",
    role: "Software Engineer (National Service)",
    period: "Nov 2023 – Nov 2024",
    achievements: [
      "Developed and optimized full-stack platforms using React.js and Python, reducing page load times by 35%.",
      "Collaborated with cross-functional teams to design robust data models for executive dashboards."
    ]
  }
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="experience-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-badge">Career Path</span>
          <h2 className="section-title">Professional Experience</h2>
        </div>
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="exp-meta">
                <h3 className="exp-company">{exp.company}</h3>
                <span className="exp-period">{exp.period}</span>
              </div>
              <h4 className="exp-role">{exp.role}</h4>
              <ul className="exp-achievements">
                {exp.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
