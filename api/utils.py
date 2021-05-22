def getUserJsonFromObject(user):
  return {
    'id': user.id,
    'email': user.email,
    'username': user.username,
    'is_deleted': user.is_deleted,
    'created_at': user.created_at,
    'updated_at': user.updated_at,
    'deleted_at': user.deleted_at,
    'last_login': user.last_login,
  }

def getUserJsonEdited(user, data):
  return {

  }