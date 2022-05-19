module.exports.validateRegisterInput = (username, email, password, confirmPassword) => {
    const errors = {};
    debugger;
    if(username.trim() === '') {
        errors.username = 'Username must not be empty becuase i say so';
    }
    if(email.trim() === '') {
        errors.email = 'Email must not be empty';
    }else 
    {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx))
        {
            errors.email = 'Email must be a valid email address';
        }
    }

    if(password === '') {
        errors.password = 'Password must not be empt because i say so y';
    }
    
    if(confirmPassword === ''){
        errors.confirmPassword = 'Please confirm your password';
    }
    
    if(password !== confirmPassword){
        errors.confirmPassword = 'Passwords must match!';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1 //if the Object.keys(errors) has a length less than one that means the data is valid and there are no errors
    }
}

module.exports.validateLoginInput = (username, password) => {
    const errors = {};

    if(username.trim() === '') {
        errors.username = 'Username must not be empttttty';
    }
    
    if(password.trim() === '') {
        errors.password= 'Password must not be emptttttty';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1 //if the Object.keys(errors) has a length less than one that means the data is valid and there are no errors
    }
}