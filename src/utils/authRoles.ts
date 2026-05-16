function getRoles(user: { roles?: string[]; user?: { roles?: string[] } } | null | undefined): string[] {
  if (!user) return [];
  if (Array.isArray(user.user?.roles)) return user.user.roles;
  if (Array.isArray(user.roles)) return user.roles;
  return [];
}

/** Regular shoppers (not admin/staff). */
export function isCustomerUser(user: { roles?: string[]; user?: { roles?: string[] } } | null): boolean {
  const roles = getRoles(user);
  if (roles.length === 0) return true;
  return !roles.includes('ROLE_ADMIN') && !roles.includes('ROLE_STAFF');
}

export function isStaffOrAdmin(user: { roles?: string[]; user?: { roles?: string[] } } | null): boolean {
  const roles = getRoles(user);
  return roles.includes('ROLE_ADMIN') || roles.includes('ROLE_STAFF');
}
