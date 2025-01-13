/**
 * @fileoverview Renders a scrollable container with animated content and background.
 * @purpose to display objective of the CodeHub.
 */
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";

import { cn } from "../../lib/utils";

/**
 * @desc Renders a scrollable container with animated content and background.
 */
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
  const cardLength = content.length; // Total number of content cards.

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    // Calculate the scroll breakpoints for each card.
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
        return index;
      }
      return acc;
    }, 0);
    setActiveCard(closestBreakpointIndex); //update active card.
  });

  //background colors for the container.
  const backgroundColors = [
    "black",
  ];

  //list of Linear gradients.
  const linearGradients = [
    "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
    "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

  //update the gradient based on the active card.
  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (

    // Render the container with the content .
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

      {/* Render the image or content based on the active card. */}
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
