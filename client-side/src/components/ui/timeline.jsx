/**
 * @fileoverview timeline component -Displays a user's timeline with sticky elements and animated progress.
 * @purpose To display motive of the CodeHub.
 */
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({
  data
}) => {

  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  // Measure the height of the timeline when the component mounts
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  // Use the scrollYProgress to animate the progress bar.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    (<div
      className="w-full font-sans"
      ref={containerRef}>

      {/* Timeline */}
      <div ref={ref} className=" relative md:max-w-[90%] md:px-10  md:mx-auto pb-20">

        {/* Timeline items */}
        {data.map((item, index) => (
            //each timeline item format.
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
            <div
              className="sticky flex flex-col md:flex-row  items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div
                className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg- flex items-center justify-center">
                <div
                  className="h-4 w-4 rounded-full  dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3
                className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-yellow-600 dark:text-neutral-500 ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3
                className="md:hidden block text-2xl mb-4 text-left font-bold text-yellow-600 dark:text-neutral-500">
                {item.title}
              </h3>
              <div className="text-slate-300 text-lg md:text-2xl">
                {item.content}{" "}
              </div>
            </div>
          </div>
        ))}

        // Progress bar
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] ">
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-yellow-500 via-blue-500 to-white from-[5%] via-[10%]  to-[60%] rounded-full" />
        </div>

      </div>
    </div>)
  );
};
