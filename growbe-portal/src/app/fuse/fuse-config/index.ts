import { FuseConfig } from '@berlingoqc/fuse';

/**
 * Default Fuse Configuration
 *
 * You can edit these options to change the default options. All these options also can be
 * changed per component basis. See `app/main/pages/authentication/login/login.component.ts`
 * constructor method to learn more about changing these options per component basis.
 */

export const fuseConfig: FuseConfig = {
    // Color themes can be defined in src/app/app.theme.scss
    colorTheme: 'theme-growbe',
    customScrollbars: true,
    layout: {
        style: 'vertical-layout-1',
        width: 'fullwidth',
        navbar: {
            primaryBackground: 'mat-grey-200-bg',
            secondaryBackground: 'fuse-navy-900',
            folded: false,
            hidden: false,
            position: 'left',
            variant: 'vertical-style-1',
        },
        toolbar: {
            customBackgroundColor: true,
            background: 'mat-grey-800-bg',
            hidden: false,
            position: 'below-static',
        },
        footer: {
            customBackgroundColor: true,
            background: 'mat-grey-800-bg',
            hidden: false,
            position: 'above-fixed',
        },
        sidepanel: {
            hidden: false,
            position: 'right',
        },
    },
};
