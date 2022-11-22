import {SelectComponent} from "@berlingoqc/ngx-autoform";
import {of} from "rxjs";
import {getCloudLogSearchForm} from "./cloud-log-search.form";



export function getTerminalComponentInputForm() {
    return {
      "typeLog": {
          name: 'typeLog',
          type: 'string',
          required: true,
          component: {
                name: 'select',
                type: 'mat',
                transformValue: (e) => e,
                options: {
                    displayTitle: '',
                    displayContent: (e) => e,
                    value: of(['cloud', 'device'])
                },
            } as SelectComponent,
      },
      "growbeId": {
          name: 'growbeId',
          type: 'string',
          required: true,
      },
      "moduleId": {
          name: 'moduleId',
          type: 'string',
          required: false
      },
      "where": {
          name: "where",
          type: 'object',
          required: false,
          properties: getCloudLogSearchForm('cloud')
      }
    };
}
