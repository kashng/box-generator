import { AfterViewInit, Component, ElementRef, Injectable, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';

@Component({
  selector: 'app-box-factory',
  templateUrl: './box-factory.component.html',
  styleUrls: ['./box-factory.component.css'],
  providers: [GlobalServiceService]
})
export class BoxFactoryComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() zIndex: number;
  shapeDynamicHeight: number;
  sideDynamicHeight: number;

  @ViewChild('tooltip') tootltip: ElementRef;

  side1DynamicTransform(): object {
    return {'transform': 'rotateX(0deg) translate3d(0, 0, ' + this.sideDynamicHeight + 'px )'};
  }

  side2DynamicTransform(): object {
    return {'transform': 'rotateX(90deg) translate3d(0, 0, ' + this.sideDynamicHeight + 'px )'};
  }

  side3DynamicTransform(): object {
    return {'transform': 'rotateX(180deg) translate3d(0, 0, ' + this.sideDynamicHeight + 'px )'};
  }

  side4DynamicTransform(): object {
    return {'transform': 'rotateX(270deg) translate3d(0, 0, ' + this.sideDynamicHeight + 'px )'};
  }

  ngOnInit() {
    this.shapeDynamicHeight = 100;
    this.sideDynamicHeight = this.shapeDynamicHeight / 2;
  }

  ngAfterViewInit() {
    this.tootltip.nativeElement.setAttribute('data-tooltip', (GlobalServiceService.globalBoxCount).toString());
  }

  ngOnDestroy(): void {
    console.log('Box is Destroyed !!');
  }

}
