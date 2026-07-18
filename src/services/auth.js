// Mock Authentication Service

const MOCK_VOLUNTEERS = [
  { id: 'VOL-123', name: 'John Doe', email: 'john@example.com' },
  { id: 'VOL-456', name: 'Jane Smith', email: 'jane@example.com' }
];

const MOCK_ORGANIZERS = [
  { id: 'ORG-123', name: 'Admin', email: 'admin@example.com' },
  { id: 'ORG-999', name: 'Super', email: 'super@example.com' }
];

const MOCK_STAFF = [
  { id: 'STF-123', name: 'John Doe', email: 'john@example.com' },
  { id: 'STF-456', name: 'Jane Smith', email: 'jane@example.com' }
];

// Helper for OTP persistence across HMR
const getOtpStore = () => {
  const store = localStorage.getItem('mockOtpStore');
  return store ? JSON.parse(store) : {};
};

const setOtpStore = (store) => {
  localStorage.setItem('mockOtpStore', JSON.stringify(store));
};

/**
 * Requests an OTP for the given role and credentials.
 */
export const requestOTP = async (role, name, id, email) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let users;
      if (role === 'volunteer') {
        users = MOCK_VOLUNTEERS;
      } else if (role === 'organizer') {
        users = MOCK_ORGANIZERS;
      } else if (role === 'staff') {
        users = MOCK_STAFF;
      } else {
        return reject(new Error('Invalid role specified.'));
      }
      const trimmedName = name.trim().toLowerCase();
      const trimmedId = id.trim();
      const trimmedEmail = email.trim().toLowerCase();
      
      const user = users.find(u => 
        u.id === trimmedId && 
        u.name.toLowerCase() === trimmedName && 
        u.email.toLowerCase() === trimmedEmail
      );
      
      if (!user) {
        return reject(new Error('Invalid credentials. Please check your Name, ID, and Email.'));
      }

      // Generate a mock 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store OTP with an expiry of 3 minutes
      const store = getOtpStore();
      store[email] = { otp, expiresAt: Date.now() + 3 * 60 * 1000, user };
      setOtpStore(store);

      console.log(`[MOCK EMAIL to ${email}] Your OTP for ${role} login is: ${otp}`);
      resolve(otp); // Returning the OTP for development UI display
    }, 800);
  });
};

/**
 * Verifies the OTP for the given email.
 */
export const verifyOTP = async (email, otpInput) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const store = getOtpStore();
      const record = store[email];
      
      if (!record) {
        return reject(new Error('OTP expired or not requested.'));
      }

      if (Date.now() > record.expiresAt) {
        delete store[email];
        setOtpStore(store);
        return reject(new Error('OTP has expired. Please request a new one.'));
      }

      if (record.otp !== otpInput) {
        return reject(new Error('Invalid OTP.'));
      }

      // Success, remove OTP and return user data
      delete store[email];
      setOtpStore(store);
      resolve(record.user);
    }, 800);
  });
};
