export function userPriceSelect(item, _user) {
  if (_user) {
    let amount = "0";
    switch (_user?.ForooshType) {
      case "0":
        amount = item?.SPrice;
        break;
      case "1":
        amount = item?.KhordePrice;
        break;
      case "2":
        amount = item?.OmdePrice;
        break;
      case "3":
        amount = item?.HamkarPrice;
        break;
      case "4":
        amount = item?.AgsatPrice;
        break;
      case "5":
        amount = item?.CheckPrice;
        break;
      default:
        amount = item?.KhordePrice;
        break;
    }
    return amount;
  } else {
    return item?.KhordePrice;
  }

}
