import { BorderBeam } from "../ui/border-beam";
interface BorderBeamDemoProps {
  image: string; // Define the type for the image prop
}
export function BorderBeamDemo({ image }: BorderBeamDemoProps) {
  return (
    <div className="relative flex h-[250px] w-[250px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px] m-auto flex-col items-center justify-center overflow-hidden rounded-lg border bg-background shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-5xl sm:text-6xl md:text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        <img
          className="w-[250px] h-[250px] sm:w-[340px] sm:h-[340px] md:w-[390px] md:h-[390px] rounded-sm"
          src={image}
          alt="Illustration"
        />
      </span>
      <BorderBeam size={250} duration={12} delay={9} />
    </div>
  );
}
