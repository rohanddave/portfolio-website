import { Education } from "@/types";

function EducationCard({
  education,
  index,
}: {
  education: Education;
  index: number;
}) {
  return (
    <div className="education-card">
      <div className="education-bg">
        <img src={education.image} alt={education.school} />
        <div className="education-overlay" />
      </div>

      <div className="education-content">
        <div className="education-main">
          <div className="education-number" style={{ color: education.color }}>
            0{index + 1}
          </div>

          <div className="education-degree">
            <span className="degree-type">{education.degree}</span>
            <h2 className="degree-field">{education.field}</h2>
          </div>

          <p className="education-description">{education.description}</p>

          {education.honors && (
            <div className="education-honors">
              {education.honors.map((honor, i) => (
                <span key={i} className="honor-badge">
                  <Award className="w-3 h-3" />
                  {honor}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="education-school">
          <div
            className="school-logo-container"
            style={{ borderColor: education.color }}
          >
            <img
              src={education.logo}
              alt={education.school}
              className="school-logo"
            />
          </div>

          <h3 className="school-name">{education.school}</h3>

          <div className="school-details">
            <span className="school-detail">
              <MapPin className="w-4 h-4" />
              {education.location}
            </span>
            <span className="school-detail">
              <Calendar className="w-4 h-4" />
              {education.date}
            </span>
            {education.gpa && (
              <span className="school-detail">
                <BookOpen className="w-4 h-4" />
                GPA: {education.gpa}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
