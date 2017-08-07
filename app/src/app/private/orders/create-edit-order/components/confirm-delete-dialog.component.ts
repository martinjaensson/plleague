import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from "@angular/material";

@Component({
    selector: 'confirm-delete-dialog',
    templateUrl: './confirm-delete-dialog.component.html',
    styleUrls: [ './confirm-delete-dialog.component.scss' ]
})
export class ConfirmDeleteDialogComponent implements OnInit {
    constructor(private _mdDialogRef: MdDialogRef<ConfirmDeleteDialogComponent>) { }

    ngOnInit() { 

     }

    cancel(): void {
        this._mdDialogRef.close(false);
    }

    delete(): void {
        this._mdDialogRef.close(true);
    }

}