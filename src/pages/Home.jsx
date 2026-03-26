import { useState, useEffect } from 'react';
import { getNowPlaying, getPopular, getFreeToWatch } from '../services/api';
import MovieCard from '../components/MovieCard';
import { Play } from 'lucide-react';

const Home = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [freeMovies, setFreeMovies] = useState([]);
    const [activeBg, setActiveBg] = useState("");

    const leaders = [
        {
            id: 1,
            name: "RuiZafon",
            avatar: "https://www.themoviedb.org/t/p/w64_and_h64_face/76191.jpg",
            allTime: 2058367,
            weekly: 22075,
            allTimeWidth: '85%',
            weeklyWidth: '45%'
        },
        {
            id: 2,
            name: "Samara",
            initial: "S",
            bgColor: "#d291bc",
            allTime: 4509700,
            weekly: 13446,
            allTimeWidth: '95%',
            weeklyWidth: '25%'
        }
    ];

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const [nowPlaying, popular, free] = await Promise.all([
                    getNowPlaying(),
                    getPopular(),
                    getFreeToWatch()
                ]);

                setTrendingMovies(nowPlaying.data.results);
                setPopularMovies(popular.data.results);
                setFreeMovies(free.data.results);

                if (nowPlaying.data.results.length > 0) {
                    setActiveBg(`https://image.tmdb.org/t/p/w1920_and_h600_multi_faces${nowPlaying.data.results[0].backdrop_path}`);
                }
            } catch (error) {
                console.error("Error fetching home data:", error);
            }
        };

        fetchHomeData();
    }, []);

    return (
        <div className="w-full bg-white font-sans">
            {/* 1. Hero Section */}
            <div className="relative h-[300px] md:h-[380px] bg-[#032541] flex items-center overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-1000 opacity-40" 
                    style={{ 
                        backgroundImage: `linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0) 100%), url('https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces/nS68U7p49X06L78X67X869a9G0A.jpg')` 
                    }}
                ></div>
                
                <div className="relative z-10 text-white w-full max-w-[1300px] mx-auto px-10 text-left">
                    <h1 className="text-[3rem] font-bold mb-1 tracking-tight">Welcome.</h1>
                    <h2 className="text-[2rem] font-semibold mb-10 opacity-90 leading-tight text-white">Millions of movies, TV shows and people to discover. Explore now.</h2>
                    
                    <div className="relative w-full rounded-full bg-white flex items-center h-12 shadow-2xl overflow-hidden focus-within:ring-2 focus-within:ring-[#01b4e4] transition-all">
                        <input 
                            type="text" 
                            placeholder="Search for a movie, tv show, person......" 
                            className="flex-1 px-6 text-gray-800 outline-none h-full text-lg placeholder:text-gray-400" 
                        />
                        <button className="h-full px-8 bg-gradient-to-r from-[#1ed5a9] to-[#01b4e4] text-white font-bold hover:text-[#032541] transition-all">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. Trending Section */}
            <section className="relative pt-10 pb-5 bg-white">
                <div className="max-w-[1300px] mx-auto px-10 relative z-10">
                    <div className="flex items-center gap-5 mb-6">
                        <h2 className="text-2xl font-bold text-[#032541]">Trending</h2>
                        <div className="flex border-2 border-[#032541] rounded-full font-bold text-sm overflow-hidden h-8">
                            <button className="bg-[#032541] text-[#1ed5a9] px-6">Today</button>
                            <button className="px-6 text-[#032541] hover:bg-gray-100">This Week</button>
                        </div>
                    </div>
                    <div className="flex overflow-x-auto gap-6 pb-10 custom-scrollbar scroll-smooth">
                        {trendingMovies.map((movie) => (
                            <div key={movie.id} className="min-w-[150px] md:min-w-[180px] hover:scale-105 transition-transform duration-300">
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Latest Trailers */}
            <section className="relative py-10 transition-all duration-1000 ease-in-out bg-[#032541]">
                <div className="absolute inset-0 opacity-30 bg-cover bg-center transition-all duration-1000"
                    style={{ backgroundImage: `url(${activeBg})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#032541] via-transparent to-[#032541] opacity-90"></div>

                <div className="max-w-[1300px] mx-auto px-10 relative z-10">
                    <div className="flex items-center gap-8 mb-6 text-white">
                        <h2 className="text-2xl font-bold">Latest Trailers</h2>
                        <div className="flex border-2 border-[#1ed5a9] rounded-full font-bold text-sm overflow-hidden h-7">
                            <button className="bg-[#1ed5a9] text-[#032541] px-5">Popular</button>
                            <button className="px-5 text-[#1ed5a9] hover:bg-white/10">Streaming</button>
                        </div>
                    </div>
                    <div className="flex overflow-x-auto gap-6 pb-6 custom-scrollbar-light">
                        {trendingMovies.slice(0, 8).map((movie) => (
                            <div key={movie.id} 
                                 className="min-w-[300px] group cursor-pointer" 
                                 onMouseEnter={() => setActiveBg(`https://image.tmdb.org/t/p/w1920_and_h600_multi_faces${movie.backdrop_path}`)}>
                                <div className="relative rounded-xl overflow-hidden aspect-video shadow-2xl border-2 border-transparent group-hover:border-[#1ed5a9] transition-all">
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/10 transition-all">
                                        <Play className="text-white fill-white w-14 h-14 opacity-90 group-hover:scale-125 transition-transform" />
                                    </div>
                                </div>
                                <h3 className="text-white font-bold text-center mt-3 text-lg group-hover:text-[#1ed5a9] transition-colors">{movie.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. What's Popular */}
            <section className="py-10 bg-white">
                <div className="max-w-[1300px] mx-auto px-10">
                    <div className="flex items-center gap-5 mb-6">
                        <h2 className="text-2xl font-bold text-[#032541]">What's Popular</h2>
                        <div className="flex border-2 border-[#032541] rounded-full font-bold text-sm overflow-hidden h-8">
                            <button className="bg-[#032541] text-[#1ed5a9] px-6">Streaming</button>
                            <button className="px-6 text-[#032541] hover:bg-gray-100">On TV</button>
                        </div>
                    </div>
                    <div className="flex overflow-x-auto gap-6 pb-10 custom-scrollbar scroll-smooth">
                        {popularMovies.map((movie) => (
                            <div key={movie.id} className="min-w-[150px] md:min-w-[180px] hover:scale-105 transition-transform duration-300">
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Join Today Section */}
            <section className="relative min-h-[320px] text-white flex items-center overflow-hidden bg-[#1e0a3d]">
                <div className="absolute inset-0 opacity-20 bg-cover bg-center"
                    style={{ backgroundImage: `url('https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces/nS68U7p49X06L78X67X869a9G0A.jpg')` }}></div>
                
                <div className="relative z-10 max-w-[1300px] mx-auto px-10 w-full flex flex-col md:flex-row items-center md:justify-between gap-10">
                    <div className="max-w-2xl text-left">
                        <h1 className="text-[2.5rem] font-bold mb-4">Join Today</h1>
                        <p className="text-lg font-normal mb-8 leading-relaxed opacity-90">
                            Get access to maintain your own <span className="italic opacity-70">custom personal lists</span>, track what you've seen and search and filter for <span className="italic opacity-70">what to watch next</span>—regardless if it's in theatres, on TV or available on popular streaming services.
                        </p>
                        <button className="px-6 py-2 bg-[#805ad5] text-white font-bold rounded-md hover:bg-white hover:text-[#1e0a3d] transition-all shadow-lg">
                            Sign Up
                        </button>
                    </div>

                    <div className="text-left w-full md:w-auto">
                        <ul className="space-y-1 text-[15px] font-normal opacity-80 list-disc list-inside">
                            <li>Enjoy TMDB ad free</li>
                            <li>Maintain a personal watchlist</li>
                            <li>Filter by your subscribed streaming services</li>
                            <li>Log the movies and TV shows you've seen</li>
                            <li>Build custom lists</li>
                            <li>Contribute to and improve our database</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 6. Leaderboard Section */}
            <section className="py-10 bg-white">
                <div className="max-w-[1300px] mx-auto px-10">
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-2xl font-bold text-black">Leaderboard</h2>
                        <div className="flex flex-col text-[12px] font-bold">
                            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#1ed5a9]"></span> <span>All Time Edits</span></div>
                            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#f87171]"></span> <span>Edits This Week</span></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10">
                        {leaders.map((user) => (
                            <div key={user.id} className="flex items-center gap-4 group">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                                ) : (
                                    <div 
                                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                                        style={{ backgroundColor: user.bgColor }}
                                    >
                                        {user.initial}
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h3 className="font-bold text-[1.1rem] hover:text-[#01b4e4] cursor-pointer transition-colors">
                                        {user.name}
                                    </h3>
                                    <div className="space-y-1.5 mt-2">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-[#c0fecf] to-[#1ed5a9]" style={{ width: user.allTimeWidth }}></div>
                                            </div>
                                            <span className="text-[13px] font-bold w-16 text-right text-black/80">
                                                {user.allTime.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-[#f87171]" style={{ width: user.weeklyWidth }}></div>
                                            </div>
                                            <span className="text-[13px] font-bold w-16 text-right text-black/80">
                                                {user.weekly.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;