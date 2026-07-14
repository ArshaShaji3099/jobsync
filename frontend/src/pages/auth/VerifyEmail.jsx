import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

function VerifyEmail() {
    const { uid, token } = useParams();
    const navigate = useNavigate();

    const [message, setMessage] = useState("Verifying your email...");

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await api.get(
                    `/auth/verify-email/${uid}/${token}/`
                );

                setMessage(response.data.message);

                setTimeout(() => {
                    navigate("/login");
                }, 3000);

            } catch (error) {
                setMessage("Invalid or expired verification link.");
            }
        };

        verifyEmail();
    }, []);

    return (
        <div
            style={{
                color: "white",
                textAlign: "center",
                marginTop: "120px",
            }}
        >
            <h1>{message}</h1>

            <p>
                You will be redirected to login shortly...
            </p>
        </div>
    );
}

export default VerifyEmail;