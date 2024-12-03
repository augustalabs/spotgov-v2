import { InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import users from "./users";
import queries from "./queries";

const queryUserEmails = pgTable(
  "query_user_emails",
  {
    userIdOwner: uuid("user_id_owner").references(() => users.id),
    userIdReceiver: uuid("user_id_receiver").references(() => users.id),
    queryId: uuid("query_id").references(() => queries.id),
    lastSentId: text("last_sent_id"),
    lastSentAt: timestamp("last_sent_at", { withTimezone: true }),
  },
  (t) => [
    primaryKey({
      columns: [t.userIdOwner, t.userIdReceiver, t.queryId],
    }),
  ]
);

export type QueryUserEmail = InferSelectModel<typeof queryUserEmails>;

export default queryUserEmails;
