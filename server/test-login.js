import fetch from 'node-fetch';

async function testLogin() {
  try {
    const response = await fetch('http://localhost:4000/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'email=admin@midwifi.edu&password=admin123',
      redirect: 'manual'
    });

    console.log('Status:', response.status);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));

    if (response.status === 302) {
      console.log('Login successful - redirect to dashboard');
    } else {
      const text = await response.text();
      console.log('Response:', text.substring(0, 200));
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testLogin();