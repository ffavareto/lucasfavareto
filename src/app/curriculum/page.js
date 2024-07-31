import Title from "../components/title";

export default function Curriculum() {
  const date = new Date();
  const experienceYears = date.getFullYear() - 2020;

  return (
    <>
      <div className="p-4">
        <div className="text-slate-100">
          <div className="m-8 flex justify-center">
            <Title>Currículo</Title>
          </div>

          <div className="mt-8 flex items-center justify-center">
            <h1 className="w-fit text-center text-2xl md:text-5xl border-4 border-slate-100 p-5 pb-3 font-bold">
              LUCAS SANTOS
            </h1>
          </div>

          <div className="mb-2 flex items-center justify-center text-slate-400 flex-col">
            <h1 className="w-fit text-center md:text-2xl p-5 pb-3 font-bold">
              DESENVOLVEDOR WEB
            </h1>
          </div>
        </div>

        <div>
          <div className="border-2 border-slate-100 p-5 flex flex-col gap-2 mb-4 text-slate-100">
            <Title>Experiência</Title>
            <div className="flex flex-col gap-4 text-xs md:text-base">
              <div className="mb-4">
                <h2>ECS Inovação - Desenvolvedor web</h2>
                <p>Setembro de 2022 - cargo atual</p>
                <p>
                  Na ECS, tive a oportunidade de participar ativamente da
                  migração do projeto da Pharmalink de AngularJS para Angular 16
                  como desenvolvedor front-end. Essa experiência foi
                  enriquecedora, pois pude contribuir para a modernização da
                  plataforma que agora conecta mais de <b>50 mil farmácias</b> e
                  drogarias.
                </p>
              </div>
              <hr />
              <div className="my-4">
                <h2>Faculdade IV2 - Desenvolvedor e instrutor</h2>
                <p>Junho de 2020 - Agosto de 2022 (2 anos 3 meses)</p>
                <p>
                  Atuei como desenvolvedor front-end usando Angular e também
                  como instrutor para iniciantes na área do desenvolvimento web,
                  ensinava HTML, CSS e JavaScript.
                </p>
              </div>
              <hr />
              <div className="my-4">
                <h2>Grupo IV2 - Estagiário</h2>
                <p>Novembro de 2019 - Maio de 2020 (7 meses)</p>
                <p>Testes, desenvolvimento front-end.</p>
              </div>
            </div>
          </div>

          <div className="border-2 border-slate-100 p-5 flex flex-col gap-2 text-slate-100">
            <Title>Sobre mim</Title>
            <div className="flex flex-col gap-4 text-xs md:text-base">
              <p>
                Desenvolvedor front-end com mais de quatro anos de experiência
                em tecnologias como Angular, JavaScript, TypeScript, HTML5,
                CSS3, Angular Material e Tailwind CSS.
              </p>
              <p>
                Tenho experiência em controle de versão com Git e GitHub, além
                de automações com GitHub Actions.
              </p>
              <p>
                Trabalho com testes unitários e de integração usando Jest e sei
                usar Docker para configurar ambientes de desenvolvimento.
              </p>
              <p>
                Tenho algum conhecimento em SQL, Java, C# e um pouco de NextJS.
                Estou em busca de uma nova oportunidade para atuar como
                desenvolvedor full-stack ou front-end.
              </p>
              <p>
                Participei de projetos novos e legados até refatorações de
                grandes projetos.
              </p>
            </div>
          </div>

          <div className="border-2 border-slate-100 p-5 flex flex-col gap-2 mt-4 text-slate-100">
            <Title>Skills</Title>
            <div className="flex flex-col gap-4 text-xs md:text-base">
              <div className="mb-4">
                <p>
                  Front-end: Angular, JavaScript, TypeScript, HTML5, CSS3,
                  Angular Material, Tailwind CSS, NextJS, PrimeNG, Git, GitHub,
                  Jest (unitários e de integração), conhecimento em Docker /
                  conteinerização de aplicações, conhecimento em processos de
                  CI/CD, GitHub Actions Scrum, kanban
                </p>
                <br />
                Outras habilidades:
                <p>Back-end: SQL, Java, C#</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
