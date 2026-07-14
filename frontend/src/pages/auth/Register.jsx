import { useState } from "react";
import api from "../../api/axios";

function Register() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
        confirm_password: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const response = await api.post("/auth/register/", formData);

            setMessage(response.data.message);

            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                phone_number: "",
                password: "",
                confirm_password: "",
            });
        } catch (error) {
            if (error.response) {
                setMessage(JSON.stringify(error.response.data));
            } else {
                setMessage("Server Error");
            }
        }

        setLoading(false);
    };

    // --- Styling Objects ---
    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f3f4f6", // Light slate background
            fontFamily: "'Inter', system-ui, sans-serif",
            padding: "20px",
        },
        card: {
            backgroundColor: "#ffffff",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "480px",
            boxSizing: "border-box",
        },
        header: {
            textAlign: "center",
            marginBottom: "24px",
        },
        title: {
            fontSize: "28px",
            fontWeight: "700",
            color: "#1e293b", // Deep slate
            margin: "0 0 8px 0",
        },
        subtitle: {
            fontSize: "14px",
            color: "#64748b",
            margin: 0,
        },
        formGroup: {
            display: "flex",
            flexDirection: "column",
            gap: "16px",
        },
        row: {
            display: "flex",
            gap: "12px",
        },
        inputWrapper: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "6px",
        },
        label: {
            fontSize: "13px",
            fontWeight: "600",
            color: "#475569",
        },
        input: {
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            fontSize: "14px",
            outline: "none",
            backgroundColor: "#f8fafc",
            transition: "border-color 0.2s, box-shadow 0.2s",
            boxSizing: "border-box",
            width: "100%",
        },
        button: {
            backgroundColor: "#2563eb", // Job Portal Blue
            color: "#ffffff",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            fontSize: "15px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "background-color 0.2s",
            marginTop: "10px",
        },
        message: {
            marginTop: "16px",
            fontSize: "14px",
            textAlign: "center",
            color: message.toLowerCase().includes("error") ? "#dc2626" : "#16a34a",
            padding: "10px",
            borderRadius: "6px",
            backgroundColor: message.toLowerCase().includes("error") ? "#fef2f2" : "#f0fdf4",
            border: message ? `1px solid ${message.toLowerCase().includes("error") ? "#fee2e2" : "#dcfce7"}` : "none",
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Create an Account</h1>
                    <p style={styles.subtitle}>Join our job network and land your dream career</p>
                </div>

                <form onSubmit={handleSubmit} style={styles.formGroup}>

                    {/* First & Last Name Grid */}
                    <div style={styles.row}>
                        <div style={styles.inputWrapper}>
                            <label style={styles.label}>First Name</label>
                            <input
                                style={styles.input}
                                type="text"
                                name="first_name"
                                placeholder="John"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={styles.inputWrapper}>
                            <label style={styles.label}>Last Name</label>
                            <input
                                style={styles.input}
                                type="text"
                                name="last_name"
                                placeholder="Doe"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div style={styles.inputWrapper}>
                        <label style={styles.label}>Email Address</label>
                        <input
                            style={styles.input}
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Phone Number Input */}
                    <div style={styles.inputWrapper}>
                        <label style={styles.label}>Phone Number</label>
                        <input
                            style={styles.input}
                            type="text"
                            name="phone_number"
                            placeholder="9809763478"
                            value={formData.phone_number}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Passwords Grid */}
                    <div style={styles.row}>
                        <div style={styles.inputWrapper}>
                            <label style={styles.label}>Password</label>
                            <input
                                style={styles.input}
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={styles.inputWrapper}>
                            <label style={styles.label}>Confirm Password</label>
                            <input
                                style={styles.input}
                                type="password"
                                name="confirm_password"
                                placeholder="••••••••"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? "Registering..." : "Sign Up"}
                    </button>
                </form>

                {/* Status Message */}
                {message && (
                    <div style={styles.message}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Register;