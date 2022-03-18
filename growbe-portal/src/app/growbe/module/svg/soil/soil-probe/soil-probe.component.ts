import { animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, keyframes, state, style, transition, trigger } from '@angular/animations';
import { DecimalPipe } from '@angular/common';
import { Component, Directive, ElementRef, Input, OnInit, ViewChild } from '@angular/core';


const pulseAnimationKeyFrames = keyframes([
  style({ transform: 'scale(1)', offset: 0 }),
  style({ transform: 'scale(1.1)', offset: 0.5 }),
  style({ transform: 'scale(1)', offset: 1})
]);

const pulseAnimation = animate('2s', pulseAnimationKeyFrames);


@Directive({
  selector: '[animateMe]',
})
export class AnimateMeDirective {
  @Input() set animationMetadata(am: AnimationMetadata[]) {
    const animation = this.builder.build(am);
    this.player = animation.create(this.el.nativeElement);
  }

  private player: AnimationPlayer;

  constructor(
    private builder: AnimationBuilder,
    private el: ElementRef<any>,
  ) {}

  public play() {
    this.player?.play();
  }
}


export interface ProbeValueStatusGetter {
  getValueStatus(value: number, type?: string): SoilProbeComponent['status'];
}

@Component({
  selector: 'g[soil-probe]',
  templateUrl: './soil-probe.component.svg',
  styleUrls: ['./soil-probe.component.scss'],
  providers: [DecimalPipe]
})
export class SoilProbeComponent implements OnInit {
  @ViewChild(AnimateMeDirective) animate: AnimateMeDirective;

  @Input() position: 'left' | 'right' | 'bottom'
  @Input() property: string;
  @Input() name = '';

  @Input() set connected(c: boolean) {
    if (!c) {
      this.status = 'disconnected';
    }
  }
  @Input() set isoutdated(isoutdated: boolean) {
    if (isoutdated) {
      this.status = 'outdated';
    }
  }

  @Input() statusgetter: ProbeValueStatusGetter


  private pValue: any;
  @Input() set value(data: any) {
    if (!data) { return; }
    this.pValue = data[this.property];
    this.status = this.statusgetter.getValueStatus(this.pValue, data.valuetype);
    console.log('PVALUE', this.status, this.pValue, data.valuetype);
    if (this.status === 'unknow') {
      this.pValue = undefined;
    }
    if (this.pValue) {
      this.pValue = this.numberPipe.transform(this.pValue);
      if (this.animate && this.pValue) {
        this.animate.play();
      }
    }
  }

  get value(): number {
    return this.pValue;
  }

  status: 'ok' | 'high' | 'low' | 'disconnected' | 'outdated' | 'unknow' = 'unknow';
  pulse = true;
  animationMetadata = [pulseAnimation];

  constructor(private numberPipe: DecimalPipe) { }

  ngOnInit(): void {}
}
