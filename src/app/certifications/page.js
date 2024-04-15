import Title from "../components/title";

export default function Certifications() {
  const certifications = [
    {
      title: "Angular Developer Certified - Level 1",
      description: "Certificado emitido pela Angular University - Google GDE",
      url: "https://interstate21.com/certificate/?code=5D14JTX",
    },
    {
      title:
        "Certificado de Qualificação Profissional em Análise e Design Web 2.0",
      description: "Certificado emitido pela FIAP",
      url: "https://fiapupdown.s3.amazonaws.com/DocumentosAssinados/5d3b693f-1f23-4da7-a35f-5327d4145b26.pdf?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJ5QBKRMKQIUZ5SEQ%2F20240415%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240415T194214Z&X-Amz-SignedHeaders=host&X-Amz-Expires=24000&X-Amz-Signature=577ef1de6d21ec0cb2082b4f2e8ea9277f7bba457fb7d18bd955317e77257451",
    },
    {
      title:
        "Certificado de Qualificação Profissional em Análise de Sistemas e Prototipagem Web",
      description: "Certificado emitido pela FIAP",
      url: "https://fiapupdown.s3.amazonaws.com/DocumentosAssinados/c6d060cb-be00-4fc7-9e9f-47a7c592178c.pdf?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJ5QBKRMKQIUZ5SEQ%2F20240415%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240415T194207Z&X-Amz-SignedHeaders=host&X-Amz-Expires=24000&X-Amz-Signature=7edce3c2cfc75024597a9c8fa28cf0a7ae164f7155f47c2e8745afdb8a54a7b2",
    },
    {
      title: "ANGULAR: EXPLORANDO TESTES DE UNIDADE E INTEGRAÇÃO",
      description: "Certificado emitido pela Alura",
      url: "https://cursos.alura.com.br/certificate/d7d781b0-a694-49e8-9214-d4ddc046c51b?lang",
    },
    {
      title: "RXJS E ANGULAR: PROGRAMANDO DE FORMA REATIVA",
      description: "Certificado emitido pela Alura",
      url: "https://cursos.alura.com.br/certificate/18053af4-c586-44d9-b69b-63fc2763eb16",
    },
    {
      title: "ANGULAR E RXJS: PROGRAMAÇÃO REATIVA",
      description: "Certificado emitido pela Alura",
      url: "https://cursos.alura.com.br/certificate/db106a7c-d327-44f5-8a48-322f61955a2a",
    },
    {
      title: "ANGULAR: BOAS PRÁTICAS EM ARQUITETURAS E FORMULÁRIOS",
      description: "Certificado emitido pela Alura",
      url: "https://cursos.alura.com.br/certificate/8099bd39-188a-453b-ba5c-5b5cf431c5b6",
    },
    {
      title: "HTTP: ENTENDENDO A WEB POR BAIXO DOS PANOS",
      description: "Certificado emitido pela Alura",
      url: "https://cursos.alura.com.br/certificate/41fbf34e-d8f5-4d68-89eb-60537e6c82e4",
    },
  ];

  return (
    <div className="p-4">
      <div className="text-slate-100">
        <div className="m-8 flex justify-center">
          <Title>Principais Certificados</Title>
        </div>
      </div>

      <div className="flex flex-col gap-4 items-center">
        {certifications.map((certification) => (
          <div className="border-2 border-slate-100 p-5 flex flex-col gap-2 text-slate-100 w-2/3">
            <Title>{certification.title}</Title>
            <div className="flex flex-col gap-4 text-xs md:text-base">
              <p>{certification.description}</p>
              <p>
                <a
                  href={certification.url}
                  target="_blank"
                  className="text-red-500 font-bold"
                >
                  Link para o certificado
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
