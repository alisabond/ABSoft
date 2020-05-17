const nodemailer = require('nodemailer');
const config = require('../../config')
class EmailHelper {

  async send(to, subject, text) {
    // на сервер исходящих сообщений шлём запрос
    let transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
     port: 465,
     secure: true, // true for 465, false for other ports
     auth: {
       user: config.email.username,
       pass: config.email.password,
     }
    });
    // указываем параметры письма и отсылаем его
   let sendResult = await transporter.sendMail({
        from: `${config.email.username}@gmail.com`, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
      });
      // console.log('sendResult >>>> ', sendResult); - response from gmail
    }

    generateEmailText(arr) {
      return arr.join(',');
    }

}
module.exports = EmailHelper;
