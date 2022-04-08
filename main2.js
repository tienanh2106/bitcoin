setInterval(function(){ getData(); }, 1000);

async function getBitcoinPrice() {
    const price = await fetch('https://api.coinbase.com/v2/prices/spot?currency=USD');
    const rs = price.json();
    return rs;
}

async function getOldBitCoinPrice (){ 
    var today = new Date;
    var getMinutes = today.getTime();
    var minutes = document.getElementById('minutes').value;
    var getNumBer = Number(minutes) * 60 * 1000;
    var time = getMinutes - getNumBer;
    const oldPrice = await fetch(`https://blockchain.info/frombtc?value=100000000&currency=USD&time=${time}`);
    return oldPrice.text();
}
// async function getOldBitcoinPrice (){
// var secondNow = Date.now();
//     const priceOld = await fetch("https://blockchain.info/frombtc?value=100000000&currency=USD&time=" + (secondNow - 15 * 60 * 1000));  
//     return priceOld.text()
// }


function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// function formatNumber2(num) {
//     return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
// }


async function getData() {
    const rs = await getBitcoinPrice();
    var old = await getOldBitcoinPrice();
    
    const formatNumberOldPrice = parseFloat((old).replace(",", ""))
    const priceOld = (formatNumberOldPrice - Number(rs.data.amount)).toFixed(2);
    console.log(priceOld)
    const table = document.getElementById("btc");
    var price = rs.data.amount;
    var formatPrice = formatNumber(price);
    
    table.innerHTML = `
            <tr>
                <td colspan="9">
                    <h2>Cảnh báo</h2>
                </td>
            </tr>
         <tr>
            <th>Coin</th>
            <th>Giá hiện tại</th>
            <th id="minutes2">Giá ${minutes} trước</th>
            <th>Tăng / giảm</th>
            <th>Thời gian</th>
            <th>Cài đặt giá</th>
            <th>Trong khoảng</th>
            <th>Thông báo tới</th>
            <th>Chỉnh sửa/Xóa</th>
        </tr>
        <tr>
            <td>${rs.data.base}</td>
            <td>${formatPrice} ${rs.data.currency}</td>
            <td>${old} ${rs.data.currency}</td>
            <td id='m'></td>
            <td id="time-now"></td>
            <td ></td>
            <td ></td>
            <td>@tienanh</td>
            <td>Chỉnh sửa/Xóa</td>
        </tr>     
    `
    var today = new Date();
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    document.getElementById("time-now").innerHTML = dateTime;
    var minutes = document.getElementById('minutes').value;
    if(minutes == ''){
        document.getElementById('minutes2').innerHTML = `giá hiện tại` ;
    }else {
        document.getElementById('minutes2').innerHTML = `giá trong ${minutes}p trước` ;
    }
    const chancePrice = document.getElementById('m');
    chancePrice.innerHTML = `${priceOld} ${rs.data.currency}`
}

        