import Button from "../../button/Button";
import firstImage from "../../../assets/landing page/Group 74.png";
import secondImage from "../../../assets/landing page/Group 75.png";
import "./HeroIntro.css";

export default function HeroIntro() {
  return (
    <div className="hero-intro">
      <img src={firstImage} alt="Flashcard illustration" />
      <div className="hero-content">
        <p className="hero-text">
          Build lasting knowledge with an intuitive flashcard experience
          designed to help you focus,
        </p>
        <p className="hero-text">
          stay organized, and retain information more effectively over time.
        </p>
        <Button content="Get Started" className="get-started-button" />
      </div>
      <img src={secondImage} alt="Learning illustration" />
    </div>
  );
}