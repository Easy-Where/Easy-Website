const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: 'smtp.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: 'easy.developer@outlook.com',
        pass: 'Grupo1!@#'
    }
});

const mailOptions = {
    from: 'easy.developer@outlook.com',
    to: 'pauloalvares66@gmail.com',
    subject: 'Teste',
    text: 'Teste'
};

transport.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log(info);
    }
}); 