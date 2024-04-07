import { LightningElement, track } from 'lwc';
import CaseNumber from '@salesforce/schema/Case.CaseNumber';
import Status from '@salesforce/schema/Case.Status';
import Origin from '@salesforce/schema/Case.Origin';

export default class CaseCloneFormat extends LightningElement {
    
    @track recordId;

    fieldsArray = [CaseNumber,Status,Origin];
}