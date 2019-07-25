<?php

function calculatePPH21Galaxy($totalCommissionThisYear)
{
    $limitTrue = [50, 250, 500, 99999];
    $limitSelisihTrue = [50, 200, 250, 100000]; // this is different sum from limitTrue
    $percent = [1, 2, 3, 4];
    $totalTaxNeedToPay = 0;
    $currentCommission = $totalCommissionThisYear;

    foreach ($limitSelisihTrue as $i => $item) {
        $limitInMillion = $item * 1000000;
        $percentCurrent = $percent[$i];
        $currentPay = $totalCommissionThisYear - $limitInMillion;

        if ($currentPay > 0) {
            $totalTaxNeedToPay = $totalTaxNeedToPay + ($limitInMillion * $percentCurrent/100);
            $currentCommission = $currentPay;
        } else {
            $totalTaxNeedToPay = $totalTaxNeedToPay + (($currentCommission) * $percentCurrent/100);
            $currentCommission = 0;
        }
    }
    return $totalTaxNeedToPay;
}

function calculateProgressive($prevTotalCommission, $currentCommission, $limitTrueArray = [50, 250, 500, 10000000], $limitDiffArray = [50, 200, 250, 100000], $percentArray = [1, 2, 3, 4])
{
    $result = [];
    $totalProgressive = 0;
    $remain = $prevTotalCommission;
    $trueRemain = $currentCommission;
    $startCountRemain = false;

    for ($i = 0; $i < count($limitTrueArray); $i++) {
        $limitInMil = $limitDiffArray[$i]*1000000;
        $percentCurrent = $percentArray[$i];
        $currentPay = $remain - $limitInMil;

        if (!$startCountRemain) {
            if ($currentPay >= 0) {
                // count for the prev Comissoin
                array_push($result, 0);
                $remain = $currentPay;
            } else {
                $limitInMil = $currentPay * -1;
                $remain = $trueRemain;
                $currentPay = $remain - $limitInMil;
                $startCountRemain = true;
            }
        }

        // start on the new
        if ($startCountRemain) {
            if ($currentPay >= 0) {
                $resultProgressive = $limitInMil * $percentCurrent/100;
                $totalProgressive = $totalProgressive + $resultProgressive;
                array_push($result, $resultProgressive);
                $remain = $currentPay;
            } else {
                $resultProgressive = $remain * $percentCurrent/100;
                $totalProgressive = $totalProgressive + $resultProgressive;
                array_push($result, $resultProgressive);
                $remain = 0;
            }
        }
    }

    return $result;
}
function calculatePPH($prevTotalCommission, $currentCommission){
    return calculateProgressive($prevTotalCommission, $currentCommission, [50, 250, 500, 10000000], [50, 200, 250, 100000], [1, 2, 3, 4]);
}

function calculatePercentCommission($prevTotalCommission, $currentCommission){
    return calculateProgressive($prevTotalCommission, $currentCommission, [50, 250, 500, 10000000], [50, 200, 250, 100000], [50, 55, 60, 70]);
}


function foreachLookfor($array, $key, $value)
{
    foreach ($array as $item) {
        if ($item[$key] == $value) {
            return $item;
        }
    }
    return null;
}