"use client";
import { useState } from "react";

export default function Contact() {
  const [phoneNumber, setPhoneNumber] = useState("");

  function formatPhoneNumber(phoneNumber) {
    phoneNumber = phoneNumber.replace(/\D/g, "");
    phoneNumber = phoneNumber.replace(/^(\d\d)(\d)/g, "($1) $2");
    phoneNumber = phoneNumber.replace(/(\d{5})(\d)/, "$1-$2");
    return phoneNumber;
  }

  const handlePhoneNumberChange = (event) => {
    const inputPhoneNumber = event.target.value;
    const formattedPhoneNumber = formatPhoneNumber(inputPhoneNumber);
    setPhoneNumber(formattedPhoneNumber);
  };

  function validateFields() {
    const { contact } = document.forms;
    const { fullName, phone, subject, message } = contact;
    let validation = true;

    if (!fullName.value || !phone.value || !subject.value || !message.value) {
      validation = false;
    }

    return validation;
  }

  function sendMessage(event) {
    const { contact } = document.forms;
    const { fullName, phone, subject, message } = contact;
    event.preventDefault();

    if (validateFields()) {
      const payload = {
        fullName: fullName.value,
        phone: phone.value,
        subject: subject.value,
        message: message.value,
      };

      console.log(payload);
    } else {
      alert("Preencha todos os campos");
    }
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen flex-col">
        <h1 className="text-slate-100 text-2xl mb-2">Entrar em contato</h1>
        <form className="flex flex-col gap-2 w-4/5 md:w-2/4" name="contact">
          <div>
            <input
              autoComplete="off"
              className="text-slate-800 p-2 rounded-md w-full"
              id="fullName"
              name="fullName"
              placeholder="Nome completo"
              type="text"
            />
          </div>
          <div>
            <input
              autoComplete="off"
              className="text-slate-800 p-2 rounded-md w-full"
              id="phone"
              maxLength={15}
              name="phone"
              onChange={(e) => handlePhoneNumberChange(e)}
              placeholder="Número de celular"
              type="tel"
              value={phoneNumber}
            />
          </div>
          <div>
            <input
              autoComplete="off"
              className="text-slate-800 p-2 rounded-md w-full"
              id="subject"
              name="subject"
              placeholder="Assunto"
              type="text"
            />
          </div>
          <div>
            <textarea
              className="text-slate-800 p-2 rounded-md w-full resize-none"
              id="message"
              maxLength={512}
              name="message"
              placeholder="Mensagem"
              rows={11}
            ></textarea>
          </div>
          <div>
            <button
              className="bg-green-400 py-2 rounded-md text-slate-800 hover:opacity-80 w-full"
              onClick={sendMessage}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
