import {
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import users from "./users";
import organizations from "./organizations";
import { InferSelectModel, relations } from "drizzle-orm";
import { UserRoles } from "@/types";

const userOrganizationRoleEnum = pgEnum("user_organization_role", [
  UserRoles.Admin,
  UserRoles.Member,
  UserRoles.Viewer,
]);

const usersOrganizations = pgTable(
  "users_organizations",
  {
    userId: uuid("user_id").references(() => users.id),
    organizationId: uuid("organization_id").references(() => organizations.id),
    role: userOrganizationRoleEnum("role").notNull(),
    lastOnline: timestamp("last_online", { withTimezone: true }),
  },
  (t) => [primaryKey({ columns: [t.userId, t.organizationId] })]
);

export const usersOrganizationsRelations = relations(
  usersOrganizations,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [usersOrganizations.organizationId],
      references: [organizations.id],
    }),
    user: one(users, {
      fields: [usersOrganizations.userId],
      references: [users.id],
    }),
  })
);

export type UserOrganization = InferSelectModel<typeof usersOrganizations>;

export default usersOrganizations;
