import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieRecommendations } from "../services/tmdbApi"; // اتأكدي من المسار

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // جلب بيانات الفيلم
    getMovieDetails(id).then((res) => setMovie(res.data));
    
    // جلب التوصيات
    getMovieRecommendations(id).then((res) => setRecommendations(res.data.results.slice(0, 6)));
    
    // تغيير عنوان الصفحة (مهمتك كـ UI Lead)
    if (movie) document.title = `MovieApp | ${movie.title}`;
    
  }, [id, movie]);

  if (!movie) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="animate-fadeIn">
       {/* هنا هتحطي الـ UI اللي جهزناه سوا (Hero Section & Recommendations) */}
       <h1 className="text-3xl font-bold p-6">{movie.title}</h1>
    </div>
  );
};

export default MovieDetails;