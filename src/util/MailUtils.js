const mailer = require('nodemailer')

const sendingMail = async (to,subject,text) =>{

    const transporter = mailer.createTransport({
        service:'gmail',
        auth:{
            user:"211260131031seticse@gmail.com",
            pass:"vhqb glrz xach zdef"
        }
    })

    const mailOptions = {
        from:"211260131031seticse@gmail.com",
        to:to,
        subject:subject,
        html:text
    }

    const mailresponse = await transporter.sendMail(mailOptions)
    console.log(mailresponse);
    return mailresponse
    
}

module.exports={
    sendingMail
}