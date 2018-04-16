import { Component } from "@angular/core";
import { OnChanges,Input } from "@angular/core";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";


@Component({
    selector:'pm-star',
    templateUrl:'./star.component.html',
    styleUrls:['./star.component.css']
})
export class starComponenet implements OnChanges
{
    starWidth:number;
    @Input() rating:number;

    ngOnChanges():void
    {
        this.starWidth=this.rating * 86/5;
    }

    @Output() starClicked:EventEmitter<string> =
                        new EventEmitter<string>();

    onClick()
    {
        this.starClicked.emit(`The rating ${this.rating} is clicked`);
    }
}