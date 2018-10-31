import { Component, ViewChild, ElementRef, AfterViewChecked, OnInit } from '@angular/core';
import { ResizeEvent } from './Models/interface';
import { DataServiceService } from './data-service.service';
import { User } from './Models/userModel';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent implements AfterViewInit, OnDestroy {
//   @ViewChild('validBids') elRef: ElementRef;
//   mouseMoveListener: any;
//   mouseupListener: any;
//   mouseDownListener: any;

//   constructor(private renderer: Renderer2) {
//   }

//   ngAfterViewInit() {
//     this.mouseDownListener =  this.renderer.listen(this.elRef.nativeElement, 'mousedown', this.initResize.bind(this));
//   }

//   initResize(e) {
//     const parent = this.renderer.parentNode(this.elRef.nativeElement);
//     this.mouseMoveListener = this.renderer.listen(parent, 'mousemove', this.Resize.bind(this));
//     this.mouseupListener = this.renderer.listen(parent, 'mouseup', this.stopResize.bind(this));
//  }
//  Resize(e) {
//    // console.log(e.clientX, e.clientY, element.parentNode.clientHeight-e.clientY);
//    const x = (20 + e.movementX - this.elRef.nativeElement.offsetLeft);
//    const y = (20 + this.elRef.nativeElement.offsetTop - e.movementY);
//    this.elRef.nativeElement.style.width = x > 400 ? 400 + 'px' : x + 'px';
//    this.elRef.nativeElement.style.height = y > 300 ? 300 + 'px' : y + 'px';
//  }
//   stopResize(e) {
//     if (this.mouseupListener) {
//       this.mouseupListener();
//     }
//     if (this.mouseMoveListener) {
//       this.mouseMoveListener();
//     }
//  }

//   ngOnDestroy() {
//     if (this.mouseDownListener) {
//       this.mouseDownListener();
//     }
//   }
// }

export class AppComponent implements OnInit {
  public style: object = {};
  public validUsers: User[];
  public validBids: number;
  @ViewChild('box') elRef: ElementRef;
  public xRange = 0;
  public yRange = 0;

  constructor(private dataService: DataServiceService) {}

  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX = 50;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }

  ngOnInit() {}

  onResizeEnd(event: ResizeEvent): void {
    const width = event.rectangle.width > this.elRef.nativeElement.offsetWidth ?
    this.elRef.nativeElement.offsetWidth : event.rectangle.width;
    const height = event.rectangle.height > this.elRef.nativeElement.offsetHeight ?
    this.elRef.nativeElement.offsetHeight : event.rectangle.height;
    this.style = {
      position: 'fixed',
      left: `${event.rectangle.left}px`,
      top: `${event.rectangle.top}px`,
      width: `${ width }px`,
      height: `${ height }px`
    };
    const xFactor = this.elRef.nativeElement.offsetWidth / 100;
    const yFactor = this.elRef.nativeElement.offsetHeight / 100;
    this.xRange = Math.ceil( width / xFactor);
    this.yRange = Math.ceil( height / yFactor);
    this.dataService.requestDataFromServer().subscribe(
      response => {
        this.validUsers = this.dataService.validUsers(response[0]);
        this.validBids = this.dataService.validBids(response[1],
                                                    this.validUsers,
                                                    this.xRange < this.yRange ? this.xRange : this.yRange,
                                                    this.xRange > this.yRange ? this.xRange : this.yRange);
      }
    );
  }
}
