const amqp = require("../server");

exports.buyerRegistration = async (req, res) => {
  return res.json({
    message: "message from buyer registration protected api",
    status: true,
  });
  // const { name, email, phone } = req.body;
  // // const channel = req.app.get("channel");
  // amqp.channel.sendToQueue(
  //   "SELLER_QUEUE",
  //   Buffer.from(JSON.stringify(req.body)),
  //   {
  //     persistent: true,
  //   }
  // );
  // var msg, stat;
  // amqp.channel.consume("BUYER_QUEUE", (data) => {
  //   const { message, status } = JSON.parse(data.content);
  //   msg = message;
  //   stat = status;
  //   amqp.channel.ack(data);
  //   // return res.json({message, status})
  // });
  // return res.json({ msg, stat });
  // return res.json({ message: "message sent", status: true });
  // channel.consume(
  //   "BUYER_QUEUE",
  //   async (data) => {
  //     const msg = JSON.stringify(data.content.toString());
  //     console.log("received", msg);
  //     channel.ack(data);
  //     if (msg) {
  //       return res.json({ message: msg, status: true });
  //     }
  //     return res.json({
  //       message: "Something Went Wrong Please Try Again",
  //       status: false,
  //     });
  //   },
  //   { noAck: false }
  // );
};
