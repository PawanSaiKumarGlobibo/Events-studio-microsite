

export class Validator {

    static validateEmail(inputText:any):boolean {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputText.match(mailformat)) {
            return true;
        }
        return false;
    }
}