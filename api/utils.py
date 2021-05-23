def getUserJsonFromObject(user):
  return {
    'user_id': user.id,
    'email': user.email,
    'username': user.username,
    'is_deleted': user.is_deleted,
    'created_at': user.created_at,
    'updated_at': user.updated_at,
    'deleted_at': user.deleted_at,
    'last_login': user.last_login,
  }


def getCategoryJsonFromObject(category):
  data = {
    'category_id': category.id,
    'title': category.title,
  }
  if category.group is not None:
    data['category_group_id'] = category.group.id
  return data


def getCategoriesJsonFromObject(categories):
  arr = []
  for category in categories:
    arr.append(getCategoryJsonFromObject(category))
  return arr


def getCategoryGroupJsonFromObject(group, categories=None):
  data = {
    'category_group_id': group.id,
    'title': group.title,
  }
  if categories is not None:
    data['categories'] = getCategoriesJsonFromObject(categories)
  return data

