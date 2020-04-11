# AWS SNS Subcription (HTTP/HTTPS)

This is an simple example of an subscription of a AWS SNS Topic.
AWS call you endpoint whit a HTTP POST to ask a confirmation of the subscription and send message to you api.
The owner of the topic should add your URL endpoint before.


### Confirm the subscription
AWS calls your endpoint to ask you to confirm the subscription BEFORE receiving the massages from the topic. In the header, you can detect if is is a subscription asking if the `x-amz-sns-message-type` header value is equal to `SubscriptionConfirmation`.
You can get the URL to call to confirm the subscription in the body (`request.body.SubscribeURL`). You can make a simple HTTP GET on this URL.

### Receiving messages
AWS use your same endpoint to receive message. You can detect if it is a message if the `x-amz-sns-message-type`  header value is equal to `Notification`. The owner of the topic can write a filter policy thanks to "MessageAttributes", that it determine if you will receive the message or not