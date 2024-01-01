const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "f5350a51",
  apiSecret: "3vyh8MKTXcIrPP8i"
})

const from = "Vonage APIs"
const to = "919940331572"
const text = 'A text message sent using the Vonage SMS API'

async function sendSMS() {
    await vonage.sms.send({to, from, text})
        .then(resp => { console.log('Message sent successfully'); console.log(resp); })
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}

sendSMS();