import "./FeaturesSection.css";
import featureImage1 from "../../../assets/landing page/feature1.png";
import featureImage2 from "../../../assets/landing page/feature2.png";
import featureImage3 from "../../../assets/landing page/feature3.webp";
import Feature from "../feature/Feature";

export default function FeaturesSection() {
  return (
    <div className="features-section">
      <div className="features-header">
        <h2 className="features-heading">
          Access all the features you need to build flashcard set,
          study efficiently, and watch your knowledge grow
          with each session.
        </h2>
      </div>

      <div className="features-container">
        <Feature
          image={featureImage1}
          title="Organized Study Folders"
          description="Create and manage flashcard collections by subject"
        />
        <Feature
          image={featureImage2}
          title="Interactive Learning Sessions"
          description="Study with reveal-answer flow and progress tracking"
        />
        <Feature
          image={featureImage3}
          title="Progress & Results Tracking"
          description="View session scores and monitor your improvement"
        />
      </div>
    </div>
  );
}