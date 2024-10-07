import Image from "next/image";
import lucas from "../../../public/lucas.jpeg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faGoogle,
  faLinkedin,
  faAngular,
} from "@fortawesome/free-brands-svg-icons";

export default function Profile() {
  return (
    <>
      <div className="flex items-center justify-center h-screen flex-col">
        <Image
          alt="Lucas Santos"
          className="rounded-full mb-4 border-green-500 border-4"
          height={256}
          width={256}
          priority={true}
          src={lucas}
        />

        <div>
          <h1 className="text-slate-100 text-5xl text-center">Lucas Santos</h1>
          <h1 className="text-slate-100 text-center text-xl flex">
            Front-End Developer -&nbsp;
            <a
              href="https://interstate21.com/certificate/?code=5D14JTX"
              target="_blank"
            >
              <div className="flex gap-1">
                <span>Angular Certified</span>{" "}
                <span className="text-xs">®</span>
              </div>
            </a>
          </h1>
        </div>

        <div className="flex gap-4 mt-4">
          <a
            aria-label="GitHub"
            href="https://github.com/ffavareto"
            target="_blank"
            className="hover:scale-125 transition-all"
          >
            <FontAwesomeIcon
              aria-label="GitHub"
              color="#f1f5f9"
              height={42}
              icon={faGithub}
              title="GitHub"
              width={42}
            />
          </a>

          <a
            aria-label="LinkedIn"
            href="https://www.linkedin.com/in/lucasfavareto/"
            target="_blank"
            className="hover:scale-125 transition-all"
          >
            <FontAwesomeIcon
              aria-label="LinkedIn"
              color="#f1f5f9"
              height={42}
              icon={faLinkedin}
              title="LinkedIn"
              width={42}
            />
          </a>

          <a
            aria-label="Gmail"
            href="mailto:lucasfavaretosantos98@gmail.com"
            target="_blank"
            className="hover:scale-125 transition-all"
          >
            <FontAwesomeIcon
              aria-label="Gmail"
              color="#f1f5f9"
              height={42}
              icon={faGoogle}
              title="Gmail"
              width={42}
            />
          </a>

          <a
            aria-label="Angular Certified"
            href="https://interstate21.com/certificate/?code=5D14JTX"
            target="_blank"
            className="hover:scale-125 transition-all"
          >
            <FontAwesomeIcon
              aria-label="Angular Certified"
              color="#f1f5f9"
              height={42}
              icon={faAngular}
              title="Angular Certified"
              width={42}
            />
          </a>
        </div>
      </div>
    </>
  );
}
