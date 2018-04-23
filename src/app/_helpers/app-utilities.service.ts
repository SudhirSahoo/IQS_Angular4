import {Injectable}     from "@angular/core";

/**
 * Service that will contain application wide utility function or variables.
 *
 * @author vfc91343
 * @since 4/4/2018
 */
@Injectable()
export class AppUtilitiesService {
    public arrayIsEmpty(array): boolean {
        if(typeof array !== 'undefined' && array.length > 0){
            return false;
        }

        return true;
    }

    public isValidDate(date): boolean {
        // it is a date object
        if(Object.prototype.toString.call(date) === "[object Date]"){
            // check if date object is a valid date
            // if the date's timestamp is Not a Number,
            // then the date is not valid
            // otherwise the date is valid
            return !isNaN(date.getTime());
        } else {
            // it's not a date object
            // check if it we can parse it and get a valid timestamp
            // if the parsed date is Not a Number, then the date is not valid
            // otherwise the date is valid
            return !isNaN(Date.parse(date));
        }
    }
}
