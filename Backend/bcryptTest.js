const bcrypt = require('bcryptjs');

async function testBcrypt() {
    try {
        const password = 'myPassword';
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password:', hashedPassword);

        const isMatch = await bcrypt.compare(password, hashedPassword);
        console.log('Password Match:', isMatch);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Calling the function
testBcrypt();

