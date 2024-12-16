import { UserRoles } from "./types";

/** Owner permissions */

export function canBeRemoved(role: UserRoles) {
  return role !== UserRoles.Owner;
}

export function canRoleBeChanged(role: UserRoles) {
  return role !== UserRoles.Owner;
}

/** Admin permissions */

export function canEditOrganization(role: UserRoles) {
  return role === UserRoles.Owner || role === UserRoles.Admin;
}

export function canRemoveUser(role: UserRoles) {
  return role === UserRoles.Owner || role === UserRoles.Admin;
}

export function canInviteUser(role: UserRoles) {
  return role === UserRoles.Owner || role === UserRoles.Admin;
}

export function canViewOrganization(role: UserRoles) {
  return role === UserRoles.Owner || role === UserRoles.Admin;
}

export function canChangeUserRole(role: UserRoles) {
  return role === UserRoles.Owner || role === UserRoles.Admin;
}

/** Editor permissions */

export function canEditQuery(role: UserRoles) {
  return role !== UserRoles.Viewer;
}

export function canRemoveQuery(role: UserRoles) {
  return role !== UserRoles.Viewer;
}

export function canSaveContract(role: UserRoles) {
  return role !== UserRoles.Viewer;
}

export function canAddFavoriteQueriesColumn(role: UserRoles) {
  return role !== UserRoles.Viewer;
}

export function canEditFavoriteQueriesColumn(role: UserRoles) {
  return role !== UserRoles.Viewer;
}

export function canRemoveFavoriteQueriesColumn(role: UserRoles) {
  return role !== UserRoles.Viewer;
}

export function canChangeFavoriteQueriesColumnValue(role: UserRoles) {
  return role !== UserRoles.Viewer;
}

export function canExportFavoriteQueriesTable(role: UserRoles) {
  return role !== UserRoles.Viewer;
}
