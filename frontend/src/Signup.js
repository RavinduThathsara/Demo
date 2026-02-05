import { useState } from "react";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState([0, 0]);

  const handleSignup = async () => {
    try {
      // Get user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const coords = [position.coords.longitude, position.coords.latitude];
            const res = await axios.post("http://localhost:5000/api/auth/register", { 
              name, 
              email, 
              password, 
              location: coords 
            });
            alert(res.data.message);
          },
          async (error) => {
            // If location is denied, use default [0, 0]
            const res = await axios.post("http://localhost:5000/api/auth/register", { 
              name, 
              email, 
              password, 
              location: [0, 0] 
            });
            alert(res.data.message);
          }
        );
      } else {
        const res = await axios.post("http://localhost:5000/api/auth/register", { 
          name, 
          email, 
          password, 
          location: [0, 0] 
        });
        alert(res.data.message);
      }
    } catch(err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Name" onChange={e=>setName(e.target.value)} />
      <input placeholder="Email" type="email" onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;
