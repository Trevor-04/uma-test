import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Checkout() {
    const location = useLocation();
    const membershipType = location.state?.membershipType || "No membership selected";

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        phoneNumber: '',
        email: '',
        ccNumber: '',
        expDate: '',
        cvv: ''
    });

    const [isMember, setIsMember] = useState(true); // Replace this with actual membership check logic

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        
        // Here, you would perform form validation and membership status check
        if (!isMember) {
            alert("Please sign up for a membership to proceed.");
            return;
        }

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Checkout successful!");
                // Redirect to confirmation page or reset form
            } else {
                alert("Checkout failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during checkout:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="bg-[#fef7e7] min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Membership Checkout</h2>
                <p className="text-center text-lg font-semibold mb-4">{membershipType} Selected</p>

                {!isMember ? (
                    <p className="text-red-500 text-center mb-4">
                        You need to <a href="/signup" className="text-blue-500 underline">sign up</a> to proceed with checkout.
                    </p>
                ) : (
                    <form onSubmit={handleSubmitForm} className="flex flex-col space-y-4">
                        <input 
                            type="text" 
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                        <input 
                            type="text" 
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                        <input 
                            type="text" 
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                        <input 
                            type="text" 
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                        <input 
                            type="text" 
                            name="state"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                        <input 
                            type="text" 
                            name="country"
                            placeholder="Country"
                            value={formData.country}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                        <input 
                            type="text" 
                            name="zipCode"
                            placeholder="Zip Code"
                            value={formData.zipCode}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                        {/* Credit Card Information */}
                        <input 
                            type="text" 
                            name="ccNumber"
                            placeholder="Credit Card Number"
                            value={formData.ccNumber}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded"
                            maxLength="16"
                            required
                        />
                        <div className="flex space-x-4">
                            <input 
                                type="text" 
                                name="expDate"
                                placeholder="MM/YY"
                                value={formData.expDate}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded w-1/2"
                                maxLength="5"
                                required
                            />
                            <input 
                                type="text" 
                                name="cvv"
                                placeholder="CVV"
                                value={formData.cvv}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded w-1/2"
                                maxLength="3"
                                required
                            />
                        </div>

                        <input 
                            type="tel" 
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded"
                            required
                        />

                        <button 
                            type="submit"
                            className="bg-gray-400 text-white p-2 rounded font-bold mt-4"
                        >
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Checkout;