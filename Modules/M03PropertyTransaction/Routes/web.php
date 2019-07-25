<?php

Route::middleware(["auth"])->group(function() {
    urlCreatorHelper("transaction", "TransactionController");
    urlCreatorHelper("transaction_primary", "TransactionPrimaryController");
});
