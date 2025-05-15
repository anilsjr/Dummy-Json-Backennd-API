export const  isInteger = (str) => {
    return /^-?\d+$/.test(str);
};

export const isNullOrUndefined = (data) => {
    if(data == null || data == undefined){
        return true;
    }
    return false;
};

export const setToZero = () => {
    return 0;
};

