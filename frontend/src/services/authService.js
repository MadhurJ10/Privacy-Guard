import axios  from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;


export const validateToken = async (token) => {
    const user = axios.get('' , {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    )
    return user.data;
}

// Get JWT from localStorage
export const getToken = () => {
    return localStorage.getItem('jwt');
};


// Fetch user details using JWT
export const fetchUserDetails = async () => {
    const token = getToken();
    if (!token) return null;

    try {
        const { data } = await axios.get(`${baseUrl}h/get-user`, {
            headers: { Authorization: `${token}` },
        });
        return data; // Adjust based on your API response
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};

function removeToken() {
  // Check if the token exists in local storage
  if (localStorage.getItem('jwt')) {
    // Remove the token
    localStorage.removeItem('jwt');
    console.log('Token removed successfully.');
  } else {
    console.log('No token found.');
  }
}

// Logout user
export const logoutUser = () => {
    removeToken();
    window.location.href = '/login'; // Redirect to login page
};
