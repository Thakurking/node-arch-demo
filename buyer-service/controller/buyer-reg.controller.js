exports.buyerRegistration = async (req, res) => {
  const { name, email, phone } = req.body;
  const channel = req.app.get("channel");
  channel.sendToQueue("SELLER_QUEUE", Buffer.from(JSON.stringify(req.body)), {
    persistent: true,
  });
  channel.consume(
    "BUYER_QUEUE",
    async (data) => {
      const msg = JSON.stringify(data.content.toString());
      console.log("received", msg);
      channel.ack(data);
      if (msg) {
        return res.json({ message: msg, status: true });
      }
      return res.json({
        message: "Something Went Wrong Please Try Again",
        status: false,
      });
    },
    { noAck: false }
  );
};
