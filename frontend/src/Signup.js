import { useState } from "react";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await axios.post("http://localhost:5000/api/signup", { username, password });
    alert(res.data.message);
  };

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Username" onChange={e=>setUsername(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;
