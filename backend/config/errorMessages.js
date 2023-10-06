// errorMessages.js

/**
 * @typedef {Object} ErrorMessage
 * @property {string} INVALID_EMAIL - Invalid email address.
 * @property {string} NAME_REQUIRED - Name is required.
 * @property {string} EMAIL_REQUIRED - Email is required.
 * @property {string} MAX_PHOTOS_EXCEEDED - Exceeded the maximum number of photos allowed.
 * @property {string} INVALID_COLLECTION_ID - Invalid collection ID.
 * @property {string} PHOTO_NOT_FOUND - Photo not found.
 * @property {string} MISMATCHED_COLLECTION_ID - Mismatched collectionId.
 * @property {string} COLLECTION_NOT_FOUND - Collection not found.
 * @property {string} AUTHORIZATION_FAILED - Authorization failed. Only the owner can perform this action.
 * @property {string} UNABLE_TO_UPLOAD - Unable to upload photos.
 * @property {string} UNABLE_TO_DELETE - Unable to delete the photo.
 * @property {string} SUCCESSFULLY_CREATED - Successfully created.
 * @property {string} SUCCESSFULLY_UPDATED - Successfully updated.
 * @property {string} SUCCESSFULLY_DELETED - Successfully deleted.
 */

module.exports = {
  INVALID_EMAIL: 'Invalid email address.',
  NAME_REQUIRED: 'Name is required.',
  EMAIL_REQUIRED: 'Email is required.',
  MAX_PHOTOS_EXCEEDED: 'Exceeded the maximum number of photos allowed.',
  INVALID_COLLECTION_ID: 'Invalid collection ID.',
  PHOTO_NOT_FOUND: 'Photo not found.',
  MISMATCHED_COLLECTION_ID: 'Mismatched collectionId.',
  COLLECTION_NOT_FOUND: 'Collection not found.',
  AUTHORIZATION_FAILED: 'Authorization failed. Only the owner can perform this action.',
  UNABLE_TO_UPLOAD: 'Unable to upload photos.',
  UNABLE_TO_DELETE: 'Unable to delete the photo.',
  SUCCESSFULLY_CREATED: 'Successfully created.',
  SUCCESSFULLY_UPDATED: 'Successfully updated.',
  SUCCESSFULLY_DELETED: 'Successfully deleted.',
};
