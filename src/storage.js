export const saveOrders = (orders) => {
  window.localStorage.setItem('orders', JSON.stringify(orders))
}

export const loadOrders = () => {
  return JSON.parse(window.localStorage.getItem('orders') || "[{}]")
}

export const clearOrders = () => {
  return window.localStorage.setItem('orders', '[{}]')
}

export const exportOrders = () => {
  const orders = JSON.parse(window.localStorage.getItem('orders'))
  downloadJson(orders, `orders-${orders.length - 1}.json`)
}

function downloadJson(exportObj, exportName){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
