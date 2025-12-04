import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="homePage">
      {/* <Particles /> /} {/ Optionnel */}
      <div className="homeHero">
        <h1 className="homeTitle">MovieBox</h1>
        <p className="homeSubtitle">
          Discover movies you'll actually enjoy.
        </p>
        <Link to="/movies" className="homeBtn">
          Browse Movies
        </Link>
      </div>
      <div className="scrollIndicator">Get ready</div>
    </div>
  );
}