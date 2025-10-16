import { useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";

function App() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState(null);

  const registerBtn = () => {
    if (!firstName || !email || !password) {
      toast.warn("Please fill all the fields", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      return;
    }

    if (password.length < 8) {
      toast.error("please enter 8 characters", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
      return;
    }
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
      toast.error("please enter the correct email format", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("email", email);
    formData.append("password", password);

    fetch("https://dummyjson.com/users/add", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Registration Success:", data);
        alert("User registered successfully!");

        // 🔹 Save user data to display later
        setUserData({
          firstName: firstName,
          email: email,
          password: password,
        });

        // 🔹 Clear inputs
        setFirstName("");
        setEmail("");
        setPassword("");
      })
      .catch((err) => console.error("❌ Error:", err));
  };

  const isDisabled = !firstName || !email || !password || password.length < 8;

  const handleSubmit = (e) => {
    e.preventDefault();
    registerBtn();
  };

  return (
    <div className="text-black">
      <h1 className="text-black text-center pt-4 text-2xl font-bold">
        Register Form
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-10 rounded-2xl p-5 bg-gray-100 w-[400px] shadow-lg text-black mx-auto flex flex-col space-y-4"
      >
        <label className="mb-1 font-semibold">Name</label>
        <input
          className="border border-gray-400 rounded-sm p-2"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="mb-1 font-semibold">Email</label>
        <input
          className="border border-gray-400 rounded-sm p-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="mb-1 font-semibold">Password</label>
        <input
          className="border border-gray-400 rounded-sm p-2"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {password.length > 0 ? (
          password.length < 8 ? (
            <p className="text-red-500 text-sm">Password too short!</p>
          ) : (
            <p className="text-green-600 text-sm">Password is strong</p>
          )
        ) : null}

        <label className="ml-1 flex items-center space-x-2">
          <input
            type="checkbox"
            onChange={() => setShowPassword(!showPassword)}
          />
          <span>Show Password</span>
        </label>

        <button
          // disabled={isDisabled}
          className="font-bold py-2 px-4 rounded-md mt-4bg-blue-500 bg-blue-400 hover:bg-blue-600 text-white"
          onClick={registerBtn}
        >
          Submit
        </button>
      </form>

      <div className="w-[400px] p-4 bg-[#ebebeb] rounded-2xl mt-5 shadow-sm mx-auto">
        <h3 className="text-xl font-semibold mb-2">Registered User Data:</h3>
        {userData ? (
          <div className="text-black">
            <p>
              <strong>Name:</strong> {userData.firstName}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Password:</strong> {userData.password}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">No data yet. Submit the form above 👆</p>
        )}
      </div>
      <ToastContainer limit={1} />
    </div>
  );
}

export default App;
