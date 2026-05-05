import React from 'react';

const skillGroups = [
  {
    title: "Languages",
    skills: ["Python (Expert)", "Node.js", "SQL", "TypeScript", "JavaScript", "Java"]
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS (Bedrock, Lambda, S3, EC2, IAM, SQS, SNS, SES)", "Terraform", "Docker", "CI/CD", "Kubernetes (EKS)", "Boto3"]
  },
  {
    title: "Security & Monitoring",
    skills: ["LGTM Stack (Grafana, Prometheus, Loki, Tempo)", "AML/KYC Frameworks", "Cybersecurity Policy", "RBAC", "Data Integrity"]
  }
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-badge">Technical Mastery</span>
          <h2 className="section-title">Core Pulse</h2>
        </div>
        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <div key={index} className="skill-group">
              <h3 className="group-title">{group.title}</h3>
              <div className="skills-list">
                {group.skills.map((skill, i) => (
                  <div key={i} className="skill-item">
                    <span className="skill-dot"></span>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
