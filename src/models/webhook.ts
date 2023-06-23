
/**
 * @typedef WebhookSubscription_Event
 * @property {String} ResourceType
 * @property {String} OperationName
 */

/**
 * @typedef SubscriptionContext
 * @property {String} ResourceType The Context Resource Type
 * @property {String} ResourceId The Context Resource Id, Can only be empty for Account Context
 */

/**
 * @typedef WebhookSubscription_Config
 * @property {SubscriptionContext} SubscriptionContext The Context of the Events to trigger upon
 * @property {String} WebhookUrl Url where the Event payload will be posted to.
 * @property {WebhookSubscription_Event[]} Events List of events to trigger upon
 */

/**
 * A webhook subscription allows to register webhook urls that get called by the ShareFile Platform when a subscribed to event happens. The webhook call payload contains properties to describe the event E.g. for a File upload event in a Folder: { "WebhookSubscriptionId": "w123", "AccountInfo": { "AccountId": "a123", "Subdomain": "mycompany", "AppControlPlane": "sharefile.com", "ApiControlPlane": "sf-api.com" }, "Event": { "Timestamp": "2000-01-01T20:20:20Z", "OperationName": "Upload", "ResourceType": "File", "Resource": { "Id": "fi123", "Parent": { "Id": "fo123" } } } }
 *
 * @class WebhookSubscription
 * @todo implement this class into the API
 */
// class WebhookSubscription {
//   /**
//    * Creates an instance of WebhookSubscription.
//    * @param {WebhookSubscription_Config} wsConfig
//    * @memberof WebhookSubscription
//    */
//   constructor(wsConfig) {
//     this.SubscriptionContext = wsConfig.SubscriptionContext;
//     this.WebhookUrl = wsConfig.WebhookUrl;
//     this.Events = wsConfig.Events;
//   }
// }