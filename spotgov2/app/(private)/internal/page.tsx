import React from 'react';
import getAllOrganizations from '@/features/internal-dashboard/api/get-all-organizations';
import getAllUsers from '@/features/internal-dashboard/api/get-all-users';

const InternalPage = async () => {
  const organizations = await getAllOrganizations();
  const users = await getAllUsers();

  return (
    <div>
      <h1>Internal Dashboard</h1>

      <section>
        <h2>Organizations</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Deep Dive Credits</th>
              <th>Matchmaking Credits</th>
            </tr>
          </thead>
          <tbody>
            {organizations.map((org) => (
              <tr key={org.id}>
                <td>{org.id}</td>
                <td>{org.name}</td>
                <td>{org.deepDiveCurrency}</td>
                <td>{org.matchmakingCurrency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Organization ID</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default InternalPage;
