import { User } from "@/database/schemas/users";
import { Response, UserWithOrganizationInfo } from "@/types";
import { get } from "@/utils/api/functions";

function allUsersQuery() {
  const queryKey = ["get-all-users"];

  const queryFn = async () =>
    await get<Response<User[]>>({
      url: `users/all-users`,
    });

  return { queryKey, queryFn };
}

export default allUsersQuery;