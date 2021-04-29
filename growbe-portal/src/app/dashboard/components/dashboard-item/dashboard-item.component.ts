import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Host,
    HostBinding,
    HostListener,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '@berlingoqc/fuse';
import { AutoFormComponent, AutoFormData } from '@berlingoqc/ngx-autoform';
import { Subject } from 'rxjs';
import { getCopyDashboardForm } from '../../dashboard.form';
import { DashboardItem, Style } from '../../dashboard.model';
import { DashboardService } from '../../dashboard.service';
import { DashboardRegistryService } from '../../registry/dashboard-registry.service';
import { DashboardRegistryItem } from '../../registry/dashboard.registry';

/**
 * Add on element to display a dialog to copy to another dashboard
 */
@Directive({ selector: '[appDashboardItemRegistryCopy]' })
export class DashboardItemRegistryCopyDirective {
    @Input() item: AutoFormComponent;

    constructor(private dashboardService: DashboardService) {}

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
                        this.item.componentFieldService.items.panel.instance.options = dashboard.panels.map(
                            (x) => x.name,
                        );
                    });
            },
        );
    }
}

@Directive({ selector: '[appDashboardItemContent]' })
export class ItemContentDirective implements OnInit, OnDestroy {
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
        this.registryItem = this.registry.getItem(this.dashboardItem.component);
        const factory = this.componentFactoryResolver.resolveComponentFactory(
            this.registryItem.componentType,
        );

        this.componentRef = this.viewRef.createComponent(factory);

        for (const [name, data] of Object.entries(this.dashboardItem.inputs)) {
            this.componentRef.instance[name] = data;
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
export class DashboardItemComponent implements OnInit {
    @HostBinding('class')
    classes: string[];

    @Input()
    dashboardItem: DashboardItem & Style;

    formData: AutoFormData;

    constructor(private dashboardService: DashboardService) {}

    ngOnInit(): void {
        if (!this.dashboardItem) {
            return;
        }
        this.classes = this.dashboardItem.class;

        this.formData = getCopyDashboardForm(this.dashboardService);
        this.formData.type = 'dialog';
    }
}