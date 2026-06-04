import { useEffect, useRef, useState } from "react";
import { Music, Music2 } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/music/mix.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    const attemptPlay = () => {
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => {
          const unlock = () => {
            audio.play().then(() => {
              setPlaying(true);
              document.removeEventListener("click", unlock);
              document.removeEventListener("touchstart", unlock);
            }).catch(() => {});
          };
          document.addEventListener("click", unlock);
          document.addEventListener("touchstart", unlock);
        });
    };

    attemptPlay();

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <button
      onClick={toggle}
      title={playing ? "Pause musique" : "Reprendre la musique"}
      className="fixed z-50 flex items-center justify-center transition-all active:scale-95"
      style={{
        bottom: "28px",
        right: "20px",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        background: "#1A1A1A",
        border: playing
          ? "1px solid rgba(201,162,39,0.5)"
          : "1px solid rgba(255,255,255,0.08)",
        color: playing ? "#C9A227" : "#666",
        boxShadow: playing
          ? "0 0 18px rgba(201,162,39,0.18)"
          : "0 4px 16px rgba(0,0,0,0.5)",
      }}
    >
      {playing
        ? <Music2 size={18} className="animate-pulse" />
        : <Music size={18} />
      }
    </button>
  );
}