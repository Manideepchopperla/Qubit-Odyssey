import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import QuantumGlobe from '@/components/QuantumGlobe';
import { Badge } from '@/components/ui/badge';
import { Upload, Eye, Atom, Users, ArrowRight, Github, Zap, Square, ChevronLeft, ChevronRight, X, Play, GanttChartSquare, CircuitBoard } from 'lucide-react';
import { Link } from 'react-router-dom';
import quantumHeroBg from '@/assets/quantum-hero-bg.jpg';
import SquareParticles from '../components/ui/SquareParticles';

// ✅ Utility: generate thumbnails from video source
const generateThumbnailFromVideo = (videoSrc) =>
  new Promise((resolve) => {
    const video = document.createElement("video");
    video.src = videoSrc;
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.currentTime = 1;

    video.addEventListener("loadeddata", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/png"));
    });

    video.addEventListener("error", () => {
      resolve(`https://via.placeholder.com/600x338/1a1a1a/6366f1?text=Video`);
    });
  });

const getCoverForVideo = async (src) => {
  // YouTube
  if (src.includes("youtu.be") || src.includes("youtube.com")) {
    const videoId = src.includes("youtu.be")
      ? src.split("youtu.be/")[1].split("?")[0]
      : new URL(src).searchParams.get("v");
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  // Google Drive
  if (src.includes("drive.google.com")) {
    const fileId = src.match(/[-\w]{25,}/)?.[0];
    return `https://drive.google.com/thumbnail?id=${fileId}`;
  }

  // Local mp4
  if (src.endsWith(".mp4")) {
    try {
      return await generateThumbnailFromVideo(src);
    } catch (error) {
      return `https://via.placeholder.com/600x338/1a1a1a/6366f1?text=Video`;
    }
  }

  // fallback placeholder
  return `https://via.placeholder.com/600x338/1a1a1a/6366f1?text=Video`;
};

// ✅ SMART VideoModal that supports YouTube / Google Drive / Local mp4
const VideoModal = ({ isOpen, onClose, videoSrc, title }) => {
  if (!isOpen) return null;

  const isYouTube = videoSrc?.includes("youtube.com") || videoSrc?.includes("youtu.be");
  const isDrive = videoSrc?.includes("drive.google.com");

  let embedUrl = videoSrc;
  if (isYouTube) {
    // Convert YouTube URLs to embed format
    if (videoSrc.includes("watch?v=")) {
      embedUrl = videoSrc.replace("watch?v=", "embed/");
    } else if (videoSrc.includes("youtu.be/")) {
      embedUrl = videoSrc.replace("youtu.be/", "www.youtube.com/embed/");
    }
    // Remove any additional parameters and add autoplay
    embedUrl = embedUrl.split('&')[0] + "?autoplay=1";
  } else if (isDrive) {
    const fileId = videoSrc.match(/[-\w]{25,}/)?.[0];
    embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative bg-black/90 rounded-2xl p-6 max-w-4xl w-full border border-purple-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-xl font-orbitron text-cyan-400 mb-4">{title}</h3>

        <div className="relative aspect-video rounded-lg overflow-hidden">
          {isYouTube || isDrive ? (
            <iframe
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <video 
              className="w-full h-full object-cover" 
              preload="auto"
              controls 
              autoPlay
              poster={`https://via.placeholder.com/800x450/1a1a1a/6366f1?text=${encodeURIComponent(title)}`}
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ✅ ENHANCED Video Carousel with auto thumbnails + better responsive sizing
  //   const VideoCarousel = ({ videos }) => {
  //   const [currentIndex, setCurrentIndex] = useState(0);
  //   const [selectedVideo, setSelectedVideo] = useState(null);
  //   const [videosPerView, setVideosPerView] = useState(3);
  //   const [videoThumbs, setVideoThumbs] = useState({});
  //   const [loadingThumbs, setLoadingThumbs] = useState({});

  //   useEffect(() => {
  //     const updateVideosPerView = () => {
  //       if (window.innerWidth < 640) {
  //         setVideosPerView(1);
  //       } else if (window.innerWidth < 1024) {
  //         setVideosPerView(2);
  //       } else {
  //         setVideosPerView(3);
  //       }
  //     };
  //     updateVideosPerView();
  //     window.addEventListener("resize", updateVideosPerView);
  //     return () => window.removeEventListener("resize", updateVideosPerView);
  //   }, []);

  //   useEffect(() => {
  //     setCurrentIndex(0);
  //   }, [videosPerView]);

  //   // Load thumbnails automatically
  //   useEffect(() => {
  //     const loadThumbnails = async () => {
  //       const thumbs = {};
  //       const loaders = {};
        
  //       for (const video of videos) {
  //         if (video.cover || videoThumbs[video.title]) continue;
          
  //         loaders[video.title] = true;
  //         setLoadingThumbs(prev => ({ ...prev, ...loaders }));
          
  //         try {
  //           thumbs[video.title] = await getCoverForVideo(video.src);
  //           setVideoThumbs(prev => ({ ...prev, [video.title]: thumbs[video.title] }));
  //         } catch (error) {
  //           console.error('Error loading thumbnail:', error);
  //           setVideoThumbs(prev => ({ 
  //             ...prev, 
  //             [video.title]: `https://via.placeholder.com/480x270/1a1a1a/6366f1?text=${encodeURIComponent(video.title)}`
  //           }));
  //         }
          
  //         loaders[video.title] = false;
  //         setLoadingThumbs(prev => ({ ...prev, ...loaders }));
  //       }
  //     };
      
  //     loadThumbnails();
  //   }, [videos, videoThumbs]);

  //   const maxIndex = Math.max(0, videos.length - videosPerView -1);
  //   const nextSlide = () => setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  //   const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  //   const openVideoModal = (video) => setSelectedVideo(video);
  //   const closeVideoModal = () => setSelectedVideo(null);

  //   return (
  //     <>
  //       <div className="relative px-2 sm:px-4 lg:px-6">
  //         {/* Navigation Buttons */}
  //         {videos.length > videosPerView && (
  //           <>
  //             <button
  //               onClick={prevSlide}
  //               className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-purple-400 backdrop-blur-sm border border-purple-500/40 text-white p-2.5 sm:p-3 rounded-full hover:bg-purple-500/20 hover:text-purple-300 hover:border-purple-400/60 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
  //               disabled={currentIndex === 0}
  //             >
  //               <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
  //             </button>

  //             <button
  //               onClick={nextSlide}
  //               className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-purple-400 backdrop-blur-sm border border-purple-500/40 text-white p-2.5 sm:p-3 rounded-full hover:bg-purple-500/20 hover:text-purple-300 hover:border-purple-400/60 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
  //               disabled={currentIndex >= maxIndex}
  //             >
  //               <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
  //             </button>
  //           </>
  //         )}

  //         {/* Video Grid Container */}
  //         <div className="overflow-hidden">
  //           <motion.div
  //             className="flex"
  //             animate={{ 
  //               x: `${-currentIndex * (100 / videosPerView)}%`
  //             }}
  //             transition={{ duration: 0.6, ease: "easeInOut" }}
  //             style={{ 
  //               width: `${videos.length * (100 / videosPerView)}%`
  //             }}
  //           >
  //             {videos.map((video, i) => (
  //               <div
  //                 key={i}
  //                 className={`flex-shrink-0 ${
  //                   videosPerView === 1 ? 'px-2' : 
  //                   videosPerView === 2 ? 'px-2 sm:px-3' : 
  //                   'px-2 lg:px-3'
  //                 }`}
  //                 style={{ 
  //                   width: `${100 / videos.length}%`
  //                 }}
  //               >
  //                 <motion.div
  //                   whileHover={{ y: -4, scale: 1.02 }}
  //                   transition={{ duration: 0.2 }}
  //                   onClick={() => openVideoModal(video)}
  //                   className="cursor-pointer h-full"
  //                 >
  //                   <Card className="bg-black/50 backdrop-blur-sm border border-gray-700/50 overflow-hidden hover:border-cyan-400/50 hover:bg-black/60 transition-all duration-300 rounded-xl group hover:shadow-xl hover:shadow-purple-500/20 h-full flex flex-col">
  //                     {/* Video Thumbnail Container - FIXED */}
  //                     <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-purple-900/20 via-black/60 to-cyan-900/20 flex-shrink-0">
  //                       {loadingThumbs[video.title] ? (
  //                         <div className="absolute inset-0 flex items-center justify-center">
  //                           <div className="w-8 h-8 sm:w-10 sm:h-10 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
  //                         </div>
  //                       ) : (
  //                         <>
  //                           {/* Video Thumbnail - PROPERLY FITTED */}
  //                           <img
  //                             src={
  //                               video.cover || 
  //                               videoThumbs[video.title] ||
  //                               `https://via.placeholder.com/480x270/1a1a1a/6366f1?text=${encodeURIComponent(video.title)}`
  //                             }
  //                             alt={video.title}
  //                             className="absolute inset-0 w-full h-full object-cover object-center"
  //                             style={{
  //                               objectFit: 'cover',
  //                               objectPosition: 'center center'
  //                             }}
  //                             loading="lazy"
  //                           />
                            
  //                           {/* Gradient Overlay for better text readability */}
  //                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            
  //                           {/* Play Overlay */}
  //                           <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
  //                             <div className="bg-purple-500/90 backdrop-blur-sm p-3 sm:p-4 rounded-full transform group-hover:scale-110 transition-transform duration-200 shadow-lg">
  //                               <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
  //                             </div>
  //                           </div>
  //                         </>
  //                       )}
  //                     </div>
                      
  //                     {/* Video Info - FIXED HEIGHT */}
  //                     <CardContent className={`flex-1 flex flex-col justify-between ${
  //                       videosPerView === 1 ? 'p-4' : 'p-3'
  //                     }`}>
  //                       <div>
  //                         <h4 className={`font-orbitron text-white mb-2 group-hover:text-cyan-400 transition-colors leading-tight ${
  //                           videosPerView === 1 ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
  //                         }`}>
  //                           {video.title}
  //                         </h4>
  //                       </div>
  //                       <div>
  //                         <p className={`text-gray-400 font-rajdhani font-medium ${
  //                           videosPerView === 1 ? 'text-sm' : 'text-xs sm:text-sm'
  //                         }`}>
  //                           {video.duration}
  //                         </p>
  //                       </div>
  //                     </CardContent>
  //                   </Card>
  //                 </motion.div>
  //               </div>
  //             ))}
  //           </motion.div>
  //         </div>

  //         {/* Dots Indicator */}
  //         {videos.length > videosPerView && (
  //           <div className="flex justify-center mt-6 gap-2">
  //             {Array.from({ length: maxIndex + 1 }).map((_, index) => (
  //               <button
  //                 key={index}
  //                 onClick={() => setCurrentIndex(index)}
  //                 className={`h-2 rounded-full transition-all duration-300 ${
  //                   index === currentIndex 
  //                     ? 'bg-purple-400 w-8' 
  //                     : 'bg-gray-600 w-2 hover:bg-gray-500'
  //                 }`}
  //               />
  //             ))}
  //           </div>
  //         )}
  //       </div>

  //       {/* Video Modal */}
  //       <VideoModal
  //         isOpen={!!selectedVideo}
  //         onClose={closeVideoModal}
  //         videoSrc={selectedVideo?.src}
  //         title={selectedVideo?.title}
  //       />
  //     </>
  //   );
  // };
  const VideoCarousel = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videosPerView, setVideosPerView] = useState(3);
  const [videoThumbs, setVideoThumbs] = useState({});
  const [loadingThumbs, setLoadingThumbs] = useState({});

  useEffect(() => {
    const updateVideosPerView = () => {
      if (window.innerWidth < 640) {
        setVideosPerView(1);
      } else if (window.innerWidth < 1024) {
        setVideosPerView(2);
      } else {
        setVideosPerView(3);
      }
    };
    updateVideosPerView();
    window.addEventListener("resize", updateVideosPerView);
    return () => window.removeEventListener("resize", updateVideosPerView);
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [videosPerView]);

  // Load thumbnails automatically
  useEffect(() => {
    const loadThumbnails = async () => {
      const thumbs = {};
      const loaders = {};

      for (const video of videos) {
        if (video.cover || videoThumbs[video.title]) continue;

        loaders[video.title] = true;
        setLoadingThumbs((prev) => ({ ...prev, ...loaders }));

        try {
          thumbs[video.title] = await getCoverForVideo(video.src);
          setVideoThumbs((prev) => ({
            ...prev,
            [video.title]: thumbs[video.title],
          }));
        } catch (error) {
          console.error("Error loading thumbnail:", error);
          setVideoThumbs((prev) => ({
            ...prev,
            [video.title]: `https://via.placeholder.com/480x270/1a1a1a/6366f1?text=${encodeURIComponent(
              video.title
            )}`,
          }));
        }

        loaders[video.title] = false;
        setLoadingThumbs((prev) => ({ ...prev, ...loaders }));
      }
    };

    loadThumbnails();
  }, [videos, videoThumbs]);

  // ✅ allow moving 1 card at a time
  const maxIndex = Math.max(0, videos.length - videosPerView);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));

  const openVideoModal = (video) => setSelectedVideo(video);
  const closeVideoModal = () => setSelectedVideo(null);

  return (
    <>
      <div className="relative px-2 sm:px-4 lg:px-6">
        {/* Navigation Buttons */}
        {videos.length > videosPerView && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-purple-400 backdrop-blur-sm border border-purple-500/40 text-white p-2.5 sm:p-3 rounded-full hover:bg-purple-500/20 hover:text-purple-300 hover:border-purple-400/60 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-purple-400 backdrop-blur-sm border border-purple-500/40 text-white p-2.5 sm:p-3 rounded-full hover:bg-purple-500/20 hover:text-purple-300 hover:border-purple-400/60 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
              disabled={currentIndex >= maxIndex}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </>
        )}

        {/* Video Grid Container */}
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            animate={{
              // ✅ move 1 card at a time
              x: `${-currentIndex * (100 / videos.length)}%`,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              width: `${videos.length * (100 / videosPerView)}%`,
            }}
          >
            {videos.map((video, i) => (
              <div
                key={i}
                className={`flex-shrink-0 ${
                  videosPerView === 1
                    ? "px-2"
                    : videosPerView === 2
                    ? "px-2 sm:px-3"
                    : "px-2 lg:px-3"
                }`}
                style={{
                  width: `${100 / videos.length}%`,
                }}
              >
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => openVideoModal(video)}
                  className="cursor-pointer h-full"
                >
                  <Card className="bg-black/50 backdrop-blur-sm border border-gray-700/50 overflow-hidden hover:border-cyan-400/50 hover:bg-black/60 transition-all duration-300 rounded-xl group hover:shadow-xl hover:shadow-purple-500/20 h-full flex flex-col">
                    {/* Video Thumbnail */}
                    <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-purple-900/20 via-black/60 to-cyan-900/20 flex-shrink-0">
                      {loadingThumbs[video.title] ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      ) : (
                        <>
                          <img
                            src={
                              video.cover ||
                              videoThumbs[video.title] ||
                              `https://via.placeholder.com/480x270/1a1a1a/6366f1?text=${encodeURIComponent(
                                video.title
                              )}`
                            }
                            alt={video.title}
                            className="absolute inset-0 w-full h-full object-cover object-center"
                            style={{
                              objectFit: "cover",
                              objectPosition: "center center",
                            }}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                            <div className="bg-purple-500/90 backdrop-blur-sm p-3 sm:p-4 rounded-full transform group-hover:scale-110 transition-transform duration-200 shadow-lg">
                              <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Video Info */}
                    <CardContent
                      className={`flex-1 flex flex-col justify-between ${
                        videosPerView === 1 ? "p-4" : "p-3"
                      }`}
                    >
                      <div>
                        <h4
                          className={`font-orbitron text-white mb-2 group-hover:text-cyan-400 transition-colors leading-tight ${
                            videosPerView === 1
                              ? "text-base sm:text-lg"
                              : "text-sm sm:text-base"
                          }`}
                        >
                          {video.title}
                        </h4>
                      </div>
                      <div>
                        <p
                          className={`text-gray-400 font-rajdhani font-medium ${
                            videosPerView === 1
                              ? "text-sm"
                              : "text-xs sm:text-sm"
                          }`}
                        >
                          {video.duration}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots Indicator - ✅ updated for per-video movement */}
        {videos.length > videosPerView && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-purple-400 w-8"
                    : "bg-gray-600 w-2 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={closeVideoModal}
        videoSrc={selectedVideo?.src}
        title={selectedVideo?.title}
      />
    </>
  );
};


// Quantum Background Component (keeping the same as before)
const QuantumBackground = ({ section = "features" }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Hero-matching gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/15 via-transparent to-cyan-900/15"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-blue-900/10 via-transparent to-purple-900/12"></div>
      
      {/* Background Image Overlay - matching hero */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${quantumHeroBg})`,
          filter: section === "features" ? 'blur(2px) brightness(0.3)' : 'blur(3px) brightness(0.2)'
        }}
      />
      <div className={`absolute inset-0 ${section === "features" ? 'bg-black/80' : 'bg-black/85'}`} />
      
      {/* 3D Rotating Quantum Cubit with Hero Colors */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 perspective-1000 hidden lg:block">
        <div className="cube-container">
          <div className="cube">
            <div className="cube-face front"></div>
            <div className="cube-face back"></div>
            <div className="cube-face right"></div>
            <div className="cube-face left"></div>
            <div className="cube-face top"></div>
            <div className="cube-face bottom"></div>
            {/* Inner quantum core with hero colors */}
            <div className="quantum-core"></div>
          </div>
        </div>
      </div>

      {/* Additional smaller cubit for mobile */}
      <div className="absolute top-1/3 right-8 w-16 h-16 perspective-500 lg:hidden">
        <div className="cube-container">
          <div className="cube scale-50">
            <div className="cube-face front"></div>
            <div className="cube-face back"></div>
            <div className="cube-face right"></div>
            <div className="cube-face left"></div>
            <div className="cube-face top"></div>
            <div className="cube-face bottom"></div>
            <div className="quantum-core"></div>
          </div>
        </div>
      </div>

      {/* Floating quantum particles with hero theme colors */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full opacity-50 ${
              i % 3 === 0 ? 'bg-purple-400' : 
              i % 3 === 1 ? 'bg-cyan-400' : 
              'bg-blue-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `quantumFloat ${4 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Quantum circuit grid with hero purple theme */}
      <div className="absolute inset-0 opacity-8">
        <div className="grid-pattern"></div>
      </div>

      {/* Pulsing energy rings with hero colors */}
      <div className="absolute top-3/4 left-1/4 w-64 h-64 hidden md:block">
        <div className="energy-ring ring-1"></div>
        <div className="energy-ring ring-2"></div>
        <div className="energy-ring ring-3"></div>
      </div>

      {/* Additional quantum energy rings */}
      <div className="absolute top-1/5 right-1/5 w-48 h-48 hidden lg:block">
        <div className="energy-ring ring-cyan"></div>
        <div className="energy-ring ring-blue"></div>
      </div>

      {/* Floating quantum formulas with hero colors */}
      <div className="absolute top-20 left-10 opacity-20 hidden lg:block">
        <div className="font-mono text-purple-400 text-xs animate-pulse">
          |ψ⟩ = α|0⟩ + β|1⟩
        </div>
      </div>
      
      <div className="absolute bottom-32 right-20 opacity-20 hidden lg:block">
        <div className="font-mono text-cyan-400 text-xs animate-pulse" style={{animationDelay: '1s'}}>
          H|0⟩ = |+⟩
        </div>
      </div>
      
      <div className="absolute top-1/2 left-20 opacity-20 hidden xl:block">
        <div className="font-mono text-blue-400 text-xs animate-pulse" style={{animationDelay: '2s'}}>
          ⟨ψ|ψ⟩ = 1
        </div>
      </div>

      {/* Quantum interference pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="interference-pattern"></div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .perspective-500 {
          perspective: 500px;
        }
        
        .cube-container {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: rotateCube 25s linear infinite;
        }
        
        .cube {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }
        
        .cube-face {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 2px solid rgba(168, 85, 247, 0.4);
          background: linear-gradient(45deg, 
            rgba(168, 85, 247, 0.08) 0%, 
            rgba(59, 130, 246, 0.08) 50%, 
            rgba(6, 182, 212, 0.08) 100%);
          backdrop-filter: blur(3px);
          box-shadow: inset 0 0 20px rgba(168, 85, 247, 0.1);
        }
        
        .cube-face.front { transform: rotateY(0deg) translateZ(64px); }
        .cube-face.back { transform: rotateY(180deg) translateZ(64px); }
        .cube-face.right { transform: rotateY(90deg) translateZ(64px); }
        .cube-face.left { transform: rotateY(-90deg) translateZ(64px); }
        .cube-face.top { transform: rotateX(90deg) translateZ(64px); }
        .cube-face.bottom { transform: rotateX(-90deg) translateZ(64px); }
        
        .quantum-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 10px;
          height: 10px;
          background: radial-gradient(circle, #a855f7, #3b82f6, #06b6d4);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: quantumPulse 2.5s ease-in-out infinite;
          box-shadow: 
            0 0 20px rgba(168, 85, 247, 0.6),
            0 0 40px rgba(59, 130, 246, 0.3),
            0 0 60px rgba(6, 182, 212, 0.2);
        }
        
        .grid-pattern {
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(168, 85, 247, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.08) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        
        .interference-pattern {
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at 30% 40%, rgba(168, 85, 247, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(6, 182, 212, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.04) 0%, transparent 50%);
          background-size: 200px 200px, 250px 250px, 180px 180px;
          animation: interferenceShift 15s ease-in-out infinite;
        }
        
        .energy-ring {
          position: absolute;
          border-radius: 50%;
          animation: energyPulse 4s ease-in-out infinite;
        }
        
        .ring-1 {
          width: 120px;
          height: 120px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(168, 85, 247, 0.3);
          animation-delay: 0s;
        }
        
        .ring-2 {
          width: 180px;
          height: 180px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(59, 130, 246, 0.25);
          animation-delay: 1.3s;
        }
        
        .ring-3 {
          width: 240px;
          height: 240px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(6, 182, 212, 0.25);
          animation-delay: 2.6s;
        }
        
        .ring-cyan {
          width: 100px;
          height: 100px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid rgba(6, 182, 212, 0.4);
          animation-delay: 0.5s;
        }
        
        .ring-blue {
          width: 160px;
          height: 160px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(59, 130, 246, 0.3);
          animation-delay: 2s;
        }
        
        @keyframes rotateCube {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }
        
        @keyframes quantumFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
            opacity: 0.5;
          }
          25% { 
            transform: translateY(-25px) translateX(15px) scale(1.2) rotate(90deg);
            opacity: 0.8;
          }
          50% { 
            transform: translateY(10px) translateX(-20px) scale(0.8) rotate(180deg);
            opacity: 0.3;
          }
          75% { 
            transform: translateY(-15px) translateX(10px) scale(1.1) rotate(270deg);
            opacity: 0.6;
          }
        }
        
        @keyframes quantumPulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
          }
          33% { 
            transform: translate(-50%, -50%) scale(1.3) rotate(120deg);
            opacity: 0.7;
          }
          66% { 
            transform: translate(-50%, -50%) scale(0.9) rotate(240deg);
            opacity: 0.8;
          }
        }
        
        @keyframes energyPulse {
          0% { 
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.6;
            border-color: inherit;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.2;
            border-color: rgba(168, 85, 247, 0.4);
          }
          100% { 
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.6;
            border-color: inherit;
          }
        }
        
        @keyframes interferenceShift {
          0%, 100% { 
            transform: translateX(0px) translateY(0px);
          }
          33% { 
            transform: translateX(30px) translateY(-20px);
          }
          66% { 
            transform: translateX(-20px) translateY(25px);
          }
        }
      `}</style>
    </div>
  );
};

const Homepage = () => {
  const features = [
    // {
    //   icon: Upload,
    //   title: ".QASM Upload",
    //   description: "Support for OpenQASM 2.0 circuit definitions with real-time validation",
    //   color: "cyan"
    // },
    {
      icon: Atom,
      title: "Real-Time Qubit Analysis",
      description: "Compute reduced density matrices and visualize entanglement patterns",
      color: "purple"
    },
    {
      icon: Users,
      title: "Multi-Qubit Support",
      description: "Analyze complex entangled states across multiple qubits with comprehensive circuit visualization",
      color: "purple"
    },
    {
      icon: GanttChartSquare,
      title: "Quantum Assistant",
      description: "Answers questions about quantum computing and helps debug circuits",
      color: "purple"
    },
    {
      title: "Odyssey Quantum circuit simulator",
      description: "Simulate quantum circuits with high accuracy and visualize qubit states in real-time",
      icon: CircuitBoard,
      color: "purple"
    }
  ];

  const stats = [
    { label: "Accuracy", value: "99.9%" },
    { label: "Circuit Gates", value: "20+" },
  ];

  const basicsVideos = [
    {
      title: "Quantum Computer Vs Classical Computer",
      duration: "4:45",
      src: "/animated-video.mp4",
      cover: "/quantum-classical.png",
    },
    {
      title: "Quantum Superposition",
      duration: "3:45",
      src: "/superposition.mp4",
      cover: "/quantum-superposition.png",
    },
    {
      title: "Quantum Entanglement",
      duration: "4:12",
      src: "/animated-video.mp4",
      cover: "/quantum-entanglement.png",
    },
    {
      title: "Multi Qubit Circuit",
      duration: "5:30",
      src: "https://drive.google.com/file/d/1ABCdXYZ12345/view?usp=share", 
      cover: "/multi-qubit-circuit.png"
      
    },
    {
      title: "Bloch Sphere",
      duration: "6:15",
      src: "/animated-video.mp4",
      cover: "/block-sphere.png",

    },
    
    // {
    //   title: "Quantum Measurement",
    //   duration: "3:20",
    //   src: "/animated-video.mp4",
    //   cover: "/cover-photo.jpg",
    // }
  ];

  const applicationVideo = {
    title: "Quantum Computing Applications",
    description: "Explore real-world applications of quantum computing",
    src: "/real-world-applications.mp4",
    cover: "/applications-cover-image.png",
  };

  const [playAppVideo, setPlayAppVideo] = useState(false);
  const [appThumb, setAppThumb] = useState(null);
  const [loadingAppThumb, setLoadingAppThumb] = useState(true);

  // Load application video thumbnail
  useEffect(() => {
    const loadAppThumbnail = async () => {
      if (!applicationVideo.cover) {
        try {
          const thumb = await getCoverForVideo(applicationVideo.src);
          setAppThumb(thumb);
        } catch (error) {
          console.error('Error loading app thumbnail:', error);
          setAppThumb(`https://via.placeholder.com/1200x675/1a1a1a/3b82f6?text=Quantum+Computing+Applications`);
        }
      }
      setLoadingAppThumb(false);
    };

    loadAppThumbnail();
  }, [applicationVideo.src, applicationVideo.cover]);

  return (
    <div className="min-h-screen mt-16 lg:mt-10">
      {/* Hero Section with blurred background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Blurred Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter "
          style={{ backgroundImage: `url(${quantumHeroBg})` }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 relative max-w-8xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center lg:ml-12">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 lg:space-y-7 text-center lg:text-left order-1 lg:order-1"
            >
              <div className="space-y-4 lg:space-y-5">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center lg:justify-start"
                >
                  <Badge className="border border-purple-500/60 bg-black/20 backdrop-blur-sm text-purple-400 px-3 lg:px-4 py-1 lg:py-1.5 text-xs font-medium rounded-full mb-2 mt-8 lg:mt-0">
                    ⚛ Quantum Computing Platform
                  </Badge>
                </motion.div>
                
                {/* Title */}
                <h1 className="font-orbitron text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-6xl font-bold leading-[0.9] lg:leading-[0.85] tracking-wide">
                  <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Qubit
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Odyssey
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl lg:text-xl xl:text-2xl text-gray-200 font-medium font-rajdhani leading-relaxed">
                  Visualize Quantum Circuits Like Never Before
                </p>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-rajdhani">
                  Upload quantum circuits and explore qubit states on the Bloch sphere with real-time analysis and stunning visualizations.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-2 justify-center lg:justify-start">
                <Link to="/circuit" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-black/20 backdrop-blur-sm border border-gray-600/50 text-white hover:border-purple-500/50 hover:bg-black/30 transition-all duration-500 text-base lg:text-lg font-quantum px-6 lg:px-8 py-3">
                    Launch Visualizer →
                  </Button>
                </Link>
                <Button className="w-full sm:w-auto bg-transparent backdrop-blur-sm text-cyan-400 border-2 border-cyan-400/60 hover:bg-cyan-400/10 hover:text-cyan-300 px-6 lg:px-8 py-3 text-sm font-rajdhani font-semibold tracking-wide rounded-lg transition-all duration-300 min-w-[180px] lg:min-w-[200px]">
                  <Github className="w-4 h-4 mr-2" />
                  View Source
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 pt-6 lg:pt-8 justify-items-center lg:justify-items-start">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-center lg:text-left"
                  >
                    <div className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-orbitron text-cyan-400 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-300 text-sm lg:text-base font-rajdhani">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative h-[380px] sm:h-[480px] lg:h-[580px] xl:h-[620px] w-full max-w-[380px] sm:max-w-[480px] lg:max-w-[580px] xl:max-w-[620px] mx-auto order-1 lg:order-2"
            >
              {/* Square Particles with proper container */}
              <div className="absolute inset-0 z-10">
                <SquareParticles />
              </div>

              {/* Center Globe */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full max-w-[350px] max-h-[350px] sm:max-w-[420px] sm:max-h-[420px] lg:max-w-[500px] lg:max-h-[500px] xl:max-w-[550px] xl:max-h-[550px]">
                  <QuantumGlobe />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section with QuantumBackground */}
      <section className="py-16 sm:py-20 lg:py-32 relative overflow-hidden">
        {/* QuantumBackground Component */}
        <QuantumBackground section="features" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron text-cyan-400 mb-4 sm:mb-6 tracking-wide">
              Quantum State Visualizer
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-4xl mx-auto font-rajdhani leading-relaxed px-4">
              Bridge between complex quantum circuits and intuitive Bloch sphere insights.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-black/40 backdrop-blur-sm border border-cyan-400/40 h-full hover:border-cyan-400/100 transition-all duration-300 rounded-2xl group hover:bg-black/50 hover:shadow-2xl hover:shadow-cyan-500/20">
                    <CardContent className="p-6 lg:p-8 text-center h-full flex flex-col">
                      {/* Icon */}
                      <div
                        className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                          feature.color === 'cyan'
                            ? 'bg-cyan-400/20 text-cyan-400'
                            : feature.color === 'pink'
                            ? 'bg-purple-400/20 text-purple-400'
                            : 'bg-purple-400/20 text-purple-400'
                        }`}
                      >
                        <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-orbitron text-white mb-3 sm:mb-4 tracking-wide group-hover:text-cyan-400 transition-colors">
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-400 font-rajdhani leading-relaxed flex-grow">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Basics Section */}
      <section className="py-16 sm:py-20 lg:py-32 relative overflow-hidden">
        <QuantumBackground section="basics" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron text-purple-400 mb-4 sm:mb-6 tracking-wide">
              Quantum Basics
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-4xl mx-auto font-rajdhani leading-relaxed px-4">
              Master the fundamental concepts of quantum computing through interactive visualizations
            </p>
          </motion.div>

          {/* Video Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <VideoCarousel videos={basicsVideos} />
          </motion.div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-16 sm:py-20 lg:py-32 relative overflow-hidden">
        <QuantumBackground section="applications" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron text-blue-400 mb-4 sm:mb-6 tracking-wide">
              Real-World Applications
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-4xl mx-auto font-rajdhani leading-relaxed px-4">
              Discover how quantum computing is revolutionizing industries and solving complex problems
            </p>
          </motion.div>

          {/* ✅ Enhanced Application Video with auto thumbnail and inline play */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <Card className="bg-black/40 backdrop-blur-sm border border-gray-700/40 hover:border-blue-400/40 transition-all duration-300 rounded-2xl group hover:bg-black/50 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden">
              {/* Video Container */}
              <div className="relative">
                {!playAppVideo ? (
                  <div
                    className="relative aspect-video cursor-pointer bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20 flex items-center justify-center"
                    onClick={() => setPlayAppVideo(true)}
                  >
                    {loadingAppThumb ? (
                      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        {/* Cover Image */}
                        <img
                          src={applicationVideo.cover || appThumb || `https://via.placeholder.com/1200x675/1a1a1a/3b82f6?text=Quantum+Computing+Applications`}
                          alt={applicationVideo.title}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="bg-blue-500/80 backdrop-blur-sm p-5 sm:p-6 rounded-full group-hover:bg-blue-500/90 transition-all duration-300 transform group-hover:scale-110">
                            <Play className="w-10 h-10 sm:w-12 sm:h-12 text-white fill-white" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20">
                    <video
                      className="w-full h-full object-cover rounded-t-2xl"
                      controls
                      autoPlay
                      poster={applicationVideo.cover || appThumb || `https://via.placeholder.com/1200x675/1a1a1a/3b82f6?text=Quantum+Computing+Applications`}
                      preload="metadata"
                    >
                      <source src={applicationVideo.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>

              {/* Content */}
              <CardContent className="p-6 sm:p-8">
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-orbitron text-white mb-4 group-hover:text-blue-400 transition-colors">
                    {applicationVideo.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 font-rajdhani leading-relaxed max-w-3xl mx-auto">
                    {applicationVideo.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section with QuantumBackground */}
      <section className="py-16 sm:py-20 lg:py-32 relative overflow-hidden">
        {/* QuantumBackground Component */}
        <QuantumBackground section="cta" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold mt-6 sm:mt-10 mb-6 sm:mb-8 leading-tight tracking-wide px-4">
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Ready to Explore Quantum
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Reality?
              </span>
            </h2>
            
            <p className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-12 font-rajdhani max-w-3xl mx-auto leading-relaxed px-4">
              Start visualizing quantum circuits and understanding qubit states today with Qubit Odyssey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-20 px-4">
              <Link to="/circuit">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base font-rajdhani font-semibold rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 min-w-[200px] sm:min-w-[220px]">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Get Started Now →
                </Button>
              </Link>
              
              <Button className="w-full sm:w-auto bg-transparent border-2 border-cyan-400 text-cyan-400 px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base font-rajdhani font-semibold rounded-lg hover:bg-cyan-400 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/25 min-w-[200px] sm:min-w-[220px]">
                View Documentation
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Additional Custom Animations for the page */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(5deg); }
            50% { transform: translateY(-20px) rotate(0deg); }
            75% { transform: translateY(-10px) rotate(-5deg); }
          }

          @keyframes orbit {
            0% { transform: rotate(0deg) translateX(20px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(20px) rotate(-360deg); }
          }

          @keyframes rotate3D {
            0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
            33% { transform: rotateX(120deg) rotateY(120deg) rotateZ(120deg); }
            66% { transform: rotateX(240deg) rotateY(240deg) rotateZ(240deg); }
            100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
          }

          @keyframes float3D {
            0%, 100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
            25% { transform: translateY(-15px) rotateX(15deg) rotateY(15deg); }
            50% { transform: translateY(-30px) rotateX(0deg) rotateY(30deg); }
            75% { transform: translateY(-15px) rotateX(-15deg) rotateY(15deg); }
          }

          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            25% { transform: translate(-10px, -10px); }
            50% { transform: translate(-20px, 0); }
            75% { transform: translate(-10px, 10px); }
            100% { transform: translate(0, 0); }
          }

                    @keyframes holographicMove {
            0% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(-15px, -15px) scale(1.05); }
            50% { transform: translate(-30px, 0) scale(1); }
            75% { transform: translate(-15px, 15px) scale(0.95); }
            100% { transform: translate(0, 0) scale(1); }
          }

          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </section>
    </div>
  );
};

export default Homepage;