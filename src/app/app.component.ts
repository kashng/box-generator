import { Component, ElementRef, Renderer2, ViewChildren } from '@angular/core';
import { QueryList } from '@angular/core';
import { BoxFactoryComponent } from './box-factory/box-factory.component';
import { GlobalServiceService } from './global-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BoxFactoryComponent, GlobalServiceService]
})
export class AppComponent {

  @ViewChildren('boxRefId', {read: ElementRef}) boxList: QueryList<ElementRef>;
  @ViewChildren(BoxFactoryComponent, {read: BoxFactoryComponent}) boxFactoryList: QueryList<BoxFactoryComponent>;
  boxFactoryArray: Array<BoxFactoryComponent> = [];
  selectedBox: number;
  selectedBoxRef: ElementRef;
  selectedBoxFactory: BoxFactoryComponent;

  constructor(private renderer: Renderer2) { }

  keyDownListener = this.renderer.listen(window, 'keydown', event => this.keyEvent(event));

  keyEvent(event: KeyboardEvent) {

    if (this.selectedBoxRef === undefined) {
      this.boxList.forEach(box => {
        if (box.nativeElement.id === this.boxFactoryArray.length.toString()) {
          this.selectedBoxRef = box;
        }
      });
    }

    switch (event.key) {
      case 'w':
        if (this.selectedBoxRef.nativeElement.children[0].style.top === '') {
          this.renderer.setStyle(this.selectedBoxRef.nativeElement.children[0], 'top', '0');
        }
        let top: String = this.selectedBoxRef.nativeElement.children[0].style.top.replace('px', '');
        top = (Number(top) - 10).toString() + 'px';
        this.renderer.setStyle(this.selectedBoxRef.nativeElement.children[0], 'top', top);
        break;
      case 's':
        if (this.selectedBoxRef.nativeElement.children[0].style.top === '') {
          this.renderer.setStyle(this.selectedBoxRef.nativeElement.children[0], 'top', '0');
        }
        top = this.selectedBoxRef.nativeElement.children[0].style.top.replace('px', '');
        top = (Number(top) + 10).toString() + 'px';
        this.renderer.setStyle(this.selectedBoxRef.nativeElement.children[0], 'top', top);
        break;
      case 'a':
        if (this.selectedBoxRef.nativeElement.children[0].style.left === '') {
          this.renderer.setStyle(this.selectedBoxRef.nativeElement.children[0], 'left', '300px');
        }
        let left: String = this.selectedBoxRef.nativeElement.children[0].style.left.replace('px', '');
        left = (Number(left) - 10).toString() + 'px';
        this.renderer.setStyle(this.selectedBoxRef.nativeElement.children[0], 'left', left);
        break;
      case 'd':
        if (this.selectedBoxRef.nativeElement.children[0].style.left === '') {
          this.renderer.setStyle(this.selectedBoxRef.nativeElement.children[0], 'left', '300px');
        }
        left = this.selectedBoxRef.nativeElement.children[0].style.left.replace('px', '');
        left = (Number(left) + 10).toString() + 'px';
        this.renderer.setStyle(this.selectedBoxRef.nativeElement.children[0], 'left', left);
        break;
      case 'Delete':
        this.destroyBox();
        break;
      default:
        console.log('Please Enter One of the Following Keys for Box Movement : w (up), s (down), a (left), d (right)')
        break;
    }
  }

  public createBox() {
    this.boxFactoryArray.push(new BoxFactoryComponent());
    GlobalServiceService.globalBoxCount ++;
  }

  public destroyBox() {
    if (this.selectedBoxRef === undefined) {
      console.log('Please select a box and then click Delete');
    } else {
      this.boxFactoryArray.splice(this.selectedBox - 1, 1);
    }
  }

  public destroyControls() {
    if (!this.keyDownListener) {
      this.keyDownListener = this.renderer.listen(window, 'keydown', event => this.keyEvent(event));
    } else {
      this.keyDownListener();
      this.keyDownListener = null;
    }
  }

  public setControls(boxRefId: number) {

    if (this.selectedBoxRef !== undefined) {
      this.renderer.removeStyle(this.selectedBoxRef.nativeElement.children[0].children[0].children[0].children[0].children[0], 'background');
      this.renderer.removeStyle(this.selectedBoxRef.nativeElement.children[0].children[0].children[0].children[0].children[1], 'background');
      this.renderer.removeStyle(this.selectedBoxRef.nativeElement.children[0].children[0].children[0].children[0].children[2], 'background');
      this.renderer.removeStyle(this.selectedBoxRef.nativeElement.children[0].children[0].children[0].children[0].children[3], 'background');
    }

    this.selectedBox = boxRefId;
    this.boxList.forEach(box => {
      if (box.nativeElement.id === boxRefId.toString()) {
        this.selectedBoxRef = box;
        this.renderer.setStyle(this.selectedBoxRef.nativeElement.children[0].children[0].children[0].children[0].children[0], 'background', 'grey');
        this.renderer.setStyle(this.selectedBoxRef.nativeElement.children[0].children[0].children[0].children[0].children[1], 'background', 'grey');
        this.renderer.setStyle(this.selectedBoxRef.nativeElement.children[0].children[0].children[0].children[0].children[2], 'background', 'grey');
        this.renderer.setStyle(this.selectedBoxRef.nativeElement.children[0].children[0].children[0].children[0].children[3], 'background', 'grey');
      }
    });

    this.boxFactoryList.forEach(boxFactory => {
      if ((boxFactory.zIndex + 1) === this.selectedBox) {
        this.selectedBoxFactory = boxFactory;
      }
    });
  }

}
