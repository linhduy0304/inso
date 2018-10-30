export const renderVND = (data) => {
    let a = data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    return a;
}

export const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const convertDate = (date) => {
    var new1 = date.split("-");
    new2 = `${new1[2]}/${new1[1]}/${new1[0]}`;
    return new2;
}