import { useContext, useState } from "react";
import { UserContext } from "@/context/AuthContext";

export default function UserProfile({ user }) {
  const { logout } = useContext(UserContext);
  const [isClicked, setIsClicked] = useState(false);

  const handleButton = () => {
    setIsClicked(true);
    logout();
  };

  return (
    <>
      <div className="font-medium py-2">Profile</div>
      <div className="space-y-2">
        <div>Name: {user.name}</div>
        <div>Last Name: {user.lastname}</div>
        <div>Username: {user.username}</div>
        <div>Email: {user.email}</div>
      </div>

      <div className="mt-5">
        <button
          onClick={handleButton}
          className={`bg-black text-white py-1 px-4 rounded `}
        >
          Logout
        </button>
      </div>
    </>
  );
}
