import { getEle } from "../main.js";
class Validation{
    checkEmp(value, errorID, mess) {
        if (value === "") { 
            getEle(errorID).style.display = "block";
            getEle(errorID).innerHTML = `(*) Vui lòng nhập ${mess}`;
            return false;
        } else {
            getEle(errorID).style.display = "none";
            getEle(errorID).innerHTML = "";
            return true;
        }
    }

    checkCharacter(value, errorID, mess) { 
        const letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (value.match(letter)) {
            getEle(errorID).style.display = "none";
            getEle(errorID).innerHTML = "";
            return true;
        } else { 
            getEle(errorID).style.display = "block";
            getEle(errorID).innerHTML = `(*) Vui lòng nhập ${mess}`;
            return false;
        }
    }

    checkLength(value, errorID, mess, min, max) { 
        if (value.trim().length >= min && value.trim().length <= max) { 
            getEle(errorID).style.display = "none";
            getEle(errorID).innerHTML = "";
            return true;
        } else { 
            getEle(errorID).style.display = "block";
            getEle(errorID).innerHTML = `(*) Vui lòng nhập ${mess}`;
            return false;
        }
    }

    checkNum(value, errorID, mess) { 
        const num = parseFloat(value.trim());
        if (isNaN(num)) {
            getEle(errorID).style.display = "block";
            getEle(errorID).innerHTML = `(*) ${mess} phải là số hợp lệ`;
            return false;
        } else { 
            getEle(errorID).style.display = "none";
            getEle(errorID).innerHTML = "";
            return true;
        }
    }


    checkDay(value, errorID, mess) { 
        const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
        if (value.match(regex)) {
            getEle(errorID).style.display = "none";
            getEle(errorID).innerHTML = "";
            return true;
        } else { 
            getEle(errorID).style.display = "block";
            getEle(errorID).innerHTML = `(*) Vui lòng nhập ${mess}`;
            return false;
        }
    }

    checkEmail(value, errorID, mess) { 
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(regex)) {
            getEle(errorID).style.display = "none";
            getEle(errorID).innerHTML = "";
            return true;
        } else { 
            getEle(errorID).style.display = "block";
            getEle(errorID).innerHTML = `(*) Vui lòng nhập ${mess}`;
            return false;
        }
    }

    checkpass(value, errorID, mess) { 
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
        if (value.match(regex)) {
            getEle(errorID).style.display = "none";
            getEle(errorID).innerHTML = "";
            return true;
        } else { 
            getEle(errorID).style.display = "block";
            getEle(errorID).innerHTML = `(*) Vui lòng nhập ${mess}`;
            return false;
        }
    }

    checkType(value, errorID, mess) {
        if (value === "0") {
            getEle(errorID).style.display = "block";
            getEle(errorID).innerHTML = `(*) Vui lòng chọn ${mess}`;
            return false;
        } else {
            getEle(errorID).style.display = "none";
            getEle(errorID).innerHTML = "";
            return true;
        }
    }
}

export default Validation;