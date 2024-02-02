import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useRefreshToken from "../../hooks/useRefreshToken";
import usePrivateRequest from "../../hooks/usePrivateRequest";

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = usePrivateRequest();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/api/v1/demo-admin/users", {
          signal: controller.signal,
          // headers: {
          //   Authorization: `Bearer ${auth?.accessToken}`,
          //   "Content-Type": "application/json",
          // },
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err);
        //neu bat loi o day, thi khong can bat loi o trong usePrivate, va nguoc lai
        //tuy nhien neu bat loi o private thi k dc linh hoat khi chuyen location
        if (err?.response?.status === 403) {
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [auth, axiosPrivate, navigate, location]);

  return (
    <article>
      <h2>Users lists:</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.email}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
      <button onClick={() => ref()}>Use Refresh Demo</button>
      <Link to="/">Go to the home page</Link>

      <br />
    </article>
  );
};

export default Users;
