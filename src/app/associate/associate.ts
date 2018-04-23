
import { Team } from '../team/team';
import { Shift } from '../shift/shift';
import { Carriers } from '../carriers/carriers';



/**
 * Angular class for the Associate entity.
 *
 * @author vfc91343 modified by vf033782 4/6/18
 * @since 4/4/2018
 */

export class Associate {
    ContactID: number;
    Contact_Name: string;
    Contact_Email: string;
    Contact_Phone_Number: number;
    Carrier_ID: number;
    Carrier_Name: String;
    Department_ID: number;
    Shift_ID: number;
    Shift_Name: string;
    Team_Id: number;
    Team: string;
    AnytimeContact: boolean;
    department_Name: string;
    Deparment_Number: string;
    associateId: number;
    associateNumber: string;
    departmentId: number;
    name: string;
    email: string;
}
