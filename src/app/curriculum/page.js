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
              DESENVOLVEDOR FRONT-END
            </h1>
          </div>
        </div>

        <div>
          <div className="border-2 border-slate-100 p-5 flex flex-col gap-2 text-slate-100">
            <Title>Sobre mim</Title>
            <div className="flex flex-col gap-4 text-xs md:text-base">
              <p>
                Sou um desenvolvedor front-end com especialização em tecnologias
                como Angular e TypeScript, acumulando mais de {experienceYears}{" "}
                anos de experiência desde o meu início como estagiário em
                novembro de 2019.
              </p>
              <p>
                Tenho uma boa base técnica no front-end e estou constantemente
                ampliando meu conhecimento, recentemente explorando áreas como
                SQL, NestJS e Docker. Além disso, tenho me dedicado ao
                aprimoramento em testes unitários, reconhecendo sua importância
                fundamental para garantir a qualidade e estabilidade de qualquer
                aplicação em produção.
              </p>
              <p>
                Minha experiência abrange desde novas implementações até
                manutenções em projetos existentes, incluindo migrações de
                tecnologia. Estou comprometido em buscar sempre os melhores
                padrões e práticas de desenvolvimento para entregar soluções de
                alta qualidade e desempenho.
              </p>
            </div>
          </div>

          <div className="border-2 border-slate-100 p-5 flex flex-col gap-2 mt-4 text-slate-100">
            <Title>Experiência</Title>
            <div className="flex flex-col gap-4 text-xs md:text-base">
              <div className="mb-4">
                <h2>ECS Inovação - Desenvolvedor front-end</h2>
                <p>Setembro de 2022 - presente</p>
                <p>
                  Na ECS, tive a oportunidade de participar ativamente da
                  migração do projeto da Pharmalink de AngularJS para Angular 16
                  como desenvolvedor front-end. Essa experiência foi
                  enriquecedora, pois pude contribuir para a modernização da
                  plataforma que agora conecta mais de 50 mil farmácias e
                  drogarias.
                </p>
              </div>
              <hr />
              <div className="my-4">
                <h2>Faculdade IV2 - Desenvolvedor e instrutor front-end</h2>
                <p>Junho de 2020 - Agosto de 2022 (2 anos 3 meses)</p>
                <p>
                  Atuei como desenvolvedor front-end usando Angular e também
                  como instrutor para iniciantes na área do desenvolvimento web,
                  ensinava HTML, CSS e JavaScript.
                </p>
              </div>
              <hr />
              <div className="my-4">
                <h2>Grupo IV2 - Estagiário front-end</h2>
                <p>Novembro de 2019 - Maio de 2020 (7 meses)</p>
                <p>Testes, desenvolvimento front-end.</p>
              </div>
            </div>
          </div>

          <div className="border-2 border-slate-100 p-5 flex flex-col gap-2 mt-4 text-slate-100">
            <Title>Habilidades</Title>
            <div className="flex flex-col gap-4 text-xs md:text-base">
              <div className="mb-4">
                <p>- Angular</p>
                <p>- TypeScript</p>
                <p>- JavaScript</p>
                <p>- Git</p>
                <p>- Scrum</p>
                <p>- Tailwind</p>
                <p>- Material Design</p>
                <p>- Prime NG</p>
                <p>- CSS, SCSS</p>
                <p>
                  - React e NextJS (não tenho experiência de trabalho mas sei
                  usá-los)
                </p>
                <p>- SQL (não tenho experiência de trabalho mas sei usá-lo)</p>
                <p>
                  - Testes unitários/ integração com Jest (não tenho experiência
                  de trabalho mas sei usá-lo)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
