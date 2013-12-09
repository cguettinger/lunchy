/**
 * Created by janrode on 09.12.13.
 */

currentDateWithoutTime = function (){

    var currentDate = new Date();
    return formattedDate(currentDate);
};

formattedDate = function(date){
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
};

dateFromString = function(string){
    return new Date(string);
};

dateStringFromDateWithFormat = function (date, format){

    date.toString(format);

};