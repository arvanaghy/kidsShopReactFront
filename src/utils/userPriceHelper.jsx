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
        amount = item?.SPrice;
        break;
    }
    if (amount > 0) {
      return amount;
    } else if (item?.product_size_color?.length > 0) {
      // find array items with Mande > 0 and lowest Mablag
      const filteredItems = item?.product_size_color?.filter(
        (item) => item.Mande > 0
      );
      if (filteredItems.length > 0) {
        const sortedItems = filteredItems.sort((a, b) => a.Mablag - b.Mablag);
        return sortedItems[0]?.Mablag;
      } else {
        return "0";
      }
    } else {
      return "0";
    }
  } else {
    if (item?.SPrice > 0) {
      return item?.SPrice;
    } else if (item?.product_size_color?.length > 0) {
      const filteredItems = item?.product_size_color?.filter(
        (item) => item.Mande > 0
      );
      if (filteredItems.length > 0) {
        const sortedItems = filteredItems.sort((a, b) => a.Mablag - b.Mablag);
        return sortedItems[0]?.Mablag;
      } else {
        return "0";
      }
    } else {
      return "0";
    }
  }
}
