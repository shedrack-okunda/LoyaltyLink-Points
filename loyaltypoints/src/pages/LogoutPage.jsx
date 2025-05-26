import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      // Redirect to login page
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full py-3 px-4 mt-2 bg-red-100 text-red-600 font-medium rounded-lg hover:bg-red-200 transition-all duration-200 !rounded-button"
    >
      Sign Out
    </button>
  );
};
