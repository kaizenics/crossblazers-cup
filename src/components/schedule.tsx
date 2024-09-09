import { cn } from "@/lib/utils";
import {
    IconCalendarEvent
} from "@tabler/icons-react";
import { Container } from "@/components/ui/container";

export function Schedule() {
  const schedules = [
    {
      title: "Nomember 14, 2024",
      description: "Opening Schedule, Basketball Womens, Tennis Womens, Etc.",
      icon: <IconCalendarEvent />,
    },
    {
      title: "November 15, 2024",
      description:
        "Ping Pong, Palarong Pinoy, Board Games, etc.",
      icon: <IconCalendarEvent />,
    },
    {
      title: "November 16, 2024",
      description:
        "Battle of the Bands, Badminton, Basketball, etc.",
      icon: <IconCalendarEvent />,
    },
    {
      title: "November 17, 2024",
      description: "HCDC Ambassadress, MLBB and CODM Tournament, etc.",
      icon: <IconCalendarEvent />,
    },
    {
      title: "November 18, 2024",
      description: "Dota 2 Tournament, Sayaw Cinco, etc.",
      icon: <IconCalendarEvent />,
    },
    {
      title: "November 19, 2024",
      description:
        "Arise and Sing, Hip Hop, etc.",
      icon: <IconCalendarEvent />,
    },
    {
      title: "November 20, 2024",
      description:
        "Spoken Poetry, Tula, Riddles, etc.",
      icon: <IconCalendarEvent />,
    },
    {
      title: "November 21, 2024",
      description: "Closing Remarks, Awarding of the Participants, Hall of Fame, etc.",
      icon: <IconCalendarEvent />,
    },
  ];
  return (
    <Container variant={"fullMobileBreakpointPadded"}>
     <p className="font-raceSport text-center text-4xl">Upcoming Schedules</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-8xl mx-auto">
        {schedules.map((schedule, index) => (
          <Feature key={schedule.title} {...schedule} index={index} />
        ))}
      </div>
    </Container>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature border-white/[0.2]",
        (index === 0 || index === 4) && "lg:border-l border-white/[0.2]",
        index < 4 && "lg:border-b border-white/[0.2]"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-sky-900 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-sky-900 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-400">{icon}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="font-montserrat group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100">
          {title}
        </span>
      </div>
      <p className="font-montserrat group-hover/feature:translate-x-2 transition duration-200 text-sm text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
