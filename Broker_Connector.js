import dotenv from 'dotenv';
import amqp from 'amqplib';

dotenv.config();

// Utility function to consume a message from the queue and return the result
export const consumeMessages = async (queue, callback,ws) => {
  try {
    // Connect to RabbitMQ server using the URL from the .env file
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();

    // Ensure the queue exists before consuming messages
    await channel.assertQueue(queue, { durable: true });

    console.log(`Waiting for messages in queue: ${queue}`);

    // Return a promise that resolves when a message is consumed
    return new Promise((resolve, reject) => {
      // Consume messages from the queue
      channel.consume(queue, async (msg) => {
        if (msg !== null) {
          try {
            // Convert the message content to a string and parse as JSON
            const messageContent = msg.content.toString();
            console.log("message got from rabbitMQ :",msg)
            console.log("message content : ",messageContent);
            const data = JSON.parse(messageContent);

            // Process the message using the provided callback function
            const dataProcessed = await callback(queue,data,ws);

            // Acknowledge that the message has been processed
            channel.ack(msg);
            //console.log('Message acknowledged and processed:', dataProcessed);

            // Resolve the promise with the processed data
            resolve(dataProcessed);

          } catch (error) {
            console.error('Error processing message:', error);
            reject(error);  // Reject the promise if an error occurs
          }
        }
      }, { noAck: false }); // Ensure manual acknowledgment is required
    });
    
  } catch (error) {
    console.error('Error consuming messages:', error);
    throw error; // Throw the error if connection fails
  }
};

// Example usage of the consumeMessages function


