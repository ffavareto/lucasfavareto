import Title from "../components/title";

export default function Curriculum() {
  const date = new Date();
  const experienceYears = date.getFullYear() - 2020;

  return (
    <>
      <div className="text-slate-100">
        <div className="m-8">
          <h2 className="text-center font-mono">CURRÍCULO</h2>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <h1 className="w-fit text-center text-5xl border-4 border-slate-100 p-5 pb-3 font-bold font-mono">
            LUCAS SANTOS
          </h1>
        </div>

        <div className="mb-2 flex items-center justify-center text-slate-400">
          <h1 className="w-fit text-center text-2xl p-5 pb-3 font-bold font-mono">
            DESENVOLVEDOR FRONT-END
          </h1>
        </div>

        <div className="border-2 border-slate-100 p-5 font-mono flex flex-col gap-2">
          <Title>Sobre mim</Title>
          <p>
            Sou um desenvolvedor front-end com especialização em tecnologias
            como Angular e TypeScript, acumulando mais de {experienceYears} anos
            de experiência desde o meu início como estagiário em novembro de
            2019.
          </p>
          <p>
            Tenho uma boa base técnica no front-end e estou constantemente
            ampliando meu conhecimento, recentemente explorando áreas como SQL,
            NestJS e Docker. Além disso, tenho me dedicado ao aprimoramento em
            testes unitários, reconhecendo sua importância fundamental para
            garantir a qualidade e estabilidade de qualquer aplicação em
            produção.
          </p>
          <p>
            Minha experiência abrange desde novas implementações até manutenções
            em projetos existentes, incluindo migrações de tecnologia. Estou
            comprometido em buscar sempre os melhores padrões e práticas de
            desenvolvimento para entregar soluções de alta qualidade e
            desempenho.
          </p>
        </div>
      </div>

      <div className="border-2 border-slate-100 p-5 font-mono flex flex-col gap-2 mt-4">
        <Title>Experiência</Title>

        <div className="text-slate-100">
          <div className="mb-4">
            <h2 className="w-fit text-slate-100">
              ECS Inovação - Desenvolvedor front-end
            </h2>
            <p>Setembro de 2022 - presente</p>
            <p>
              Na ECS, tive a oportunidade de participar ativamente da migração
              do projeto da Pharmalink de AngularJS para Angular 16 como
              desenvolvedor front-end. Essa experiência foi enriquecedora, pois
              pude contribuir para a modernização da plataforma que agora
              conecta mais de 50 mil farmácias e drogarias.
            </p>
          </div>
          <hr />
          <div className="my-4">
            <h2 className="w-fit text-slate-100">
              Faculdade IV2 - Desenvolvedor e instrutor front-end
            </h2>
            <p>Junho de 2020 - Agosto de 2022 (2 anos 3 meses)</p>
            <p>
              Atuei como desenvolvedor front-end usando Angular e também como
              instrutor para iniciantes na área do desenvolvimento web, ensinava
              HTML, CSS e JavaScript.
            </p>
          </div>
          <hr />
          <div className="my-4">
            <h2 className="w-fit text-slate-100">
              Grupo IV2 - Estagiário front-end
            </h2>
            <p>Novembro de 2019 - Maio de 2020 (7 meses)</p>
            <p>Testes, desenvolvimento front-end.</p>
          </div>
        </div>
      </div>
    </>
  );
}
