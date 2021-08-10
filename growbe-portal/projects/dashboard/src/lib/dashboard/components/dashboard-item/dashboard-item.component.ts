import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    EventEmitter,
    Host,
    HostBinding,
    HostListener,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '@berlingoqc/fuse';
import { AutoFormComponent, AutoFormData } from '@berlingoqc/ngx-autoform';
import { notify } from '@berlingoqc/ngx-notification';
import { BehaviorSubject, Subject } from 'rxjs';
import { getCopyDashboardForm } from '../../dashboard.form';
import { DashboardItem, Style } from '../../dashboard.model';
import { DashboardService, PanelDashboardRef } from '../../dashboard.service';
import { DashboardRegistryService } from '../../registry/dashboard-registry.service';
import { DashboardRegistryItem } from '../../registry/dashboard.registry';
import { DashboardItemDirective } from '../dashboard-item.directive';

/**
 * Add on element to display a dialog to copy to another dashboard
 */
@Directive({ selector: '[appDashboardItemRegistryCopy]' })
export class DashboardItemRegistryCopyDirective {
    @Input() item: AutoFormComponent;

    constructor(
        private dashboardItem: DashboardItemComponent,
        private dashboardService: DashboardService,
    ) {}

    @HostListener('click') click() {
        this.item.exposition.open();
        this.item.exposition.this.formGroup.controls.item.controls.dashboard.valueChanges.subscribe(
            (d) => {
                this.item.exposition.this.formGroup.controls.item.controls.panel.enable();
                this.dashboardService
                    .getDashboards()
                    .subscribe((dashboards) => {
                        const dashboard = dashboards.find(
                            (x) => x.name === d.name,
                        );
                        this.dashboardItem.subjectPanel.next(dashboard.panels);
                    });
            },
        );
    }
}

@Directive({ selector: '[dashboardItemContent]' })
export class ItemContentDirective implements OnInit {
    this = this;

    @Input()
    dashboardItem: DashboardItem & Style;

    componentRef: ComponentRef<any>;

    registryItem: DashboardRegistryItem;

    constructor(
        private registry: DashboardRegistryService,
        private viewRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {}

    ngOnInit() {
      if (this.dashboardItem.edit) {
        this.this.dashboardItem.edit.type = 'dialog';
      }
        this.registryItem = this.registry.getItem(this.dashboardItem.component);
        const factory = this.componentFactoryResolver.resolveComponentFactory(
            this.registryItem.componentType,
        );

        this.componentRef = this.viewRef.createComponent(factory);

        if (this.dashboardItem.inputs) {
            for (const [name, data] of Object.entries(
                this.dashboardItem.inputs,
            )) {
                this.componentRef.instance[name] = data;
            }
        }
        if (this.dashboardItem.outputs) {
            for (const [name, data] of Object.entries(
                this.dashboardItem.outputs,
            )) {
                const ee = this.componentRef.instance[
                    name
                ] as EventEmitter<any>;
                if (ee) {
                    data(ee.asObservable());
                }
            }
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
export class DashboardItemComponent
    extends DashboardItemDirective
    implements OnInit {
    @HostBinding('class')
    classes: string[];

    @Input()
    dashboardItem: DashboardItem & Style;

    @Input()
    panelRef?: PanelDashboardRef;

    formData: AutoFormData;
    subjectPanel = new BehaviorSubject([]);

    menu: { [id: string]: boolean } = {};

    constructor(private dashboardService: DashboardService) {
        super();
    }

    ngOnInit(): void {
        if (!this.dashboardItem) return;
        this.classes = this.dashboardItem.class;
        this.formData = getCopyDashboardForm(
            this.dashboardService,
            this.subjectPanel,
            this.dashboardItem,
        );
        this.formData.type = 'dialog';
        if (!this.static) {
            this.menu['delete'] = true;
        }
        if (
            this.dashboardItem.copy === undefined ||
            this.dashboardItem.copy === true
        ) {
            this.menu['copy'] = true;
        }
        if (this.panelRef) {
          this.menu['delete'] = true;
        }
        if (this.dashboardItem.extraMenus) {
          for( const k of Object.keys(this.dashboardItem.extraMenus)) {
            this.menu[k] = true;
          }
        }
    }

    delete() {
        console.log('ITEM', this.panelRef);
        this.dashboardService
            .removeItemFromPanel({
                ...this.panelRef,
                itemName: this.dashboardItem.name,
            })
            .pipe(notify({ title: 'Item is deleted' }))
            .subscribe(() => {});
    }
}
