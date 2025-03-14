import { useState } from 'react';
import './signUp.css'; 

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contact, setContact] = useState('');
  const [agree, setAgree] = useState(false);

  // Prevent the default form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // data to send to the backend
    const userData = {
      name,
      email,
      password,
      contact,
      agree,
    };

    try {
      // Sending POST request to the backend 
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(userData), 
      });


      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const data = await response.json(); 
      console.log(data);
      alert('Account created successfully!');
    } catch (error) {
      console.error('There was an error!', error);
      alert('Error creating account.');
    }
  };

  return (
    <div>
      <h1 id="header_title">AgriSense</h1>

      <div className="Signup-container">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label id="a_label">Name</label>
            <input 
              type="text" 
              placeholder="john doe" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label id="a_label">Email</label>
            <input 
              type="email" 
              placeholder="johndoe@gmail.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label id="a_label">Password</label>
            <input 
              type="password" 
              placeholder="123" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label id="a_label">Confirm Password</label>
            <input 
              type="password" 
              placeholder="123" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label id="a_label">Contact</label>
            <input 
              type="checkbox" 
              onChange={(e) => setContact(e.target.checked ? 'Yes' : 'No')} 
            />
            <input 
              type="tel" 
              placeholder="712345678" 
              value={contact} 
              onChange={(e) => setContact(e.target.value)} 
              required 
            />
          </div>

          <div>
            <input 
              type="checkbox" 
              checked={agree}
              onChange={() => setAgree(!agree)} 
            />
            <label htmlFor="rememberMe">
              I agree to receive emails and messages from Agrisense
            </label>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
