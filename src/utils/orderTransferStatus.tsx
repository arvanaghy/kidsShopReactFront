import React from 'react'

const orderTransferStatus = (status: number | string) => {
    switch (status) {
        case '1':
            return "ارسال شده";
            break;
        case '2':
            return "رد شده";
            break;
        case '0':
        default:
            return "تایید شده";
            break;
    }
}

export default orderTransferStatus