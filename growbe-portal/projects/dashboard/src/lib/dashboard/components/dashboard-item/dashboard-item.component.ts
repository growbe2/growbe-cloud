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
import { FormControl, FormGroup } from '@angular/forms';
import { fuseAnimations } from '@berlingoqc/fuse';
import { AutoFormComponent, AutoFormData, AutoFormDialogService } from '@berlingoqc/ngx-autoform';
import { notify } from '@berlingoqc/ngx-notification';
import { BehaviorSubject, Subject } from 'rxjs';
import { getCopyDashboardForm, modifyDialog } from '../../dashboard.form';
import { DashboardItem, DashboardPanel, DASHBOARD_ITEM_REF, Style } from '../../dashboard.model';
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
      this.item.exposition.this.formGroup.controls.item.controls.panel.valueChanges.subscribe((panel) => {
        if (panel) {
          this.item.exposition.this.formGroup.controls.item.controls.name.enable();
          (this.item.exposition.this.formGroup.controls.item.controls.name as FormControl)
            .setValidators((validator: FormControl) => {
              const value = validator.value;
              const index = panel.items.findIndex((item) => item.name === value);
              if(index > -1) {
                return { alreadyExists: true };
              }
              return null;
            })
        }
      });
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
        private injector: Injector,
    ) {}

    ngOnInit() {
      if (this.dashboardItem.edit) {
        this.dashboardItem.edit.type = 'dialog';
        this.dashboardItem.edit.typeData = {
          width: '100%',
          height: '100%',
          panelClass: 'auto-form-dialog',
        }
      }
        this.registryItem = this.registry.getItem(this.dashboardItem.component);
        const factory = this.componentFactoryResolver.resolveComponentFactory(
            this.registryItem.componentType,
        );

        const injector = Injector.create({
          providers: [
            {
              provide: DASHBOARD_ITEM_REF,
              useValue: this.dashboardItem
            }
          ],
          parent: this.injector
        });
        this.componentRef = this.viewRef.createComponent(factory, undefined, injector);

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
    index: number;

    @Input()
    panelRef?: PanelDashboardRef;

    @Input()
    panel?: DashboardPanel;

    formData: AutoFormData;
    subjectPanel = new BehaviorSubject([]);

    menu: { [id: string]: boolean } = {};

    constructor(
      private dashboardService: DashboardService,
      private dashboardRegistry: DashboardRegistryService,
      private autoformDialogService: AutoFormDialogService,
    ) {
        super();
    }

    ngOnInit(): void {
        if (!this.dashboardItem) return;
        if (!this.dashboardItem.extraMenus) {
          this.dashboardItem.extraMenus = {};
        }
        if (this.dashboardItem.dashboardEdit) {
          this.dashboardItem.extraMenus['dashboardEdit'] = {
            name: 'Dashboard edit',
            callback: (item: DashboardItem) => {
              this.autoformDialogService.open(
                modifyDialog(
                  this.panelRef, this.dashboardItem, this.dashboardService, this.dashboardRegistry,
                ));
            }
          }
        }
        this.classes = this.dashboardItem.class;
        this.formData = getCopyDashboardForm(
            this.dashboardService,
            this.subjectPanel,
            {...this.dashboardItem},
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
        this.dashboardService
            .removeItemFromPanel({
                ...this.panelRef,
                itemId: this.dashboardItem.id,
            })
            .pipe(notify({ title: 'Item is deleted' }))
            .subscribe(() => {});
    }
}
