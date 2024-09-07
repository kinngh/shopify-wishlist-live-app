/**
 * Replace TOPIC_NAME with a Webhook Topic to enable autocomplete
 * @typedef { import("@/_developer/types/2024-07/webhooks.js").ORDERS_UPDATED } webhookTopic
 */

const ordersHandler = async (
  topic,
  shop,
  webhookRequestBody,
  webhookId,
  apiVersion
) => {
  try {
    /** @type {webhookTopic} */
    const webhookBody = JSON.parse(webhookRequestBody);
  } catch (e) {
    console.error(e);
  }
};

export default ordersHandler;
