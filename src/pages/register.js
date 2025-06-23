let toggleIcon = document.querySelectorAll('.toggle-password');
let passwordInput = document.querySelectorAll('.password-input');

const BASE_URL = 'http://localhost:8000';

let mode = 'CREATE'; //default

for (let i = 0; i < toggleIcon.length; i++) {
    toggleIcon[i].addEventListener('click', () => {
        toggleIcon[i].classList.toggle('fa-eye');

        if (passwordInput[i].type == 'password') {
            passwordInput[i].type = 'text';
        } else {
            passwordInput[i].type = 'password';
        }
    })
}

const validateData = (userData) => {
    let errors = [];

    if (!userData.username) {
        errors.push('ชื่อผู้ใช้');
    }
    if (!userData.password) {
        errors.push('รหัสผ่าน');
    }
    if (!userData.confirmPassword) {
        errors.push('รหัสผ่านอีกครั้ง');
    }

    return errors
}

const submitData = async () => {
    let usernameDOM = document.querySelector('input[name=username]');
    let passwordDOM = document.querySelector('input[name=password]');
    let confirmPasswordDOM = document.querySelector('input[name=comfirmPassword]');

    let messageDOM = document.getElementById('message');

    try {
        // data from input
        let userData = {
            username: usernameDOM?.value || '',
            password: passwordDOM?.value || '',
            confirmPassword: confirmPasswordDOM?.value || ''
        }

        //check value input
        const errors = validateData(userData);

        if (errors.length > 0) {
            throw {
                message: 'กรอกข้อมูลไม่ครบ',
                errors: errors
            }
        }
        
        // chech confirm password
        if (userData.password == userData.confirmPassword) {

            let submitMessage = 'ลงทะเบียนเรียบร้อย';
            
            if (mode == 'CREATE') {
                const response = await axios.post(`${BASE_URL}/users`, userData);
                console.log('response: ', response.data);
            } else if (mode == 'EDIT') {
                const response = await axios.put(`${BASE_URL}/users/${selectedID}`, userData);
                console.log('response: ', response.data);
                submitMessage = 'แก้ไขข้อมูลเรียบร้อย';
            } 
    
            messageDOM.innerText = submitMessage;
            messageDOM.className = 'message success';
        } else {
            messageDOM.innerText = 'กรอกรหัสผ่านไม่ตรงกัน';
            messageDOM.className = 'message danger';
            throw {
                message: 'กรอกข้อมูลไม่ถูกต้อง',
                errors: ['รหัสผ่านไม่ตรงกัน']
            }
        }

    } catch (error) {
        // show errors
        let htmlData = '<div>';
        htmlData += `<div>${error.message}</div>`;
        htmlData += `<ul>`;
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`;
        }
        htmlData += `</ul>`;
        htmlData += '</div>';

        messageDOM.innerHTML = htmlData;
        messageDOM.className = 'message danger';
    }
}