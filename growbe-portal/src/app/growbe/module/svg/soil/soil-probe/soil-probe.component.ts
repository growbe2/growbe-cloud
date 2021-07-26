import { animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, keyframes, state, style, transition, trigger } from '@angular/animations';
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

@Component({
  selector: 'g[soil-probe]',
  templateUrl: './soil-probe.component.svg',
  styleUrls: ['./soil-probe.component.scss'],
})
export class SoilProbeComponent implements OnInit {
  @ViewChild(AnimateMeDirective) animate: AnimateMeDirective;

  @Input() position: 'left' | 'right' | 'bottom'
  @Input() name = '';

  private pValue: number;
  @Input() set value(value: number) {
    this.pValue = value;
    if (this.value >= 10) {
      this.status = 'ok';
    } else {
      this.status = 'unknow';
      this.pValue = undefined;
    }
    if (this.animate) {
      this.animate.play();
    }
  }

  get value(): number {
    return this.pValue;
  }

  status: 'ok' | 'high' | 'low' | 'disconnected' | 'unknow' = 'unknow';
  pulse = true;
  animationMetadata = [pulseAnimation];

  constructor() { }

  ngOnInit(): void {}
}
