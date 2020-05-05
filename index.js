/** create an http server */
require('express')()
    /** enable body parser */
    .use(require('body-parser').text())
    /** expose the endpoin to receive messages */
    .post('/endpoint', (req, res) => {
        /** the body is a string JSON */
        const body = JSON.parse(req.body)

        switch (req.headers['x-amz-sns-message-type']) {
            /** when the owner of the topic unsubscribe your endpoint */
            case 'UnsubscribeConfirmation':
                break;
            /** confirm the subscription with a simple HTTP get to the aws SubscribeURL */
            case 'SubscriptionConfirmation':
                require('request').get(body.SubscribeURL)
                break;
            /** start your business logic here */
            case 'Notification':
                /**
                 * You can find in the body:
                 * {
                 *      Type: 'Notification',
                 *      MessageId: '1234567890',
                 *      TopicArn: 'arn:aws:sns:<REGION>:<APP_ID>:<TOPIC_ID>',
                 *      Subject: 'The subject',
                 *      Message: 'The body message',
                 *      Timestamp: '2020-04-11T16:44:12.351Z',
                 *      SignatureVersion: '1',
                 *      Signature: 'SzACs...BJBQ==',
                 *      SigningCertURL: 'https://sns.<REGION>.amazonaws.com/SimpleNotificationService-a86cb10b4e1f29c941702d737128f7b6.pem',
                 *      UnsubscribeURL: 'https://sns.<REGION>.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:<REGION>:<APP_ID>:<TOPIC_ID>:0987654321',
                 *      MessageAttributes: { foo: { Type: 'String', Value: 'bar' } }
                 * }
                 */
            break;
        }
        res.send('')

    })
    .listen(4000)
