var nodemailer = require("nodemailer")
const email = require("../../config/email.json")
export function sendMail(toEmail, title, url) {
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
        to: toEmail,
        subject: '随笔',
        text: title,
        html: `<p>点击此链接：<a href=${url}>${url}</a>完成后续操作</p>`
    })

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    });
}
