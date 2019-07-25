const GalaxyHelper = {};

GalaxyHelper.CalculatePPH = function(prevTotalCommission, currentCommission, differ, percent){
    let limitSelisih = [50, 200, 250, 9999999];
    if (differ){
        limitSelisih = differ;
    }

    var resultPPH = [];
    var totalPPh = 0;
    var remain = prevTotalCommission;
    var trueRemain = currentCommission;
    var startCountRemain = false;

    for (let i = 0; i < limitSelisih.length; i++) {
        let limitInMil = limitSelisih[i]*1000000;
        let percentCurrent = percent[i];
        var currentPay = remain - limitInMil;

        if (!startCountRemain){
            if (currentPay>=0){
                resultPPH.push(0);
                remain = currentPay;
            }else{
                limitInMil = currentPay * -1;
                remain = trueRemain;
                currentPay = remain - limitInMil;
                startCountRemain = true;
            }
        }

        if (startCountRemain){
            if (currentPay>0){
                var taxNeedToPay = limitInMil * percentCurrent/100;
                totalPPh = totalPPh + taxNeedToPay
                resultPPH.push(taxNeedToPay);
                remain = currentPay;
            }else{
                var taxNeedToPay = remain * percentCurrent/100;
                totalPPh = totalPPh + taxNeedToPay;
                resultPPH.push(taxNeedToPay);
                remain = 0;
            }
        }
    }

    return resultPPH;

}

GalaxyHelper.numberWithCommas = function(x, suffix = "", prefix = "") {
    if (x){
        var value = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return suffix + value + prefix
    }else{
        return "0"
    }
}

GalaxyHelper.dateToDMY = function (date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '-' + (m<=9 ? '0' + m : m) + '-' + y;
}

export default GalaxyHelper;