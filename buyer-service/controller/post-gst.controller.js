const amqp = require("../server");

exports.postGst = async (req, res) => {
  try {
    amqp.channel.sendToQueue(
      "CONSUME_GST_DATA",
      Buffer.from(JSON.stringify(req.body), { persistent: true })
    );
    return res.json({ message: "Sent GST Data", status: true });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Something Went Wrong Please Try Agian",
      status: false,
    });
  }
};
