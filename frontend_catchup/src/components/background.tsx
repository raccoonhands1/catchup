import Image from "next/image";
export default function BackgroundBlurImage() {
  return (
    <div className="absolute inset-0 -z-50 blur-[40px]">
      <Image
        src="/bg.jpg"
        layout="fill"
        objectFit="cover"
        quality={100}
        alt="manu"
      />
    </div>
  );
}
