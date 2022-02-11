// exports.consumer = async (req, res) => {
//   const channel = req.app.get("channel");
//   channel.consume(
//     "SELLER_QUEUE",
//     async (data) => {
//       const { name, email, phone } = JSON.parse(data.content.toString());
//       console.log("Received", data.content.toString());
//       console.log("data is", name, email, phone);
//       channel.ack(data);
//       var msg = `a new user came ${(name, email, phone)}`;
//       channel.sendToQueue("BUYER_QUEUE", Buffer.from(msg), {
//         persistent: true,
//       });
//     },
//     { noAck: false }
//   );
// };

const amqp = require("./server")

amqp.amqpConnect().then(() => {
  amqp.channel.consume("SELLER_QUEUE", (data) => {
    const {email, name, phone} = JSON.parse(data.content)
    console.log("msg received: ", email, name, phone)
    amqp.channel.ack(data)
  })
})