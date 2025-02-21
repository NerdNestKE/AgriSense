const bcrypt = require('bcryptjs');

async function testBcrypt() {
    try {
        const password = 'myPassword';
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password:', hashedPassword);

        const isMatch = await bcrypt.compare(password, hashedPassword);
        console.log('Password mongodb://127.0.0.1:27017/femmeBot?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.2atch:', isMatch);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Calling the function
testBcrypt();

