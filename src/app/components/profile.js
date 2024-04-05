import Image from "next/image";

import github from "../../../public/github.svg";
import linkedin from "../../../public/linkedin.svg";
import gmail from "../../../public/gmail.svg";
import lucas from "../../../public/lucas-santos.jpeg";

export default function Profile() {
  return (
    <>
      <div className="flex items-center justify-center h-screen flex-col">
        <Image
          src={lucas}
          width={256}
          height={256}
          alt="Lucas Santos"
          priority={true}
          className="rounded-full mb-4"
        />

        <h1 className="text-slate-100 text-4xl font-mono">Lucas Santos</h1>
        <h1 className="text-slate-100 font-mono">Front-End Developer</h1>

        <div className="flex gap-2 mt-4">
          <a href="https://github.com/ffavareto" target="_blank">
            <Image
              src={github}
              width={56}
              height={56}
              alt="GitHub logo"
              priority={true}
            />
          </a>

          <a href="https://www.linkedin.com/in/lucasfavareto/" target="_blank">
            <Image
              src={linkedin}
              width={56}
              height={56}
              alt="Linkedin logo"
              priority={true}
            />
          </a>

          <a href="mailto:lucasfavaretosantos98@gmail.com" target="_blank">
            <Image
              src={gmail}
              width={56}
              height={56}
              alt="Gmail logo"
              priority={true}
            />
          </a>
        </div>
      </div>
    </>
  );
}
