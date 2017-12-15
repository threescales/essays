var nodemailer = require("nodemailer")
const email = require("../../../../config/email.json")
export function sendMail(email, title, url) {
    var transporter = nodemailer.createTransport({
        service: email.service,
        port: email.port,
        secureConnection: true,
        auth: {
            user: email.account,
            pass: email.password
        }
    })

    var mailOptions = ({
        from: `随笔 <${email.account}>`,
        to: email,
        subject: '随笔',
        text: title,
        html: `<a href={${url}}>${url}</a>`
    })

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    });
}
