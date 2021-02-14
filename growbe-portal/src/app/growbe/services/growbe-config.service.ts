import { Injectable } from "@angular/core";



@Injectable({providedIn: 'root'})
export class GrowbeConfigService {
  hearthBeathRate: number = 30; // nbr of second between hearthBeath
}
