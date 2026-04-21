const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

async function checkUser() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const UserSchema = new mongoose.Schema({}, { strict: false });
        const User = mongoose.model('User', UserSchema);
        
        const emailToSearch = 'mendietanatanael9@gmail.com';
        const user = await User.findOne({ email: emailToSearch });
        
        if (user) {
            console.log(`\n[RESULT] El usuario ya existe:`);
            console.log(`- Email: ${user.email}`);
            console.log(`- Verificado: ${user.isVerified}`);
        } else {
            console.log(`\n[RESULT] El correo ${emailToSearch} NO está registrado aún. ¡Puedes usarlo!`);
        }
        
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error.message);
        process.exit(1);
    }
}

checkUser();
