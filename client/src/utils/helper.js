const helpers = {
    isJsonString: (data) => {
        try {
            JSON.parse(data)
        } catch (error) {
            return false
        }
        return true;
    },
    dateFormat: (date) => {
        return new Date(date).toLocaleString('vi-VN', {
            dateStyle: 'short',
            timeStyle: 'short'
        })
    },
    numberFormat: num => new Intl.NumberFormat().format(Number(num)),
    roundNumber: (number) => { return Math.floor(number / 1000) * 1000 },
    maskEmail: (email) => {
        // Tách email thành hai phần: phần trước và sau @
        const [localPart, domain] = email.split('@');

        // Lấy kí tự đầu tiên và hai kí tự cuối cùng của phần trước @
        const firstChar = localPart[0];
        const lastTwoChars = localPart.slice(-2);

        // Tạo chuỗi đã ẩn bằng cách thêm dấu * vào giữa
        const maskedLocalPart = firstChar + '*********' + lastTwoChars;

        // Kết hợp phần đã ẩn và tên miền lại thành email
        return maskedLocalPart + '@' + domain;
    },
    validatePhoneNumber: (phoneNumber) => {
        // Kiểm tra số điện thoại theo định dạng của Việt Nam
        const phoneRegex = /^(0|\+84)(3|5|7|8|9)\d{8}$/;
        return phoneRegex.test(phoneNumber);
    }
}
export default helpers