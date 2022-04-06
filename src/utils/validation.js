export const validateRequired = ({target, prop, errors, msg}) => {
  const value = target[prop];
  if (value === undefined || value === null) {
    errors.push(msg);
    return false;
  }
  if (typeof value === 'string' && value.trim().length < 1) {
    errors.push(msg); 
    return false;   
  }
  return true;
}

export const validateIdentifier = ({target, prop, errors, msg}) => {
  const value = target[prop];
  if (!/^[a-zA-Z0-9_-]+$/ig.test(value)) {
    errors.push(`${msg} [${value}]`);
    return false;
  }
  return true;
}

export const validateDate = ({target, prop, errors, msg}) => {
  const value = target[prop];
  if (!/^\d{4}-[01]\d-[0-3]\d$/ig.test(value)) {
    errors.push(`${msg} [${value}]`);
    return false;
  }
  return true;
}

