function Login() {
    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2>Sign In to Your Account</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        required
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        marginTop: '10px'
                    }}
                >
                    Sign In
                </button>
            </form>
        </div>
    );
}


export default Login;