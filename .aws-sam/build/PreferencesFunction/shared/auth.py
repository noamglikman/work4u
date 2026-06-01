def get_current_user(event):
    """
    Extracts the current user from Cognito claims.

    During local/mock development, if Cognito claims are missing,
    returns a mock user so the backend can still be tested.
    """

    request_context = event.get("requestContext", {})
    authorizer = request_context.get("authorizer", {})

    claims = authorizer.get("claims")

    if not claims:
        jwt_data = authorizer.get("jwt", {})
        claims = jwt_data.get("claims", {})

    if not claims:
        return {
            "userId": "mock-user-123",
            "email": "mock@example.com",
            "role": "USER",
            "groups": ["Users"],
            "isAdmin": False
        }

    user_id = claims.get("sub") or claims.get("cognito:username")
    email = claims.get("email", "")

    groups_raw = claims.get("cognito:groups", [])

    if isinstance(groups_raw, str):
        groups = [group.strip() for group in groups_raw.split(",") if group.strip()]
    elif isinstance(groups_raw, list):
        groups = groups_raw
    else:
        groups = []

    is_admin = "Admins" in groups or "Admin" in groups or "ADMIN" in groups

    return {
        "userId": user_id,
        "email": email,
        "role": "ADMIN" if is_admin else "USER",
        "groups": groups,
        "isAdmin": is_admin
    }


def is_admin_user(event):
    user = get_current_user(event)
    return user.get("isAdmin", False)