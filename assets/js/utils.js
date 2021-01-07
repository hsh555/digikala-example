(function () {
    "use strics";

    window.app = window.app || {};

    window.app.utils = {
        toPersianNumber: toPersianNumber
    };

    /**
     * @param {String}
     * @param {String || Number} num 
     */
    // this function convert english numbers to persian
    function toPersianNumber(num) {
        if (num && (typeof num == 'string' || typeof num == 'number')) {
            let data = { '0': '۰', '1': '۱', '2': '۲', '3': '۳', '4': '۴', '5': '۵', '6': '۶', '7': '۷', '8': '۸', '9': '۹', '.': '.' };
            num = num.toString();

            for (let char of num) {
                num = num.replace(char, data[char]);
            }
        }
        return num;
    }
})();