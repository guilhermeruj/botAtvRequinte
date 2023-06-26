import conn from "./db/conn.js";
import Cliente from "./models/Cliente.js";
import schedule from "node-schedule";
import moment from "moment";
import { create } from "venom-bot";
import { Op } from "sequelize";

function start(client) {
  console.log("Cliente Venom iniciado!");
  (async () => {
    const dataAtual = moment().format("YYYY-MM-DD");

    const clientes = await Cliente.findAll({
      where: {
        dataDisp: {
          [Op.eq]: dataAtual,
        },
      },
    });

    if (clientes.length === 0) {
      console.log("Todos os contatos foram processados!");
      return;
    }

    for (const cliente of clientes) {
      const data = moment(cliente.dataDisp).format("D [de] MM [de] YYYY");
      const tipoServico = cliente.tipo;
      console.log(tipoServico);
      const hora = cliente.hora;
      let textmsg = "";

      switch (tipoServico) {
        case "Retirada masculino":
          textmsg = `Oii eu sou Robson, \nEstou passando para lembrá-lo que você tem uma *Retirada agendada* para ${data} as ${hora}.`;
          break;
        case "Retirada feminino":
          textmsg = `Oii eu sou Robson, \nEstou passando para lembrá-lo que você tem uma *Retirada* no feminino agendada para ${data} as ${hora}.`;
          break;
        case "Prova masculina":
          textmsg = `Oii eu sou Robson, da Requinte Noivos. \nEstou passando para lembrá-lo que você tem uma Prova agendada para ${data} as ${hora}.`;
          break;
          case "Prova feminino":
          textmsg = `Oii eu sou Robson, da Requinte Noivos. \nEstou passando para lembrá-lo que você tem uma *Prova*  no feminino agendada para ${data} as ${hora}.`;
          break;
          case "Devolução masculino":
          textmsg = `Oii eu sou Robson, da Requinte Noivos.\nEstou passando para lembrá-lo que você tem uma *Devolução* no feminino agendada para ${data} as ${hora}.`;
          break;
          case "Devolução feminino":
          textmsg = `Oii eu sou Robson, da Requinte Noivos.\nEstou passando para lembrá-lo que você tem uma Devolução no feminino agendada para ${data} as ${hora}.`;
          break;
        default:
          textmsg = `Olá, eu sou a Ana da Requinte Noivos.\nEstou passando para lembrá-lo que você tem um agendamento marcado para ${data}.`;
      }

      const numero = cliente.telefone;
      const numeroDisp = "55" + numero;
      client
        .sendText(`55${numeroDisp}@c.us`, textmsg)
        .then((result) => {
          console.log(`Mensagem enviada para: ${numeroDisp}`);
        })
        .catch((error) => {
          console.error(
            `Erro ao enviar mensagem para: ${numeroDisp} - ${error}`
          );
        });
    }

    console.log("Todas as mensagens foram enviadas!");
  })();
}

// schedule.scheduleJob("27 18 * * *", () => {

// });

create()
  .then((client) => start(client))
  .catch((error) => {
    console.log(error);
  });
conn
  .sync()
  .then(() => {})
  .catch((err) => console.log(err));
