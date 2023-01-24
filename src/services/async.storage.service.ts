export const storageService = {
  query,
  get,
  post,
  put,
  remove,
  makeId,
};

function query(entityType: string, delay: number = 500): Promise<any> {
  var entities = JSON.parse(localStorage.getItem(entityType) ?? "[]");
  return new Promise((resolve) => setTimeout(() => resolve(entities), delay));
}

function get(entityType: string, entityId: string): Promise<any> {
  let entities: any[];
  return query(entityType).then((result) => {
    entities = result;
    const entity = entities.find((entity) => entity._id === entityId);
    if (!entity)
      throw new Error(
        `Get failed, cannot find entity with id: ${entityId} in: ${entityType}`
      );
    return entity;
  });
}

function post(entityType: string, newEntity: any): Promise<any> {
  newEntity = JSON.parse(JSON.stringify(newEntity));
  newEntity._id = makeId();
  return query(entityType).then((entities) => {
    entities.push(newEntity);
    _save(entityType, entities);
    return newEntity;
  });
}

function put(entityType: string, updatedEntity: any): Promise<any> {
  updatedEntity = JSON.parse(JSON.stringify(updatedEntity));
  return query(entityType).then((entities: any[]) => {
    const idx = entities.findIndex(
      (entity) => entity._id === updatedEntity._id
    );
    if (idx < 0)
      throw new Error(
        `Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`
      );
    entities.splice(idx, 1, updatedEntity);
    _save(entityType, entities);
    return updatedEntity;
  });
}

async function remove(
  entityType: string,
  entityId: string | number
): Promise<void> {
  const entities: any[] = await query(entityType);
  const idx = entities.findIndex((entity) => entity._id === entityId);
  if (idx < 0)
    throw new Error(
      `Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`
    );
  entities.splice(idx, 1);
  _save(entityType, entities);
}

// Private functions

function _save(entityType: string, entities: any[]): void {
  localStorage.setItem(entityType, JSON.stringify(entities));
}

function makeId(length: number = 5): string {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
