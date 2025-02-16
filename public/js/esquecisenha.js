const nodemailer = require('nodemailer');

// Configurando o transporter para enviar e-mails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pauloalvares66@gmail.com',
    pass: 'barionix',
  },
});

// Definindo as informações do remetente e do destinatário
const remetente = 'pauloalvares66@gmail.com';
const destinatario = 'paulo.alvares@sptech.school';

// Criando a mensagem de e-mail
const mensagem = {
  from: remetente,
  to: destinatario,
  subject: 'Redefinição de senha',
  text: 'Olá usuário por favor clique nesse link para fazer a atualização da sua senha: https://www.youtube.com/watch?v=bpOSxM0rNPM&pp=ygUPZG8gaSB3YW5uYSBrbm93',
  html: '<p>Conteúdo do e-mail em formato HTML</p>',
};

// Enviando o e-mail
transporter.sendMail(mensagem, (erro, info) => {
  if (erro) {
    console.log('Erro ao enviar o e-mail:', erro);
  } else {
    console.log('E-mail enviado com sucesso!');
    console.log('Detalhes:', info);
  }
});
