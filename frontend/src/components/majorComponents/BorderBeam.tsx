import { BorderBeam } from "../ui/border-beam";
interface BorderBeamDemoProps {
    image: string; // Define the type for the image prop
  }
export function BorderBeamDemo({ image }: BorderBeamDemoProps) {
  return (
    <div className="relative flex h-[400px] w-[400px] m-auto flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        <img className="w-[390px] h-[390px] rounded-sm" src={image} alt="Illustration" />
      </span>
      <BorderBeam size={250} duration={12} delay={9} />
    </div>
  );
}
