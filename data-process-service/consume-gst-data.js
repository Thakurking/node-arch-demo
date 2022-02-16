const amqp = require("./server");
// const processGST = require("./process-gst-data")

amqp.amqpConnect().then(async () => {
    console.log("==========:consume gst detail amqp function:==========")
  amqp.channel.consume("CONSUME_GST_DATA", async (data) => {
    const gstData = JSON.parse(data.content);
    console.log("data received: ", JSON.parse(data.content));
    amqp.channel.ack(data);
    // const result = await processGST.processGST(amqp.channel, gstData)
    // console.log(result)
    amqp.channel.sendToQueue(
      "PROCESS_GST_DATA",
      Buffer.from(JSON.stringify(gstData))
    );
  });
});
