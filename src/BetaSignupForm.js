import React, { useState } from 'react';
import './BetaSignupForm.css';

function BetaSignupForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [isSignedUp, setIsSignedUp] = useState(false);

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
                setIsSignedUp(true);
            } else {
                setIsSignedUp(false);
                alert('There was an error signing up. Please try again later.');
            }
        } catch (error) {
            setIsSignedUp(false);
            alert('There was an error signing up. Please try again later.');
        }
        setFirstName("");
        setLastName("");
        setEmail("");
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
            {isSignedUp && (
                <p>
                    Thank you for signing up to test the last version of RecipeRealm!
                    We will send you an invitation shortly.
                    In the meantime, download <a href="https://apps.apple.com/us/app/testflight/id899247664" target="_blank" rel="noopener noreferrer">TestFlight</a>
                    from the Apple Store. It's where you will install the latest version.
                </p>
            )}
        </div>
    );
}

export default BetaSignupForm;