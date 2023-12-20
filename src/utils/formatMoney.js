const formatMoney = (monney) => {
    const formatter = new Intl.NumberFormat('de-VN', {
        style: 'currency',
        currency: 'VND',
    });

    let temp = formatter.format(monney).toString();

    let res = temp.slice(0, -1);
    return res + "VND";
};
export default formatMoney;
