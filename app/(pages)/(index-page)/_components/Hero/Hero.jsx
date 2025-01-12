import './Hero.css';

export default function Hero() {
  return (
    <div className="home-container">
      <div className="img-container">
        <div className="welcome">
          <h1>Spotify Album Logger</h1>
          <h2>Log albums you've listened to and rank them.</h2>
        </div>
        <video autoPlay muted loop>
          <source src="/index/sacredsouls.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay"></div> {/* Add a div for the dim overlay */}
      </div>
    </div>
  );
}
