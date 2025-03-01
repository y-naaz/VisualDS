import cacheHitSound from "../assets/cache-hit.mp3";
import cacheMissSound from "../assets/cache-miss.mp3";
import cachePutSound from "../assets/cache-put.mp3";

const Sounds = {
  playHit: () => new Audio(cacheHitSound).play(),
  playMiss: () => new Audio(cacheMissSound).play(),
  playPut: () => new Audio(cachePutSound).play(),
};

export default Sounds;
