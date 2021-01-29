import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ScriptService } from '../script.service';

@Component({
  selector: 'app-node-editor',
  templateUrl: './node-editor.component.html',
  styleUrls: ['./node-editor.component.scss']
})
export class NodeEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>

  element: HTMLElement;

  constructor(
    private script: ScriptService,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    (window as any).Module = {
        preRun: [],
        postRun: [],
        print: (function() {
          console.log('PRINT');
          return (text) => {
            console.log(text);
          }
        })(),
        printErr: function(text) {
          if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
          console.error(text);
        },
        canvas: (() => {
          const canvas = this.canvas.nativeElement;

          // As a default initial behavior, pop up an alert when webgl context is lost. To make your
          // application robust, you may want to override this behavior before shipping!
          // See http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.15.2
          canvas.addEventListener("webglcontextlost", function(e) { alert('WebGL context lost. You will need to reload the page.'); e.preventDefault(); }, false);

          return canvas;
        })(),
        setStatus: function(text) {
          console.log('TEXT' , text);
        },
        totalDependencies: 0,
        monitorRunDependencies: function(left) {
          this.totalDependencies = Math.max(this.totalDependencies, left);
          (window as any).Module.setStatus(left ? 'Preparing... (' + (this.totalDependencies-left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
        }
      };
      (window as any).Module.setStatus('Downloading...')
      this.script.load('node-editor').then((data) =>(this.element = data[0].element));
  }

  ngOnDestroy() {
    //if(this.element)
    //  this.element.remove();
    if((window as any).Module) {
      console.log((window as any).Module);
      (window as any).Module.abort();
      //delete (window as any).Module;
    }
  }

}
