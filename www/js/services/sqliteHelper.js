var db;
var DB_CONSTANTS = {};
var sqliteHelper = {};
sqliteHelper.DB_NAME = 'demo1.db';
sqliteHelper.TABLE_NAME = 'AppInfo';
sqliteHelper.FEILD_NAME_TOKEN = 'token';
sqliteHelper.FEILD_NAME_USER = 'user';
sqliteHelper.FEILD_NAME_LANGUAGE = 'language';
sqliteHelper.FEILD_NAME_USERNAME = 'userName';

sqliteHelper.init = function () {
    var deferred = $.Deferred();
    db = window.sqlitePlugin.openDatabase({ name: sqliteHelper.DB_NAME, location: 'default' });
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS ' + sqliteHelper.TABLE_NAME
            + ' (' + sqliteHelper.FEILD_NAME_TOKEN
            + ', ' + sqliteHelper.FEILD_NAME_USER
            + ', ' + sqliteHelper.FEILD_NAME_LANGUAGE
            + ', ' + sqliteHelper.FEILD_NAME_USERNAME + ')');
    }, function (error) {
        alert('Transaction ERROR: ' + error.message);
        deferred.reject();
    }, function () {
        deferred.resolve();
    });
    return deferred.promise();
}

sqliteHelper.addItem = function(keyList, valueList) {
    var deferred = $.Deferred();
    db.transaction(function (tx) {
        var query = 'INSERT INTO AppInfo (' + keyList.join() + ') VALUES (?, ?, ?, ?)';
        tx.executeSql(query, valueList, function (tx, res) {
            console.log("insertId: " + res.insertId + " -- probably 1");
            console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
        },
        function (tx, error) {
            alert('INSERT error: ' + JSON.stringify(error));
        });
    }, function (error) {
        alert('Transaction ERROR: ' + error.message);
    }, function () {
        //alert('transaction ok');
        deferred.resolve();
    });
    return deferred.promise();
}

sqliteHelper.getData = function(key, value) {
    db.transaction(function (tx) {
        var query = 'SELECT ' + key + ' FROM ' + sqliteHelper.TABLE_NAME + ' WHERE ' + sqliteHelper.FEILD_NAME_TOKEN + ' = ?';
        tx.executeSql(query, [value], function (tx, resultSet) {

            for (var x = 0; x < resultSet.rows.length; x++) {
                //alert("token: " + resultSet.rows.item(x).token +
                //    ", user: " + resultSet.rows.item(x).user +
                //    ", language: " + resultSet.rows.item(x).language +
                //    ", appVersion: " + resultSet.rows.item(x).appVersion);
            }
        },
        function (tx, error) {
            alert('SELECT error: ' + JSON.stringify(error));
        });
    }, function (error) {
        alert('Transaction ERROR: ' + error.message);
    }, function () {
        //alert('Populated database OK');
    });
}

sqliteHelper.removeItem = function (key, value) {

    db.transaction(function (tx) {

        var query = 'DELETE FROM ' + sqliteHelper.TABLE_NAME  + ' WHERE ' + key + ' = "' + value + '"';

        tx.executeSql(query, [], function (tx, res) {
            console.log("removeId: " + res.insertId);
            console.log("rowsAffected: " + res.rowsAffected);
        },
        function (tx, error) {
            alert('DELETE error: ' + error.message);
        });
    }, function (error) {
        alert('transaction error: ' + error.message);
    }, function () {
        //alert('transaction ok');
    });
}

sqliteHelper.updateItem = function(idKey, idValue, keyList, valueList) {
    var deferred = $.Deferred();
    db.transaction(function (tx) {
        var query = 'UPDATE '+ sqliteHelper.TABLE_NAME + ' SET ' + keyList.join('= ?,') + '=? WHERE ' + idKey + ' = "' + idValue + '"';
        tx.executeSql(query, valueList, function (tx, res) {
            console.log("insertId: " + res.insertId);
            console.log("rowsAffected: " + res.rowsAffected);
        },
        function (tx, error) {
            alert('UPDATE error: ' + error.message);
        });
    }, function (error) {
        alert('transaction error: ' + error.message);
    }, function () {
        //alert('transaction ok');
        deferred.resolve();
    });
    return deferred.promise();
}

sqliteHelper.getFirstRow =  function() {
    var retVal;
    var deferred = $.Deferred();
    //alert('begin fet first row')
    db.transaction(function (tx) {
        var query = 'SELECT * FROM ' + sqliteHelper.TABLE_NAME;
        tx.executeSql(query, [], function (tx, resultSet) {
            if (resultSet && resultSet.rows && resultSet.rows.length > 0)
                retVal = resultSet.rows.item(0);
            //alert('begin fet first row then');
            //deferred.resolve(retVal || {});
        },
        function (tx, error) {
            alert('SELECT error: ' + JSON.stringify(error));
        });
    }, function (error) {
        alert('Transaction ERROR: ' + error.message);
    }, function () {
        deferred.resolve(retVal);
    });
    return deferred.promise();
}

sqliteHelper.removeAll = function () {
    var deferred = $.Deferred();
    db.transaction(function (tx) {
        var query = 'DELETE FROM ' + sqliteHelper.TABLE_NAME;
        tx.executeSql(query, [], function (tx, res) {
            console.log("removeId: " + res.insertId);
            console.log("rowsAffected: " + res.rowsAffected);
        },
        function (tx, error) {
            alert('DELETE error: ' + error.message);
        });
    }, function (error) {
        alert('transaction error: ' + error.message);
    }, function () {
        //alert('transaction ok');
        deferred.resolve();
    });

    return deferred.promise();
}