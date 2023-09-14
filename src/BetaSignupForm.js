import React, { useState } from 'react';
import './BetaSignupForm.css';

function BetaSignupForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/sendMail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstName, lastName, email })
            });

            if (response.status === 200) {
                setMessage('Thank you for signing up! We will send you a invititaion shortly.');
            } else {
                setMessage('There was an error signing up. Please try again later.');
            }
        } catch (error) {
            setMessage('There was an error signing up. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Sign up for Beta Testing</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default BetaSignupForm;
