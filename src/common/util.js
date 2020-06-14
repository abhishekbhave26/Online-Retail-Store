var isValidated = function(state){
    
    if (state.password !== state.password2) {
        alert("The passwords you entered do not match");
        return false;
    }
    if (state.password.length < 8){
        alert("The password you entered is less than 8 charcters. Please try again");
        return false;
    }
    return true;
}

exports.isValidated = isValidated;
