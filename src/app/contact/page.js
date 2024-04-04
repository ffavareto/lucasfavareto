import Button from "../components/button";

export default function Contact() {
  return (
    <div className=" text-slate-50">
      <p className="mb-2">
        Para entrar em contato comigo você pode me enviar um email ou uma
        mensagem no WhatsApp ;)
      </p>
      <p>
        <Button>
          <a target="_blank" href="mailto:lucasfavaretosantos98@gmail.com">
            Enviar e-mail
          </a>
        </Button>
      </p>
      <p>
        <Button>
          <a
            target="_blank"
            href="https://api.whatsapp.com/send?phone=5511961947515"
          >
            Mensagem no WhatsApp
          </a>
        </Button>
      </p>
    </div>
  );
}
