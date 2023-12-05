const { PASS_CORRE } = process.env;
const nodemailer = require("nodemailer");

const postEmailController = async ({ data }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "jeissonosorio97@gmail.com",
      pass: PASS_CORRE,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Penelope de Cer0" <jeissonosorio97@gmail.com>', // sender address
      to: data.email, // list of receivers
      subject: data.tittle, // Subject line
      text: data.text, // plain text body
      html: `<b>${data.text}</b>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
  }

  main().catch(console.error);
  return await main();
};

module.exports = {
  postEmailController,
};
