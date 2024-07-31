import Image from "next/image";
import lucas from "../../../public/lucas-santos.jpg";

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
          className="rounded-full mb-4"
          height={192}
          priority={true}
          src={lucas}
          width={192}
        />

        <div>
          <h1 className="text-slate-100 text-4xl  text-center">Lucas Santos</h1>
          <h1 className="text-slate-100  text-center">
            Front-End Developer -&nbsp;
            <a
              href="https://interstate21.com/certificate/?code=5D14JTX"
              target="_blank"
              className="text-red-500 font-bold"
            >
              Angular Certified
            </a>
          </h1>
        </div>

        <div className="flex gap-4 mt-4">
          <a
            aria-label="GitHub"
            href="https://github.com/ffavareto"
            target="_blank"
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
