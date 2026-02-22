import "../styles/movie-cast.css";

export default function ActorCard({ actor, IMAGE_BASE_URL }) {
    const profileImage = actor.profile_path
        ? IMAGE_BASE_URL + actor.profile_path
        : "https://via.placeholder.com/200x300?text=No+Photo";

    return (
        <div className="actor-card">
            <div className="actor-image-container">
                <img
                    className="actor-image"
                    src={profileImage}
                    alt={actor.name}
                    loading="lazy"
                />
            </div>
            <div className="actor-info">
                <h3 className="actor-name">{actor.name}</h3>
                <p className="actor-character">{actor.character}</p>
            </div>
        </div>
    );
}
