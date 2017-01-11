import { Component, NgZone } from '@angular/core';

@Component({
    selector: 'ng-zone-demo',
    template: `
    <p>进度: {{progress}}%</p>
    <p *ngIf="progress >= 100">Done processing {{label}} of Angular zone!</p>
    
    <button (click)="processWithinAngularZone()">Process within Angular zone</button>
    <button (click)="processOutsideOfAngularZone()">Process outside of Angular zone</button>
  `
})
export class NgZoneDemoComponent {
    progress: number = 0;
    label: string;

    constructor(private _ngZone: NgZone) {}

    // Loop inside the Angular zone
    // so the UI DOES refresh after each setTimeout cycle
    processWithinAngularZone() {
        this.label = 'inside';
        this.progress = 0;
        this._ngZone.run(()=>{
            this._increaseProgress(() => console.log('Inside Done!'))
        })

        //等价于
        // this._increaseProgress(() => console.log('Inside Done!'))


    }

    // Loop outside of the Angular zone
    // so the UI DOES NOT refresh after each setTimeout cycle
    processOutsideOfAngularZone() {
        this.label = 'outside';
        this.progress = 0;
        this._ngZone.runOutsideAngular(() => {
            this._increaseProgress(() => {
                // reenter the Angular zone and display done
                this._ngZone.run(() => { console.log('Outside Done!') });
                // () => console.log('Inside Done!')

            });
        });
    }


    _increaseProgress(doneCallback: () => void) {

        // 如果是outside zone ，这个组件的就不检测到这个setTimeout 引起的变化
        window.setTimeout(() => {

            this.progress += 1;
            console.log(`Current progress: ${this.progress}%`);

            if (this.progress < 100) {
                window.setTimeout(() => {
                    this._increaseProgress(doneCallback);
                }, 10);
            } else {
                doneCallback();
            }
        }, 5);

        // 按照这种方式 progress = 1 还是会显示到本组件的zone
        // this.progress += 1;
        // console.log(`Current progress: ${this.progress}%`);
        //
        // // 如果是outside zone ，这个组件的就不检测到这个setTimeout 引起的变化
        // if (this.progress < 100) {
        //     window.setTimeout(() => {
        //         this._increaseProgress(doneCallback);
        //     }, 10);
        // } else {
        //     doneCallback();
        // }

    }
}
