export enum Messages {
  SERVER_LISTEN = 'Server is listening on port:',

  // Common Messages
  IS_ALREADY_EXIST = 'already exists.',
  IS_CREATED_SUCCESSFULLY = 'created successfully.',
  IS_NOT_FOUND = 'not found.',
  IS_FETCHED_SUCCESSFULLY = 'fetched successfully.',
  IS_UPDATED_SUCCESSFULLY = 'updated successfully.',
  IS_DELETED_SUCCESSFULLY = 'deleted successfully.',
  FILE_UPLOADED_SUCCESSFULLY = 'File uploaded successfully.',
  IS_ALREADY_DELETED = 'already deleted.',

  // Auth Messages
  INVALID_CREDENTIALS = 'Invalid credentials.',
  LOGIN_SUCCESSFULLY = 'Logged in successfully.',
  IS_INCORRECT = 'is incorrect.',
  IS_CHANGED_SUCCESSFULLY = 'changed successfully.',

  // Role Messages
  USER_ROLE_NOT_FOUND = 'User role not found.',
  INSUFFICIENT_PERMISSIONS = 'Insufficient permissions. Admin access required.',
  ACCESS_DENIED_ADMIN_REQUIRED = 'Access denied. Admin role required.',
}
