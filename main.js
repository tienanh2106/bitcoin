setInterval(function(){ getData(); }, 1000);

async function getBitcoinPrice() {
 
    const price = await fetch('https://api.coinbase.com/v2/prices/spot?currency=USD');
    const rs = price.json();
    return rs;
}

async function getOldBitCoinPrice (){
    const oldPrice= await fetch('https://blockchain.info/ticker');
    const old =  oldPrice.json();
    return old;

}

// function formatNumber(num) {
//     return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
// }
function formatNumber(num) {
    var n = Number(num);
    return n.toLocaleString("en");
}

async function getData() {
    const rs = await getBitcoinPrice();
    const old = await getOldBitCoinPrice();
    const table = document.getElementById("btc");
    var price = rs.data.amount;
    var oldPrice = old.USD.last;
    var m =  price-oldPrice;
    
    var formatPrice = formatNumber(price);
    var formatOldPrice = formatNumber(oldPrice)
    console.log(formatPrice)
    table.innerHTML = `
            <tr>
                <td colspan="9">
                    <h2>Cảnh báo</h2>
                </td>
            </tr>
         <tr>
            <th>Coin</th>
            <th>Giá hiện tại</th>
            <th>Giá 15p trước</th>
            <th>Tăng / giảm</th>
            <th>Thời gian</th>
            <th>Cài đặt giá</th>
            <th>Trong khoảng</th>
            <th>Thông báo tới</th>
            <th>Chỉnh sửa/Xóa</th>
        </tr>
        <tr>
            <td>${rs.data.base}</td>
            <td>${formatPrice}${rs.data.currency}</td>
            <td>${formatOldPrice}</td>
            <td id='m'></td>
            <td id="time-now"></td>
        </tr>
    `
    var today = new Date();
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    document.getElementById("time-now").innerHTML = dateTime;
    const chancePrice = document.getElementById('m');
    if(m>0){
        chancePrice.innerHTML = `${m}`
    }
    else{chancePrice.innerHTML = `${m}`}
}

        
