import Title from "../components/title";

export default function Curriculum() {
  const date = new Date();
  const experienceYears = date.getFullYear() - 2020;
  const skills = [
    "Angular, TypeScript, RxJs",
    "JavaScript, HTML5, CSS3, SCSS",
    "Angular Material, Tailwind CSS, Prime NG",
    "Git, GitHub, Azure DevOps",
    "Jest, Vitest",
    "Conhecimento em Docker / conteinerização de aplicações",
    "Conhecimento em processos de CI/CD, GitHub Actions e Azure DevOps (yaml)",
    "Conhecimento em React e NextJS",
    "Scrum, kanban",
  ];

  return (
    <>
      <div className="p-4">
        <div className="text-slate-100">
          <div className="mt-8 flex items-center justify-center">
            <h1 className="w-fit text-center text-2xl md:text-5xl border-4 border-slate-100 p-5 pb-3 font-bold">
              LUCAS SANTOS
            </h1>
          </div>

          <div className="mb-2 flex items-center justify-center text-slate-400 flex-col">
            <h1 className="w-fit text-center md:text-2xl p-5 pb-3 font-bold">
              DESENVOLVEDOR FRONT-END
            </h1>
          </div>
        </div>

        <div>
          <div className="border-2 border-slate-100 p-5 flex flex-col gap-2 mt-4 text-slate-100 mb-4">
            <Title>Skills</Title>
            <div className="flex flex-col gap-4 text-xs md:text-base">
              <div>
                <ul>
                  {skills.map((skill, i) => {
                    return <li key={i}>- {skill}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-2 border-slate-100 p-5 flex flex-col gap-2 mb-4 text-slate-100">
            <Title>Experiência</Title>
            <div className="flex flex-col gap-4 text-xs md:text-base">
              <div>
                <b>
                  ECS Inovação - Desenvolvedor web - Setembro de 2022 - cargo
                  atual
                </b>
                <div className="flex flex-col gap-4 text-xs md:text-base">
                  <p>
                    Na ECS, tive a oportunidade de participar ativamente da
                    migração do projeto Pharmalink (que agora conecta mais de 50
                    mil farmácias e drogarias), atuei na migração da versão do
                    framework utilizado, passando de AngularJS para Angular 16.
                  </p>

                  <p>
                    Fui responsável pelo front-end de algumas aplicações na
                    indústria farmacêutica e da elétrica industrial, uma delas
                    com potencial internacional onde implementei a
                    internacionalização da aplicação.
                  </p>

                  <p>
                    Configurei algumas pipelines no azure devops, com testes
                    automatizados, cobertura de testes, build e deploy.
                  </p>

                  <p>
                    Também apresentei melhor para outros devs a questão dos
                    pipelines do azure devops no modo .yaml, incentivei o uso
                    dos testes unitários/integração para aqueles que não ainda
                    tinham costume de faze-los.
                  </p>
                </div>
              </div>
              <hr />
              <div>
                <b>
                  Faculdade IV2 - Desenvolvedor e instrutor - Junho de 2020 -
                  Agosto de 2022 (2 anos 3 meses)
                </b>
                <p>
                  Atuei como desenvolvedor front-end usando Angular e também
                  como instrutor para iniciantes na área do desenvolvimento web,
                  ensinava HTML, CSS e JavaScript.
                </p>
              </div>
              <hr />
              <div>
                <b>
                  Grupo IV2 - Estagiário - Novembro de 2019 - Maio de 2020 (7
                  meses)
                </b>
                <p>Testes, desenvolvimento front-end.</p>
              </div>
            </div>
          </div>

          <div className="border-2 border-slate-100 p-5 flex flex-col gap-2 text-slate-100">
            <Title>Sobre mim</Title>
            <div className="flex flex-col gap-4 text-xs md:text-base">
              <p>
                Desenvolvedor web com {experienceYears} anos de experiência em
                tecnologias como Angular, JavaScript, TypeScript, HTML5, CSS3,
                Angular Material e Tailwind CSS.
              </p>

              <p>
                Participei de projetos novos e legados até refatorações de
                grandes projetos, quase sempre usando o scrum nas equipes em que
                trabalhei.
              </p>

              <p>
                Tive a oportunidade de participar ativamente da migração de um
                grande projeto da área farmacêutica. Essa experiência foi muito
                importante pois pude contribuir para a modernização de uma
                plataforma que conecta mais de 50 mil farmácias e drogarias.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
