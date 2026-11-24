import React, { memo, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { RotateCw, Move } from "lucide-react";
import lanyardImg from "../assets/images/astech-lanyard.png";
import cardFrontImg from "../assets/images/dio-card-front.png";
import cardBackImg from "../assets/images/dio-card-back.png";

const IdCardLanyard = memo(() => {
  const [flipped, setFlipped] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-140, 0, 140], [-18, 0, 18]);
  const rotateY = useTransform(x, [-140, 0, 140], [-8, 0, 8]);

  const triggerSwing = () => {
    const sequence = async () => {
      await animate(x, 80, { type: "spring", stiffness: 180, damping: 10 });
      await animate(x, -60, { type: "spring", stiffness: 160, damping: 12 });
      await animate(x, 30, { type: "spring", stiffness: 140, damping: 14 });
      await animate(x, 0, { type: "spring", stiffness: 120, damping: 16 });
    };
    sequence();
  };

  return (
    <div className="flex justify-center items-start w-full">
      <div className="relative flex flex-col items-center w-full max-w-[240px] sm:max-w-[260px] md:max-w-[280px] select-none">
        <div className="relative z-10 mt-4 sm:mt-6 -mb-2 sm:-mb-3 pointer-events-none">
          <img
            src={lanyardImg}
            alt="Lanyard"
            className="w-12 sm:w-14 md:w-16 h-auto drop-shadow-lg"
            draggable="false"
          />
        </div>

        <motion.div
          className="relative z-20 cursor-grab active:cursor-grabbing touch-none"
          style={{ x, rotate, rotateY, transformOrigin: "top center" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          whileTap={{ cursor: "grabbing" }}
        >
          <div
            className="relative w-[170px] sm:w-[200px] md:w-[220px]"
            style={{ perspective: "1200px" }}
          >
            <motion.div
              className="relative w-full"
              style={{
                transformStyle: "preserve-3d",
                aspectRatio: "768 / 1205",
              }}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setFlipped((value) => !value)}
            >
              <div
                className="absolute inset-0 rounded-xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/10"
                style={{ backfaceVisibility: "hidden" }}
              >
                <img
                  src={cardFrontImg}
                  alt="ID Card depan - Dio Gentano Ramadhan"
                  className="w-full h-full object-cover"
                  draggable="false"
                />
              </div>
              <div
                className="absolute inset-0 rounded-xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/10"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <img
                  src={cardBackImg}
                  alt="ID Card belakang - Dio Gentano Ramadhan"
                  className="w-full h-full object-cover"
                  draggable="false"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-3 sm:mt-4 flex flex-row flex-wrap gap-2 w-full justify-center items-center px-1">
          <button
            type="button"
            onClick={triggerSwing}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-white/5 border border-white/10 text-gray-200 text-[11px] sm:text-xs hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
          >
            <Move className="w-3.5 h-3.5 text-[#6366f1]" />
            Ayun
          </button>
          <button
            type="button"
            onClick={() => setFlipped((value) => !value)}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-white/5 border border-white/10 text-gray-200 text-[11px] sm:text-xs hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
          >
            <RotateCw className="w-3.5 h-3.5 text-[#a855f7]" />
            Balik
          </button>
        </div>

        <p className="mt-2 text-[10px] sm:text-[11px] text-gray-500 text-center leading-snug">
          Geser untuk mengayun, klik kartu untuk membalik.
        </p>
      </div>
    </div>
  );
});

IdCardLanyard.displayName = "IdCardLanyard";

export default IdCardLanyard;
