import axios from "axios";
const server_base_url = process.env.REACT_APP_SERVER_BASE_URL;

/**
 * @class API
 * @description Provides methods to handle the forget password request including -
 *              , and resetting the password.
 */
class API {

    // 1. Send email for forgetting password
     async forgetPassword(email) {
        try {
            //API request
            const response = await axios.post(`${server_base_url}/forgetPassword`, { email },{ withCredentials: true });
            // success msg with next-step instructions.
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || "Error in Forget Password Request";
        }
    }

    // 2. Verify OTP.
     async verifyOtp(otp) {
        try {
            //API request.
            const response = await axios.post(`${server_base_url}/verifyPasswordChangeOTP`, { otp },{ withCredentials: true });

            // success msg with token for password change.
            return response.data;
        } catch (error) {
            //Error handling.
            throw error.response?.data?.message || "Invalid OTP";
        }
    }

    //3. Reset Password.
     async resetPassword(newPassword) {
        try {
            //API request.
            const response = await axios.post(`${server_base_url}/confirmPasswordChange`, { newPassword: newPassword },{ withCredentials: true });
            // success msg.
            return response.data;
        } catch (error) {
            //Error handling.
            throw error.response?.data?.message || "Error in Resetting Password";
        }
    }
}

export default API;