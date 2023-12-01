const nodeMailer = require('nodemailer');
const transporter = nodeMailer.createTransport({
            host : "stmpl.forwardemail.net",
            port : 465,
            secure : true,
            auth : {
                user : "test@gmail.com",
                pass : "test"
            }
        });
async function sendMail() {
      
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', 
    to: "hamzabaqqal2002@gmail.com", 
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
    console.log("Message sent: %s", info.messageId);
}
sendMail().catch(console.error);