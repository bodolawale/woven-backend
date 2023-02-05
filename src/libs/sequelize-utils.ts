function _safeToJson(entity) {
  return entity && entity.toJSON ? entity.toJSON() : entity;
}

export const safeToJson = entityOrEntityArray => {
  if (Array.isArray(entityOrEntityArray)) {
    return entityOrEntityArray.map(entity => _safeToJson(entity));
  }

  return _safeToJson(entityOrEntityArray);
};
