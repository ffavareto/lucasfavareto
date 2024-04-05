import Image from "next/image";

import github from "../../../public/github.svg";
import linkedin from "../../../public/linkedin.svg";
import gmail from "../../../public/gmail.svg";
import lucas from "../../../public/lucas-santos.jpeg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faGoogle,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

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

        <div className="flex gap-4 mt-4">
          <a href="https://github.com/ffavareto" target="_blank">
            <FontAwesomeIcon
              icon={faGithub}
              color="#f1f5f9"
              height={42}
              width={42}
            />
          </a>

          <a href="https://www.linkedin.com/in/lucasfavareto/" target="_blank">
            <FontAwesomeIcon
              icon={faLinkedin}
              color="#f1f5f9"
              height={42}
              width={42}
            />
          </a>

          <a href="mailto:lucasfavaretosantos98@gmail.com" target="_blank">
            <FontAwesomeIcon
              icon={faGoogle}
              color="#f1f5f9"
              height={42}
              width={42}
            />
          </a>
        </div>
      </div>
    </>
  );
}
