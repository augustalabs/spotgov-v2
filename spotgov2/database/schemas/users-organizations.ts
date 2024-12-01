import {
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import users from "./users";
import organizations from "./organizations";

const userOrganizationRoleEnum = pgEnum("user_organization_role", [
  "admin",
  "member",
  "viewer",
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

export default usersOrganizations;
