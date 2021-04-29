import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, Directive, HostBinding, Injector, Input, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@berlingoqc/fuse';
import { DashboardItem, Style } from '../../dashboard.model';
import { DashboardRegistryService } from '../../registry/dashboard-registry.service';
import { DashboardRegistryItem } from '../../registry/dashboard.registry';


@Directive({ selector: '[dashboardItemContent]'})
export class ItemContentDirective implements OnInit {

  @Input()
  dashboardItem: (DashboardItem & Style);

  componentRef: ComponentRef<any>;

  registryItem: DashboardRegistryItem;

  constructor(
    private registry: DashboardRegistryService,
    private viewRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.registryItem = this.registry.getItem(this.dashboardItem.component);
     const factory = this.componentFactoryResolver.resolveComponentFactory(this.registryItem.componentType);

    this.componentRef = this.viewRef.createComponent(factory);

    for(const [name, data] of Object.entries(this.dashboardItem.inputs)) {
      this.componentRef.instance[name] = data
    }
  }

  ngOnDestroy(): void {
    this.componentRef.destroy();
  }
}

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class DashboardItemComponent implements OnInit{

  @HostBinding('class')
  classes: string[];

  @Input()
  dashboardItem: (DashboardItem & Style);

  constructor() { }

  ngOnInit(): void {
    if (!this.dashboardItem) return;
    this.classes = this.dashboardItem.class;
  }
}
