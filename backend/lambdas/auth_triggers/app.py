def lambda_handler(event, context):
    """
    Cognito Pre Sign-up trigger.

    For the project demo, every new user is automatically confirmed
    and the email is marked as verified.
    """

    event["response"]["autoConfirmUser"] = True
    event["response"]["autoVerifyEmail"] = True

    return event
