function Stars({ rating }) {
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;

    return (
        <div className="heroteststar" aria-label={`Rated ${rating} out of 5`}>
            {Array.from({ length: full }, (_, i) => (
                <i key={i} className="fa-solid fa-star"></i>
            ))}
            {half && <i className="fa-regular fa-star-half-stroke"></i>}
        </div>
    );
}

export default Stars;
