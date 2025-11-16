import "../Style/Account.css";
import { useEffect, useState } from "react";

export default function Account() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");

    if (saved) {
      setUser(JSON.parse(saved)); // load logged-in user correctly
    } else {
      setUser({ name: "Guest", email: "Not logged in" });
    }
  }, []);

  return (
    <div className="account-page">
      <div className="account-box">
        <h2>My Account</h2>

        {user ? (
          <div className="account-info">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}

      </div>
    </div>
  );
}
