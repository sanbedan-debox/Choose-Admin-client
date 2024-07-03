import { useEffect } from "react";
import { cn } from "@/util/cn";
import { motion } from "framer-motion";
import useTabStore from "./store";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const { tabs, setTabs, active, setActive } = useTabStore();

  useEffect(() => {
    if (propTabs.length > 0) {
      setTabs(propTabs);
      setActive(propTabs[0]);
    }
  }, [propTabs, setTabs, setActive]);

  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
          containerClassName
        )}
      >
        {tabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              setActive(tab);
            }}
            className={cn(
              "relative px-4 py-2 rounded-full",
              tabClassName,
              active.value === tab.value ? "text-white" : "text-black"
            )}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-primary rounded-full",
                  activeTabClassName
                )}
              />
            )}

            <span className="relative block">{tab.title}</span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        className={cn("mt-10", contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  active,
  hovering,
}: {
  className?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  const isActive = (tab: Tab) => {
    return tab.value === active.value;
  };

  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => (
        <div
          key={tab.value}
          style={{
            scale: isActive(tab) ? 1 : 0.9,
            top: hovering && isActive(tab) ? idx * -50 : 0,
            zIndex: isActive(tab) ? 1 : 0,
            opacity: isActive(tab) ? 1 : 0.5,
          }}
          className={cn(
            "w-full h-full absolute top-0 left-0 bg-background",
            className
          )}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};
