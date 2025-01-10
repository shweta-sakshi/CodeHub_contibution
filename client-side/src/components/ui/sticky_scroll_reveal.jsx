import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
  image
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
        return index;
      }
      return acc;
    }, 0);
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "black",
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
    "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    (<motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[30rem]  overflow-y-auto flex justify-center relative space-x-10 px-10 "
      ref={ref}>

      <div className=" div relative flex items-start ">

        <div className="max-w-3xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-10">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-[1.5rem] text-accent md:text-left text-center md:text-[2rem] font-bold">
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-slate-300 text-lg md:text-2xl mt-5  md:mt-10">
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      {image ? (
        <div
          style={{ boxShadow: backgroundGradient }}
          className={cn(
            "hidden lg:block h-auto w-80 sticky top-10 overflow-hidden",
            contentClassName
          )}>
          <img src={image} alt="Objectives" />
        </div>

      ) :
        <div
          style={{ background: backgroundGradient }}
          className={cn(
            "hidden lg:block h-60 w-80 sticky top-10 overflow-hidden",
            contentClassName
          )}>
          {content[activeCard].content ?? null}
        </div>}
    </motion.div >)
  );
};
