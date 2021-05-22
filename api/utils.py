def getUserJsonFromObject(user):
  return {
    'id': user.id,
    'email': user.email,
    'username': user.username,
    'created_at': user.created_at,
    'updated_at': user.updated_at,
    'last_login': user.last_login,
  }